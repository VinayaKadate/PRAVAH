import uuid
from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, UploadFile, File, Depends, status

from app.core.auth import get_current_user
from app.core.adapters import get_storage_adapter
from app.core.firebase import get_db
from app.core.audit import write_audit_log

router = APIRouter()


@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    user: dict = Depends(get_current_user),
):
    """Upload a file via the storage adapter. Returns URL + metadata."""
    storage = get_storage_adapter()

    file_bytes = await file.read()
    if len(file_bytes) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Empty file"
        )

    # Generate a unique filename
    ext = file.filename.rsplit(".", 1)[-1] if "." in file.filename else ""
    unique_name = f"{uuid.uuid4().hex[:12]}_{file.filename}"

    result = storage.upload(
        file_bytes=file_bytes,
        filename=unique_name,
        folder=f"pravah/{user.get('uid', 'unknown')}",
    )

    if "error" in result:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Upload failed: {result['error']}",
        )

    # Save file metadata to Firestore
    db = get_db()
    file_id = uuid.uuid4().hex[:16]
    file_doc = {
        "file_id": file_id,
        "original_name": file.filename,
        "stored_name": unique_name,
        "public_id": result.get("public_id", ""),
        "url": result.get("url", ""),
        "format": result.get("format", ext),
        "size": result.get("size", len(file_bytes)),
        "content_type": file.content_type,
        "uploaded_by": user.get("uid", ""),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    if db:
        db.collection("files").document(file_id).set(file_doc)
        write_audit_log(
            db=db,
            actor_id=user.get("uid", ""),
            action="FILE_UPLOAD",
            entity_type="files",
            entity_id=file_id,
            details={"filename": file.filename, "size": len(file_bytes)},
        )

    return file_doc


@router.get("/{file_id}")
def get_file(file_id: str, user: dict = Depends(get_current_user)):
    """Get file metadata and URL by ID."""
    db = get_db()
    if not db:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database not initialized",
        )

    doc = db.collection("files").document(file_id).get()
    if not doc.exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="File not found"
        )

    return doc.to_dict()


@router.delete("/{file_id}")
def delete_file(file_id: str, user: dict = Depends(get_current_user)):
    """Delete a file from storage and Firestore."""
    db = get_db()
    if not db:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database not initialized",
        )

    doc = db.collection("files").document(file_id).get()
    if not doc.exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="File not found"
        )

    file_data = doc.to_dict()

    # Delete from storage
    storage = get_storage_adapter()
    public_id = file_data.get("public_id", "")
    if public_id:
        storage.delete(public_id)

    # Delete from Firestore
    db.collection("files").document(file_id).delete()

    write_audit_log(
        db=db,
        actor_id=user.get("uid", ""),
        action="FILE_DELETE",
        entity_type="files",
        entity_id=file_id,
        details={"filename": file_data.get("original_name", "")},
    )

    return {"success": True, "file_id": file_id}

from fastapi import APIRouter, HTTPException
from app.core.firebase import get_db

router = APIRouter()

@router.get("/{application_id}/track")
def track_application(application_id: str):
    db = get_db()
    if not db:
        raise HTTPException(status_code=500, detail="Database not initialized")
    
    doc = db.collection("pravah_config").document("track_stages").get()
    stages = doc.to_dict().get("data", []) if doc.exists else []
    return {"application_id": application_id, "tracking_stages": stages}

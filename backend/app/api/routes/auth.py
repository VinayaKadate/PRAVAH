from datetime import datetime, timezone

from fastapi import APIRouter, HTTPException, status, Depends

from app.core.auth import (
    verify_firebase_token,
    create_access_token,
    get_current_user,
)
from app.core.firebase import get_db
from app.core.audit import write_audit_log
from app.models.user import UserCreate, UserLogin, UserResponse, TokenResponse, UserRole

router = APIRouter()


@router.post("/register", response_model=TokenResponse)
def register(payload: UserCreate):
    """Register a new user. Accepts a Firebase ID token + role, creates user doc in Firestore."""
    db = get_db()
    if not db:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database not initialized",
        )

    # Verify the Firebase token
    decoded = verify_firebase_token(payload.firebase_token)
    uid = decoded.get("uid")
    email = decoded.get("email", "")

    # Check if user already exists
    user_ref = db.collection("users").document(uid)
    if user_ref.get().exists:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already registered. Please use login.",
        )

    # Validate role
    if payload.role not in [r.value for r in UserRole]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid role: {payload.role}",
        )

    now = datetime.now(timezone.utc).isoformat()

    # Create user document
    user_data = {
        "email": email,
        "role": payload.role,
        "display_name": payload.display_name or email.split("@")[0],
        "created_at": now,
        "updated_at": now,
    }
    user_ref.set(user_data)

    # Audit log
    write_audit_log(
        db=db,
        actor_id=uid,
        action="USER_REGISTER",
        entity_type="users",
        entity_id=uid,
        details={"email": email, "role": payload.role},
    )

    # Generate backend JWT
    token = create_access_token(
        {"uid": uid, "email": email, "role": payload.role}
    )

    return TokenResponse(
        access_token=token,
        user=UserResponse(
            uid=uid,
            email=email,
            role=payload.role,
            display_name=user_data["display_name"],
            created_at=now,
        ),
    )


@router.post("/login", response_model=TokenResponse)
def login(payload: UserLogin):
    """Login an existing user. Accepts a Firebase ID token, looks up user, returns backend JWT."""
    db = get_db()
    if not db:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database not initialized",
        )

    # Verify the Firebase token
    decoded = verify_firebase_token(payload.firebase_token)
    uid = decoded.get("uid")
    email = decoded.get("email", "")

    # Look up user in Firestore
    user_doc = db.collection("users").document(uid).get()
    if not user_doc.exists:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not registered. Please register first.",
        )

    user_data = user_doc.to_dict()

    # Audit log
    write_audit_log(
        db=db,
        actor_id=uid,
        action="USER_LOGIN",
        entity_type="users",
        entity_id=uid,
    )

    # Generate backend JWT
    token = create_access_token(
        {"uid": uid, "email": email, "role": user_data.get("role", "investor")}
    )

    return TokenResponse(
        access_token=token,
        user=UserResponse(
            uid=uid,
            email=email,
            role=user_data.get("role", "investor"),
            display_name=user_data.get("display_name"),
            created_at=user_data.get("created_at"),
        ),
    )


@router.get("/me", response_model=UserResponse)
def get_me(user: dict = Depends(get_current_user)):
    """Return the current authenticated user's profile."""
    return UserResponse(
        uid=user.get("uid", ""),
        email=user.get("email", ""),
        role=user.get("role", "investor"),
        display_name=user.get("display_name"),
        created_at=user.get("created_at"),
    )

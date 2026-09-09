from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum


class UserRole(str, Enum):
    INVESTOR = "investor"
    TRANSACTIONAL = "transactional"
    OFFICER = "officer"
    POLICY_ADMIN = "policy_admin"
    SYSTEM_ADMIN = "system_admin"


class UserCreate(BaseModel):
    firebase_token: str
    role: UserRole = UserRole.INVESTOR
    display_name: Optional[str] = None


class UserLogin(BaseModel):
    firebase_token: str


class UserResponse(BaseModel):
    uid: str
    email: str
    role: UserRole
    display_name: Optional[str] = None
    created_at: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

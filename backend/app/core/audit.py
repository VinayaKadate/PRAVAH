from datetime import datetime, timezone
from typing import Optional

from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware

from app.core.firebase import get_db


def write_audit_log(
    db,
    actor_id: str,
    action: str,
    entity_type: str,
    entity_id: Optional[str] = None,
    details: Optional[dict] = None,
    ip_address: Optional[str] = None,
):
    """Write a single audit log entry to Firestore."""
    if not db:
        return

    log_entry = {
        "actor_id": actor_id,
        "action": action,
        "entity_type": entity_type,
        "entity_id": entity_id or "",
        "details": details or {},
        "ip_address": ip_address or "",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }

    db.collection("audit_logs").add(log_entry)


class AuditMiddleware(BaseHTTPMiddleware):
    """Automatically logs all non-GET API requests with the requesting user's ID."""

    # Methods that represent write operations
    WRITE_METHODS = {"POST", "PUT", "PATCH", "DELETE"}

    async def dispatch(self, request: Request, call_next) -> Response:
        # Only audit write operations on API routes
        if (
            request.method not in self.WRITE_METHODS
            or not request.url.path.startswith("/api")
        ):
            return await call_next(request)

        response = await call_next(request)

        # Only log successful writes (2xx status)
        if 200 <= response.status_code < 300:
            try:
                # Extract actor from the JWT if present
                actor_id = "anonymous"
                auth_header = request.headers.get("authorization", "")
                if auth_header.startswith("Bearer "):
                    try:
                        import jwt
                        from app.core.config import settings

                        token = auth_header.split(" ", 1)[1]
                        payload = jwt.decode(
                            token,
                            settings.SECRET_KEY,
                            algorithms=[settings.ALGORITHM],
                        )
                        actor_id = payload.get("uid", "anonymous")
                    except Exception:
                        pass

                db = get_db()
                write_audit_log(
                    db=db,
                    actor_id=actor_id,
                    action=f"{request.method} {request.url.path}",
                    entity_type=request.url.path.split("/api/")[-1].split("/")[0]
                    if "/api/" in request.url.path
                    else "unknown",
                    entity_id=request.path_params.get("id", ""),
                    details={"status_code": response.status_code},
                    ip_address=request.client.host if request.client else None,
                )
            except Exception:
                # Audit logging should never break the request
                pass

        return response

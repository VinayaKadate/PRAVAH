"""Cloudinary file storage adapter — real upload/retrieve/delete via Cloudinary API."""

import cloudinary
import cloudinary.uploader
import cloudinary.api

from app.adapters.base import FileStorageAdapter


class CloudinaryStorageAdapter(FileStorageAdapter):
    """Real file storage via Cloudinary. Requires CLOUDINARY_URL in environment."""

    def __init__(self, cloudinary_url: str = ""):
        if cloudinary_url:
            # cloudinary auto-configures from CLOUDINARY_URL env var,
            # but we can also set it explicitly
            parts = cloudinary_url.replace("cloudinary://", "").split("@")
            if len(parts) == 2:
                creds = parts[0].split(":")
                cloud_name = parts[1]
                if len(creds) == 2:
                    cloudinary.config(
                        cloud_name=cloud_name,
                        api_key=creds[0],
                        api_secret=creds[1],
                        secure=True,
                    )

    def upload(self, file_bytes: bytes, filename: str, folder: str = "pravah", resource_type: str = "auto") -> dict:
        try:
            result = cloudinary.uploader.upload(
                file_bytes,
                folder=folder,
                public_id=filename.rsplit(".", 1)[0] if "." in filename else filename,
                resource_type=resource_type,
                overwrite=True,
            )
            return {
                "public_id": result.get("public_id"),
                "url": result.get("secure_url"),
                "format": result.get("format"),
                "size": result.get("bytes"),
                "resource_type": result.get("resource_type"),
                "created_at": result.get("created_at"),
            }
        except Exception as e:
            return {"error": str(e)}

    def get_url(self, public_id: str) -> str:
        try:
            result = cloudinary.api.resource(public_id)
            return result.get("secure_url", "")
        except Exception:
            return ""

    def delete(self, public_id: str) -> dict:
        try:
            result = cloudinary.uploader.destroy(public_id)
            return {"success": result.get("result") == "ok"}
        except Exception as e:
            return {"success": False, "error": str(e)}

"""Mock notification adapter — logs emails and push notifications to console."""

import uuid

from app.adapters.base import NotificationAdapter


class MockNotificationAdapter(NotificationAdapter):
    """Simulates email and push notification delivery for development."""

    def send_email(self, to: str, subject: str, body: str, html: bool = False) -> dict:
        msg_id = f"MOCK_EMAIL_{uuid.uuid4().hex[:8].upper()}"
        print(f"[MockNotification] Email to {to}")
        print(f"  Subject: {subject}")
        print(f"  Body: {body[:100]}{'...' if len(body) > 100 else ''}")
        return {"success": True, "message_id": msg_id}

    def send_push(self, user_id: str, title: str, body: str, data: dict = None) -> dict:
        msg_id = f"MOCK_PUSH_{uuid.uuid4().hex[:8].upper()}"
        print(f"[MockNotification] Push to user {user_id}: {title}")
        return {"success": True, "message_id": msg_id}

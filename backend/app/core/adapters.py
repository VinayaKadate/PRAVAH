"""Adapter registry — returns the configured adapter for each external service.

By default all adapters are mocks. Swap to real implementations by changing
the factory functions here — no calling code needs to change.
"""

from app.adapters.base import PaymentAdapter, SMSAdapter, NotificationAdapter, FileStorageAdapter
from app.adapters.mock_payment import MockPaymentAdapter
from app.adapters.mock_sms import MockSMSAdapter
from app.adapters.mock_notification import MockNotificationAdapter
from app.adapters.cloudinary_storage import CloudinaryStorageAdapter
from app.core.config import settings


# Singleton instances (created on first access)
_payment: PaymentAdapter | None = None
_sms: SMSAdapter | None = None
_notification: NotificationAdapter | None = None
_storage: FileStorageAdapter | None = None


def get_payment_adapter() -> PaymentAdapter:
    global _payment
    if _payment is None:
        _payment = MockPaymentAdapter()
    return _payment


def get_sms_adapter() -> SMSAdapter:
    global _sms
    if _sms is None:
        _sms = MockSMSAdapter()
    return _sms


def get_notification_adapter() -> NotificationAdapter:
    global _notification
    if _notification is None:
        _notification = MockNotificationAdapter()
    return _notification


def get_storage_adapter() -> FileStorageAdapter:
    global _storage
    if _storage is None:
        cloudinary_url = getattr(settings, "CLOUDINARY_URL", "")
        if cloudinary_url:
            _storage = CloudinaryStorageAdapter(cloudinary_url)
        else:
            # Fallback: still use Cloudinary adapter, it will error on upload
            # but won't crash the app on startup
            _storage = CloudinaryStorageAdapter()
    return _storage

"""Abstract base classes for all external service adapters.

Each adapter defines the interface that calling code depends on.
Implementations (mock or real) are swapped via the adapter registry
in app.core.adapters without changing any calling code.
"""

from abc import ABC, abstractmethod
from typing import Optional


class PaymentAdapter(ABC):
    """Interface for payment gateway operations."""

    @abstractmethod
    def create_order(self, amount: float, currency: str = "INR", metadata: dict = None) -> dict:
        """Create a payment order. Returns dict with order_id, amount, status."""
        ...

    @abstractmethod
    def verify_payment(self, order_id: str, payment_id: str, signature: str) -> dict:
        """Verify a completed payment. Returns dict with verified: bool, details."""
        ...

    @abstractmethod
    def get_status(self, order_id: str) -> dict:
        """Get the current status of a payment order."""
        ...


class SMSAdapter(ABC):
    """Interface for SMS/OTP operations."""

    @abstractmethod
    def send_otp(self, phone: str, otp: Optional[str] = None) -> dict:
        """Send an OTP to the given phone number. Returns dict with success, message_id."""
        ...

    @abstractmethod
    def verify_otp(self, phone: str, otp: str) -> dict:
        """Verify an OTP for the given phone number. Returns dict with verified: bool."""
        ...


class NotificationAdapter(ABC):
    """Interface for email and push notification operations."""

    @abstractmethod
    def send_email(self, to: str, subject: str, body: str, html: bool = False) -> dict:
        """Send an email. Returns dict with success, message_id."""
        ...

    @abstractmethod
    def send_push(self, user_id: str, title: str, body: str, data: dict = None) -> dict:
        """Send a push notification. Returns dict with success, message_id."""
        ...


class FileStorageAdapter(ABC):
    """Interface for file upload/retrieval/deletion."""

    @abstractmethod
    def upload(self, file_bytes: bytes, filename: str, folder: str = "", resource_type: str = "auto") -> dict:
        """Upload a file. Returns dict with public_id, url, metadata."""
        ...

    @abstractmethod
    def get_url(self, public_id: str) -> str:
        """Get the public URL for a stored file."""
        ...

    @abstractmethod
    def delete(self, public_id: str) -> dict:
        """Delete a stored file. Returns dict with success."""
        ...

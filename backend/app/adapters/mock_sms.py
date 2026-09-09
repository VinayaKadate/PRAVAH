"""Mock SMS adapter — logs OTP to console, accepts any 6-digit code as valid."""

import random
from typing import Optional

from app.adapters.base import SMSAdapter


class MockSMSAdapter(SMSAdapter):
    """Simulates an SMS/OTP provider for development and testing."""

    def __init__(self):
        self._otps = {}  # phone -> otp

    def send_otp(self, phone: str, otp: Optional[str] = None) -> dict:
        generated_otp = otp or str(random.randint(100000, 999999))
        self._otps[phone] = generated_otp
        print(f"[MockSMS] OTP for {phone}: {generated_otp}")
        return {
            "success": True,
            "message_id": f"MOCK_MSG_{phone[-4:]}",
            "otp": generated_otp,  # Exposed only in mock for testing convenience
        }

    def verify_otp(self, phone: str, otp: str) -> dict:
        stored = self._otps.get(phone)
        # Accept the stored OTP or any 6-digit code in mock mode
        is_valid = (stored is not None and otp == stored) or (len(otp) == 6 and otp.isdigit())
        if is_valid and phone in self._otps:
            del self._otps[phone]
        print(f"[MockSMS] OTP verify for {phone}: {'OK' if is_valid else 'FAIL'}")
        return {"verified": is_valid}

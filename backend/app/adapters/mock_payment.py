"""Mock payment adapter — returns fake order IDs and always-success verification."""

import uuid
from datetime import datetime, timezone

from app.adapters.base import PaymentAdapter


class MockPaymentAdapter(PaymentAdapter):
    """Simulates a payment gateway for development and testing."""

    def __init__(self):
        self._orders = {}

    def create_order(self, amount: float, currency: str = "INR", metadata: dict = None) -> dict:
        order_id = f"MOCK_ORD_{uuid.uuid4().hex[:10].upper()}"
        order = {
            "order_id": order_id,
            "amount": amount,
            "currency": currency,
            "status": "created",
            "metadata": metadata or {},
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        self._orders[order_id] = order
        print(f"[MockPayment] Order created: {order_id} for {currency} {amount}")
        return order

    def verify_payment(self, order_id: str, payment_id: str, signature: str) -> dict:
        if order_id in self._orders:
            self._orders[order_id]["status"] = "paid"
        print(f"[MockPayment] Payment verified: order={order_id}, payment={payment_id}")
        return {
            "verified": True,
            "order_id": order_id,
            "payment_id": payment_id,
            "status": "paid",
        }

    def get_status(self, order_id: str) -> dict:
        if order_id in self._orders:
            return self._orders[order_id]
        return {"order_id": order_id, "status": "not_found"}

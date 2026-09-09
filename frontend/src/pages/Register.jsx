import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserPlus, Loader2, CircleAlert } from "lucide-react";
import { SectionHead } from "../components/common/SectionHead";
import { Field } from "../components/common/Field";
import { Btn } from "../components/common/Btn";
import { C, inputCls, inputStyle } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";

const ROLES = [
  { value: "investor", label: "Investor / Business Owner", desc: "Apply for approvals, track applications" },
  { value: "officer", label: "Department Officer", desc: "Process and review applications" },
  { value: "policy_admin", label: "Government / Policy Admin", desc: "View analytics and manage policies" },
];

export function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "investor",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await register(form.email, form.password, form.role, form.name);
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.message ||
        "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-16" style={{ background: C.bg, minHeight: "70vh" }}>
      <div className="max-w-lg mx-auto">
        <SectionHead
          eyebrow="Get started"
          title="Create your MAITRI account"
          sub="Register to apply for industrial approvals, track your applications, and access incentives."
        />

        <div
          className="p-6 rounded-lg"
          style={{ background: C.white, border: `1px solid ${C.line}` }}
        >
          {error && (
            <div
              className="flex items-start gap-2 p-3 rounded mb-4"
              style={{ background: "#FEF2F2", border: "1px solid #FCA5A5" }}
            >
              <CircleAlert size={16} color="#B91C1C" className="mt-0.5 shrink-0" />
              <p className="text-sm" style={{ color: "#7F1D1D" }}>
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Field label="Full name">
              <input
                type="text"
                value={form.name}
                onChange={set("name")}
                placeholder="Vinayak Kadate"
                className={inputCls}
                style={inputStyle}
                id="register-name"
              />
            </Field>

            <Field label="Email address">
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="your@email.com"
                className={inputCls}
                style={inputStyle}
                autoComplete="email"
                id="register-email"
              />
            </Field>

            <Field label="Password" hint="At least 6 characters">
              <input
                type="password"
                value={form.password}
                onChange={set("password")}
                placeholder="Create a password"
                className={inputCls}
                style={inputStyle}
                autoComplete="new-password"
                id="register-password"
              />
            </Field>

            <Field label="Confirm password">
              <input
                type="password"
                value={form.confirmPassword}
                onChange={set("confirmPassword")}
                placeholder="Re-enter your password"
                className={inputCls}
                style={inputStyle}
                autoComplete="new-password"
                id="register-confirm-password"
              />
            </Field>

            <Field label="I am registering as">
              <div className="space-y-2 mt-1">
                {ROLES.map((r) => (
                  <label
                    key={r.value}
                    className="flex items-start gap-3 p-3 rounded cursor-pointer transition-colors"
                    style={{
                      border: `1px solid ${form.role === r.value ? C.navy : C.line}`,
                      background: form.role === r.value ? `${C.navy}08` : C.white,
                    }}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r.value}
                      checked={form.role === r.value}
                      onChange={set("role")}
                      className="mt-0.5"
                    />
                    <div>
                      <div className="text-sm font-semibold" style={{ color: C.ink }}>
                        {r.label}
                      </div>
                      <div className="text-xs" style={{ color: C.slate }}>
                        {r.desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </Field>

            <Btn
              type="submit"
              variant="navy"
              className="w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <UserPlus size={16} />
              )}
              Create account
            </Btn>
          </form>

          <p className="text-sm text-center mt-5" style={{ color: C.slate }}>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold"
              style={{ color: C.saffron }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogIn, Loader2, CircleAlert } from "lucide-react";
import { SectionHead } from "../components/common/SectionHead";
import { Field } from "../components/common/Field";
import { Btn } from "../components/common/Btn";
import { C, inputCls, inputStyle } from "../constants/theme";
import { useAuth } from "../contexts/AuthContext";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.message ||
        "Login failed. Check your credentials.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-16" style={{ background: C.bg, minHeight: "70vh" }}>
      <div className="max-w-md mx-auto">
        <SectionHead
          eyebrow="Welcome back"
          title="Sign in to MAITRI"
          sub="Access your applications, track approvals, and manage your business profile."
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
            <Field label="Email address">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={inputCls}
                style={inputStyle}
                autoComplete="email"
                id="login-email"
              />
            </Field>

            <Field label="Password">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={inputCls}
                style={inputStyle}
                autoComplete="current-password"
                id="login-password"
              />
            </Field>

            <Btn
              type="submit"
              variant="navy"
              className="w-full flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <LogIn size={16} />
              )}
              Sign in
            </Btn>
          </form>

          <p className="text-sm text-center mt-5" style={{ color: C.slate }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold"
              style={{ color: C.saffron }}
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

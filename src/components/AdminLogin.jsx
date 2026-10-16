import { useState } from 'react';
import { Lock, Phone, Eye, EyeOff, AlertCircle } from 'lucide-react';
import './AdminLogin.css';

export default function AdminLogin({ onLogin }) {
  const [form, setForm]     = useState({ phone: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.phone.trim() || !form.password.trim()) {
      setError('Please enter your phone number and password.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res  = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.phone.trim(), password: form.password }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        sessionStorage.setItem('ka_admin_token', json.token);
        onLogin(json.token);
      } else {
        setError(json.message || 'Login failed. Please try again.');
      }
    } catch {
      setError('Unable to reach the server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        {/* Brand */}
        <div className="admin-login__brand">
          <div className="admin-login__logo">KA</div>
          <h1 className="admin-login__title">Khaki Academy</h1>
          <p className="admin-login__subtitle">Admin Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="admin-login__form">
          {error && (
            <div className="admin-login__error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="admin-login__field">
            <label htmlFor="al-phone">Phone Number</label>
            <div className="admin-login__input-wrap">
              <Phone size={16} className="admin-login__input-icon" />
              <input
                id="al-phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="admin-login__field">
            <label htmlFor="al-password">Password</label>
            <div className="admin-login__input-wrap">
              <Lock size={16} className="admin-login__input-icon" />
              <input
                id="al-password"
                name="password"
                type={showPwd ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="admin-login__eye"
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="admin-login__btn" disabled={loading}>
            {loading ? <span className="admin-login__spinner" /> : 'Sign In'}
          </button>
        </form>

        <p className="admin-login__footer">
          Restricted access · Khaki Academy © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}

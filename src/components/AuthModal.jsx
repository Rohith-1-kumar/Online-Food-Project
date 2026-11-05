import React, { useState } from 'react';

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  registeredUsers,
  onRegisterUser,
  showToast
}) {
  const [authTab, setAuthTab] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);

  // Login Form
  const [loginEmail, setLoginEmail] = useState('student@klu.ac.in');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Signup Form
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupAge, setSignupAge] = useState(20);
  const [signupRole, setSignupRole] = useState('customer');
  const [signupPassword, setSignupPassword] = useState('');

  if (!isOpen) return null;

  const handleDemoFill = (role) => {
    if (role === 'customer') {
      setLoginEmail('student@klu.ac.in');
      setLoginPassword('password123');
      showToast('Filled Student Demo account', 'info');
    } else if (role === 'driver') {
      setLoginEmail('alex.driver@klu.ac.in');
      setLoginPassword('password123');
      showToast('Filled Delivery Partner Demo account', 'info');
    } else if (role === 'restaurant') {
      setLoginEmail('chef@bawarchi.com');
      setLoginPassword('chef123');
      showToast('Filled Restaurant Chef Demo account', 'info');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const email = loginEmail.trim().toLowerCase();
    const pass = loginPassword.trim();

    const user = registeredUsers.find(
      u => (u.email?.toLowerCase() === email || u.phone === email) && u.password === pass
    );

    if (!user) {
      showToast('Invalid email or password. Please check your credentials or click a demo chip.', 'error');
      return;
    }

    onLoginSuccess(user);
    showToast(`Welcome back, ${user.name}! 👋`, 'success');
    onClose();
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim()) {
      showToast('Please fill all required fields', 'error');
      return;
    }

    if (signupRole === 'driver' && Number(signupAge) < 18) {
      showToast('⚠️ Delivery Partners must be at least 18 years old.', 'error');
      return;
    }

    const email = signupEmail.trim().toLowerCase();
    const existing = registeredUsers.find(u => u.email?.toLowerCase() === email);
    if (existing) {
      showToast('An account with this email already exists. Please log in.', 'error');
      return;
    }

    const newUser = {
      name: signupName.trim(),
      email: email,
      phone: signupPhone.trim() || '9876543210',
      age: Number(signupAge),
      role: signupRole,
      password: signupPassword.trim()
    };

    onRegisterUser(newUser);
    onLoginSuccess(newUser);
    showToast(`🎉 Account created successfully! Welcome to BiteDash, ${newUser.name}!`, 'success');
    onClose();
  };

  return (
    <div 
      className="modal-overlay active" 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px',
        opacity: 1,
        pointerEvents: 'auto'
      }}
    >
      <div 
        className="auth-modal-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          maxWidth: '440px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Modal Top Bar */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <i className="fas fa-bolt"></i>
            </div>
            <strong style={{ fontSize: '1.2rem' }}>BiteDash Account</strong>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
          <button 
            type="button"
            onClick={() => setAuthTab('login')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: 'none',
              fontWeight: '700',
              fontSize: '0.9rem',
              color: authTab === 'login' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: authTab === 'login' ? '3px solid var(--primary)' : '3px solid transparent',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => setAuthTab('signup')}
            style={{
              flex: 1,
              padding: '12px',
              border: 'none',
              background: 'none',
              fontWeight: '700',
              fontSize: '0.9rem',
              color: authTab === 'signup' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: authTab === 'signup' ? '3px solid var(--primary)' : '3px solid transparent',
              cursor: 'pointer'
            }}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: '24px' }}>
          {authTab === 'login' ? (
            <form onSubmit={handleLoginSubmit}>
              {/* Quick Demo Chips */}
              <div style={{ marginBottom: '18px', background: 'var(--bg-main)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px', fontWeight: '700' }}>
                  <i className="fas fa-key" style={{ marginRight: '4px' }}></i> QUICK DEMO LOGINS:
                </span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <button 
                    type="button" 
                    onClick={() => handleDemoFill('customer')}
                    style={{ fontSize: '0.72rem', padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', cursor: 'pointer' }}
                  >
                    Customer
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleDemoFill('driver')}
                    style={{ fontSize: '0.72rem', padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', cursor: 'pointer' }}
                  >
                    Delivery Rider
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleDemoFill('restaurant')}
                    style={{ fontSize: '0.72rem', padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-color)', color: '#fff', cursor: 'pointer' }}
                  >
                    Chef / Admin
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>
                  <i className="far fa-envelope" style={{ marginRight: '6px' }}></i> Email Address or Phone
                </label>
                <input 
                  type="text" 
                  required 
                  value={loginEmail} 
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. student@klu.ac.in"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>
                  <i className="fas fa-lock" style={{ marginRight: '6px' }}></i> Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    required 
                    value={loginPassword} 
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    style={{ width: '100%', padding: '10px 40px 10px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.9rem' }}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--primary)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                Sign In to BiteDash
              </button>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={signupName} 
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="e.g. Rohith Kumar"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Email</label>
                  <input 
                    type="email" 
                    required 
                    value={signupEmail} 
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="student@klu.ac.in"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Phone</label>
                  <input 
                    type="tel" 
                    value={signupPhone} 
                    onChange={(e) => setSignupPhone(e.target.value)}
                    placeholder="9876543210"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Age (Years)</label>
                  <input 
                    type="number" 
                    required 
                    min="13"
                    value={signupAge} 
                    onChange={(e) => setSignupAge(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Account Role</label>
                  <select 
                    value={signupRole} 
                    onChange={(e) => setSignupRole(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem' }}
                  >
                    <option value="customer">Customer / Student</option>
                    <option value="restaurant">Restaurant Partner</option>
                    <option value="driver">Delivery Partner (18+)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px' }}>Create Password</label>
                <input 
                  type="password" 
                  required 
                  value={signupPassword} 
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem' }}
                />
              </div>

              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--primary)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                Create Account & Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}


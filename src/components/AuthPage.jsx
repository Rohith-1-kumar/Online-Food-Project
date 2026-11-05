import React, { useState } from 'react';

export default function AuthPage({
  onLoginSuccess,
  registeredUsers,
  onRegisterUser,
  showToast
}) {
  const [activeTab, setActiveTab] = useState('signup'); // Default to 'signup' as requested
  const [showPassword, setShowPassword] = useState(false);

  // Sign In State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Sign Up State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState(20);
  const [role, setRole] = useState('customer');
  const [password, setPassword] = useState('');

  // Quick Demo Logins
  const handleDemoFill = (demoRole) => {
    setActiveTab('login');
    if (demoRole === 'customer') {
      setLoginEmail('student@klu.ac.in');
      setLoginPassword('password123');
      showToast('Filled Student Demo account (student@klu.ac.in)', 'info');
    } else if (demoRole === 'driver') {
      setLoginEmail('alex.driver@klu.ac.in');
      setLoginPassword('password123');
      showToast('Filled Delivery Partner Demo account (alex.driver@klu.ac.in)', 'info');
    } else if (demoRole === 'restaurant') {
      setLoginEmail('chef@bawarchi.com');
      setLoginPassword('chef123');
      showToast('Filled Restaurant Chef Demo account (chef@bawarchi.com)', 'info');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const cleanEmail = loginEmail.trim().toLowerCase();
    const cleanPass = loginPassword.trim();

    const matchedUser = registeredUsers.find(
      u => (u.email?.toLowerCase() === cleanEmail || u.phone === cleanEmail) && u.password === cleanPass
    );

    if (!matchedUser) {
      showToast('Invalid credentials! Click one of the Demo chips or check your password.', 'error');
      return;
    }

    onLoginSuccess(matchedUser);
    showToast(`Welcome back, ${matchedUser.name}! 👋`, 'success');
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    if (role === 'driver' && Number(age) < 18) {
      showToast('⚠️ Delivery Partners must be at least 18 years old.', 'error');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    const alreadyExists = registeredUsers.find(u => u.email?.toLowerCase() === cleanEmail);
    if (alreadyExists) {
      showToast('An account with this email already exists! Please switch to Sign In.', 'error');
      setActiveTab('login');
      setLoginEmail(cleanEmail);
      return;
    }

    const newUser = {
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim() || '9876543210',
      age: Number(age),
      role: role,
      password: password.trim()
    };

    onRegisterUser(newUser);
    onLoginSuccess(newUser);
    showToast(`🎉 Account created! Welcome to BiteDash, ${newUser.name}!`, 'success');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 10% 20%, rgba(255, 90, 95, 0.12) 0%, rgba(11, 15, 25, 0.98) 70%)',
      padding: '24px'
    }}>
      <div style={{
        maxWidth: '1050px',
        width: '100%',
        background: 'var(--bg-card)',
        borderRadius: '24px',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)'
      }}>
        
        {/* Left Side: Food Visual Showcase & Brand Highlights */}
        <div style={{
          position: 'relative',
          padding: '40px 32px',
          background: 'linear-gradient(135deg, rgba(255, 90, 95, 0.22) 0%, rgba(14, 20, 36, 0.95) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid var(--border-color)'
        }}>
          <div>
            {/* Brand Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '1.4rem',
                boxShadow: '0 8px 16px rgba(255, 90, 95, 0.35)'
              }}>
                <i className="fas fa-bolt"></i>
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff' }}>
                Bite<span style={{ color: 'var(--primary)' }}>Dash</span>
              </div>
            </div>

            <span style={{
              display: 'inline-block',
              background: 'rgba(255, 90, 95, 0.18)',
              color: 'var(--primary)',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: '700',
              marginBottom: '14px'
            }}>
              🍕 Campus Food Delivery & Logistics
            </span>

            <h1 style={{ fontSize: '2.1rem', fontWeight: '800', lineHeight: '1.25', margin: '0 0 16px', color: '#fff' }}>
              Craving Biryani, Burgers or Artisan Pizza?
            </h1>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 24px' }}>
              Sign up to explore top local campus restaurants, order customized meals, track live GPS deliveries, or manage your kitchen orders.
            </p>

            {/* Food Features Pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#fff' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(16,185,129,0.18)', color: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-check"></i>
                </span>
                <span><strong>Instant Or Scheduled Delivery:</strong> Slot timings at your hostel</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#fff' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(59,130,246,0.18)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-motorcycle"></i>
                </span>
                <span><strong>Multi-Role Experience:</strong> Customer, Restaurant Admin & Rider</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#fff' }}>
                <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(245,158,11,0.18)', color: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-shield-halved"></i>
                </span>
                <span><strong>Local Storage Secured:</strong> Persistent sessions & saved cart</span>
              </div>
            </div>
          </div>

          {/* Quick Demo Logins Bar */}
          <div style={{
            background: 'rgba(11, 15, 25, 0.65)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '16px',
            backdropFilter: 'blur(8px)'
          }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              ⚡ 1-Click Demo Accounts (Instant Test):
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                onClick={() => handleDemoFill('customer')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: 'var(--primary-light)',
                  border: '1px solid var(--primary)',
                  color: 'var(--primary)',
                  fontWeight: '700',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-user-graduate" style={{ marginRight: '4px' }}></i> Student
              </button>

              <button 
                type="button" 
                onClick={() => handleDemoFill('restaurant')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: 'rgba(255,180,0,0.15)',
                  border: '1px solid #FFB400',
                  color: '#FFB400',
                  fontWeight: '700',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-kitchen-set" style={{ marginRight: '4px' }}></i> Restaurant Chef
              </button>

              <button 
                type="button" 
                onClick={() => handleDemoFill('driver')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '8px',
                  background: 'rgba(16,185,129,0.15)',
                  border: '1px solid #10B981',
                  color: '#10B981',
                  fontWeight: '700',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-motorcycle" style={{ marginRight: '4px' }}></i> Delivery Rider
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Tabbed Sign Up & Sign In Form */}
        <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            background: 'var(--bg-main)',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '28px',
            border: '1px solid var(--border-color)'
          }}>
            <button 
              type="button"
              onClick={() => setActiveTab('signup')}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'signup' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'signup' ? '#fff' : 'var(--text-muted)',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <i className="fas fa-user-plus" style={{ marginRight: '6px' }}></i> Create Account
            </button>

            <button 
              type="button"
              onClick={() => setActiveTab('login')}
              style={{
                flex: 1,
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                background: activeTab === 'login' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'login' ? '#fff' : 'var(--text-muted)',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <i className="fas fa-arrow-right-to-bracket" style={{ marginRight: '6px' }}></i> Sign In
            </button>
          </div>

          {/* TAB 1: SIGN UP FORM */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignupSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 4px', color: '#fff' }}>
                  Register for BiteDash
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>
                  Enter your details to create an account saved in your Local Storage.
                </p>
              </div>

              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px', color: 'var(--text-main)' }}>
                  Full Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Rohith Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px', color: 'var(--text-main)' }}>
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="student@klu.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px', color: 'var(--text-main)' }}>
                    Phone Number
                  </label>
                  <input 
                    type="tel"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px', color: 'var(--text-main)' }}>
                    Age (Years)
                  </label>
                  <input 
                    type="number"
                    min="13"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontSize: '0.88rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px', color: 'var(--text-main)' }}>
                    Portal Role *
                  </label>
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="customer">Customer / Student</option>
                    <option value="restaurant">Restaurant Chef</option>
                    <option value="driver">Delivery Partner (18+)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px', color: 'var(--text-main)' }}>
                  Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter password (minimum 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 40px 10px 14px',
                      borderRadius: '10px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontSize: '0.88rem'
                    }}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'var(--primary)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: '800',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 8px 18px rgba(255, 90, 95, 0.4)',
                  transition: 'all 0.2s'
                }}
              >
                <i className="fas fa-check-circle" style={{ marginRight: '8px' }}></i> Create Account & Enter Website
              </button>
            </form>
          )}

          {/* TAB 2: SIGN IN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '18px' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 4px', color: '#fff' }}>
                  Welcome Back!
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>
                  Enter your registered email and password to access BiteDash.
                </p>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>
                  Email Address or Phone *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. student@klu.ac.in"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border-color)',
                    color: '#fff',
                    fontSize: '0.9rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px', color: 'var(--text-main)' }}>
                  Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 42px 12px 14px',
                      borderRadius: '10px',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontSize: '0.9rem'
                    }}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer'
                    }}
                  >
                    <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'var(--primary)',
                  color: '#fff',
                  border: 'none',
                  fontWeight: '800',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 8px 18px rgba(255, 90, 95, 0.4)',
                  transition: 'all 0.2s'
                }}
              >
                <i className="fas fa-arrow-right-to-bracket" style={{ marginRight: '8px' }}></i> Sign In & Enter Website
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}


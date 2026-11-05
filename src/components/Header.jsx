import React, { useState } from 'react';

export default function Header({
  currentRole,
  setCurrentRole,
  currentUser,
  onOpenAuth,
  onLogout,
  deliveryAddress,
  onOpenAddressModal,
  searchQuery,
  setSearchQuery,
  onOpenTracker,
  theme,
  onToggleTheme,
  favoritesCount,
  cartCount,
  cartTotal,
  onOpenCart,
  showToast
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleRoleClick = (role) => {
    if (role === 'driver' && currentUser && currentUser.age < 18) {
      showToast('⚠️ Driver portal requires minimum age of 18 years.', 'error');
      return;
    }
    setCurrentRole(role);
    showToast(`Switched to ${role === 'customer' ? 'Customer Storefront' : role === 'restaurant' ? 'Restaurant Admin Portal' : 'Delivery Partner Portal'}`, 'info');
  };

  return (
    <header className="header">
      <div className="nav-container">
        
        {/* Brand Logo */}
        <a href="#" className="logo-brand" onClick={(e) => { e.preventDefault(); setCurrentRole('customer'); }}>
          <div className="logo-icon-wrap">
            <i className="fas fa-bolt"></i>
          </div>
          <div className="logo-text">
            Bite<span>Dash</span>
          </div>
        </a>

        {/* 3-Role View Switcher */}
        <div className="role-switcher">
          <button 
            type="button"
            className={`role-tab-btn ${currentRole === 'customer' ? 'active' : ''}`}
            onClick={() => handleRoleClick('customer')}
          >
            <i className="fas fa-store"></i> <span className="role-btn-text">Customer View</span>
          </button>
          <button 
            type="button"
            className={`role-tab-btn ${currentRole === 'restaurant' ? 'active' : ''}`}
            onClick={() => handleRoleClick('restaurant')}
          >
            <i className="fas fa-kitchen-set"></i> <span className="role-btn-text">Restaurant Portal</span>
          </button>
          <button 
            type="button"
            className={`role-tab-btn ${currentRole === 'driver' ? 'active' : ''}`}
            onClick={() => handleRoleClick('driver')}
          >
            <i className="fas fa-motorcycle"></i> <span className="role-btn-text">Delivery Partner</span>
          </button>
        </div>

        {/* Location Selector */}
        {currentRole === 'customer' && (
          <div className="location-selector" onClick={onOpenAddressModal} title="Click to change delivery address">
            <i className="fas fa-location-dot"></i>
            <div className="location-info">
              <span className="location-label">Deliver to</span>
              <span className="location-value">
                {deliveryAddress.length > 24 ? deliveryAddress.slice(0, 24) + '...' : deliveryAddress}
                <i className="fas fa-chevron-down" style={{ fontSize: '0.65rem', marginLeft: '4px' }}></i>
              </span>
            </div>
          </div>
        )}

        {/* Live Search Bar */}
        {currentRole === 'customer' && (
          <div className="header-search">
            <i className="fas fa-search"></i>
            <input 
              type="text" 
              placeholder="Search biryani, pizza, restaurant..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0 4px' }}
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        )}

        {/* Nav Actions */}
        <div className="nav-actions">
          {/* Live Track Order Trigger */}
          <button 
            type="button"
            className="track-order-nav-btn" 
            onClick={onOpenTracker} 
            title="View Live Order Tracking"
          >
            <span className="pulse-dot"></span> <span className="nav-btn-text">Track Order</span>
          </button>

          {/* Theme Toggle */}
          <button 
            type="button"
            className="theme-toggle-btn" 
            onClick={onToggleTheme} 
            title="Toggle Light/Dark Theme"
          >
            <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'}></i>
          </button>

          {/* Favorites Button (in customer view) */}
          {currentRole === 'customer' && (
            <button 
              type="button"
              className="fav-toggle-btn" 
              title="Saved Favorites"
            >
              <i className="fas fa-heart"></i>
              <span className="badge-count">{favoritesCount}</span>
            </button>
          )}

          {/* Cart Trigger */}
          {currentRole === 'customer' && (
            <button 
              type="button"
              className="auth-btn"
              onClick={onOpenCart}
              style={{ background: 'var(--primary-light)', borderColor: 'var(--primary)', color: 'var(--primary)', position: 'relative' }}
              title="Open Food Cart"
            >
              <i className="fas fa-bag-shopping"></i>
              <span className="nav-btn-text">Cart</span>
              {cartCount > 0 && (
                <span className="badge-count" style={{ position: 'relative', top: 'auto', right: 'auto', marginLeft: '6px' }}>
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* User Profile / Auth */}
          <div className="user-profile-wrap" style={{ position: 'relative' }}>
            {currentUser ? (
              <>
                <button 
                  type="button"
                  className="auth-btn logged-in" 
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <i className="fas fa-user-circle" style={{ color: 'var(--primary)' }}></i>
                  <span className="nav-btn-text">{currentUser.name.split(' ')[0]}</span>
                  <i className="fas fa-caret-down" style={{ fontSize: '0.75rem', marginLeft: '4px' }}></i>
                </button>
                {showDropdown && (
                  <div className="user-dropdown-menu" style={{ display: 'block', position: 'absolute', right: 0, top: '100%', marginTop: '8px', zIndex: 100 }}>
                    <div className="user-dropdown-head">
                      <div className="user-dropdown-avatar"><i className="fas fa-user-shield"></i></div>
                      <div>
                        <strong>{currentUser.name}</strong>
                        <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{currentUser.email}</span>
                        <span className="badge-role" style={{ textTransform: 'capitalize' }}>{currentUser.role}</span>
                      </div>
                    </div>
                    <div className="user-dropdown-divider"></div>
                    <button 
                      type="button" 
                      className="user-dropdown-item" 
                      onClick={() => { onOpenTracker(); setShowDropdown(false); }}
                    >
                      <i className="fas fa-motorcycle" style={{ color: 'var(--primary)' }}></i> Track Active Order
                    </button>
                    <button 
                      type="button" 
                      className="user-dropdown-item" 
                      onClick={() => { onOpenAddressModal(); setShowDropdown(false); }}
                    >
                      <i className="fas fa-location-dot" style={{ color: 'var(--secondary)' }}></i> Change Address
                    </button>
                    <div className="user-dropdown-divider"></div>
                    <button 
                      type="button" 
                      className="user-dropdown-item logout" 
                      onClick={() => { onLogout(); setShowDropdown(false); }}
                    >
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button 
                type="button"
                className="auth-btn" 
                onClick={onOpenAuth}
              >
                <i className="fas fa-user-circle" style={{ color: 'var(--primary)' }}></i>
                <span className="nav-btn-text">Sign In</span>
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}


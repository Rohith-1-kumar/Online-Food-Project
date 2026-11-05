import React, { useState } from 'react';

export default function AddressModal({
  isOpen,
  onClose,
  currentAddress,
  currentLandmark,
  onSaveAddress,
  showToast
}) {
  const [address, setAddress] = useState(currentAddress);
  const [landmark, setLandmark] = useState(currentLandmark);

  if (!isOpen) return null;

  const presets = [
    { label: 'Block-B Men\'s Hostel', loc: 'Block-B Hostels, KLU Campus, Vaddeswaram', lm: 'Near 2nd Floor Lift' },
    { label: 'Block-C Women\'s Hostel', loc: 'Block-C Hostels, KLU Campus, Vaddeswaram', lm: 'Girls Hostel Gate 1' },
    { label: 'Central Library Lounge', loc: 'Central Library, KLU Campus, Vaddeswaram', lm: 'Reading Hall Entrance' },
    { label: 'Faculty Quarters', loc: 'Faculty Villa 12, KLU Campus, Vaddeswaram', lm: 'Near Tennis Court' }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      showToast('Address cannot be empty', 'error');
      return;
    }
    onSaveAddress(address.trim(), landmark.trim());
    showToast('Delivery address updated successfully', 'success');
    onClose();
  };

  const handleSelectPreset = (p) => {
    setAddress(p.loc);
    setLandmark(p.lm);
  };

  return (
    <div 
      className="modal-overlay active" 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
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
        className="address-modal-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          maxWidth: '460px',
          width: '100%',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '800', margin: 0 }}>
            <i className="fas fa-location-dot" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>
            Delivery Address
          </h2>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
        </div>

        <form onSubmit={handleSave} style={{ padding: '24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Campus Quick Locations:
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {presets.map((p, idx) => (
                <button 
                  key={idx}
                  type="button" 
                  onClick={() => handleSelectPreset(p)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: address === p.loc ? 'var(--primary-light)' : 'var(--bg-main)',
                    border: `1px solid ${address === p.loc ? 'var(--primary)' : 'var(--border-color)'}`,
                    color: address === p.loc ? 'var(--primary)' : 'var(--text-main)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>
              Hostel / Block / Street Address
            </label>
            <input 
              type="text" 
              required 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              placeholder="e.g. Room 204, Block-B Hostels, KLU Campus"
              style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>
              Landmark / Delivery Note
            </label>
            <input 
              type="text" 
              value={landmark} 
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="e.g. Near Security Desk, 2nd Floor Lift"
              style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem' }}
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
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
}


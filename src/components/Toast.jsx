import React from 'react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '380px'
    }}>
      {toasts.map(t => {
        let borderColor = '#3B82F6';
        let icon = 'fa-circle-info';
        if (t.type === 'success') {
          borderColor = '#10B981';
          icon = 'fa-circle-check';
        } else if (t.type === 'error') {
          borderColor = '#EF4444';
          icon = 'fa-circle-exclamation';
        } else if (t.type === 'warning') {
          borderColor = '#F59E0B';
          icon = 'fa-triangle-exclamation';
        }

        return (
          <div 
            key={t.id}
            onClick={() => onDismiss(t.id)}
            style={{
              background: 'var(--bg-card)',
              border: `1px solid ${borderColor}`,
              borderLeft: `5px solid ${borderColor}`,
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: 'var(--text-main)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              animation: 'fadeIn 0.2s ease-in'
            }}
          >
            <i className={`fas ${icon}`} style={{ color: borderColor, fontSize: '1.1rem' }}></i>
            <span style={{ flex: 1, lineHeight: '1.4' }}>{t.message}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>✕</span>
          </div>
        );
      })}
    </div>
  );
}


import React, { useState } from 'react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  billSummary,
  deliveryAddress,
  deliveryLandmark,
  onPlaceOrder,
  currentUser,
  onOpenAuth,
  showToast
}) {
  const [deliveryType, setDeliveryType] = useState('asap'); // 'asap' or 'scheduled'
  const [selectedSlot, setSelectedSlot] = useState('Today, 08:00 PM - 08:30 PM');
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const timeSlots = [
    'Today, 07:30 PM - 08:00 PM',
    'Today, 08:00 PM - 08:30 PM',
    'Today, 08:30 PM - 09:00 PM',
    'Today, 09:00 PM - 09:30 PM',
    'Tomorrow, 12:30 PM - 01:00 PM (Lunch)'
  ];

  if (!isOpen) return null;

  const handleConfirmOrder = () => {
    if (!currentUser) {
      showToast('Please sign in or select a demo account before placing order', 'error');
      onOpenAuth();
      return;
    }

    const newOrder = {
      id: `BD-${Math.floor(100000 + Math.random() * 900000)}`,
      restaurantId: cart[0]?.restaurantId || 'r1',
      restaurantName: cart[0]?.restaurantName || 'Campus Kitchen',
      customerName: currentUser.name,
      phone: currentUser.phone || '+91 98765 43210',
      address: `${deliveryAddress} (${deliveryLandmark})`,
      items: cart.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price
      })),
      total: `₹${billSummary.grandTotal}`,
      paymentMethod: paymentMethod,
      deliveryType: deliveryType,
      scheduledSlot: deliveryType === 'asap' ? 'Instant Delivery (20-30 min)' : selectedSlot,
      status: 'Order Placed',
      time: 'Just now',
      placedAt: Date.now(),
      driverName: 'Assigning rider...',
      driverPhone: '+91 91234 56789'
    };

    onPlaceOrder(newOrder);
    onClose();
    showToast(`🎉 Order ${newOrder.id} placed successfully!`, 'success');
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
        className="checkout-modal-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          maxWidth: '520px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>
            <i className="fas fa-shield-heart" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>
            Checkout & Confirmation
          </h2>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
          
          {/* Deliver Address Summary */}
          <div style={{ background: 'var(--bg-main)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
              <i className="fas fa-location-dot" style={{ color: 'var(--primary)' }}></i> Delivery Address
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: '600' }}>{deliveryAddress}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>Landmark: {deliveryLandmark}</div>
          </div>

          {/* Timing: ASAP vs Scheduled */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>Delivery Option:</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button 
                type="button" 
                onClick={() => setDeliveryType('asap')}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${deliveryType === 'asap' ? 'var(--primary)' : 'var(--border-color)'}`,
                  background: deliveryType === 'asap' ? 'var(--primary-light)' : 'var(--bg-main)',
                  color: deliveryType === 'asap' ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <i className="fas fa-bolt" style={{ marginRight: '6px' }}></i> ASAP (25-30 mins)
              </button>

              <button 
                type="button" 
                onClick={() => setDeliveryType('scheduled')}
                style={{
                  padding: '10px',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${deliveryType === 'scheduled' ? 'var(--primary)' : 'var(--border-color)'}`,
                  background: deliveryType === 'scheduled' ? 'var(--primary-light)' : 'var(--bg-main)',
                  color: deliveryType === 'scheduled' ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <i className="fas fa-calendar-clock" style={{ marginRight: '6px' }}></i> Schedule for Later
              </button>
            </div>

            {deliveryType === 'scheduled' && (
              <div style={{ marginTop: '10px' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Select Slot:</label>
                <select 
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff', fontSize: '0.85rem' }}
                >
                  {timeSlots.map((slot, idx) => (
                    <option key={idx} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Payment Method */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>Payment Mode:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'UPI', label: 'UPI (GPay / PhonePe / Paytm / QR)', icon: 'fa-qrcode' },
                { id: 'COD', label: 'Cash on Delivery (Pay at Gate/Hostel)', icon: 'fa-money-bill-wave' },
                { id: 'Card', label: 'Credit / Debit Card / Netbanking', icon: 'fa-credit-card' }
              ].map(pm => (
                <label 
                  key={pm.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    background: paymentMethod === pm.id ? 'var(--primary-light)' : 'var(--bg-main)',
                    border: `1px solid ${paymentMethod === pm.id ? 'var(--primary)' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontSize: '0.85rem'
                  }}
                >
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMethod === pm.id}
                    onChange={() => setPaymentMethod(pm.id)}
                  />
                  <i className={`fas ${pm.icon}`} style={{ color: 'var(--primary)' }}></i>
                  <span style={{ fontWeight: paymentMethod === pm.id ? '700' : '500' }}>{pm.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Order Bill Snapshot */}
          <div style={{ background: 'var(--bg-main)', padding: '12px 16px', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Final Payable Amount:</span>
            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>₹{billSummary.grandTotal}</span>
          </div>
        </div>

        {/* Footer Confirm */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-main)' }}>
          <button 
            type="button" 
            onClick={handleConfirmOrder}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--primary)',
              color: '#fff',
              border: 'none',
              fontWeight: '800',
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <i className="fas fa-check"></i>
            <span>Confirm & Place Order (₹{billSummary.grandTotal})</span>
          </button>
        </div>
      </div>
    </div>
  );
}


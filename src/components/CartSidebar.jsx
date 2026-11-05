import React, { useState } from 'react';

export default function CartSidebar({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onClearCart,
  onProceedCheckout,
  showToast
}) {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  if (!isOpen) return null;

  const itemTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const deliveryFee = itemTotal >= 300 || itemTotal === 0 ? 0 : 40;
  const taxesAndCharges = itemTotal > 0 ? 25 : 0;

  // Calculate discount
  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.code === 'FEAST50') {
      discount = Math.min(100, Math.round(itemTotal * 0.5));
    } else if (appliedPromo.code === 'PIZZA75' && itemTotal >= 299) {
      discount = 75;
    } else if (appliedPromo.code === 'WELCOME') {
      discount = 50;
    }
  }

  const grandTotal = Math.max(0, itemTotal + deliveryFee + taxesAndCharges - discount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoInput.trim().toUpperCase();
    if (code === 'FEAST50') {
      setAppliedPromo({ code, desc: '50% OFF up to ₹100 applied!' });
      showToast('🎉 Coupon FEAST50 applied!', 'success');
    } else if (code === 'PIZZA75') {
      if (itemTotal < 299) {
        showToast('PIZZA75 requires minimum cart value of ₹299', 'error');
        return;
      }
      setAppliedPromo({ code, desc: 'Flat ₹75 OFF applied!' });
      showToast('🎉 Coupon PIZZA75 applied!', 'success');
    } else if (code === 'WELCOME') {
      setAppliedPromo({ code, desc: 'Flat ₹50 OFF applied!' });
      showToast('🎉 Coupon WELCOME applied!', 'success');
    } else {
      showToast('Invalid coupon code. Try FEAST50 or WELCOME.', 'error');
    }
  };

  const restaurantName = cart[0]?.restaurantName || 'Restaurant';

  return (
    <div 
      className="modal-overlay active" 
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'flex-end',
        zIndex: 9999,
        opacity: 1,
        pointerEvents: 'auto'
      }}
    >
      <div 
        className="cart-drawer active" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          borderLeft: '1px solid var(--border-color)',
          right: 0
        }}
      >
        {/* Cart Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0 }}>
              <i className="fas fa-bag-shopping" style={{ color: 'var(--primary)', marginRight: '8px' }}></i>
              Your Order
            </h2>
            {cart.length > 0 && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>From {restaurantName}</span>
            )}
          </div>
          <button 
            type="button" 
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        {/* Cart Items List */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <i className="fas fa-bag-shopping" style={{ fontSize: '3.5rem', opacity: 0.3, marginBottom: '16px' }}></i>
              <h3>Your cart is empty</h3>
              <p style={{ fontSize: '0.85rem' }}>Explore restaurants and delicious food to add items to your cart.</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                {cart.map((item, idx) => (
                  <div 
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px',
                      background: 'var(--bg-main)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: item.diet === 'veg' ? '#10B981' : '#EF4444'
                        }}></span>
                        <strong style={{ fontSize: '0.9rem' }}>{item.name}</strong>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {item.selectedSize !== 'Standard' && <span>{item.selectedSize} </span>}
                        {item.selectedToppings?.length > 0 && <span>+ {item.selectedToppings.join(', ')}</span>}
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)', marginTop: '4px' }}>
                        ₹{item.price * item.qty}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '4px 8px'
                    }}>
                      <button 
                        type="button" 
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: '800' }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', minWidth: '14px', textAlign: 'center' }}>{item.qty}</span>
                      <button 
                        type="button" 
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: '800' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code Input */}
              <div style={{ marginBottom: '20px' }}>
                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    placeholder="Enter Coupon (e.g. FEAST50)" 
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-color)',
                      color: '#fff',
                      fontSize: '0.85rem',
                      textTransform: 'uppercase'
                    }}
                  />
                  <button 
                    type="submit"
                    style={{
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--primary)',
                      color: '#fff',
                      border: 'none',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    Apply
                  </button>
                </form>
                {appliedPromo && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#10B981', marginTop: '6px' }}>
                    <span><i className="fas fa-check-circle" style={{ marginRight: '4px' }}></i>{appliedPromo.desc}</span>
                    <button type="button" onClick={() => setAppliedPromo(null)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>Remove</button>
                  </div>
                )}
              </div>

              {/* Bill Details */}
              <div style={{
                background: 'var(--bg-main)',
                padding: '16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontSize: '0.85rem'
              }}>
                <div style={{ fontWeight: '700', marginBottom: '10px' }}>Bill Details</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--text-muted)' }}>
                  <span>Item Total</span>
                  <span>₹{itemTotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--text-muted)' }}>
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <strong style={{ color: '#10B981' }}>FREE</strong> : `₹${deliveryFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: 'var(--text-muted)' }}>
                  <span>Taxes & Restaurant Packaging</span>
                  <span>₹{taxesAndCharges}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#10B981', fontWeight: '700' }}>
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div style={{
                  borderTop: '1px dashed var(--border-color)',
                  marginTop: '10px',
                  paddingTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: '800',
                  fontSize: '1rem',
                  color: 'var(--text-main)'
                }}>
                  <span>To Pay</span>
                  <span style={{ color: 'var(--primary)' }}>₹{grandTotal}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Proceed Button */}
        {cart.length > 0 && (
          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-main)' }}>
            <button 
              type="button" 
              onClick={() => {
                onClose();
                onProceedCheckout({ itemTotal, deliveryFee, taxesAndCharges, discount, grandTotal });
              }}
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
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span>Proceed to Checkout</span>
              <span>₹{grandTotal} →</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


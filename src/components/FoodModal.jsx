import React, { useState } from 'react';

export default function FoodModal({
  item,
  onClose,
  onAddToCart,
  cartRestaurantId,
  cartRestaurantName
}) {
  const [selectedSize, setSelectedSize] = useState(item?.sizes?.[0] || null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [showCartConflict, setShowCartConflict] = useState(false);

  if (!item) return null;

  // Calculate item base + size + toppings
  const sizeExtra = selectedSize ? (selectedSize.price || 0) : 0;
  const toppingsExtra = selectedToppings.reduce((sum, t) => sum + (t.price || 0), 0);
  const unitPrice = item.price + sizeExtra + toppingsExtra;
  const totalPrice = unitPrice * quantity;

  const handleToggleTopping = (topping) => {
    if (selectedToppings.some(t => t.name === topping.name)) {
      setSelectedToppings(selectedToppings.filter(t => t.name !== topping.name));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const handleAddClick = (clearConflict = false) => {
    // Check single-restaurant policy
    if (cartRestaurantId && cartRestaurantId !== item.restaurantId && !clearConflict) {
      setShowCartConflict(true);
      return;
    }

    const cartItem = {
      id: item.id,
      name: item.name,
      restaurantId: item.restaurantId,
      restaurantName: item.restaurantName,
      unitPrice: unitPrice,
      price: unitPrice,
      qty: quantity,
      image: item.image,
      diet: item.diet,
      selectedSize: selectedSize?.name || 'Standard',
      selectedToppings: selectedToppings.map(t => t.name),
      notes: notes.trim()
    };

    onAddToCart(cartItem, clearConflict);
    onClose();
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
        className="food-modal-card" 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        {/* Dish Banner Image */}
        <div style={{ position: 'relative', height: '180px', flexShrink: 0 }}>
          <img 
            src={item.image} 
            alt={item.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = '/images/biryani.jpg'; }}
          />
          <button 
            type="button" 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.6)',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem'
            }}
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '16px',
              height: '16px',
              border: `2px solid ${item.diet === 'veg' ? '#10B981' : '#EF4444'}`,
              borderRadius: '3px'
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.diet === 'veg' ? '#10B981' : '#EF4444' }}></span>
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.spice || 'Mild'}</span>
            {item.calories && <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>• {item.calories}</span>}
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', margin: '0 0 6px' }}>{item.name}</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 16px', lineHeight: '1.4' }}>
            {item.description}
          </p>

          {/* Portion Size */}
          {item.sizes && item.sizes.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>Choose Size:</div>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {item.sizes.map((s, idx) => (
                  <button 
                    key={idx}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: selectedSize?.name === s.name ? 'var(--primary-light)' : 'var(--bg-main)',
                      border: `1px solid ${selectedSize?.name === s.name ? 'var(--primary)' : 'var(--border-color)'}`,
                      color: selectedSize?.name === s.name ? 'var(--primary)' : 'var(--text-main)',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {s.name} {s.price !== 0 && `(${s.price > 0 ? '+' : ''}₹${s.price})`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons / Toppings */}
          {item.toppings && item.toppings.length > 0 && (
            <div style={{ marginBottom: '18px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>Add Extra Toppings:</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {item.toppings.map((t, idx) => {
                  const isChecked = selectedToppings.some(st => st.name === t.name);
                  return (
                    <label 
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 12px',
                        background: 'var(--bg-main)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => handleToggleTopping(t)}
                        />
                        <span>{t.name}</span>
                      </div>
                      <span style={{ fontWeight: '700', color: 'var(--primary)' }}>+₹{t.price}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cooking Notes */}
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px' }}>
              Special Cooking Instructions (Optional):
            </label>
            <input 
              type="text" 
              placeholder="e.g. Less spicy, extra onions, separate gravy..." 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                color: '#fff',
                fontSize: '0.85rem'
              }}
            />
          </div>

          {/* Conflict Alert */}
          {showCartConflict && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #EF4444',
              borderRadius: 'var(--radius-sm)',
              padding: '12px',
              marginTop: '14px'
            }}>
              <div style={{ fontWeight: '700', color: '#EF4444', fontSize: '0.85rem', marginBottom: '4px' }}>
                Replace cart items?
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 10px' }}>
                Your cart contains items from <strong>{cartRestaurantName || 'another restaurant'}</strong>. Do you want to reset your cart and add this dish?
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  type="button" 
                  onClick={() => handleAddClick(true)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    background: '#EF4444',
                    color: '#fff',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  Yes, Replace Cart
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowCartConflict(false)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '4px',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--border-color)',
          background: 'var(--bg-main)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Quantity Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'var(--bg-card)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-color)'
          }}>
            <button 
              type="button" 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem', fontWeight: '800' }}
            >
              -
            </button>
            <span style={{ fontWeight: '700', minWidth: '16px', textAlign: 'center' }}>{quantity}</span>
            <button 
              type="button" 
              onClick={() => setQuantity(quantity + 1)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1rem', fontWeight: '800' }}
            >
              +
            </button>
          </div>

          {/* Add Button */}
          <button 
            type="button"
            onClick={() => handleAddClick(false)}
            style={{
              padding: '12px 24px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--primary)',
              color: '#fff',
              border: 'none',
              fontWeight: '700',
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>Add Item</span>
            <span>•</span>
            <span>₹{totalPrice}</span>
          </button>
        </div>
      </div>
    </div>
  );
}


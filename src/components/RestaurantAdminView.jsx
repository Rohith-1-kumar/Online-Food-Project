import React, { useState } from 'react';

export default function RestaurantAdminView({
  orders,
  onUpdateOrderStatus,
  foodData,
  onUpdateFoodItem,
  onAddFoodItem,
  restaurants,
  showToast
}) {
  const [selectedRestId, setSelectedRestId] = useState('r1');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'menu'
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [showAddDishModal, setShowAddDishModal] = useState(false);

  // New Dish Form State
  const [dishName, setDishName] = useState('');
  const [dishCategory, setDishCategory] = useState('Biryani & Rice');
  const [dishPrice, setDishPrice] = useState('');
  const [dishDiet, setDishDiet] = useState('veg');
  const [dishDesc, setDishDesc] = useState('');

  const currentRest = restaurants.find(r => r.id === selectedRestId) || restaurants[0];

  // Filter orders for this restaurant (or show all if admin)
  const restOrders = orders.filter(o => o.restaurantId === selectedRestId || !o.restaurantId);
  const restMenu = foodData.filter(f => f.restaurantId === selectedRestId);

  // Calculate KPIs
  const activeOrdersCount = restOrders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
  const completedOrdersCount = restOrders.filter(o => o.status === 'Delivered').length;
  const totalRevenue = restOrders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => {
      const num = parseInt((o.total || '0').toString().replace(/\D/g, '')) || 0;
      return sum + num;
    }, 0);

  const handleSavePrice = (id) => {
    const val = parseInt(newPrice);
    if (!val || val <= 0) {
      showToast('Please enter a valid price', 'error');
      return;
    }
    onUpdateFoodItem(id, { price: val });
    setEditingPriceId(null);
    showToast('Dish price updated successfully', 'success');
  };

  const handleToggleStock = (item) => {
    const newStatus = item.available === false ? true : false;
    onUpdateFoodItem(item.id, { available: newStatus });
    showToast(`${item.name} marked as ${newStatus ? 'IN STOCK' : 'OUT OF STOCK'}`, 'info');
  };

  const handleCreateDish = (e) => {
    e.preventDefault();
    if (!dishName.trim() || !dishPrice) {
      showToast('Please provide dish name and price', 'error');
      return;
    }
    const newItem = {
      id: Date.now(),
      restaurantId: selectedRestId,
      restaurantName: currentRest.name,
      name: dishName.trim(),
      category: dishCategory,
      price: parseInt(dishPrice),
      rating: 4.8,
      reviews: 1,
      diet: dishDiet,
      spice: '🌶️ Medium',
      available: true,
      image: currentRest.image,
      description: dishDesc.trim() || 'Freshly prepared specialty dish crafted with authentic spices.',
      sizes: [{ name: 'Standard Full', price: 0 }]
    };
    onAddFoodItem(newItem);
    setShowAddDishModal(false);
    setDishName('');
    setDishPrice('');
    setDishDesc('');
    showToast(`Added ${dishName} to the menu!`, 'success');
  };

  return (
    <main className="main-content">
      <div className="container" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
        
        {/* Admin Header with Restaurant Switcher */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '24px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ background: '#10B981', color: '#fff', fontSize: '0.7rem', fontWeight: '800', padding: '2px 8px', borderRadius: '4px' }}>
                ADMIN KITCHEN LIVE
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>• Receiving campus orders</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: '800', margin: '4px 0' }}>
              {currentRest.name} Portal
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
              <i className="fas fa-location-dot" style={{ color: 'var(--primary)', marginRight: '6px' }}></i>
              {currentRest.location}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Switch Kitchen:</span>
            <select 
              value={selectedRestId}
              onChange={(e) => setSelectedRestId(e.target.value)}
              style={{
                background: 'var(--bg-main)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {restaurants.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Analytics KPIs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '18px',
          marginBottom: '30px'
        }}>
          <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '8px' }}>
              <i className="fas fa-indian-rupee-sign" style={{ color: '#10B981', marginRight: '6px' }}></i> TODAY'S REVENUE
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10B981' }}>
              ₹{totalRevenue.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Real-time calculated</div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '8px' }}>
              <i className="fas fa-fire-burner" style={{ color: 'var(--primary)', marginRight: '6px' }}></i> ACTIVE ORDERS
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)' }}>
              {activeOrdersCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>In kitchen / on the way</div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '8px' }}>
              <i className="fas fa-check-circle" style={{ color: '#3B82F6', marginRight: '6px' }}></i> COMPLETED ORDERS
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#3B82F6' }}>
              {completedOrdersCount}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Successfully delivered</div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '8px' }}>
              <i className="fas fa-star" style={{ color: '#FFB400', marginRight: '6px' }}></i> STORE RATING
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#FFB400' }}>
              {currentRest.rating} <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>/ 5.0</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>{currentRest.reviews}</div>
          </div>
        </div>

        {/* Tab Switcher: Orders vs Menu */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }}>
          <button 
            type="button"
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '12px 20px',
              fontWeight: '700',
              fontSize: '0.95rem',
              color: activeTab === 'orders' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'orders' ? '3px solid var(--primary)' : '3px solid transparent',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer'
            }}
          >
            <i className="fas fa-bell" style={{ marginRight: '8px' }}></i>
            Live Incoming Orders ({restOrders.length})
          </button>

          <button 
            type="button"
            onClick={() => setActiveTab('menu')}
            style={{
              padding: '12px 20px',
              fontWeight: '700',
              fontSize: '0.95rem',
              color: activeTab === 'menu' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'menu' ? '3px solid var(--primary)' : '3px solid transparent',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer'
            }}
          >
            <i className="fas fa-utensils" style={{ marginRight: '8px' }}></i>
            Menu & Stock Management ({restMenu.length})
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div>
            {restOrders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
                <i className="fas fa-receipt" style={{ fontSize: '3rem', opacity: 0.3, marginBottom: '14px' }}></i>
                <h3>No incoming orders for {currentRest.name}</h3>
                <p style={{ color: 'var(--text-muted)' }}>Orders placed by customers will appear here in real time.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
                {restOrders.map(order => {
                  let statusColor = '#FFB400';
                  if (order.status === 'In Kitchen') statusColor = '#3B82F6';
                  if (order.status === 'Ready for Pickup') statusColor = '#8B5CF6';
                  if (order.status === 'On the Way') statusColor = '#00A699';
                  if (order.status === 'Delivered') statusColor = '#10B981';
                  if (order.status === 'Cancelled') statusColor = '#EF4444';

                  return (
                    <div 
                      key={order.id} 
                      style={{
                        background: 'var(--bg-card)',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border-color)',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <div>
                        {/* Order Header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                            {order.id}
                          </span>
                          <span style={{
                            background: `${statusColor}22`,
                            color: statusColor,
                            border: `1px solid ${statusColor}66`,
                            padding: '3px 10px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: '700'
                          }}>
                            {order.status}
                          </span>
                        </div>

                        {/* Customer Info */}
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                          <div><strong style={{ color: 'var(--text-main)' }}>{order.customerName}</strong> ({order.phone})</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                            <i className="fas fa-location-dot" style={{ marginRight: '4px' }}></i>{order.address}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '4px' }}>
                            <i className="fas fa-clock" style={{ marginRight: '4px' }}></i>Slot: {order.scheduledSlot}
                          </div>
                        </div>

                        {/* Ordered Items */}
                        <div style={{ background: 'var(--bg-main)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '14px' }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-dim)', marginBottom: '6px', textTransform: 'uppercase' }}>
                            Order Items:
                          </div>
                          {order.items?.map((it, idx) => (
                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                              <span><strong>{it.qty}x</strong> {it.name}</span>
                              <span style={{ fontWeight: '600' }}>₹{it.price * it.qty}</span>
                            </div>
                          ))}
                          <div style={{ borderTop: '1px dashed var(--border-color)', marginTop: '8px', paddingTop: '6px', display: 'flex', justifyContent: 'space-between', fontWeight: '800' }}>
                            <span>Total Bill:</span>
                            <span style={{ color: 'var(--primary)' }}>{order.total}</span>
                          </div>
                        </div>
                      </div>

                      {/* Status Action Workflow Buttons */}
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {order.status === 'Order Placed' && (
                          <>
                            <button 
                              type="button" 
                              onClick={() => {
                                onUpdateOrderStatus(order.id, 'In Kitchen');
                                showToast(`Order ${order.id} accepted! Sent to kitchen.`, 'success');
                              }}
                              style={{
                                flex: 1,
                                padding: '8px 12px',
                                borderRadius: 'var(--radius-sm)',
                                background: '#10B981',
                                color: '#fff',
                                border: 'none',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '0.8rem'
                              }}
                            >
                              <i className="fas fa-check"></i> Accept & Prepare
                            </button>
                            <button 
                              type="button" 
                              onClick={() => {
                                onUpdateOrderStatus(order.id, 'Cancelled');
                                showToast(`Order ${order.id} rejected.`, 'error');
                              }}
                              style={{
                                padding: '8px 12px',
                                borderRadius: 'var(--radius-sm)',
                                background: 'transparent',
                                color: '#EF4444',
                                border: '1px solid #EF4444',
                                fontWeight: '700',
                                cursor: 'pointer',
                                fontSize: '0.8rem'
                              }}
                            >
                              Reject
                            </button>
                          </>
                        )}

                        {order.status === 'In Kitchen' && (
                          <button 
                            type="button" 
                            onClick={() => {
                              onUpdateOrderStatus(order.id, 'Ready for Pickup');
                              showToast(`Order ${order.id} marked Ready for Pickup!`, 'info');
                            }}
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              borderRadius: 'var(--radius-sm)',
                              background: '#8B5CF6',
                              color: '#fff',
                              border: 'none',
                              fontWeight: '700',
                              cursor: 'pointer',
                              fontSize: '0.8rem'
                            }}
                          >
                            <i className="fas fa-box-open"></i> Mark Ready for Pickup
                          </button>
                        )}

                        {order.status === 'Ready for Pickup' && (
                          <button 
                            type="button" 
                            onClick={() => {
                              onUpdateOrderStatus(order.id, 'On the Way');
                              showToast(`Order ${order.id} handed over to delivery rider!`, 'info');
                            }}
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              borderRadius: 'var(--radius-sm)',
                              background: '#00A699',
                              color: '#fff',
                              border: 'none',
                              fontWeight: '700',
                              cursor: 'pointer',
                              fontSize: '0.8rem'
                            }}
                          >
                            <i className="fas fa-motorcycle"></i> Handover to Driver
                          </button>
                        )}

                        {order.status === 'On the Way' && (
                          <div style={{ width: '100%', fontSize: '0.8rem', color: '#00A699', textAlign: 'center', fontWeight: '600', padding: '6px' }}>
                            <i className="fas fa-spinner fa-spin" style={{ marginRight: '6px' }}></i> Out for delivery by {order.driverName || 'Rider'}
                          </div>
                        )}

                        {order.status === 'Delivered' && (
                          <div style={{ width: '100%', fontSize: '0.8rem', color: '#10B981', textAlign: 'center', fontWeight: '700', padding: '6px' }}>
                            <i className="fas fa-check-double" style={{ marginRight: '6px' }}></i> Order Successfully Delivered
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MENU & INVENTORY MANAGEMENT */}
        {activeTab === 'menu' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                Menu Items for {currentRest.name} ({restMenu.length})
              </h2>
              <button 
                type="button" 
                onClick={() => setShowAddDishModal(true)}
                style={{
                  background: 'var(--primary)',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                <i className="fas fa-plus" style={{ marginRight: '6px' }}></i> Add New Dish
              </button>
            </div>

            <div style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              overflowX: 'auto'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-main)' }}>
                    <th style={{ padding: '12px 16px' }}>Dish Name</th>
                    <th style={{ padding: '12px 16px' }}>Category</th>
                    <th style={{ padding: '12px 16px' }}>Diet</th>
                    <th style={{ padding: '12px 16px' }}>Current Price</th>
                    <th style={{ padding: '12px 16px' }}>Inventory Stock</th>
                    <th style={{ padding: '12px 16px' }}>Quick Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {restMenu.map(item => (
                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '600' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ width: '38px', height: '38px', borderRadius: '6px', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = '/images/biryani.jpg'; }}
                          />
                          <div>
                            <div>{item.name}</div>
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{item.spice || 'Mild'}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{item.category}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{
                          color: item.diet === 'veg' ? '#10B981' : '#EF4444',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          fontSize: '0.75rem'
                        }}>
                          {item.diet}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: '700' }}>
                        {editingPriceId === item.id ? (
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <span>₹</span>
                            <input 
                              type="number" 
                              value={newPrice} 
                              onChange={(e) => setNewPrice(e.target.value)}
                              style={{ width: '80px', padding: '4px 6px', background: 'var(--bg-main)', border: '1px solid var(--primary)', color: '#fff', borderRadius: '4px' }}
                            />
                            <button 
                              type="button" 
                              onClick={() => handleSavePrice(item.id)}
                              style={{ background: '#10B981', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}
                            >
                              ✓
                            </button>
                            <button 
                              type="button" 
                              onClick={() => setEditingPriceId(null)}
                              style={{ background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer' }}
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <span style={{ color: 'var(--primary)' }}>₹{item.price}</span>
                        )}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <button 
                          type="button"
                          onClick={() => handleToggleStock(item)}
                          style={{
                            background: item.available !== false ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)',
                            color: item.available !== false ? '#10B981' : '#EF4444',
                            border: `1px solid ${item.available !== false ? '#10B981' : '#EF4444'}`,
                            padding: '4px 12px',
                            borderRadius: 'var(--radius-full)',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            cursor: 'pointer'
                          }}
                        >
                          {item.available !== false ? '● In Stock' : '○ Out of Stock'}
                        </button>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <button 
                          type="button" 
                          onClick={() => {
                            setEditingPriceId(item.id);
                            setNewPrice(item.price);
                          }}
                          style={{
                            background: 'transparent',
                            border: '1px solid var(--border-color)',
                            color: 'var(--text-main)',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.75rem'
                          }}
                        >
                          <i className="fas fa-pencil"></i> Edit Price
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Add New Dish */}
        {showAddDishModal && (
          <div className="modal-overlay" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, padding: '20px' }}>
            <div style={{ background: 'var(--bg-card)', width: '100%', maxWidth: '480px', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>Add Dish to {currentRest.name}</h3>
                <button type="button" onClick={() => setShowAddDishModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
              </div>

              <form onSubmit={handleCreateDish}>
                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Dish Name</label>
                  <input 
                    type="text" 
                    required 
                    value={dishName} 
                    onChange={(e) => setDishName(e.target.value)}
                    placeholder="e.g. Special Zafrani Biryani"
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Category</label>
                    <select 
                      value={dishCategory} 
                      onChange={(e) => setDishCategory(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff' }}
                    >
                      <option value="Biryani & Rice">Biryani & Rice</option>
                      <option value="Starters & Kebabs">Starters & Kebabs</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Breads & Naans">Breads & Naans</option>
                      <option value="Desserts & Drinks">Desserts & Drinks</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Diet Type</label>
                    <select 
                      value={dishDiet} 
                      onChange={(e) => setDishDiet(e.target.value)}
                      style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff' }}
                    >
                      <option value="veg">Veg</option>
                      <option value="non-veg">Non-Veg</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Price (₹)</label>
                  <input 
                    type="number" 
                    required 
                    value={dishPrice} 
                    onChange={(e) => setDishPrice(e.target.value)}
                    placeholder="e.g. 299"
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff' }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px' }}>Description</label>
                  <textarea 
                    rows={2} 
                    value={dishDesc} 
                    onChange={(e) => setDishDesc(e.target.value)}
                    placeholder="Short description of the dish..."
                    style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: '#fff' }}
                  />
                </div>

                <button 
                  type="submit" 
                  style={{ width: '100%', padding: '12px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: '700', cursor: 'pointer' }}
                >
                  Save Dish
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}


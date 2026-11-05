import React, { useState } from 'react';

export default function DriverView({
  orders,
  onUpdateOrderStatus,
  currentUser,
  showToast
}) {
  const [driverStatus, setDriverStatus] = useState('online'); // 'online' or 'offline'
  const [driverEarnings, setDriverEarnings] = useState(1240);

  // Filter orders that are ready or in transit
  const deliveryOrders = orders.filter(o => 
    o.status === 'Ready for Pickup' || 
    o.status === 'On the Way' || 
    o.status === 'In Kitchen' ||
    o.status === 'Delivered'
  );

  const activeDeliveries = deliveryOrders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled');
  const completedDeliveries = deliveryOrders.filter(o => o.status === 'Delivered');

  const handleDeliver = (orderId) => {
    onUpdateOrderStatus(orderId, 'Delivered');
    setDriverEarnings(prev => prev + 120);
    showToast(`Order ${orderId} marked Delivered! ₹120 added to your payout.`, 'success');
  };

  const handlePickup = (orderId) => {
    onUpdateOrderStatus(orderId, 'On the Way');
    showToast(`Order ${orderId} picked up from restaurant! Delivery route started.`, 'info');
  };

  return (
    <main className="main-content">
      <div className="container" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
        
        {/* Driver Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.6rem',
              color: '#fff'
            }}>
              <i className="fas fa-motorcycle"></i>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: '800', margin: 0 }}>
                  {currentUser?.name || 'Alex Rider'}
                </h1>
                <span style={{
                  background: driverStatus === 'online' ? '#10B981' : '#64748B',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}>
                  {driverStatus === 'online' ? '● ONLINE' : '○ OFFLINE'}
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '4px 0 0' }}>
                Vehicle: EV Delivery Bike • KLU Campus Logistics Fleet • <i className="fas fa-star" style={{ color: '#FFB400' }}></i> 4.95 Rating
              </p>
            </div>
          </div>

          <button 
            type="button"
            onClick={() => {
              const nextStatus = driverStatus === 'online' ? 'offline' : 'online';
              setDriverStatus(nextStatus);
              showToast(`Driver status set to ${nextStatus.toUpperCase()}`, nextStatus === 'online' ? 'success' : 'info');
            }}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-sm)',
              background: driverStatus === 'online' ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
              border: `1px solid ${driverStatus === 'online' ? '#EF4444' : '#10B981'}`,
              color: driverStatus === 'online' ? '#EF4444' : '#10B981',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {driverStatus === 'online' ? 'Go Offline' : 'Go Online'}
          </button>
        </div>

        {/* KPIs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '18px',
          marginBottom: '30px'
        }}>
          <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '8px' }}>
              <i className="fas fa-wallet" style={{ color: '#10B981', marginRight: '6px' }}></i> TODAY'S PAYOUT
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10B981' }}>
              ₹{driverEarnings.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Base pay + ₹120 per trip</div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '8px' }}>
              <i className="fas fa-route" style={{ color: '#3B82F6', marginRight: '6px' }}></i> ACTIVE TRIPS
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#3B82F6' }}>
              {activeDeliveries.length}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Pickup or in transit</div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '8px' }}>
              <i className="fas fa-box-archive" style={{ color: '#8B5CF6', marginRight: '6px' }}></i> DELIVERIES TODAY
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#8B5CF6' }}>
              {completedDeliveries.length + 6}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Target: 15 for ₹300 bonus</div>
          </div>

          <div style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '8px' }}>
              <i className="fas fa-bolt" style={{ color: '#FFB400', marginRight: '6px' }}></i> ON-TIME SCORE
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#FFB400' }}>
              99.2%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Top Tier Delivery Partner</div>
          </div>
        </div>

        {/* Assigned Orders List */}
        <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '16px' }}>
          Active Delivery Queue ({activeDeliveries.length})
        </h2>

        {activeDeliveries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <i className="fas fa-motorcycle" style={{ fontSize: '3rem', opacity: 0.3, marginBottom: '14px' }}></i>
            <h3>No active deliveries right now</h3>
            <p style={{ color: 'var(--text-muted)' }}>When customers place orders, delivery requests will appear here for pickup.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
            {activeDeliveries.map(order => (
              <div 
                key={order.id} 
                style={{
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  padding: '20px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontWeight: '800', fontSize: '1.1rem' }}>{order.id}</span>
                  <span style={{
                    background: order.status === 'On the Way' ? 'rgba(0,166,153,0.18)' : 'rgba(255,180,0,0.18)',
                    color: order.status === 'On the Way' ? '#00A699' : '#FFB400',
                    padding: '3px 10px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '700'
                  }}>
                    {order.status}
                  </span>
                </div>

                {/* Pickup and Drop Route */}
                <div style={{ display: 'flex', gap: '14px', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--primary)' }}></div>
                    <div style={{ width: '2px', height: '36px', background: 'var(--border-color)', margin: '4px 0' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }}></div>
                  </div>
                  <div style={{ flex: 1, fontSize: '0.85rem' }}>
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>Pickup From</span>
                      <strong style={{ color: 'var(--text-main)' }}>{order.restaurantName || 'Restaurant'}</strong>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>Deliver To</span>
                      <strong style={{ color: 'var(--text-main)' }}>{order.customerName}</strong>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{order.address}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  {order.status === 'Ready for Pickup' && (
                    <button 
                      type="button"
                      onClick={() => handlePickup(order.id)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        background: '#00A699',
                        color: '#fff',
                        border: 'none',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-box-check" style={{ marginRight: '6px' }}></i> Confirm Pickup
                    </button>
                  )}

                  {order.status === 'On the Way' && (
                    <button 
                      type="button"
                      onClick={() => handleDeliver(order.id)}
                      style={{
                        flex: 1,
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        background: '#10B981',
                        color: '#fff',
                        border: 'none',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      <i className="fas fa-check-circle" style={{ marginRight: '6px' }}></i> Mark as Delivered
                    </button>
                  )}

                  {order.status === 'In Kitchen' && (
                    <div style={{ flex: 1, padding: '10px', textAlign: 'center', background: 'var(--bg-main)', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <i className="fas fa-hourglass-half" style={{ marginRight: '6px' }}></i> Kitchen is preparing...
                    </div>
                  )}

                  <a 
                    href={`tel:${order.phone || '9876543210'}`}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textDecoration: 'none'
                    }}
                    title="Call Customer"
                  >
                    <i className="fas fa-phone"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}


import React, { useState, useEffect } from 'react';
import { RESTAURANTS, FOOD_DATA, GLOBAL_ORDERS, DEFAULT_USERS } from './data/mockData';
import Header from './components/Header';
import CustomerView from './components/CustomerView';
import RestaurantAdminView from './components/RestaurantAdminView';
import DriverView from './components/DriverView';
import AuthModal from './components/AuthModal';
import FoodModal from './components/FoodModal';
import CartSidebar from './components/CartSidebar';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackerModal from './components/OrderTrackerModal';
import AddressModal from './components/AddressModal';
import Toast from './components/Toast';
import AuthPage from './components/AuthPage';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(() => localStorage.getItem('bitedash_theme') || 'dark');

  // Auth & User state
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('bitedash_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const stored = localStorage.getItem('bitedash_registered_users');
      return stored ? JSON.parse(stored) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  });

  // Current active role portal: 'customer' | 'restaurant' | 'driver'
  const [currentRole, setCurrentRole] = useState('customer');

  // Catalog data state
  const [restaurants] = useState(RESTAURANTS);
  const [foodData, setFoodData] = useState(() => {
    try {
      const stored = localStorage.getItem('bitedash_food_data');
      return stored ? JSON.parse(stored) : FOOD_DATA;
    } catch {
      return FOOD_DATA;
    }
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem('bitedash_orders');
      return stored ? JSON.parse(stored) : GLOBAL_ORDERS;
    } catch {
      return GLOBAL_ORDERS;
    }
  });

  // Customer navigation & filters
  const [activeRestaurant, setActiveRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('bitedash_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Favorites
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem('bitedash_favs');
      return stored ? JSON.parse(stored) : ['r1', 'r2'];
    } catch {
      return ['r1', 'r2'];
    }
  });

  // Delivery Address
  const [deliveryAddress, setDeliveryAddress] = useState(() => {
    return localStorage.getItem('bitedash_address') || 'Block-B Hostels, KLU Campus, Vaddeswaram';
  });
  const [deliveryLandmark, setDeliveryLandmark] = useState(() => {
    return localStorage.getItem('bitedash_landmark') || 'Near Lift / Security Desk';
  });

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutBill, setCheckoutBill] = useState({ itemTotal: 0, deliveryFee: 0, taxesAndCharges: 0, discount: 0, grandTotal: 0 });
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const handleDismissToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Sync Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bitedash_theme', theme);
  }, [theme]);

  // Sync Cart
  useEffect(() => {
    localStorage.setItem('bitedash_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync Orders
  useEffect(() => {
    localStorage.setItem('bitedash_orders', JSON.stringify(orders));
  }, [orders]);

  // Sync Favorites
  useEffect(() => {
    localStorage.setItem('bitedash_favs', JSON.stringify(favorites));
  }, [favorites]);

  // Sync Food Data
  useEffect(() => {
    localStorage.setItem('bitedash_food_data', JSON.stringify(foodData));
  }, [foodData]);

  // Sync Registered Users
  useEffect(() => {
    localStorage.setItem('bitedash_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Sync Current User
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('bitedash_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('bitedash_user');
    }
  }, [currentUser]);

  // Theme toggle
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Auth handlers
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    if (user.role === 'restaurant') {
      setCurrentRole('restaurant');
    } else if (user.role === 'driver') {
      setCurrentRole('driver');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRole('customer');
    showToast('Logged out successfully', 'info');
  };

  const handleRegisterUser = (newUser) => {
    setRegisteredUsers(prev => [...prev, newUser]);
  };

  // Address handlers
  const handleSaveAddress = (addr, lm) => {
    setDeliveryAddress(addr);
    setDeliveryLandmark(lm);
    localStorage.setItem('bitedash_address', addr);
    localStorage.setItem('bitedash_landmark', lm);
  };

  // Cart operations
  const handleAddToCart = (item, clearConflict = false) => {
    if (clearConflict) {
      setCart([item]);
      showToast(`Cart reset and ${item.name} added!`, 'success');
      return;
    }

    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.selectedSize === item.selectedSize);
      if (existing) {
        return prev.map(i => i === existing ? { ...i, qty: i.qty + item.qty } : i);
      }
      return [...prev, item];
    });
    showToast(`Added ${item.name} to cart!`, 'success');
  };

  const handleUpdateCartQty = (id, newQty) => {
    if (newQty <= 0) {
      setCart(prev => prev.filter(i => i.id !== id));
      showToast('Item removed from cart', 'info');
    } else {
      setCart(prev => prev.map(i => i.id === id ? { ...i, qty: newQty } : i));
    }
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Favorites
  const handleToggleFavorite = (restId) => {
    setFavorites(prev => {
      const exists = prev.includes(restId);
      const next = exists ? prev.filter(id => id !== restId) : [...prev, restId];
      showToast(exists ? 'Removed from favorites' : 'Saved to favorites ❤️', 'info');
      return next;
    });
  };

  // Order Operations
  const handlePlaceOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsTrackerOpen(true);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // Restaurant Admin Menu Handlers
  const handleUpdateFoodItem = (id, updates) => {
    setFoodData(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const handleAddFoodItem = (newItem) => {
    setFoodData(prev => [newItem, ...prev]);
  };

  // Active tracking order: first active placed order, or first overall order
  const activeTrackingOrder = orders.find(o => o.status !== 'Delivered' && o.status !== 'Cancelled') || orders[0];

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartRestaurantId = cart[0]?.restaurantId || null;
  const cartRestaurantName = cart[0]?.restaurantName || null;

  // Gate BiteDash: Ask user to Sign Up / Log In before entering main website
  if (!currentUser) {
    return (
      <div className="app-container" style={{ minHeight: '100vh' }}>
        <AuthPage 
          onLoginSuccess={handleLoginSuccess}
          registeredUsers={registeredUsers}
          onRegisterUser={handleRegisterUser}
          showToast={showToast}
        />
        <Toast toasts={toasts} onDismiss={handleDismissToast} />
      </div>
    );
  }

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Global Header */}
      <Header 
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        deliveryAddress={deliveryAddress}
        onOpenAddressModal={() => setIsAddressOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenTracker={() => setIsTrackerOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
        favoritesCount={favorites.length}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        showToast={showToast}
      />

      {/* Main Portals based on currentRole */}
      <div style={{ flex: 1 }}>
        {currentRole === 'customer' && (
          <CustomerView 
            restaurants={restaurants}
            foodData={foodData}
            activeRestaurant={activeRestaurant}
            setActiveRestaurant={setActiveRestaurant}
            searchQuery={searchQuery}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectFood={(item) => setSelectedFoodItem(item)}
            cart={cart}
            onUpdateCartQty={handleUpdateCartQty}
            showToast={showToast}
          />
        )}

        {currentRole === 'restaurant' && (
          <RestaurantAdminView 
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            foodData={foodData}
            onUpdateFoodItem={handleUpdateFoodItem}
            onAddFoodItem={handleAddFoodItem}
            restaurants={restaurants}
            showToast={showToast}
          />
        )}

        {currentRole === 'driver' && (
          <DriverView 
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            currentUser={currentUser}
            showToast={showToast}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="footer" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', padding: '40px 0 20px', marginTop: '40px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', marginBottom: '30px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <i className="fas fa-bolt"></i>
              </div>
              <strong style={{ fontSize: '1.2rem' }}>Bite<span>Dash</span></strong>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>
              React Vite Multi-Role Online Food Delivery & Logistics Architecture. Featuring complete LocalStorage authentication, customer ordering, restaurant admin portal, and live order tracking.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px' }}>Platform Modules</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentRole('customer'); }} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Customer Storefront</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentRole('restaurant'); }} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Restaurant Admin Portal</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentRole('driver'); }} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Delivery Partner Logistics</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setIsTrackerOpen(true); }} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Live Order GPS Tracker</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px' }}>Technical Evaluation</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>✓ React 19 + Vite HMR</li>
              <li>✓ LocalStorage Auth & Session</li>
              <li>✓ Multi-role Switcher (Admin/User/Rider)</li>
              <li>✓ Ready for Vercel / GitHub Pages</li>
            </ul>
          </div>
        </div>

        <div style={{ textAlign: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '20px', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
          © 2026 BiteDash • Online Food Delivery Project • All Rights Reserved.
        </div>
      </footer>

      {/* Modals & Drawers */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        registeredUsers={registeredUsers}
        onRegisterUser={handleRegisterUser}
        showToast={showToast}
      />

      <FoodModal 
        item={selectedFoodItem}
        onClose={() => setSelectedFoodItem(null)}
        onAddToCart={handleAddToCart}
        cartRestaurantId={cartRestaurantId}
        cartRestaurantName={cartRestaurantName}
      />

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onClearCart={handleClearCart}
        onProceedCheckout={(summary) => {
          setCheckoutBill(summary);
          setIsCheckoutOpen(true);
        }}
        showToast={showToast}
      />

      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        billSummary={checkoutBill}
        deliveryAddress={deliveryAddress}
        deliveryLandmark={deliveryLandmark}
        onPlaceOrder={handlePlaceOrder}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        showToast={showToast}
      />

      <OrderTrackerModal 
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        activeOrder={activeTrackingOrder}
        onUpdateStatus={handleUpdateOrderStatus}
        showToast={showToast}
      />

      <AddressModal 
        isOpen={isAddressOpen}
        onClose={() => setIsAddressOpen(false)}
        currentAddress={deliveryAddress}
        currentLandmark={deliveryLandmark}
        onSaveAddress={handleSaveAddress}
        showToast={showToast}
      />

      {/* Toast Alerts */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

    </div>
  );
}

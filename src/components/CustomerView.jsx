import React, { useState, useMemo } from 'react';

export default function CustomerView({
  restaurants,
  foodData,
  activeRestaurant,
  setActiveRestaurant,
  searchQuery,
  favorites,
  onToggleFavorite,
  onSelectFood,
  cart,
  onUpdateCartQty,
  showToast
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dietFilter, setDietFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popular');
  const [restaurantMenuSearch, setRestaurantMenuSearch] = useState('');

  const categories = [
    { id: 'all', label: 'All Cuisines', icon: 'fa-utensils' },
    { id: 'biryani', label: 'Biryani & Rice', icon: 'fa-bowl-rice' },
    { id: 'pizza', label: 'Pizza & Italian', icon: 'fa-pizza-slice' },
    { id: 'burger', label: 'Burgers & Fries', icon: 'fa-burger' },
    { id: 'sushi', label: 'Sushi & Asian', icon: 'fa-fish' },
    { id: 'healthy', label: 'Healthy Bowls', icon: 'fa-seedling' },
    { id: 'tacos', label: 'Mexican Tacos', icon: 'fa-pepper-hot' },
    { id: 'dessert', label: 'Desserts & Boba', icon: 'fa-cake-candles' },
    { id: 'north_indian', label: 'North Indian', icon: 'fa-fire-burner' },
    { id: 'south_indian', label: 'South Indian', icon: 'fa-mug-hot' },
    { id: 'chinese', label: 'Chinese & Momos', icon: 'fa-bowl-food' },
    { id: 'chaat', label: 'Chaat & Sweets', icon: 'fa-cookie' },
    { id: 'chai', label: 'Chai & Snacks', icon: 'fa-coffee' }
  ];

  // Filter restaurants
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r => {
      // Search query filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = r.name.toLowerCase().includes(q);
        const matchCuisine = r.cuisine.toLowerCase().includes(q);
        // Also check if any food in this restaurant matches
        const matchFood = foodData.some(f => f.restaurantId === r.id && (f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q)));
        if (!matchName && !matchCuisine && !matchFood) return false;
      }
      // Category filter
      if (selectedCategory !== 'all') {
        const cat = selectedCategory.toLowerCase();
        const matchCuisine = r.cuisine.toLowerCase().includes(cat);
        const matchFood = foodData.some(f => f.restaurantId === r.id && f.category.toLowerCase().includes(cat));
        if (!matchCuisine && !matchFood) return false;
      }
      // Rating filter
      if (minRating > 0 && r.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'time') return parseInt(a.time) - parseInt(b.time);
      if (sortBy === 'price') return parseInt(a.priceForTwo.replace(/\D/g, '')) - parseInt(b.priceForTwo.replace(/\D/g, ''));
      return 0; // Default popular
    });
  }, [restaurants, foodData, searchQuery, selectedCategory, minRating, sortBy]);

  // If in dedicated restaurant view:
  if (activeRestaurant) {
    const restaurantFoods = foodData.filter(item => {
      if (item.restaurantId !== activeRestaurant.id) return false;
      if (dietFilter !== 'all' && item.diet !== dietFilter) return false;
      if (restaurantMenuSearch) {
        const q = restaurantMenuSearch.toLowerCase();
        return item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q);
      }
      return true;
    });

    // Group foods by category
    const groupedMenu = restaurantFoods.reduce((acc, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    }, {});

    return (
      <main className="main-content">
        <div className="container" style={{ paddingTop: '20px' }}>
          
          {/* Breadcrumb / Back Navigation */}
          <div style={{ marginBottom: '20px' }}>
            <button 
              type="button" 
              className="back-btn" 
              onClick={() => setActiveRestaurant(null)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              <i className="fas fa-arrow-left"></i> Back to All Restaurants
            </button>
          </div>

          {/* Restaurant Showcase Header */}
          <div className="restaurant-header-card" style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            marginBottom: '30px'
          }}>
            <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
              <img 
                src={activeRestaurant.image} 
                alt={activeRestaurant.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = '/images/biryani.jpg'; }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(11,15,25,0.95) 10%, rgba(11,15,25,0.4) 60%, transparent)'
              }}></div>
              
              <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <span className="badge-featured" style={{ background: 'var(--primary)', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '700' }}>
                    {activeRestaurant.badge}
                  </span>
                  <h1 style={{ fontSize: '2rem', fontWeight: '800', margin: '8px 0 4px', color: '#fff' }}>
                    {activeRestaurant.name}
                  </h1>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
                    {activeRestaurant.tagline} • <span style={{ color: 'var(--text-dim)' }}>{activeRestaurant.cuisine}</span>
                  </p>
                  <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', margin: '4px 0 0' }}>
                    <i className="fas fa-location-dot" style={{ color: 'var(--primary)', marginRight: '6px' }}></i>
                    {activeRestaurant.location} • {activeRestaurant.distance} away
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(0,0,0,0.6)', padding: '12px 18px', borderRadius: 'var(--radius-md)', backdropFilter: 'blur(8px)' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#10B981' }}>
                      <i className="fas fa-star" style={{ color: '#FFB400', marginRight: '4px' }}></i>{activeRestaurant.rating}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{activeRestaurant.reviews}</div>
                  </div>
                  <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.2)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{activeRestaurant.time}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Delivery Time</div>
                  </div>
                  <div style={{ width: '1px', height: '30px', background: 'rgba(255,255,255,0.2)' }}></div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{activeRestaurant.priceForTwo}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Cost for Two</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Offer bar */}
            {activeRestaurant.offer && (
              <div style={{ background: 'var(--primary-light)', padding: '10px 24px', borderTop: '1px solid rgba(255,90,95,0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-tag" style={{ color: 'var(--primary)' }}></i>
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary)' }}>{activeRestaurant.offer}</span>
              </div>
            )}
          </div>

          {/* Menu Search and Diet Filters */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', marginBottom: '25px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button 
                type="button" 
                className={`filter-btn ${dietFilter === 'all' ? 'active' : ''}`}
                onClick={() => setDietFilter('all')}
              >
                All Items ({foodData.filter(f => f.restaurantId === activeRestaurant.id).length})
              </button>
              <button 
                type="button" 
                className={`filter-btn ${dietFilter === 'veg' ? 'active' : ''}`}
                onClick={() => setDietFilter('veg')}
                style={{ borderColor: dietFilter === 'veg' ? '#10B981' : undefined }}
              >
                <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', marginRight: '6px' }}></span>
                Pure Veg
              </button>
              <button 
                type="button" 
                className={`filter-btn ${dietFilter === 'non-veg' ? 'active' : ''}`}
                onClick={() => setDietFilter('non-veg')}
                style={{ borderColor: dietFilter === 'non-veg' ? '#EF4444' : undefined }}
              >
                <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444', marginRight: '6px' }}></span>
                Non-Veg
              </button>
            </div>

            <div style={{ position: 'relative', minWidth: '260px' }}>
              <i className="fas fa-search" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
              <input 
                type="text" 
                placeholder="Search dish in this menu..." 
                value={restaurantMenuSearch}
                onChange={(e) => setRestaurantMenuSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem'
                }}
              />
            </div>
          </div>

          {/* Grouped Dishes */}
          {Object.keys(groupedMenu).length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <i className="fas fa-utensils" style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.4 }}></i>
              <h3>No matching dishes found in this menu</h3>
              <p>Try clearing your search or filter</p>
            </div>
          ) : (
            Object.entries(groupedMenu).map(([category, items]) => (
              <section key={category} style={{ marginBottom: '35px' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{category}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '500', color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '2px 8px', borderRadius: '12px' }}>
                    {items.length}
                  </span>
                </h2>

                <div className="food-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '20px'
                }}>
                  {items.map(item => {
                    const cartItem = cart.find(c => c.id === item.id);
                    return (
                      <div 
                        key={item.id} 
                        className="food-card"
                        style={{
                          background: 'var(--bg-card)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-color)',
                          padding: '16px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          gap: '16px',
                          transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span 
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '16px',
                                height: '16px',
                                border: `2px solid ${item.diet === 'veg' ? '#10B981' : '#EF4444'}`,
                                borderRadius: '3px'
                              }}
                            >
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.diet === 'veg' ? '#10B981' : '#EF4444' }}></span>
                            </span>
                            {item.spice && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.spice}</span>}
                          </div>

                          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: '0 0 6px' }}>{item.name}</h3>
                          
                          <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '8px' }}>
                            ₹{item.price}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                            <span style={{ color: '#FFB400', fontWeight: '700' }}>
                              <i className="fas fa-star" style={{ marginRight: '3px' }}></i>{item.rating}
                            </span>
                            <span>({item.reviews})</span>
                            {item.calories && <span>• {item.calories}</span>}
                          </div>

                          <p style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-muted)',
                            margin: 0,
                            lineHeight: '1.4',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {item.description}
                          </p>
                        </div>

                        <div style={{ width: '120px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{ width: '120px', height: '100px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', position: 'relative', marginBottom: '8px' }}>
                            <img 
                              src={item.image} 
                              alt={item.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              onError={(e) => { e.target.src = '/images/biryani.jpg'; }}
                            />
                            {item.sizes && item.sizes.length > 1 && (
                              <span style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: '0.65rem', padding: '2px 5px', borderRadius: '4px' }}>
                                Customizable
                              </span>
                            )}
                          </div>

                          {cartItem ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--primary)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', color: '#fff', fontWeight: '700' }}>
                              <button 
                                type="button" 
                                onClick={() => onUpdateCartQty(item.id, cartItem.qty - 1)}
                                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}
                              >
                                -
                              </button>
                              <span>{cartItem.qty}</span>
                              <button 
                                type="button" 
                                onClick={() => onUpdateCartQty(item.id, cartItem.qty + 1)}
                                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '0.9rem' }}
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button 
                              type="button" 
                              className="add-to-cart-btn"
                              onClick={() => onSelectFood(item)}
                              style={{
                                width: '100%',
                                padding: '6px 12px',
                                borderRadius: 'var(--radius-sm)',
                                background: 'var(--bg-main)',
                                border: '1px solid var(--primary)',
                                color: 'var(--primary)',
                                fontWeight: '700',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              ADD +
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            ))
          )}
        </div>
      </main>
    );
  }

  // Otherwise: Display All Restaurants Showcase
  return (
    <main className="main-content">
      <div className="container">
        
        {/* Hero Section */}
        <section className="hero-banner" style={{
          background: 'linear-gradient(135deg, rgba(255,90,95,0.18) 0%, rgba(11,15,25,0.95) 75%), var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '40px 30px',
          margin: '24px 0 30px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: '650px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.8rem',
              fontWeight: '700',
              marginBottom: '14px'
            }}>
              <i className="fas fa-graduation-cap"></i> KLU Campus Exclusive Fast Delivery
            </span>
            <h1 style={{ fontSize: '2.4rem', fontWeight: '800', lineHeight: '1.2', margin: '0 0 12px' }}>
              Craving Delicious Food Delivered In Minutes? ⚡
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', margin: '0 0 20px' }}>
              Order royal Hyderabadi biryani, hand-tossed artisan pizzas, juicy burgers, sushi and quick snacks from top local campus kitchens with live GPS-style tracking.
            </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '0.85rem' }}>
                <i className="fas fa-clock" style={{ color: 'var(--primary)' }}></i> Average 20-30 mins
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '0.85rem' }}>
                <i className="fas fa-shield-halved" style={{ color: '#10B981' }}></i> 100% Hygienic Food
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)', fontSize: '0.85rem' }}>
                <i className="fas fa-bolt" style={{ color: '#FFB400' }}></i> Scheduled Slots Available
              </div>
            </div>
          </div>
        </section>

        {/* Categories Bar */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '14px' }}>Inspiration for your first order</h2>
          <div className="categories-scroll" style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '8px',
            scrollbarWidth: 'thin'
          }}>
            {categories.map(cat => (
              <button 
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  background: selectedCategory === cat.id ? 'var(--primary)' : 'var(--bg-card)',
                  color: selectedCategory === cat.id ? '#fff' : 'var(--text-main)',
                  border: `1px solid ${selectedCategory === cat.id ? 'var(--primary)' : 'var(--border-color)'}`,
                  fontWeight: '600',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <i className={`fas ${cat.icon}`}></i>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filter & Sort Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          marginBottom: '25px',
          padding: '12px 18px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>
              Filters:
            </span>
            <button 
              type="button" 
              className={`filter-btn ${minRating === 4.5 ? 'active' : ''}`}
              onClick={() => setMinRating(minRating === 4.5 ? 0 : 4.5)}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                border: '1px solid var(--border-color)',
                background: minRating === 4.5 ? 'var(--primary-light)' : 'transparent',
                color: minRating === 4.5 ? 'var(--primary)' : 'var(--text-main)',
                cursor: 'pointer'
              }}
            >
              <i className="fas fa-star" style={{ color: '#FFB400', marginRight: '4px' }}></i> Rating 4.5+
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Sort by:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: 'var(--bg-main)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-color)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <option value="popular">Popularity</option>
              <option value="rating">Rating: High to Low</option>
              <option value="time">Fastest Delivery</option>
              <option value="price">Cost for Two</option>
            </select>
          </div>
        </div>

        {/* Restaurants Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
            Top Restaurants Near You ({filteredRestaurants.length})
          </h2>
          {searchQuery && (
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Showing results for "<strong>{searchQuery}</strong>"
            </span>
          )}
        </div>

        {/* Restaurants Grid */}
        {filteredRestaurants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
            <i className="fas fa-search" style={{ fontSize: '3rem', marginBottom: '15px', opacity: 0.4 }}></i>
            <h3>No restaurants matched your filters</h3>
            <p>Try resetting the cuisine or rating filter.</p>
          </div>
        ) : (
          <div className="restaurant-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {filteredRestaurants.map(r => {
              const isFav = favorites.includes(r.id);
              return (
                <div 
                  key={r.id} 
                  className="restaurant-card"
                  onClick={() => setActiveRestaurant(r)}
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                    position: 'relative'
                  }}
                >
                  {/* Card Image */}
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    <img 
                      src={r.image} 
                      alt={r.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/images/biryani.jpg'; }}
                    />
                    
                    {/* Badge */}
                    {r.badge && (
                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: 'rgba(11,15,25,0.85)',
                        backdropFilter: 'blur(6px)',
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-sm)'
                      }}>
                        {r.badge}
                      </span>
                    )}

                    {/* Favorite Heart Button */}
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(r.id);
                      }}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: 'rgba(11,15,25,0.7)',
                        backdropFilter: 'blur(6px)',
                        border: 'none',
                        color: isFav ? 'var(--primary)' : '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '0.95rem'
                      }}
                    >
                      <i className={isFav ? 'fas fa-heart' : 'far fa-heart'}></i>
                    </button>

                    {/* Gradient Offer Bar */}
                    {r.offer && (
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                        padding: '8px 14px',
                        color: '#fff',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <i className="fas fa-tag" style={{ color: 'var(--secondary)' }}></i>
                        <span>{r.offer}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: '700', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {r.name}
                      </h3>
                      <div style={{
                        background: '#10B981',
                        color: '#fff',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        flexShrink: 0
                      }}>
                        <span>{r.rating}</span>
                        <i className="fas fa-star" style={{ fontSize: '0.65rem' }}></i>
                      </div>
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '0 0 10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {r.cuisine}
                    </p>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.8rem',
                      color: 'var(--text-dim)',
                      borderTop: '1px solid var(--border-color)',
                      paddingTop: '10px'
                    }}>
                      <span><i className="fas fa-clock" style={{ marginRight: '4px' }}></i>{r.time}</span>
                      <span>•</span>
                      <span><i className="fas fa-location-dot" style={{ marginRight: '4px' }}></i>{r.distance}</span>
                      <span>•</span>
                      <span>{r.priceForTwo}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}


/**
 * BiteDash - Complete Multi-Role Online Food Delivery & Logistics Platform
 * Zomato & Swiggy Model: Dedicated Restaurant Menu View, Items, Search & Filters
 * 100% Pure Vanilla JavaScript (ES6) + GSAP Animations
 */

// 7 Authentic Local Restaurants
const RESTAURANTS = [
  {
    id: "r1",
    name: "Bawarchi Dum Biryani House",
    tagline: "Authentic Hyderabadi Royal Dum Biryani & Kebabs",
    cuisine: "Hyderabadi • Mughlai • Biryani",
    rating: 4.9,
    reviews: "1.2K+ ratings",
    time: "25-30 mins",
    distance: "1.8 km",
    priceForTwo: "₹350 for two",
    location: "KLU High Road, Vaddeswaram",
    image: "images/biryani.jpg",
    badge: "⭐ Bestseller",
    offer: "Flat 50% OFF up to ₹100 | Use code FEAST50"
  },
  {
    id: "r2",
    name: "Milano Woodfired Pizzeria",
    tagline: "Hand-crafted Neapolitan Sourdough Pizzas & Pasta",
    cuisine: "Italian • Gourmet Pizzas • Pasta",
    rating: 4.8,
    reviews: "850+ ratings",
    time: "20-25 mins",
    distance: "2.2 km",
    priceForTwo: "₹450 for two",
    location: "Main Street, Vaddeswaram",
    image: "images/pizza.jpg",
    badge: "🍕 40% OFF",
    offer: "Flat ₹75 OFF on orders above ₹299 | Use PIZZA75"
  },
  {
    id: "r3",
    name: "The Smash Burger Garage",
    tagline: "Juicy Smashed Angus Burgers & Crispy Loaded Fries",
    cuisine: "American • Fast Food • Shakes",
    rating: 4.7,
    reviews: "640+ ratings",
    time: "15-20 mins",
    distance: "1.2 km",
    priceForTwo: "₹300 for two",
    location: "Campus North Gate, KLU",
    image: "images/burger.jpg",
    badge: "🔥 Trending",
    offer: "Free Peri-Peri Fries on orders above ₹399"
  },
  {
    id: "r4",
    name: "Sakura Tokyo Sushi Bar",
    tagline: "Premium Fresh Sashimi, Nigiri & Dragon Rolls",
    cuisine: "Japanese • Asian Fusion • Sushi",
    rating: 4.9,
    reviews: "410+ ratings",
    time: "25-30 mins",
    distance: "3.1 km",
    priceForTwo: "₹600 for two",
    location: "Tech City Avenue",
    image: "images/sushi.jpg",
    badge: "🍣 Chef Special",
    offer: "Flat 20% OFF on all Sushi Platters"
  },
  {
    id: "r5",
    name: "Pure Green Buddha Bowls",
    tagline: "Organic Quinoa, Fresh Salads & Protein Bowls",
    cuisine: "Healthy • Vegan • Organic Bowls",
    rating: 4.8,
    reviews: "320+ ratings",
    time: "15-20 mins",
    distance: "0.9 km",
    priceForTwo: "₹280 for two",
    location: "Green Fields Block, Vaddeswaram",
    image: "images/healthy_bowl.jpg",
    badge: "🥦 100% Organic",
    offer: "Guilt-free dining: Free Green Detox Juice with Bowls"
  },
  {
    id: "r6",
    name: "El Cantina Street Tacos",
    tagline: "Fiesta Tacos, Guacamole, Quesadillas & Nachos",
    cuisine: "Mexican • Street Food • Tacos",
    rating: 4.7,
    reviews: "510+ ratings",
    time: "20-25 mins",
    distance: "2.0 km",
    priceForTwo: "₹260 for two",
    location: "Food Street Corner",
    image: "images/tacos.jpg",
    badge: "🌮 Street Fav",
    offer: "Buy 3 Tacos Get 1 Free Drink"
  },
  {
    id: "r7",
    name: "Velvet Chocolate Cafe & Boba",
    tagline: "Molten Lava Cakes, Artisan Boba Tea & Waffles",
    cuisine: "Desserts • Beverages • Boba Tea",
    rating: 4.9,
    reviews: "1.5K+ ratings",
    time: "10-15 mins",
    distance: "1.1 km",
    priceForTwo: "₹220 for two",
    location: "Central Library Road",
    image: "images/dessert.jpg",
    badge: "🍰 Popular",
    offer: "Flat 50% OFF up to ₹100 | Use code FEAST50"
  },
  {
    id: "r8",
    name: "Punjab Grill & Tandoor Express",
    tagline: "Slow-cooked Butter Chicken, Dal Makhani & Tandoori Naans",
    cuisine: "North Indian • Mughlai • Tandoor",
    rating: 4.8,
    reviews: "2.8K+ ratings",
    time: "25-30 mins",
    distance: "2.4 km",
    priceForTwo: "₹450 for two",
    location: "Sector 4, Main Highway",
    image: "images/north_indian.jpg",
    badge: "🔥 Tandoor Master",
    offer: "Flat 40% OFF up to ₹120 | Use code PUNJAB40"
  },
  {
    id: "r9",
    name: "Madras Tiffin Room (MTR 1924)",
    tagline: "Authentic Ghee Roast Dosas, Steaming Idlis & Degree Filter Coffee",
    cuisine: "South Indian • Tiffin • Breakfast",
    rating: 4.9,
    reviews: "4.1K+ ratings",
    time: "15-20 mins",
    distance: "1.2 km",
    priceForTwo: "₹200 for two",
    location: "Temple Ring Road",
    image: "images/south_indian.jpg",
    badge: "🌟 Heritage Legend",
    offer: "Complimentary Filter Coffee with any Special Dosa"
  },
  {
    id: "r10",
    name: "Wok & Roll Asian Street",
    tagline: "Fiery Schezwan Noodles, Steamed Momos & Crispy Manchurian",
    cuisine: "Chinese • Asian • Dim Sum",
    rating: 4.7,
    reviews: "1.9K+ ratings",
    time: "20-25 mins",
    distance: "1.8 km",
    priceForTwo: "₹300 for two",
    location: "Metro Station Gate 2",
    image: "images/chinese.jpg",
    badge: "🥟 Street Craving",
    offer: "Free Veg Spring Rolls on orders above ₹299"
  },
  {
    id: "r11",
    name: "Haldiram's Sweets & Chaat Express",
    tagline: "Delhi Raj Kachori, Crisp Pani Puri, Pav Bhaji & Royal Mithai",
    cuisine: "Chaat • Street Food • North Indian",
    rating: 4.8,
    reviews: "3.4K+ ratings",
    time: "15-20 mins",
    distance: "1.5 km",
    priceForTwo: "₹240 for two",
    location: "Grand Mall Food Court",
    image: "images/chaat.jpg",
    badge: "👑 Chaat King",
    offer: "Flat 20% OFF on all Chaat & Sweets | Code CHAAT20"
  },
  {
    id: "r12",
    name: "Chai Point & Irani Chai Bakery",
    tagline: "Kadak Irani Chai, Maskabun, Osmania Biscuits & Fresh Puffs",
    cuisine: "Beverages • Snacks • Bakery",
    rating: 4.9,
    reviews: "2.1K+ ratings",
    time: "10-15 mins",
    distance: "0.8 km",
    priceForTwo: "₹150 for two",
    location: "Campus Main Gate",
    image: "images/chai.jpg",
    badge: "☕ Campus Hangout",
    offer: "Bun Maska + Irani Chai Combo at just ₹79"
  }
];

// Rich Food Catalog for each Restaurant
let FOOD_DATA = [
  // --- Bawarchi Dum Biryani House (r1) ---
  {
    id: 101,
    restaurantId: "r1",
    restaurantName: "Bawarchi Dum Biryani House",
    name: "Hyderabadi Chicken Dum Biryani",
    category: "Biryani & Rice",
    price: 349,
    rating: 4.9,
    reviews: 640,
    prepTime: "25-30 min",
    calories: "780 kcal",
    diet: "non-veg",
    spice: "🌶️🌶️ Spicy",
    available: true,
    image: "images/biryani.jpg",
    description: "Slow-cooked long grain basmati rice layered with succulent marinated chicken, saffron, fried onions, and whole spices. Served with fresh cucumber raita.",
    sizes: [{ name: "Half Portioned", price: -80 }, { name: "Full Pot (Original)", price: 0 }, { name: "Jumbo Handi", price: 250 }],
    toppings: [{ name: "Extra Raita Bowl", price: 25 }, { name: "Double Boiled Egg", price: 30 }]
  },
  {
    id: 102,
    restaurantId: "r1",
    restaurantName: "Bawarchi Dum Biryani House",
    name: "Royal Mutton Dum Biryani",
    category: "Biryani & Rice",
    price: 449,
    rating: 5.0,
    reviews: 420,
    prepTime: "30-35 min",
    calories: "890 kcal",
    diet: "non-veg",
    spice: "🌶️🌶️ Spicy",
    available: true,
    image: "images/biryani.jpg",
    description: "Tender chunks of young mutton cooked in aromatic spices and dum-steamed with saffron basmati rice.",
    sizes: [{ name: "Standard Full", price: 0 }],
    toppings: [{ name: "Extra Salan Gravy", price: 30 }]
  },
  {
    id: 103,
    restaurantId: "r1",
    restaurantName: "Bawarchi Dum Biryani House",
    name: "Shahi Paneer Tikka Biryani",
    category: "Biryani & Rice",
    price: 289,
    rating: 4.8,
    reviews: 210,
    prepTime: "20-25 min",
    calories: "680 kcal",
    diet: "veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/biryani.jpg",
    description: "Fresh cottage cheese cubes marinated in tandoori spices, charcoal-grilled and layered with spiced rice.",
    sizes: [{ name: "Standard Pot", price: 0 }],
    toppings: [{ name: "Extra Raita", price: 25 }]
  },
  {
    id: 104,
    restaurantId: "r1",
    restaurantName: "Bawarchi Dum Biryani House",
    name: "Nawabi Chicken Handi Biryani",
    category: "Biryani & Rice",
    price: 399,
    rating: 4.9,
    reviews: 310,
    prepTime: "25-30 min",
    calories: "820 kcal",
    diet: "non-veg",
    spice: "🌶️🌶️ Spicy",
    available: true,
    image: "images/biryani.jpg",
    description: "Chef's signature clay handi dum biryani with tender chicken drumsticks, caramelized onions, and royal kewra fragrance.",
    sizes: [{ name: "Clay Handi (Full)", price: 0 }, { name: "Mega Handi", price: 180 }],
    toppings: [{ name: "Roasted Cashews", price: 40 }]
  },
  {
    id: 105,
    restaurantId: "r1",
    restaurantName: "Bawarchi Dum Biryani House",
    name: "Tandoori Murgh Tikka (6 Pcs)",
    category: "Starters & Kebabs",
    price: 299,
    rating: 4.8,
    reviews: 280,
    prepTime: "20 min",
    calories: "520 kcal",
    diet: "non-veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/kebab.jpg",
    description: "Boneless chicken morsels steeped in spiced Greek yogurt marinade with mustard oil, roasted crisp in charcoal tandoor.",
    sizes: [{ name: "6 Pieces", price: 0 }, { name: "12 Pieces Platter", price: 240 }],
    toppings: [{ name: "Mint Garlic Chutney", price: 20 }]
  },
  {
    id: 106,
    restaurantId: "r1",
    restaurantName: "Bawarchi Dum Biryani House",
    name: "Hyderabadi Crispy Chicken 65",
    category: "Starters & Kebabs",
    price: 269,
    rating: 4.9,
    reviews: 390,
    prepTime: "15 min",
    calories: "560 kcal",
    diet: "non-veg",
    spice: "🌶️🌶️ Fiery",
    available: true,
    image: "images/fried_chicken.jpg",
    description: "Crunchy batter-fried spicy boneless chicken wok-tossed with fresh curry leaves, crushed garlic, and green chilies.",
    sizes: [{ name: "Standard Plate", price: 0 }],
    toppings: [{ name: "Extra Fried Curry Leaves & Onion", price: 15 }]
  },
  {
    id: 107,
    restaurantId: "r1",
    restaurantName: "Bawarchi Dum Biryani House",
    name: "Garlic Butter Naan with Dal Makhani",
    category: "Breads & Curries",
    price: 199,
    rating: 4.8,
    reviews: 240,
    prepTime: "15-20 min",
    calories: "620 kcal",
    diet: "veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/curry_naan.jpg",
    description: "Two freshly baked tandoor garlic naans brushed with pure butter, served with 12-hour slow-cooked black lentil Dal Makhani.",
    sizes: [{ name: "Combo (2 Naans + Dal)", price: 0 }, { name: "Double Combo (4 Naans)", price: 120 }],
    toppings: [{ name: "Extra Butter Swirl", price: 25 }]
  },
  {
    id: 108,
    restaurantId: "r1",
    restaurantName: "Bawarchi Dum Biryani House",
    name: "Shahi Gulab Jamun with Rabri",
    category: "Desserts",
    price: 129,
    rating: 4.9,
    reviews: 410,
    prepTime: "5 min",
    calories: "380 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/indian_sweets.jpg",
    description: "Warm, melt-in-mouth cottage cheese and mawa dumplings dipped in rose-cardamom syrup, served over rich saffron rabri.",
    sizes: [{ name: "2 Pcs with Rabri", price: 0 }, { name: "4 Pcs Box", price: 80 }],
    toppings: []
  },

  // --- Milano Woodfired Pizzeria (r2) ---
  {
    id: 201,
    restaurantId: "r2",
    restaurantName: "Milano Woodfired Pizzeria",
    name: "Artisan Pepperoni & Basil Pizza",
    category: "Woodfired Pizzas",
    price: 399,
    rating: 4.9,
    reviews: 510,
    prepTime: "20-25 min",
    calories: "850 kcal",
    diet: "non-veg",
    spice: "🌶️ Mild",
    available: true,
    image: "images/pizza.jpg",
    description: "Hand-stretched sourdough base with San Marzano tomato sauce, fresh mozzarella, cured pepperoni, and garden basil.",
    sizes: [{ name: 'Regular (10")', price: 0 }, { name: 'Medium (12")', price: 60 }, { name: 'Large (14")', price: 100 }],
    toppings: [{ name: "Extra Mozzarella", price: 40 }, { name: "Truffle Oil", price: 50 }]
  },
  {
    id: 202,
    restaurantId: "r2",
    restaurantName: "Milano Woodfired Pizzeria",
    name: "Classic Margherita D.O.P",
    category: "Woodfired Pizzas",
    price: 299,
    rating: 4.8,
    reviews: 320,
    prepTime: "15-20 min",
    calories: "650 kcal",
    diet: "veg",
    spice: "🟢 Gentle",
    available: true,
    image: "images/pizza.jpg",
    description: "Simple Italian perfection: San Marzano tomato sauce, creamy fior di latte mozzarella, extra virgin olive oil, and basil.",
    sizes: [{ name: 'Regular (10")', price: 0 }, { name: 'Medium (12")', price: 60 }],
    toppings: [{ name: "Extra Cheese", price: 40 }]
  },
  {
    id: 203,
    restaurantId: "r2",
    restaurantName: "Milano Woodfired Pizzeria",
    name: "Truffle Wild Mushroom Pizza",
    category: "Woodfired Pizzas",
    price: 369,
    rating: 4.9,
    reviews: 180,
    prepTime: "20 min",
    calories: "720 kcal",
    diet: "veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/pizza.jpg",
    description: "Roasted shiitake and button mushrooms with white garlic cream base, fontina cheese, and black truffle oil drizzle.",
    sizes: [{ name: 'Regular (10")', price: 0 }, { name: 'Large (14")', price: 100 }],
    toppings: [{ name: "Extra Truffle Drizzle", price: 50 }]
  },
  {
    id: 204,
    restaurantId: "r2",
    restaurantName: "Milano Woodfired Pizzeria",
    name: "Quattro Formaggi (Four Cheese Pizza)",
    category: "Woodfired Pizzas",
    price: 389,
    rating: 4.8,
    reviews: 260,
    prepTime: "20 min",
    calories: "820 kcal",
    diet: "veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/pizza.jpg",
    description: "A decadent blend of mozzarella, gorgonzola, aged parmesan, and ricotta cheese on thin crust with a touch of wild honey.",
    sizes: [{ name: 'Regular (10")', price: 0 }, { name: 'Medium (12")', price: 70 }],
    toppings: [{ name: "Hot Honey Drizzle", price: 30 }]
  },
  {
    id: 205,
    restaurantId: "r2",
    restaurantName: "Milano Woodfired Pizzeria",
    name: "Smoky BBQ Chicken & Jalapeño Pizza",
    category: "Woodfired Pizzas",
    price: 419,
    rating: 4.9,
    reviews: 340,
    prepTime: "22 min",
    calories: "880 kcal",
    diet: "non-veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/pizza.jpg",
    description: "Tender hickory BBQ chicken strips, red onions, pickled jalapeños, melted mozzarella, and smoked paprika swirl.",
    sizes: [{ name: 'Regular (10")', price: 0 }, { name: 'Medium (12")', price: 70 }, { name: 'Large (14")', price: 120 }],
    toppings: [{ name: "Extra BBQ Drizzle", price: 25 }]
  },
  {
    id: 206,
    restaurantId: "r2",
    restaurantName: "Milano Woodfired Pizzeria",
    name: "Creamy Penne Alfredo con Pollo",
    category: "Handmade Pastas",
    price: 329,
    rating: 4.7,
    reviews: 290,
    prepTime: "18 min",
    calories: "740 kcal",
    diet: "non-veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/pasta.jpg",
    description: "Artisan penne pasta smothered in roasted garlic parmesan cream sauce, tossed with herb-grilled chicken breast.",
    sizes: [{ name: "Single Bowl", price: 0 }, { name: "Family Portion", price: 150 }],
    toppings: [{ name: "Garlic Bread (2 Pcs)", price: 45 }]
  },
  {
    id: 207,
    restaurantId: "r2",
    restaurantName: "Milano Woodfired Pizzeria",
    name: "Cheesy Garlic Pull-Apart Bread",
    category: "Sides & Starters",
    price: 179,
    rating: 4.9,
    reviews: 380,
    prepTime: "12 min",
    calories: "480 kcal",
    diet: "veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/curry_naan.jpg",
    description: "Fresh woodfired sourdough loaf scored and loaded with melted mozzarella, roasted garlic butter, and fresh rosemary.",
    sizes: [{ name: "Loaf (Serves 2)", price: 0 }],
    toppings: [{ name: "Marinara Dip", price: 25 }]
  },
  {
    id: 208,
    restaurantId: "r2",
    restaurantName: "Milano Woodfired Pizzeria",
    name: "Classic Italian Tiramisu",
    category: "Sides & Starters",
    price: 189,
    rating: 5.0,
    reviews: 410,
    prepTime: "5 min",
    calories: "410 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/dessert.jpg",
    description: "Espresso-soaked Italian ladyfinger biscuits layered with silky mascarpone cream, finished with Valrhona cocoa powder.",
    sizes: [{ name: "Glass Cup (150g)", price: 0 }],
    toppings: []
  },

  // --- The Smash Burger Garage (r3) ---
  {
    id: 301,
    restaurantId: "r3",
    restaurantName: "The Smash Burger Garage",
    name: "Supreme Double Smash Burger",
    category: "Smash Burgers",
    price: 299,
    rating: 4.8,
    reviews: 430,
    prepTime: "15-20 min",
    calories: "920 kcal",
    diet: "non-veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/burger.jpg",
    description: "Two crispy-edged Angus beef smash patties, melted cheddar, caramelized onions, smoked bacon, and house secret sauce on brioche.",
    sizes: [{ name: "Single Patty", price: -50 }, { name: "Double Patty (Original)", price: 0 }, { name: "Triple Monster", price: 90 }],
    toppings: [{ name: "Extra Smoked Bacon", price: 45 }, { name: "Avocado Slices", price: 35 }]
  },
  {
    id: 302,
    restaurantId: "r3",
    restaurantName: "The Smash Burger Garage",
    name: "Crispy Peri-Peri Chicken Burger",
    category: "Smash Burgers",
    price: 259,
    rating: 4.7,
    reviews: 290,
    prepTime: "15 min",
    calories: "780 kcal",
    diet: "non-veg",
    spice: "🌶️🌶️ Hot",
    available: true,
    image: "images/burger.jpg",
    description: "Golden buttermilk fried chicken thigh tossed in fiery peri-peri seasoning with crunchy slaw and pickled jalapeños.",
    sizes: [{ name: "Standard", price: 0 }, { name: "Meal with Fries & Coke", price: 90 }],
    toppings: [{ name: "Extra Cheese Slice", price: 30 }]
  },
  {
    id: 303,
    restaurantId: "r3",
    restaurantName: "The Smash Burger Garage",
    name: "Loaded Truffle Cheese Fries",
    category: "Sides & Shakes",
    price: 179,
    rating: 4.9,
    reviews: 350,
    prepTime: "10 min",
    calories: "450 kcal",
    diet: "veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/fries.jpg",
    description: "Crispy skin-on french fries drenched in warm cheddar cheese sauce, parmesan dusting, and truffle mayo.",
    sizes: [{ name: "Regular Box", price: 0 }, { name: "Jumbo Bucket", price: 70 }],
    toppings: [{ name: "Bacon Bits Topping", price: 35 }]
  },
  {
    id: 304,
    restaurantId: "r3",
    restaurantName: "The Smash Burger Garage",
    name: "BBQ Bacon Beast Triple Burger",
    category: "Smash Burgers",
    price: 369,
    rating: 4.9,
    reviews: 310,
    prepTime: "18 min",
    calories: "1050 kcal",
    diet: "non-veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/burger.jpg",
    description: "Three seared beef patties stacked with crispy onion rings, smoked barbecue bacon, triple sharp cheddar, and chipotle BBQ sauce.",
    sizes: [{ name: "Triple Stack", price: 0 }],
    toppings: [{ name: "Extra Onion Rings", price: 30 }]
  },
  {
    id: 305,
    restaurantId: "r3",
    restaurantName: "The Smash Burger Garage",
    name: "Crispy Paneer Tower Burger",
    category: "Smash Burgers",
    price: 249,
    rating: 4.7,
    reviews: 260,
    prepTime: "15 min",
    calories: "720 kcal",
    diet: "veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/burger.jpg",
    description: "Thick panko-crusted spiced cottage cheese patty, cheddar melt, spicy sriracha slaw, and pickled gherkins on toasted brioche.",
    sizes: [{ name: "Standard", price: 0 }, { name: "Meal with Peri-Peri Fries", price: 80 }],
    toppings: [{ name: "Double Cheese Melt", price: 30 }]
  },
  {
    id: 306,
    restaurantId: "r3",
    restaurantName: "The Smash Burger Garage",
    name: "Golden Buttermilk Chicken Tenders (5 Pcs)",
    category: "Crispy Starters",
    price: 229,
    rating: 4.8,
    reviews: 290,
    prepTime: "12 min",
    calories: "510 kcal",
    diet: "non-veg",
    spice: "🌶️ Mild",
    available: true,
    image: "images/fried_chicken.jpg",
    description: "Tender chicken tenderloins soaked in herb buttermilk and double dredge-fried. Served with honey mustard and BBQ dips.",
    sizes: [{ name: "5 Pcs Box", price: 0 }, { name: "10 Pcs Party Pack", price: 180 }],
    toppings: [{ name: "Extra Dip", price: 20 }]
  },
  {
    id: 307,
    restaurantId: "r3",
    restaurantName: "The Smash Burger Garage",
    name: "Cheesy Jalapeño Poppers (6 Pcs)",
    category: "Crispy Starters",
    price: 169,
    rating: 4.7,
    reviews: 190,
    prepTime: "10 min",
    calories: "420 kcal",
    diet: "veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/fries.jpg",
    description: "Golden crumbed nuggets filled with molten cream cheese and diced fiery green jalapeños. Served with cool herb dip.",
    sizes: [{ name: "6 Pcs", price: 0 }],
    toppings: []
  },
  {
    id: 308,
    restaurantId: "r3",
    restaurantName: "The Smash Burger Garage",
    name: "Thick Belgian Chocolate Oreo Shake",
    category: "Sides & Shakes",
    price: 159,
    rating: 4.9,
    reviews: 460,
    prepTime: "5 min",
    calories: "540 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/shake.jpg",
    description: "Ultra-thick vanilla soft-serve shake blended with crunchy Oreo biscuits and rich Belgian dark cocoa drizzle.",
    sizes: [{ name: "Regular (350ml)", price: 0 }, { name: "Monster Mug (500ml)", price: 40 }],
    toppings: [{ name: "Extra Whipped Cream", price: 25 }]
  },

  // --- Sakura Tokyo Sushi Bar (r4) ---
  {
    id: 401,
    restaurantId: "r4",
    restaurantName: "Sakura Tokyo Sushi Bar",
    name: "Royal Salmon & Dragon Roll Platter",
    category: "Sushi Platters",
    price: 599,
    rating: 4.9,
    reviews: 280,
    prepTime: "25-30 min",
    calories: "620 kcal",
    diet: "non-veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/sushi.jpg",
    description: "Atlantic salmon nigiri, spicy tuna rolls, and avocado dragon rolls served with wasabi, gari ginger, and soy glaze.",
    sizes: [{ name: "Standard (12 pcs)", price: 0 }, { name: "Deluxe Feast (18 pcs)", price: 180 }],
    toppings: [{ name: "Extra Wasabi", price: 20 }]
  },
  {
    id: 402,
    restaurantId: "r4",
    restaurantName: "Sakura Tokyo Sushi Bar",
    name: "Crispy Prawn Tempura Maki",
    category: "Sushi Platters",
    price: 429,
    rating: 4.8,
    reviews: 190,
    prepTime: "20 min",
    calories: "510 kcal",
    diet: "non-veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/sushi.jpg",
    description: "Crunchy tempura prawns wrapped with nori, seasoned sushi rice, cucumber, and spicy sriracha mayo drizzle.",
    sizes: [{ name: "8 pcs Roll", price: 0 }],
    toppings: []
  },
  {
    id: 403,
    restaurantId: "r4",
    restaurantName: "Sakura Tokyo Sushi Bar",
    name: "Spicy California Crab Roll (8 Pcs)",
    category: "Sushi Platters",
    price: 469,
    rating: 4.8,
    reviews: 220,
    prepTime: "18 min",
    calories: "480 kcal",
    diet: "non-veg",
    spice: "🌶️ Mild",
    available: true,
    image: "images/sushi.jpg",
    description: "Shredded crab stick, ripe avocado, cucumber, rolled with toasted sesame seeds and topped with spicy tobiko mayo.",
    sizes: [{ name: "8 Pcs", price: 0 }],
    toppings: [{ name: "Extra Pickled Ginger", price: 20 }]
  },
  {
    id: 404,
    restaurantId: "r4",
    restaurantName: "Sakura Tokyo Sushi Bar",
    name: "Crunchy Avocado & Cream Cheese Maki (8 Pcs)",
    category: "Sushi Platters",
    price: 349,
    rating: 4.7,
    reviews: 170,
    prepTime: "15 min",
    calories: "410 kcal",
    diet: "veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/sushi.jpg",
    description: "Hass avocado slices and creamy Philadelphia cheese rolled in sushi rice, finished with crispy tempura flakes.",
    sizes: [{ name: "8 Pcs", price: 0 }],
    toppings: []
  },
  {
    id: 405,
    restaurantId: "r4",
    restaurantName: "Sakura Tokyo Sushi Bar",
    name: "Tokyo Shoyu Chicken Chashu Ramen",
    category: "Ramen & Bowls",
    price: 419,
    rating: 4.9,
    reviews: 310,
    prepTime: "20 min",
    calories: "680 kcal",
    diet: "non-veg",
    spice: "🌶️ Mild",
    available: true,
    image: "images/ramen.jpg",
    description: "Deep umami chicken shoyu broth, springy ramen noodles, slow-braised chicken chashu, seasoned soft-boiled egg, nori sheet, and scallions.",
    sizes: [{ name: "Standard Bowl", price: 0 }, { name: "Mega Bowl (Extra Noodles & Meat)", price: 90 }],
    toppings: [{ name: "Extra Ajitsuke Tamago (Egg)", price: 35 }]
  },
  {
    id: 406,
    restaurantId: "r4",
    restaurantName: "Sakura Tokyo Sushi Bar",
    name: "Pan-Seared Chicken Gyoza Dumplings (6 Pcs)",
    category: "Japanese Starters",
    price: 279,
    rating: 4.8,
    reviews: 240,
    prepTime: "12 min",
    calories: "380 kcal",
    diet: "non-veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/momos.jpg",
    description: "Thin pastry wrappers packed with minced chicken, scallions, and ginger, seared to a golden crisp and served with chili-ponzu dip.",
    sizes: [{ name: "6 Pcs", price: 0 }, { name: "10 Pcs", price: 130 }],
    toppings: []
  },
  {
    id: 407,
    restaurantId: "r4",
    restaurantName: "Sakura Tokyo Sushi Bar",
    name: "Steamed Salted Edamame Pods",
    category: "Japanese Starters",
    price: 189,
    rating: 4.7,
    reviews: 150,
    prepTime: "8 min",
    calories: "180 kcal",
    diet: "veg",
    spice: "🟢 Healthy",
    available: true,
    image: "images/sushi.jpg",
    description: "Fresh young soybean pods steamed to order, tossed in coarse Himalayan pink rock salt and roasted sesame oil.",
    sizes: [{ name: "Bowl (200g)", price: 0 }],
    toppings: [{ name: "Spicy Garlic Togarashi Toss", price: 20 }]
  },

  // --- Pure Green Buddha Bowls (r5) ---
  {
    id: 501,
    restaurantId: "r5",
    restaurantName: "Pure Green Buddha Bowls",
    name: "Avocado Quinoa Power Buddha Bowl",
    category: "Nutrient Bowls",
    price: 249,
    rating: 4.8,
    reviews: 180,
    prepTime: "15 min",
    calories: "490 kcal",
    diet: "veg",
    spice: "🟢 Gentle",
    available: true,
    image: "images/healthy_bowl.jpg",
    description: "Organic rainbow bowl with tri-color quinoa, Hass avocado, roasted spiced chickpeas, edamame, cherry tomatoes, and tahini dressing.",
    sizes: [{ name: "Regular Bowl", price: 0 }, { name: "Large Power Bowl", price: 60 }],
    toppings: [{ name: "Grilled Tofu Cubes", price: 40 }]
  },
  {
    id: 502,
    restaurantId: "r5",
    restaurantName: "Pure Green Buddha Bowls",
    name: "Mediterranean Falafel Hummus Bowl",
    category: "Nutrient Bowls",
    price: 229,
    rating: 4.7,
    reviews: 140,
    prepTime: "15 min",
    calories: "520 kcal",
    diet: "veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/healthy_bowl.jpg",
    description: "Crispy herb falafels on a bed of greens, cucumber kalamata salad, beet hummus, and garlic herb drizzle.",
    sizes: [{ name: "Regular Bowl", price: 0 }],
    toppings: [{ name: "Warm Wholewheat Pita", price: 30 }]
  },
  {
    id: 503,
    restaurantId: "r5",
    restaurantName: "Pure Green Buddha Bowls",
    name: "Teriyaki Glazed Grilled Tofu Bowl",
    category: "Nutrient Bowls",
    price: 269,
    rating: 4.8,
    reviews: 210,
    prepTime: "15 min",
    calories: "460 kcal",
    diet: "veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/healthy_bowl.jpg",
    description: "Warm organic brown rice, seared organic teriyaki tofu steaks, steamed broccoli florets, purple cabbage, and toasted sesame seeds.",
    sizes: [{ name: "Regular Bowl", price: 0 }, { name: "Mega Protein Bowl", price: 60 }],
    toppings: [{ name: "Edamame Beans", price: 35 }]
  },
  {
    id: 504,
    restaurantId: "r5",
    restaurantName: "Pure Green Buddha Bowls",
    name: "Greek Paneer & Roasted Veggies Bowl",
    category: "Nutrient Bowls",
    price: 279,
    rating: 4.9,
    reviews: 190,
    prepTime: "15 min",
    calories: "530 kcal",
    diet: "veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/healthy_bowl.jpg",
    description: "Herb-marinated grilled paneer chunks, roasted sweet bell peppers, baby spinach, Kalamata olives, and feta herb dressing.",
    sizes: [{ name: "Standard Bowl", price: 0 }],
    toppings: [{ name: "Extra Feta Crumble", price: 35 }]
  },
  {
    id: 505,
    restaurantId: "r5",
    restaurantName: "Pure Green Buddha Bowls",
    name: "Acai Berry Superfood Smoothie Bowl",
    category: "Smoothies & Juices",
    price: 239,
    rating: 4.9,
    reviews: 270,
    prepTime: "8 min",
    calories: "340 kcal",
    diet: "veg",
    spice: "🟢 Healthy",
    available: true,
    image: "images/dessert.jpg",
    description: "Thick wild acai smoothie base loaded with artisan granola, chia seeds, fresh sliced bananas, blueberries, and toasted coconut.",
    sizes: [{ name: "Smoothie Bowl", price: 0 }],
    toppings: [{ name: "Peanut Butter Swirl", price: 30 }]
  },
  {
    id: 506,
    restaurantId: "r5",
    restaurantName: "Pure Green Buddha Bowls",
    name: "Cold-Pressed Green Glow Detox Juice",
    category: "Smoothies & Juices",
    price: 139,
    rating: 4.8,
    reviews: 320,
    prepTime: "5 min",
    calories: "110 kcal",
    diet: "veg",
    spice: "🟢 Pure",
    available: true,
    image: "images/boba.jpg",
    description: "100% pure cold-pressed juice of crisp green apple, English cucumber, celery, baby spinach, fresh ginger, and Meyer lemon.",
    sizes: [{ name: "Glass Bottle (300ml)", price: 0 }],
    toppings: []
  },
  {
    id: 507,
    restaurantId: "r5",
    restaurantName: "Pure Green Buddha Bowls",
    name: "Mango Chia Seed Super Pudding",
    category: "Healthy Treats",
    price: 149,
    rating: 4.8,
    reviews: 160,
    prepTime: "5 min",
    calories: "280 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/dessert.jpg",
    description: "Creamy coconut milk chia seed pudding infused with vanilla bean, layered with fresh Alphonso mango puree and roasted almonds.",
    sizes: [{ name: "Jar (180g)", price: 0 }],
    toppings: []
  },

  // --- El Cantina Street Tacos (r6) ---
  {
    id: 601,
    restaurantId: "r6",
    restaurantName: "El Cantina Street Tacos",
    name: "Carne Asada Fiesta Street Tacos",
    category: "Mexican Tacos",
    price: 229,
    rating: 4.8,
    reviews: 310,
    prepTime: "15-20 min",
    calories: "560 kcal",
    diet: "non-veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/tacos.jpg",
    description: "Trio of soft yellow corn tortillas loaded with citrus-marinated seared steak, diced onions, fresh cilantro, and salsa verde.",
    sizes: [{ name: "Trio (3 Tacos)", price: 0 }],
    toppings: [{ name: "House Guacamole", price: 35 }]
  },
  {
    id: 602,
    restaurantId: "r6",
    restaurantName: "El Cantina Street Tacos",
    name: "Loaded Macho Nachos with Queso",
    category: "Sides & Totopos",
    price: 249,
    rating: 4.7,
    reviews: 200,
    prepTime: "12 min",
    calories: "620 kcal",
    diet: "veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/nachos.jpg",
    description: "Crisp stone-ground corn nachos smothered in hot melted queso, black beans, pico de gallo, and sour cream.",
    sizes: [{ name: "Share Platter", price: 0 }],
    toppings: [{ name: "Jalapeño Slices", price: 20 }]
  },
  {
    id: 603,
    restaurantId: "r6",
    restaurantName: "El Cantina Street Tacos",
    name: "Baja Crispy Fish Tacos (3 Tacos)",
    category: "Mexican Tacos",
    price: 269,
    rating: 4.9,
    reviews: 280,
    prepTime: "15 min",
    calories: "520 kcal",
    diet: "non-veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/tacos.jpg",
    description: "Golden beer-battered crisp fish fillets, shredded lime cabbage slaw, fresh pico de gallo, and smoky chipotle crema.",
    sizes: [{ name: "Trio (3 Tacos)", price: 0 }],
    toppings: [{ name: "Extra Chipotle Crema", price: 25 }]
  },
  {
    id: 604,
    restaurantId: "r6",
    restaurantName: "El Cantina Street Tacos",
    name: "Black Bean & Roasted Corn Veggie Tacos (3 Tacos)",
    category: "Mexican Tacos",
    price: 199,
    rating: 4.7,
    reviews: 180,
    prepTime: "12 min",
    calories: "450 kcal",
    diet: "veg",
    spice: "🌶️ Mild",
    available: true,
    image: "images/tacos.jpg",
    description: "Spiced slow-cooked black beans, fire-roasted sweet corn, creamy avocado slices, and crumbled cotija cheese in warm corn tortillas.",
    sizes: [{ name: "Trio (3 Tacos)", price: 0 }],
    toppings: [{ name: "Extra Salsa Roja", price: 20 }]
  },
  {
    id: 605,
    restaurantId: "r6",
    restaurantName: "El Cantina Street Tacos",
    name: "Smoky Chipotle Chicken Quesadilla",
    category: "Quesadillas & Burritos",
    price: 259,
    rating: 4.8,
    reviews: 320,
    prepTime: "15 min",
    calories: "680 kcal",
    diet: "non-veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/quesadilla.jpg",
    description: "Toasted flour tortilla packed with grilled chipotle chicken breast, gooey Monterey Jack cheese, and charred peppers. Served with sour cream.",
    sizes: [{ name: "Large (4 Wedges)", price: 0 }],
    toppings: [{ name: "Guacamole Scoop", price: 35 }]
  },
  {
    id: 606,
    restaurantId: "r6",
    restaurantName: "El Cantina Street Tacos",
    name: "Fresh Guacamole & Warm Corn Chips",
    category: "Sides & Totopos",
    price: 179,
    rating: 4.9,
    reviews: 250,
    prepTime: "8 min",
    calories: "410 kcal",
    diet: "veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/nachos.jpg",
    description: "Freshly crushed Hass avocados with lime juice, sea salt, diced Roma tomatoes, and cilantro. Served with a basket of warm crisp totopos.",
    sizes: [{ name: "Snack Basket", price: 0 }],
    toppings: []
  },
  {
    id: 607,
    restaurantId: "r6",
    restaurantName: "El Cantina Street Tacos",
    name: "Mexican Cinnamon Churros with Chocolate Dip",
    category: "Desserts & Treats",
    price: 159,
    rating: 4.9,
    reviews: 380,
    prepTime: "10 min",
    calories: "460 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/churros.jpg",
    description: "Crispy ridged fried pastry sticks rolled in cinnamon sugar, served with a pot of warm Mexican spiced chocolate dipping fudge.",
    sizes: [{ name: "4 Sticks with Dip", price: 0 }, { name: "8 Sticks Sharing Box", price: 90 }],
    toppings: [{ name: "Dulce de Leche Caramel Dip", price: 30 }]
  },

  // --- Velvet Chocolate Cafe & Boba (r7) ---
  {
    id: 701,
    restaurantId: "r7",
    restaurantName: "Velvet Chocolate Cafe & Boba",
    name: "Decadent Molten Chocolate Lava Cake",
    category: "Desserts & Cakes",
    price: 169,
    rating: 4.9,
    reviews: 580,
    prepTime: "10 min",
    calories: "520 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/dessert.jpg",
    description: "Warm Belgian dark chocolate cake with a molten center of gooey chocolate ganache, served with Madagascar vanilla bean ice cream.",
    sizes: [{ name: "Single Slice", price: 0 }],
    toppings: [{ name: "Extra Vanilla Ice Cream", price: 40 }]
  },
  {
    id: 702,
    restaurantId: "r7",
    restaurantName: "Velvet Chocolate Cafe & Boba",
    name: "Matcha Taro Cloud Boba Milk Tea",
    category: "Artisan Boba Drinks",
    price: 149,
    rating: 4.9,
    reviews: 740,
    prepTime: "5 min",
    calories: "310 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/boba.jpg",
    description: "Layered Japanese matcha and creamy taro root milk tea with chewy brown sugar boba pearls and whipped cream cheese foam.",
    sizes: [{ name: "Regular (16oz)", price: 0 }, { name: "Large (24oz)", price: 30 }],
    toppings: [{ name: "Extra Boba", price: 20 }]
  },
  {
    id: 703,
    restaurantId: "r7",
    restaurantName: "Velvet Chocolate Cafe & Boba",
    name: "Brown Sugar Tiger Stripe Boba Milk",
    category: "Artisan Boba Drinks",
    price: 169,
    rating: 5.0,
    reviews: 820,
    prepTime: "5 min",
    calories: "340 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/boba.jpg",
    description: "Slow-cooked warm Taiwanese brown sugar tapioca pearls, cold organic farm milk, and caramelized roasted cream foam top.",
    sizes: [{ name: "Regular (16oz)", price: 0 }, { name: "Large (24oz)", price: 35 }],
    toppings: [{ name: "Custard Pudding Scoop", price: 25 }, { name: "Extra Pearls", price: 20 }]
  },
  {
    id: 704,
    restaurantId: "r7",
    restaurantName: "Velvet Chocolate Cafe & Boba",
    name: "Warm Belgian Nutella Banana Waffle",
    category: "Gourmet Waffles",
    price: 219,
    rating: 4.9,
    reviews: 430,
    prepTime: "12 min",
    calories: "580 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/waffle.jpg",
    description: "Golden Brussels waffle topped with generous warm Nutella spread, freshly sliced bananas, toasted hazelnut crumbles, and vanilla bean gelato.",
    sizes: [{ name: "Single Full Waffle", price: 0 }],
    toppings: [{ name: "Extra Scoop Gelato", price: 40 }]
  },
  {
    id: 705,
    restaurantId: "r7",
    restaurantName: "Velvet Chocolate Cafe & Boba",
    name: "Lotus Biscoff Baked Cheesecake Slice",
    category: "Desserts & Cakes",
    price: 229,
    rating: 4.9,
    reviews: 360,
    prepTime: "5 min",
    calories: "490 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/cheesecake.jpg",
    description: "Velvety New York style baked cheesecake on a spiced crunchy Lotus Biscoff biscuit crust, layered with molten Biscoff cream.",
    sizes: [{ name: "Deluxe Slice", price: 0 }],
    toppings: []
  },
  {
    id: 706,
    restaurantId: "r7",
    restaurantName: "Velvet Chocolate Cafe & Boba",
    name: "Signature Red Velvet Cream Cheese Cupcake",
    category: "Desserts & Cakes",
    price: 129,
    rating: 4.8,
    reviews: 290,
    prepTime: "5 min",
    calories: "320 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/cupcake.jpg",
    description: "Moist crimson buttermilk cocoa sponge topped with swirls of Madagascar vanilla cream cheese frosting and red velvet dusting.",
    sizes: [{ name: "Single Cupcake", price: 0 }, { name: "Box of 4", price: 220 }],
    toppings: []
  },
  {
    id: 707,
    restaurantId: "r7",
    restaurantName: "Velvet Chocolate Cafe & Boba",
    name: "Iced Salted Caramel Macchiato",
    category: "Artisan Boba Drinks",
    price: 179,
    rating: 4.8,
    reviews: 310,
    prepTime: "5 min",
    calories: "220 kcal",
    diet: "veg",
    spice: "🟢 Refreshing",
    available: true,
    image: "images/boba.jpg",
    description: "Double shot of espresso layered over chilled vanilla whole milk and house-made salted caramel sauce with a velvety cold foam cap.",
    sizes: [{ name: "Regular (350ml)", price: 0 }, { name: "Grande (475ml)", price: 35 }],
    toppings: [{ name: "Extra Caramel Drizzle", price: 20 }]
  },

  // --- Punjab Grill & Tandoor Express (r8) ---
  {
    id: 801,
    restaurantId: "r8",
    restaurantName: "Punjab Grill & Tandoor Express",
    name: "Murgh Makhani (Old Delhi Butter Chicken)",
    category: "North Indian Curries",
    price: 349,
    rating: 4.9,
    reviews: 890,
    prepTime: "20 min",
    calories: "640 kcal",
    diet: "non-veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/north_indian.jpg",
    description: "Tandoori charcoal-grilled chicken chunks simmered in a velvety satin-smooth tomato, butter, and cashew gravy with aromatic kasuri methi.",
    sizes: [{ name: "Standard (Serves 1-2)", price: 0 }, { name: "Large Handi (Serves 3-4)", price: 180 }],
    toppings: [{ name: "Extra Butter Swirl", price: 25 }, { name: "Boneless Only", price: 40 }]
  },
  {
    id: 802,
    restaurantId: "r8",
    restaurantName: "Punjab Grill & Tandoor Express",
    name: "Dal Makhani 24-Hour Slow Cooked",
    category: "North Indian Curries",
    price: 269,
    rating: 4.8,
    reviews: 740,
    prepTime: "15 min",
    calories: "480 kcal",
    diet: "veg",
    spice: "🌶️ Mild",
    available: true,
    image: "images/curry_naan.jpg",
    description: "Whole black urad lentils and kidney beans slow-cooked overnight on charcoal with churned white butter, ginger, and fresh cream.",
    sizes: [{ name: "Bowl (Serves 1-2)", price: 0 }, { name: "Large Handi", price: 130 }],
    toppings: [{ name: "Extra Fresh Cream", price: 20 }]
  },
  {
    id: 803,
    restaurantId: "r8",
    restaurantName: "Punjab Grill & Tandoor Express",
    name: "Paneer Tikka Lababdar",
    category: "North Indian Curries",
    price: 299,
    rating: 4.8,
    reviews: 530,
    prepTime: "18 min",
    calories: "520 kcal",
    diet: "veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/north_indian.jpg",
    description: "Charcoal-roasted malai cottage cheese cubes tossed in rich onion-tomato gravy finished with grated paneer and ginger juliennes.",
    sizes: [{ name: "Standard Portion", price: 0 }],
    toppings: [{ name: "Extra Malai Paneer", price: 45 }]
  },
  {
    id: 804,
    restaurantId: "r8",
    restaurantName: "Punjab Grill & Tandoor Express",
    name: "Tandoori Chicken Tikka (6 Pcs)",
    category: "Tandoori Starters",
    price: 319,
    rating: 4.9,
    reviews: 620,
    prepTime: "15 min",
    calories: "420 kcal",
    diet: "non-veg",
    spice: "🌶️ Spicy",
    available: true,
    image: "images/kebab.jpg",
    description: "Boneless chicken thighs marinated in degi mirch, hung curd, mustard oil, and royal garam masala, roasted in clay tandoor with mint dip.",
    sizes: [{ name: "6 Pieces", price: 0 }, { name: "12 Pieces Platter", price: 240 }],
    toppings: [{ name: "Extra Mint Chutney & Onions", price: 20 }]
  },
  {
    id: 805,
    restaurantId: "r8",
    restaurantName: "Punjab Grill & Tandoor Express",
    name: "Butter Garlic Naan (2 Pcs)",
    category: "Tandoori Breads",
    price: 99,
    rating: 4.9,
    reviews: 1100,
    prepTime: "8 min",
    calories: "290 kcal",
    diet: "veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/curry_naan.jpg",
    description: "Soft leavened refined flour bread baked in hot tandoor, slathered with roasted minced garlic, coriander, and golden Amul butter.",
    sizes: [{ name: "2 Naans", price: 0 }],
    toppings: [{ name: "Extra Garlic Butter", price: 15 }]
  },
  {
    id: 806,
    restaurantId: "r8",
    restaurantName: "Punjab Grill & Tandoor Express",
    name: "Amritsari Stuffed Aloo Kulcha with Chole",
    category: "Tandoori Breads",
    price: 189,
    rating: 4.8,
    reviews: 410,
    prepTime: "15 min",
    calories: "550 kcal",
    diet: "veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/curry_naan.jpg",
    description: "Flaky crisp tandoor-baked kulcha stuffed with spiced crushed potatoes, served with tangy Amritsari pindi chole and pickled onions.",
    sizes: [{ name: "Combo Meal", price: 0 }],
    toppings: [{ name: "Extra Chole Cup", price: 40 }]
  },
  {
    id: 807,
    restaurantId: "r8",
    restaurantName: "Punjab Grill & Tandoor Express",
    name: "Royal Shahi Tukda with Rabri",
    category: "Desserts",
    price: 149,
    rating: 4.9,
    reviews: 320,
    prepTime: "5 min",
    calories: "380 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/indian_sweets.jpg",
    description: "Golden ghee-fried bread diamonds steeped in fragrant saffron-cardamom syrup and blanketed with thick malai rabri and pistachio flakes.",
    sizes: [{ name: "2 Portions", price: 0 }],
    toppings: [{ name: "Extra Saffron Rabri", price: 35 }]
  },

  // --- Madras Tiffin Room (MTR 1924) (r9) ---
  {
    id: 901,
    restaurantId: "r9",
    restaurantName: "Madras Tiffin Room (MTR 1924)",
    name: "Ghee Podi Masala Dosa",
    category: "Crispy Dosas",
    price: 159,
    rating: 4.9,
    reviews: 1450,
    prepTime: "10 min",
    calories: "390 kcal",
    diet: "veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/south_indian.jpg",
    description: "Golden crispy fermented rice-lentil crepe roasted in pure cow ghee, smeared with spicy gun powder podi, and stuffed with tempered potato masala.",
    sizes: [{ name: "Single Dosa with Chutneys & Sambar", price: 0 }],
    toppings: [{ name: "Extra Ghee Podi Bowl", price: 25 }, { name: "Extra Potato Masala", price: 20 }]
  },
  {
    id: 902,
    restaurantId: "r9",
    restaurantName: "Madras Tiffin Room (MTR 1924)",
    name: "Steaming Button Idlis & Medu Vada Combo",
    category: "Tiffin Combos",
    price: 129,
    rating: 4.9,
    reviews: 980,
    prepTime: "8 min",
    calories: "310 kcal",
    diet: "veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/idli_vada.jpg",
    description: "Platter of 2 melt-in-mouth steamed idlis and a crunchy golden medu vada, served with hot drumstick sambar, fresh coconut chutney and spicy tomato chutney.",
    sizes: [{ name: "Standard Combo (2 Idlis + 1 Vada)", price: 0 }, { name: "Jumbo Combo (3 Idlis + 2 Vadas)", price: 60 }],
    toppings: [{ name: "Extra Medu Vada", price: 35 }]
  },
  {
    id: 903,
    restaurantId: "r9",
    restaurantName: "Madras Tiffin Room (MTR 1924)",
    name: "Mysore Butter Masala Dosa",
    category: "Crispy Dosas",
    price: 169,
    rating: 4.8,
    reviews: 820,
    prepTime: "12 min",
    calories: "440 kcal",
    diet: "veg",
    spice: "🌶️ Spicy",
    available: true,
    image: "images/south_indian.jpg",
    description: "Crispy outer crust lined with Mysore's fiery garlic-red chilli paste, filled with mild potato mash and crowned with melting butter.",
    sizes: [{ name: "Standard Mysore Dosa", price: 0 }],
    toppings: [{ name: "Extra White Butter", price: 20 }]
  },
  {
    id: 904,
    restaurantId: "r9",
    restaurantName: "Madras Tiffin Room (MTR 1924)",
    name: "Authentic Madras Degree Filter Coffee",
    category: "Beverages",
    price: 69,
    rating: 5.0,
    reviews: 2100,
    prepTime: "5 min",
    calories: "120 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/filter_coffee.jpg",
    description: "Slow-dripped dark chicory plantation coffee decoction frothed high with fresh whole milk in traditional brass davara tumbler.",
    sizes: [{ name: "Traditional Tumbler (150ml)", price: 0 }, { name: "Flask (500ml - Serves 4)", price: 120 }],
    toppings: []
  },
  {
    id: 905,
    restaurantId: "r9",
    restaurantName: "Madras Tiffin Room (MTR 1924)",
    name: "Crispy Onion Rava Dosa",
    category: "Crispy Dosas",
    price: 149,
    rating: 4.7,
    reviews: 540,
    prepTime: "14 min",
    calories: "360 kcal",
    diet: "veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/south_indian.jpg",
    description: "Lacy golden semolina crepe speckled with crushed black peppercorns, cumin seeds, ginger, curry leaves, and crunchy roasted onions.",
    sizes: [{ name: "Single Dosa", price: 0 }],
    toppings: [{ name: "Add Cheese", price: 30 }]
  },
  {
    id: 906,
    restaurantId: "r9",
    restaurantName: "Madras Tiffin Room (MTR 1924)",
    name: "Traditional Karnataka Bisi Bele Bath",
    category: "Rice Specials",
    price: 169,
    rating: 4.8,
    reviews: 430,
    prepTime: "10 min",
    calories: "420 kcal",
    diet: "veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/south_indian.jpg",
    description: "Hot, wholesome mash of rice, toor dal, and seasonal vegetables cooked with tamarind, jaggery, and house-ground spices, finished with ghee and kara boondi.",
    sizes: [{ name: "Bowl with Boondi & Raita", price: 0 }],
    toppings: [{ name: "Extra Boondi", price: 15 }, { name: "Extra Pure Ghee", price: 20 }]
  },
  {
    id: 907,
    restaurantId: "r9",
    restaurantName: "Madras Tiffin Room (MTR 1924)",
    name: "Golden Ghee Sambar Vada (2 Pcs)",
    category: "Tiffin Combos",
    price: 99,
    rating: 4.8,
    reviews: 610,
    prepTime: "6 min",
    calories: "290 kcal",
    diet: "veg",
    spice: "🌶️ Mild",
    available: true,
    image: "images/idli_vada.jpg",
    description: "Two crispy urad dal medu vadas dipped and soaked in piping hot Madras shallot sambar with a spoonful of aromatic cow ghee.",
    sizes: [{ name: "2 Vadas in Sambar Bowl", price: 0 }],
    toppings: [{ name: "Extra Ghee Spoon", price: 15 }]
  },

  // --- Wok & Roll Asian Street (r10) ---
  {
    id: 1001,
    restaurantId: "r10",
    restaurantName: "Wok & Roll Asian Street",
    name: "Darjeeling Steamed Chicken Momos (6 Pcs)",
    category: "Momos & Dim Sum",
    price: 169,
    rating: 4.9,
    reviews: 940,
    prepTime: "12 min",
    calories: "290 kcal",
    diet: "non-veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/momos.jpg",
    description: "Thin handmade flour skins stuffed with minced scallion chicken, ginger, and coriander, steamed fresh in bamboo baskets with fiery red chilli chutney.",
    sizes: [{ name: "6 Pieces", price: 0 }, { name: "12 Pieces Sharing Box", price: 120 }],
    toppings: [{ name: "Extra Fire Chilli Dip", price: 15 }, { name: "Mayonnaise Dip", price: 20 }]
  },
  {
    id: 1002,
    restaurantId: "r10",
    restaurantName: "Wok & Roll Asian Street",
    name: "Fiery Schezwan Chicken Hakka Noodles",
    category: "Noodles & Rice",
    price: 219,
    rating: 4.8,
    reviews: 860,
    prepTime: "15 min",
    calories: "560 kcal",
    diet: "non-veg",
    spice: "🌶️ Spicy",
    available: true,
    image: "images/noodles.jpg",
    description: "High-flame wok tossed noodles loaded with pulled chicken, shred cabbage, bell peppers, carrots, and in-house fiery Sichuan pepper paste.",
    sizes: [{ name: "Full Wok Box (Serves 1-2)", price: 0 }],
    toppings: [{ name: "Add Fried Egg On Top", price: 25 }, { name: "Extra Chicken", price: 40 }]
  },
  {
    id: 1003,
    restaurantId: "r10",
    restaurantName: "Wok & Roll Asian Street",
    name: "Crispy Chilli Paneer Dry",
    category: "Asian Appetizers",
    price: 229,
    rating: 4.8,
    reviews: 730,
    prepTime: "12 min",
    calories: "490 kcal",
    diet: "veg",
    spice: "🌶️ Spicy",
    available: true,
    image: "images/chinese.jpg",
    description: "Crispy fried cottage cheese cubes tossed with crunchy green capsicum, onion squares, slit green chillies, garlic, and dark soy sauce.",
    sizes: [{ name: "Starter Box (300g)", price: 0 }],
    toppings: [{ name: "Extra Crispy Garlic", price: 15 }]
  },
  {
    id: 1004,
    restaurantId: "r10",
    restaurantName: "Wok & Roll Asian Street",
    name: "Classic Veg Manchurian Gravy",
    category: "Main Course Gravies",
    price: 199,
    rating: 4.7,
    reviews: 580,
    prepTime: "14 min",
    calories: "420 kcal",
    diet: "veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/chinese.jpg",
    description: "Deep-fried seasoned vegetable dumplings submerged in a luscious, savoury garlic-coriander and dark soy reduction gravy.",
    sizes: [{ name: "Bowl (Serves 1-2)", price: 0 }],
    toppings: [{ name: "Extra Manchurian Balls (3 Pcs)", price: 35 }]
  },
  {
    id: 1005,
    restaurantId: "r10",
    restaurantName: "Wok & Roll Asian Street",
    name: "Burnt Garlic Egg Fried Rice",
    category: "Noodles & Rice",
    price: 189,
    rating: 4.8,
    reviews: 620,
    prepTime: "12 min",
    calories: "480 kcal",
    diet: "non-veg",
    spice: "🌶️ Mild",
    available: true,
    image: "images/fried_rice.jpg",
    description: "Fragrant long-grain rice wok-fried with scrambled eggs, golden toasted garlic flakes, white pepper, and finely diced spring onions.",
    sizes: [{ name: "Full Wok Box", price: 0 }],
    toppings: [{ name: "Add Double Egg", price: 20 }]
  },
  {
    id: 1006,
    restaurantId: "r10",
    restaurantName: "Wok & Roll Asian Street",
    name: "Golden Crispy Vegetable Spring Rolls (4 Pcs)",
    category: "Asian Appetizers",
    price: 159,
    rating: 4.7,
    reviews: 410,
    prepTime: "10 min",
    calories: "340 kcal",
    diet: "veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/springroll.jpg",
    description: "Golden flaky rolls crammed with finely shredded carrots, cabbage, scallions, and glass noodles, served with sweet chilli dip.",
    sizes: [{ name: "4 Rolls Cut into Halves", price: 0 }],
    toppings: [{ name: "Sweet Chilli Dip", price: 15 }]
  },
  {
    id: 1007,
    restaurantId: "r10",
    restaurantName: "Wok & Roll Asian Street",
    name: "Steamed Cheese & Corn Momos (6 Pcs)",
    category: "Momos & Dim Sum",
    price: 179,
    rating: 4.8,
    reviews: 520,
    prepTime: "12 min",
    calories: "330 kcal",
    diet: "veg",
    spice: "🟢 Mild",
    available: true,
    image: "images/momos.jpg",
    description: "Juicy handmade dumpling parcels oozing with melted mozzarella cheese, sweet American golden corn, and mild Italian herbs.",
    sizes: [{ name: "6 Pieces", price: 0 }, { name: "12 Pieces Box", price: 130 }],
    toppings: [{ name: "Spicy Schezwan Dip", price: 15 }]
  },

  // --- Haldiram's Sweets & Chaat Express (r11) ---
  {
    id: 1101,
    restaurantId: "r11",
    restaurantName: "Haldiram's Sweets & Chaat Express",
    name: "Delhi Special Shahi Raj Kachori",
    category: "Delhi Street Chaat",
    price: 149,
    rating: 4.9,
    reviews: 1320,
    prepTime: "8 min",
    calories: "480 kcal",
    diet: "veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/chaat.jpg",
    description: "Crispy oversized golden kachori loaded with spiced potatoes, moong sprouts, soft dahi vada bhallas, sweetened yogurt, tamarind saunth, sev, and fresh ruby pomegranate seeds.",
    sizes: [{ name: "King Size Royal Platter", price: 0 }],
    toppings: [{ name: "Extra Sweet Dahi & Sev", price: 20 }]
  },
  {
    id: 1102,
    restaurantId: "r11",
    restaurantName: "Haldiram's Sweets & Chaat Express",
    name: "Golgappa Pani Puri Platter (8 Pcs)",
    category: "Delhi Street Chaat",
    price: 89,
    rating: 4.9,
    reviews: 1850,
    prepTime: "5 min",
    calories: "210 kcal",
    diet: "veg",
    spice: "🌶️ Spicy",
    available: true,
    image: "images/chaat_street.jpg",
    description: "8 super-crispy puris packed with potato-black chana filling, served with iced spicy pudina-hing jaljeera water and sweet tamarind-date chutney.",
    sizes: [{ name: "8 Puris with Both Waters", price: 0 }, { name: "Party Pack (16 Puris)", price: 70 }],
    toppings: [{ name: "Extra Boondi for Pani", price: 10 }]
  },
  {
    id: 1103,
    restaurantId: "r11",
    restaurantName: "Haldiram's Sweets & Chaat Express",
    name: "Mumbai Butter Pav Bhaji (2 Pavs)",
    category: "Hot Snacks & Pav",
    price: 169,
    rating: 4.8,
    reviews: 940,
    prepTime: "10 min",
    calories: "540 kcal",
    diet: "veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/chaat.jpg",
    description: "Rich potato, cauliflower, and green pea mash cooked on huge tawa with special pav bhaji masala, topped with butter slab, served with 2 buttery pavs and sliced onions.",
    sizes: [{ name: "Plate with 2 Pavs", price: 0 }],
    toppings: [{ name: "Extra 2 Butter Pavs", price: 35 }, { name: "Add Amul Cheese", price: 30 }]
  },
  {
    id: 1104,
    restaurantId: "r11",
    restaurantName: "Haldiram's Sweets & Chaat Express",
    name: "Delhi Chole Bhature Combo (2 Bhature)",
    category: "Hot Snacks & Pav",
    price: 199,
    rating: 4.9,
    reviews: 1120,
    prepTime: "12 min",
    calories: "680 kcal",
    diet: "veg",
    spice: "🌶️ Spicy",
    available: true,
    image: "images/curry_naan.jpg",
    description: "Two enormous puffed golden paneer-stuffed bhatures paired with dark, tangy Punjabi chole, pickled green chillies, and raw onion rings.",
    sizes: [{ name: "2 Bhature + Chole + Pickle", price: 0 }],
    toppings: [{ name: "Extra Bhatura", price: 45 }]
  },
  {
    id: 1105,
    restaurantId: "r11",
    restaurantName: "Haldiram's Sweets & Chaat Express",
    name: "Papdi Dahi Chaat Platter",
    category: "Delhi Street Chaat",
    price: 129,
    rating: 4.8,
    reviews: 670,
    prepTime: "6 min",
    calories: "340 kcal",
    diet: "veg",
    spice: "🌶️ Mild",
    available: true,
    image: "images/chaat_street.jpg",
    description: "Crispy flour wafers layered with boiled chickpeas, spiced potatoes, thick sweetened yogurt, mint chutney, sweet sonth, and nylon sev.",
    sizes: [{ name: "Standard Platter", price: 0 }],
    toppings: [{ name: "Extra Dahi & Chutneys", price: 20 }]
  },
  {
    id: 1106,
    restaurantId: "r11",
    restaurantName: "Haldiram's Sweets & Chaat Express",
    name: "Royal Kesar Pista Rasmalai (2 Pcs)",
    category: "Traditional Mithai",
    price: 119,
    rating: 5.0,
    reviews: 810,
    prepTime: "5 min",
    calories: "290 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/indian_sweets.jpg",
    description: "Melt-in-mouth cottage cheese discs submerged in chilled saffron milk reduction with crushed cardamoms, pistachios, and almond slivers.",
    sizes: [{ name: "2 Pieces Cup", price: 0 }, { name: "4 Pieces Box", price: 99 }],
    toppings: []
  },
  {
    id: 1107,
    restaurantId: "r11",
    restaurantName: "Haldiram's Sweets & Chaat Express",
    name: "Hot Gulab Jamun in Rose Syrup (2 Pcs)",
    category: "Traditional Mithai",
    price: 79,
    rating: 4.8,
    reviews: 950,
    prepTime: "5 min",
    calories: "320 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/indian_sweets.jpg",
    description: "Warm golden brown khoya dumplings soaked in fragrant rose-water and cardamom sugar syrup. Pure comfort.",
    sizes: [{ name: "2 Pieces", price: 0 }, { name: "4 Pieces", price: 65 }],
    toppings: [{ name: "Scoop of Vanilla Ice Cream", price: 35 }]
  },

  // --- Chai Point & Irani Chai Bakery (r12) ---
  {
    id: 1201,
    restaurantId: "r12",
    restaurantName: "Chai Point & Irani Chai Bakery",
    name: "Hyderabadi Dum Irani Chai",
    category: "Chai & Brews",
    price: 49,
    rating: 5.0,
    reviews: 2450,
    prepTime: "5 min",
    calories: "110 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/chai.jpg",
    description: "Legendary slow-boiled thick tea decoction blended with reduced sweet caramelized cream milk served piping hot in a glass cup.",
    sizes: [{ name: "Cutting Glass", price: 0 }, { name: "Full Cup", price: 20 }, { name: "4-Cup Flask", price: 110 }],
    toppings: []
  },
  {
    id: 1202,
    restaurantId: "r12",
    restaurantName: "Chai Point & Irani Chai Bakery",
    name: "Toasted Bun Maska with Fruit Jam",
    category: "Bakery & Buns",
    price: 59,
    rating: 4.9,
    reviews: 1680,
    prepTime: "5 min",
    calories: "280 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/bun_maska.jpg",
    description: "Fresh fluffy sweet bakery bun sliced and pan-toasted with generous layers of cold salted butter and mixed fruit jam.",
    sizes: [{ name: "Single Bun Maska", price: 0 }],
    toppings: [{ name: "Extra Butter Slab", price: 15 }]
  },
  {
    id: 1203,
    restaurantId: "r12",
    restaurantName: "Chai Point & Irani Chai Bakery",
    name: "Hyderabadi Osmania Biscuits (Box of 6)",
    category: "Bakery & Buns",
    price: 69,
    rating: 4.9,
    reviews: 1340,
    prepTime: "3 min",
    calories: "260 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/bun_maska.jpg",
    description: "Royal crumbly sweet and mildly salty buttery biscuits freshly baked daily. The quintessential companion for hot Irani chai.",
    sizes: [{ name: "Box of 6", price: 0 }, { name: "Tin of 18 Biscuits", price: 110 }],
    toppings: []
  },
  {
    id: 1204,
    restaurantId: "r12",
    restaurantName: "Chai Point & Irani Chai Bakery",
    name: "Crispy Punjabi Aloo Samosa (2 Pcs)",
    category: "Quick Bites",
    price: 49,
    rating: 4.8,
    reviews: 890,
    prepTime: "5 min",
    calories: "320 kcal",
    diet: "veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/samosa.jpg",
    description: "Crisp flaky pastry triangles filled with spiced cumin potatoes and green peas, served with sweet tamarind and spicy mint chutneys.",
    sizes: [{ name: "2 Samosas with Chutneys", price: 0 }, { name: "4 Samosas Snack Pack", price: 40 }],
    toppings: [{ name: "Extra Chutney Cup", price: 10 }]
  },
  {
    id: 1205,
    restaurantId: "r12",
    restaurantName: "Chai Point & Irani Chai Bakery",
    name: "Hot Clay Kulhad Masala Chai",
    category: "Chai & Brews",
    price: 59,
    rating: 4.9,
    reviews: 1210,
    prepTime: "5 min",
    calories: "120 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/chai.jpg",
    description: "Kadak spiced milk tea brewed with hand-crushed ginger root, green cardamoms, cloves, and cinnamon, served in an unglazed earthy clay kulhad.",
    sizes: [{ name: "Kulhad Cup (180ml)", price: 0 }, { name: "Flask (Serves 4)", price: 130 }],
    toppings: []
  },
  {
    id: 1206,
    restaurantId: "r12",
    restaurantName: "Chai Point & Irani Chai Bakery",
    name: "Crispy Egg & Chicken Keema Puff",
    category: "Quick Bites",
    price: 79,
    rating: 4.8,
    reviews: 640,
    prepTime: "6 min",
    calories: "340 kcal",
    diet: "non-veg",
    spice: "🌶️ Medium",
    available: true,
    image: "images/samosa.jpg",
    description: "Flaky golden multi-layered puff pastry baked with spiced minced chicken keema and boiled egg slice.",
    sizes: [{ name: "Single Large Puff", price: 0 }],
    toppings: [{ name: "Hot Tomato Sauce", price: 5 }]
  },
  {
    id: 1207,
    restaurantId: "r12",
    restaurantName: "Chai Point & Irani Chai Bakery",
    name: "Chilled Belgian Chocolate Frappe",
    category: "Cold Brews",
    price: 139,
    rating: 4.9,
    reviews: 780,
    prepTime: "5 min",
    calories: "290 kcal",
    diet: "veg",
    spice: "🟢 Sweet",
    available: true,
    image: "images/shake.jpg",
    description: "Thick ice-blended dark Belgian chocolate and espresso shake crowned with whipped cream and chocolate fudge drizzle.",
    sizes: [{ name: "Regular (350ml)", price: 0 }, { name: "Large (475ml)", price: 30 }],
    toppings: [{ name: "Extra Whipped Cream", price: 25 }]
  }
];

// Global Orders Store (Real-time Shared State across portals)
let GLOBAL_ORDERS = [
  {
    id: "BD-849201",
    restaurantId: "r1",
    restaurantName: "Bawarchi Dum Biryani House",
    customerName: "Rohith Kumar",
    phone: "+91 98765 43210",
    address: "2nd Floor, Block-B, KLU Campus, Vaddeswaram",
    items: [
      { name: "Hyderabadi Chicken Dum Biryani", qty: 2, price: 349 }
    ],
    total: "₹738",
    paymentMethod: "UPI",
    deliveryType: "asap",
    scheduledSlot: "Instant Delivery (25-30 min)",
    status: "In Kitchen",
    time: "10 mins ago",
    placedAt: Date.now() - 10 * 60 * 1000,
    driverName: "Alex Rider",
    driverPhone: "+91 91234 56789"
  },
  {
    id: "BD-724109",
    restaurantId: "r8",
    restaurantName: "Punjab Grill & Tandoor Express",
    customerName: "Sneha Reddy",
    phone: "+91 98480 12345",
    address: "Room 402, C-Block Girls Hostel, KLU Campus",
    items: [
      { name: "Murgh Makhani (Old Delhi Butter Chicken)", qty: 1, price: 349 },
      { name: "Butter Garlic Naan (2 Pcs)", qty: 2, price: 99 }
    ],
    total: "₹577",
    paymentMethod: "UPI",
    deliveryType: "asap",
    scheduledSlot: "Instant Delivery (20-25 min)",
    status: "Order Placed",
    time: "3 mins ago",
    placedAt: Date.now() - 3 * 60 * 1000,
    driverName: "Assigning rider...",
    driverPhone: "+91 91234 56789"
  },
  {
    id: "BD-619382",
    restaurantId: "r9",
    restaurantName: "Madras Tiffin Room (MTR 1924)",
    customerName: "Karthik Varma",
    phone: "+91 94401 56789",
    address: "Faculty Quarters, Villa 12, KLU Campus",
    items: [
      { name: "Ghee Podi Masala Dosa", qty: 2, price: 159 },
      { name: "Authentic Madras Degree Filter Coffee", qty: 2, price: 69 }
    ],
    total: "₹486",
    paymentMethod: "UPI",
    deliveryType: "scheduled",
    scheduledSlot: "Today, 08:30 PM - 09:00 PM",
    status: "On the Way",
    time: "18 mins ago",
    placedAt: Date.now() - 18 * 60 * 1000,
    driverName: "Vikram Sharma",
    driverPhone: "+91 98221 44556"
  }
];

// App State
const state = {
  currentRole: 'customer',
  activeRestaurant: null, // If not null, in dedicated Zomato/Swiggy Restaurant Page
  restaurantDietFilter: 'all',
  restaurantSearchQuery: '',
  deliveryAddress: localStorage.getItem('bitedash_address') || 'Block-B Hostels, KLU Campus, Vaddeswaram',
  deliveryLandmark: localStorage.getItem('bitedash_landmark') || 'Near Lift / Security Desk',
  activePaymentMethod: 'upi',
  cart: JSON.parse(localStorage.getItem('bitedash_cart')) || [],
  pendingCartItem: null, // For Swiggy/Zomato single-restaurant replace cart confirmation
  favorites: JSON.parse(localStorage.getItem('bitedash_favs')) || [101, 201],
  theme: localStorage.getItem('bitedash_theme') || 'dark',
  modalFoodItem: null,
  activeOrder: GLOBAL_ORDERS[0],
  deliveryType: 'asap',
  scheduledSlot: 'Today, 08:00 PM - 08:30 PM',
  currentUser: JSON.parse(localStorage.getItem('bitedash_user')) || null
};

// Enforce single-restaurant cart policy on loaded cart
if (state.cart.length > 1) {
  const primaryRestId = state.cart[0].restaurantId;
  const filteredCart = state.cart.filter(item => item.restaurantId === primaryRestId);
  if (filteredCart.length !== state.cart.length) {
    state.cart = filteredCart;
    localStorage.setItem('bitedash_cart', JSON.stringify(state.cart));
  }
}

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderCuisineCategories();
  renderRestaurantsList('all');
  renderPopularDishes();
  updateCartUI();
  updateFavBadge();
  updateAddressUI();
  setupRoleSwitcher();
  setupEventListeners();
  updateUserUI();

  // GSAP Initial Entrance Animations
  initGSAPAnimations();
});

/* ==========================================================================
   GSAP ENTRANCE ANIMATIONS
   ========================================================================== */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined') return;

  gsap.from('.header', { y: -40, opacity: 0, duration: 0.7, ease: 'power3.out' });
  gsap.from('.hero-badge', { scale: 0.8, opacity: 0, duration: 0.5, delay: 0.15, ease: 'back.out(1.8)' });
  gsap.from('.hero-title', { y: 25, opacity: 0, duration: 0.7, delay: 0.25, ease: 'power3.out' });
  gsap.from('.hero-desc', { y: 20, opacity: 0, duration: 0.6, delay: 0.35, ease: 'power3.out' });
  gsap.from('.hero-stats .stat-item', { y: 15, opacity: 0, stagger: 0.1, duration: 0.5, delay: 0.45, ease: 'power2.out' });
  gsap.from('.hero-featured-card', { x: 40, opacity: 0, rotation: 6, duration: 0.8, delay: 0.3, ease: 'power3.out' });

  gsap.to('.hero-featured-card', {
    y: -8,
    rotation: 1,
    repeat: -1,
    yoyo: true,
    duration: 2.8,
    ease: 'sine.inOut'
  });
}

function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  const themeBtnIcon = document.querySelector('.theme-toggle-btn i');
  if (themeBtnIcon) {
    themeBtnIcon.className = state.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('bitedash_theme', state.theme);
  initTheme();
  showToast(`Switched to ${state.theme} mode!`, 'info');
}

/* Role / Portal Switcher Logic */
function setupRoleSwitcher() {
  const tabs = document.querySelectorAll('.role-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const role = tab.dataset.role;

      if (role === 'driver' && state.currentUser && state.currentUser.age < 18) {
        showToast('Age Restriction Alert: Delivery Partner requires 18+ verification.', 'error');
        return;
      }

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.currentRole = role;

      document.querySelectorAll('.view-panel').forEach(panel => panel.classList.remove('active'));
      
      let activeViewEl = null;
      if (role === 'customer') {
        activeViewEl = document.getElementById('customerView');
        activeViewEl.classList.add('active');
        const discoveryView = document.getElementById('restaurantDiscoveryView');
        const detailView = document.getElementById('restaurantDetailView');
        if (state.activeRestaurant && detailView) {
          if (discoveryView) discoveryView.style.display = 'none';
          detailView.style.display = 'block';
        } else if (discoveryView) {
          discoveryView.style.display = 'block';
          if (detailView) detailView.style.display = 'none';
        }
      } else if (role === 'restaurant') {
        activeViewEl = document.getElementById('restaurantView');
        activeViewEl.classList.add('active');
        renderRestaurantPortal();
      } else if (role === 'driver') {
        activeViewEl = document.getElementById('driverView');
        activeViewEl.classList.add('active');
        renderDriverPortal();
      }

      if (typeof gsap !== 'undefined' && activeViewEl) {
        gsap.fromTo(activeViewEl, 
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
      }

      showToast(`Switched to ${role.toUpperCase()} Portal`, 'info');
    });
  });
}

/* ==========================================================================
   DISCOVERY HOME: CUISINE CATEGORIES ("WHAT'S ON YOUR MIND?")
   ========================================================================== */
const CUISINE_CATEGORIES = [
  { name: "Biryanis", image: "images/biryani.jpg", restaurantId: "r1" },
  { name: "North Indian", image: "images/north_indian.jpg", restaurantId: "r8" },
  { name: "South Indian", image: "images/south_indian.jpg", restaurantId: "r9" },
  { name: "Pizzas", image: "images/pizza.jpg", restaurantId: "r2" },
  { name: "Burgers", image: "images/burger.jpg", restaurantId: "r3" },
  { name: "Momos & Wok", image: "images/chinese.jpg", restaurantId: "r10" },
  { name: "Chaat Street", image: "images/chaat.jpg", restaurantId: "r11" },
  { name: "Irani Chai", image: "images/chai.jpg", restaurantId: "r12" },
  { name: "Sushi Rolls", image: "images/sushi.jpg", restaurantId: "r4" },
  { name: "Healthy Bowls", image: "images/healthy_bowl.jpg", restaurantId: "r5" },
  { name: "Mexican Tacos", image: "images/tacos.jpg", restaurantId: "r6" },
  { name: "Desserts & Cakes", image: "images/dessert.jpg", restaurantId: "r7" },
  { name: "Boba Drinks", image: "images/boba.jpg", restaurantId: "r7" }
];

function renderCuisineCategories() {
  const track = document.getElementById('categoriesTrack');
  if (!track) return;

  track.innerHTML = CUISINE_CATEGORIES.map(cat => `
    <div class="category-item" onclick="openRestaurantDetail('${cat.restaurantId}')" title="Explore ${cat.name}">
      <div class="category-img-wrap">
        <img src="${cat.image}" alt="${cat.name}" class="category-img" loading="lazy" />
      </div>
      <span class="category-name">${cat.name}</span>
    </div>
  `).join('');
}

/* ==========================================================================
   DISCOVERY HOME: RENDER RESTAURANTS LIST & FILTERS
   ========================================================================== */
let currentRestaurantFilter = 'all';

function filterRestaurantCards(filterType) {
  currentRestaurantFilter = filterType;
  const btnIds = {
    'all': 'restFilterAll',
    'rating': 'restFilterRating',
    'fast': 'restFilterFast',
    'veg': 'restFilterVeg'
  };

  Object.values(btnIds).forEach(id => {
    document.getElementById(id)?.classList.remove('active');
  });
  document.getElementById(btnIds[filterType])?.classList.add('active');

  const searchVal = document.getElementById('searchInput')?.value || '';
  renderRestaurantsList(filterType, searchVal);
}

function renderRestaurantsList(filterType = currentRestaurantFilter, searchQuery = '') {
  const track = document.getElementById('restaurantsTrack');
  if (!track) return;

  let filtered = [...RESTAURANTS];

  if (filterType === 'rating') {
    filtered = filtered.filter(r => r.rating >= 4.7);
  } else if (filterType === 'fast') {
    filtered = filtered.filter(r => r.time.includes('10') || r.time.includes('15') || r.time.includes('20') || r.time.includes('25'));
  } else if (filterType === 'veg') {
    const vegRestIds = new Set(FOOD_DATA.filter(d => d.diet === 'veg').map(d => d.restaurantId));
    filtered = filtered.filter(r => vegRestIds.has(r.id));
    filtered.sort((a, b) => {
      if (a.id === 'r5') return -1;
      if (b.id === 'r5') return 1;
      return 0;
    });
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    const matchingDishRestIds = new Set(
      FOOD_DATA.filter(d => 
        d.name.toLowerCase().includes(q) || 
        d.description.toLowerCase().includes(q) || 
        d.category.toLowerCase().includes(q)
      ).map(d => d.restaurantId)
    );
    filtered = filtered.filter(r => 
      r.name.toLowerCase().includes(q) || 
      r.cuisine.toLowerCase().includes(q) || 
      r.tagline.toLowerCase().includes(q) ||
      matchingDishRestIds.has(r.id)
    );
  }

  if (filtered.length === 0) {
    track.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fas fa-store-slash" style="font-size: 2.5rem; margin-bottom: 0.75rem; color: var(--text-dim);"></i>
        <h3>No restaurants match your search</h3>
        <p>Try searching for biryani, pizza, burger, sushi, ramen, or tacos.</p>
      </div>
    `;
    return;
  }

  track.innerHTML = filtered.map(rest => `
    <div class="restaurant-card" onclick="openRestaurantDetail('${rest.id}')" title="Click to open ${rest.name} and explore menu">
      <div class="restaurant-img-wrap">
        <img src="${rest.image}" alt="${rest.name}" class="restaurant-img" loading="lazy" />
        <span class="restaurant-badge-overlay">${rest.badge}</span>
      </div>
      <div class="restaurant-info">
        <h3 class="restaurant-name">${rest.name}</h3>
        <p class="restaurant-cuisine">${rest.cuisine}</p>
        <div class="restaurant-meta-bar">
          <span class="rating-chip">★ ${rest.rating}</span>
          <span><i class="far fa-clock"></i> ${rest.time}</span>
          <span><i class="fas fa-wallet" style="margin-right:2px; font-size:0.75rem;"></i> ${rest.priceForTwo}</span>
        </div>
        <div class="restaurant-offer-strip">
          <i class="fas fa-badge-percent"></i> ${rest.offer}
        </div>
      </div>
    </div>
  `).join('');

  if (typeof gsap !== 'undefined' && filtered.length > 0) {
    gsap.fromTo('.restaurant-card', 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
    );
  }
}

/* ==========================================================================
   DISCOVERY HOME: CAMPUS FAVORITES / POPULAR DISHES
   ========================================================================== */
function renderPopularDishes() {
  const grid = document.getElementById('popularDishesGrid');
  if (!grid) return;

  const popularDishes = [
    FOOD_DATA.find(d => d.id === 101),
    FOOD_DATA.find(d => d.id === 801),
    FOOD_DATA.find(d => d.id === 901),
    FOOD_DATA.find(d => d.id === 201),
    FOOD_DATA.find(d => d.id === 301),
    FOOD_DATA.find(d => d.id === 1001),
    FOOD_DATA.find(d => d.id === 1101),
    FOOD_DATA.find(d => d.id === 1201)
  ].filter(Boolean);

  grid.innerHTML = popularDishes.map(dish => `
    <div class="popular-dish-card">
      <div class="popular-dish-img-wrap">
        <img src="${dish.image}" alt="${dish.name}" class="popular-dish-img" loading="lazy" />
        <span class="restaurant-badge-overlay">★ ${dish.rating} (${dish.reviews})</span>
      </div>
      <div class="popular-dish-content">
        <div class="popular-dish-header">
          <span class="food-mark ${dish.diet === 'veg' ? 'mark-veg' : 'mark-nonveg'}">
            <span class="${dish.diet === 'veg' ? 'mark-veg-dot' : 'mark-nonveg-dot'}"></span>
          </span>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 600;"><i class="far fa-clock"></i> ${dish.prepTime}</span>
        </div>
        <h4 class="popular-dish-title">${dish.name}</h4>
        <span class="popular-dish-rest-link" onclick="openRestaurantDetail('${dish.restaurantId}')" title="Click to view full restaurant menu">
          <i class="fas fa-store" style="font-size: 0.72rem; margin-right: 3px;"></i> ${dish.restaurantName}
        </span>
        <p style="font-size: 0.78rem; color: var(--text-muted); line-height: 1.35; margin-bottom: 0.75rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
          ${dish.description}
        </p>
        <div class="popular-dish-bottom">
          <span class="popular-dish-price">₹${dish.price}</span>
          <button class="popular-dish-add-btn" onclick="openCustomizerModal(${dish.id})">
            + ADD
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   SWIGGY / ZOMATO MODEL: OPEN DEDICATED RESTAURANT PAGE
   ========================================================================== */
function openRestaurantDetail(restaurantId, pushHistory = true) {
  const restaurant = RESTAURANTS.find(r => r.id === restaurantId);
  if (!restaurant) return;

  state.activeRestaurant = restaurant;
  state.restaurantDietFilter = 'all';
  state.restaurantSearchQuery = '';

  const discoveryView = document.getElementById('restaurantDiscoveryView');
  const detailView = document.getElementById('restaurantDetailView');

  if (discoveryView && detailView) {
    discoveryView.style.display = 'none';
    detailView.style.display = 'block';

    renderSwiggyRestaurantPage();

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushHistory) {
      try {
        history.pushState({ page: 'restaurant', restaurantId }, '', '#restaurant=' + restaurantId);
      } catch (err) {}
    }

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(detailView, 
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', clearProps: 'all' }
      );
    }
  }
}

function backToDiscovery(updateHistory = true) {
  if (!state.activeRestaurant) return;
  state.activeRestaurant = null;
  const discoveryView = document.getElementById('restaurantDiscoveryView');
  const detailView = document.getElementById('restaurantDetailView');

  if (discoveryView && detailView) {
    detailView.style.display = 'none';
    discoveryView.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (updateHistory) {
      try {
        if (window.location.hash.startsWith('#restaurant=')) {
          history.replaceState({ page: 'home' }, '', window.location.pathname + window.location.search);
        }
      } catch (err) {}
    }

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(discoveryView, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', clearProps: 'all' }
      );
    }
  }
}

function renderSwiggyRestaurantPage() {
  const container = document.getElementById('restaurantDetailContent');
  if (!container || !state.activeRestaurant) return;

  const rest = state.activeRestaurant;

  // Filter items for this restaurant
  let dishes = FOOD_DATA.filter(d => d.restaurantId === rest.id);

  if (state.restaurantDietFilter !== 'all') {
    dishes = dishes.filter(d => d.diet === state.restaurantDietFilter);
  }

  if (state.restaurantSearchQuery.trim() !== '') {
    const q = state.restaurantSearchQuery.toLowerCase();
    dishes = dishes.filter(d => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
  }

  // Group dishes by category
  const categories = [...new Set(dishes.map(d => d.category))];

  container.innerHTML = `
    <!-- Swiggy Restaurant Hero Header Card -->
    <div class="swiggy-restaurant-header">
      <div class="swiggy-rest-top">
        <div>
          <h1 class="swiggy-rest-title">${rest.name}</h1>
          <p class="swiggy-rest-cuisine">${rest.cuisine} • ${rest.priceForTwo}</p>
          <span style="font-size: 0.8rem; color: var(--text-muted); display:block; margin-top: 4px;">
            <i class="fas fa-map-pin" style="color: var(--primary);"></i> ${rest.location}
          </span>
        </div>
        <div class="swiggy-rating-box">
          <div class="swiggy-rating-score">★ ${rest.rating}</div>
          <div class="swiggy-rating-count">${rest.reviews}</div>
        </div>
      </div>

      <div class="swiggy-meta-chips">
        <div class="swiggy-meta-chip">
          <i class="far fa-clock"></i> <span>${rest.time} Delivery Time</span>
        </div>
        <div class="swiggy-meta-chip">
          <i class="fas fa-motorcycle"></i> <span>${rest.distance} Away</span>
        </div>
        <div class="swiggy-meta-chip">
          <i class="fas fa-tag"></i> <span>${rest.priceForTwo}</span>
        </div>
      </div>

      <!-- Offer Strip -->
      <div class="swiggy-offer-strip">
        <i class="fas fa-badge-percent" style="font-size: 1.1rem;"></i>
        <span>${rest.offer}</span>
      </div>
    </div>

    <!-- In-Restaurant Filters & Search Bar -->
    <div class="swiggy-filters-bar">
      <div class="swiggy-diet-toggle">
        <button class="diet-btn ${state.restaurantDietFilter === 'all' ? 'active' : ''}" onclick="setRestaurantDiet('all')">All Dishes</button>
        <button class="diet-btn ${state.restaurantDietFilter === 'veg' ? 'active' : ''}" onclick="setRestaurantDiet('veg')">
          <span class="food-mark mark-veg" style="margin: 0 4px 0 0;"><span class="mark-veg-dot"></span></span> Veg Only
        </button>
        <button class="diet-btn ${state.restaurantDietFilter === 'non-veg' ? 'active' : ''}" onclick="setRestaurantDiet('non-veg')">
          <span class="food-mark mark-nonveg" style="margin: 0 4px 0 0;"><span class="mark-nonveg-dot"></span></span> Non-Veg
        </button>
      </div>

      <div class="swiggy-search-box">
        <i class="fas fa-search"></i>
        <input type="text" id="restaurantSearchInput" value="${state.restaurantSearchQuery}" placeholder="Search in ${rest.name}..." oninput="handleRestaurantSearch(this.value)" />
      </div>
    </div>

    <!-- Swiggy Dish Categories & Rows -->
    <div class="swiggy-menu-container">
      ${categories.length === 0 ? `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <i class="fas fa-search" style="font-size: 2.5rem; margin-bottom: 0.75rem; color: var(--text-dim);"></i>
          <h3>No dishes found</h3>
          <p>Try clearing your search or veg/non-veg filter.</p>
        </div>
      ` : categories.map(cat => {
        const catDishes = dishes.filter(d => d.category === cat);
        return `
          <div class="swiggy-category-section">
            <h2 class="swiggy-cat-title">
              ${cat} <span>(${catDishes.length} items)</span>
            </h2>
            <div class="swiggy-dish-list">
              ${catDishes.map(dish => `
                <div class="swiggy-dish-row">
                  <div class="swiggy-dish-left">
                    <span class="food-mark ${dish.diet === 'veg' ? 'mark-veg' : 'mark-nonveg'}">
                      <span class="${dish.diet === 'veg' ? 'mark-veg-dot' : 'mark-nonveg-dot'}"></span>
                    </span>
                    <h3 class="swiggy-dish-name">${dish.name}</h3>
                    <div class="swiggy-dish-price">₹${dish.price}</div>
                    <div class="swiggy-dish-rating">
                      <span>★ ${dish.rating} (${dish.reviews} ratings)</span>
                    </div>
                    <p class="swiggy-dish-desc">${dish.description}</p>
                    <div class="swiggy-dish-tags">
                      <span class="swiggy-dish-tag">${dish.spice}</span>
                      <span class="swiggy-dish-tag"><i class="far fa-clock"></i> ${dish.prepTime}</span>
                      <span class="swiggy-dish-tag"><i class="fas fa-fire"></i> ${dish.calories}</span>
                    </div>
                  </div>
                  <div class="swiggy-dish-right">
                    <div class="swiggy-dish-img-box">
                      <img src="${dish.image}" alt="${dish.name}" class="swiggy-dish-img" loading="lazy" />
                      <button class="swiggy-add-btn" onclick="openCustomizerModal(${dish.id})">
                        + ADD
                      </button>
                    </div>
                    <span class="swiggy-customise-text">Customisable</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  if (typeof gsap !== 'undefined' && dishes.length > 0) {
    gsap.fromTo('.swiggy-dish-row', 
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, stagger: 0.03, duration: 0.3, ease: 'power2.out', clearProps: 'all' }
    );
  }
}

function setRestaurantDiet(diet) {
  state.restaurantDietFilter = diet;
  renderSwiggyRestaurantPage();
}

function handleRestaurantSearch(query) {
  state.restaurantSearchQuery = query;
  renderSwiggyRestaurantPage();
}

/* ==========================================================================
   DELIVERY SCHEDULING LOGIC
   ========================================================================== */
function selectDeliveryType(type) {
  state.deliveryType = type;
  document.querySelectorAll('.schedule-type-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.schedule-type-btn[data-type="${type}"]`)?.classList.add('active');

  const pickerWrap = document.getElementById('schedulePickerWrap');
  if (pickerWrap) {
    pickerWrap.classList.toggle('show', type === 'scheduled');
    if (type === 'scheduled' && typeof gsap !== 'undefined') {
      gsap.fromTo(pickerWrap, { opacity: 0, y: -6 }, { opacity: 1, y: 0, duration: 0.3 });
    }
  }

  showToast(type === 'scheduled' ? 'Select your preferred delivery time slot' : 'Deliver ASAP selected (20-30 mins)', 'info');
}

function selectTimeSlot(chip, slotText) {
  document.querySelectorAll('.slot-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  state.scheduledSlot = slotText;
  showToast(`Scheduled for: ${slotText}`, 'success');
}

/* ==========================================================================
   CUSTOMIZATION MODAL WITH GSAP
   ========================================================================== */
function openCustomizerModal(id) {
  const item = FOOD_DATA.find(f => f.id === id);
  if (!item) return;

  state.modalFoodItem = item;
  const modal = document.getElementById('customizerModal');
  const container = document.getElementById('customizerContent');
  if (!modal || !container) return;

  container.innerHTML = `
    <img src="${item.image}" alt="${item.name}" class="modal-food-img" />
    <div class="modal-body">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.4rem;">
        <div>
          <span style="font-size: 0.75rem; color: var(--secondary); font-weight:700;"><i class="fas fa-store"></i> ${item.restaurantName}</span>
          <h2 style="font-size: 1.35rem;">${item.name}</h2>
          <span style="font-size: 0.8rem; color: var(--text-muted);">${item.spice} • ${item.calories}</span>
        </div>
        <span style="font-size: 1.35rem; font-weight: 800; color: var(--primary);" id="modalTotalPrice">₹${item.price}</span>
      </div>
      <p style="color: var(--text-muted); font-size: 0.88rem; margin-bottom: 1.25rem;">${item.description}</p>

      <div class="option-group">
        <h4 class="option-title">Select Portion Size</h4>
        <div class="options-flex">
          ${item.sizes.map((size, idx) => `
            <button class="option-btn ${idx === 0 ? 'active' : ''}" data-type="size" data-price="${size.price}" data-name="${size.name}" onclick="selectModalSize(this)">
              ${size.name} ${size.price > 0 ? `(+₹${size.price})` : size.price < 0 ? `(-₹${Math.abs(size.price)})` : ''}
            </button>
          `).join('')}
        </div>
      </div>

      ${item.toppings && item.toppings.length ? `
        <div class="option-group">
          <h4 class="option-title">Extra Add-ons</h4>
          <div>
            ${item.toppings.map(t => `
              <label class="addon-item">
                <span>${t.name} (+₹${t.price})</span>
                <input type="checkbox" data-name="${t.name}" data-price="${t.price}" onchange="updateModalPrice()" />
              </label>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <div class="option-group">
        <h4 class="option-title">Special Cooking Instructions</h4>
        <input type="text" id="modalInstructions" placeholder="e.g. Extra spicy, no onions, keep napkins..." class="form-input" />
      </div>

      <div style="margin-top: 1.5rem; display: flex; gap: 0.85rem; align-items: center;">
        <div style="display: flex; align-items: center; background: var(--bg-secondary); border-radius: var(--radius-full); padding: 0.25rem 0.55rem;">
          <button class="qty-btn" onclick="changeModalQty(-1)"><i class="fas fa-minus"></i></button>
          <span id="modalQty" style="font-weight: 700; padding: 0 0.75rem;">1</span>
          <button class="qty-btn" onclick="changeModalQty(1)"><i class="fas fa-plus"></i></button>
        </div>
        <button class="checkout-btn" style="flex: 1;" onclick="addModalItemToCart()">
          Add to Order • <span id="modalAddTotal">₹${item.price}</span>
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(modal.querySelector('.modal-card'), 
      { scale: 0.85, opacity: 0, y: 25 },
      { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }
    );
  }
}

function closeCustomizerModal() {
  const modal = document.getElementById('customizerModal');
  if (modal) modal.classList.remove('active');
}

function selectModalSize(btn) {
  btn.parentElement.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  updateModalPrice();
}

function changeModalQty(delta) {
  const qtyEl = document.getElementById('modalQty');
  let qty = parseInt(qtyEl.textContent) + delta;
  if (qty < 1) qty = 1;
  qtyEl.textContent = qty;
  updateModalPrice();
}

function updateModalPrice() {
  if (!state.modalFoodItem) return;
  const basePrice = state.modalFoodItem.price;

  const sizeBtn = document.querySelector('.option-btn[data-type="size"].active');
  const sizeAdd = sizeBtn ? parseFloat(sizeBtn.dataset.price) : 0;

  let addonAdd = 0;
  document.querySelectorAll('.addon-item input:checked').forEach(chk => {
    addonAdd += parseFloat(chk.dataset.price);
  });

  const qty = parseInt(document.getElementById('modalQty').textContent);
  const total = (basePrice + sizeAdd + addonAdd) * qty;

  document.getElementById('modalTotalPrice').textContent = `₹${total}`;
  document.getElementById('modalAddTotal').textContent = `₹${total}`;
}

function addModalItemToCart() {
  if (!state.modalFoodItem) return;

  const item = state.modalFoodItem;
  const sizeBtn = document.querySelector('.option-btn[data-type="size"].active');
  const selectedSize = sizeBtn ? sizeBtn.dataset.name : 'Standard';
  const sizeAdd = sizeBtn ? parseFloat(sizeBtn.dataset.price) : 0;

  const selectedAddons = [];
  let addonAdd = 0;
  document.querySelectorAll('.addon-item input:checked').forEach(chk => {
    selectedAddons.push(chk.dataset.name);
    addonAdd += parseFloat(chk.dataset.price);
  });

  const qty = parseInt(document.getElementById('modalQty').textContent);
  const instructions = document.getElementById('modalInstructions')?.value || '';
  const unitPrice = item.price + sizeAdd + addonAdd;

  const cartPayload = {
    cartId: Date.now() + Math.random(),
    id: item.id,
    restaurantId: item.restaurantId,
    restaurantName: item.restaurantName,
    name: item.name,
    image: item.image,
    price: unitPrice,
    qty: qty,
    size: selectedSize,
    addons: selectedAddons,
    instructions: instructions
  };

  // Enforce Swiggy / Zomato Single-Restaurant Basket Rule
  if (state.cart.length > 0 && state.cart[0].restaurantId !== item.restaurantId) {
    state.pendingCartItem = cartPayload;
    openReplaceCartModal(state.cart[0].restaurantName, item.restaurantName);
    return;
  }

  commitItemToCart(cartPayload);
}

function commitItemToCart(cartItem) {
  // If item with same id, size, and addons already in cart, increment quantity
  const existingIdx = state.cart.findIndex(i => 
    i.id === cartItem.id && 
    i.size === cartItem.size && 
    JSON.stringify(i.addons.slice().sort()) === JSON.stringify(cartItem.addons.slice().sort())
  );

  if (existingIdx !== -1) {
    state.cart[existingIdx].qty += cartItem.qty;
  } else {
    state.cart.push(cartItem);
  }

  saveCart();
  updateCartUI();
  closeCustomizerModal();
  showToast(`Added ${cartItem.name} to basket! 🛒`, 'success');

  if (typeof gsap !== 'undefined') {
    gsap.fromTo('#cartBadge', 
      { scale: 1.8 }, 
      { scale: 1, duration: 0.45, ease: 'elastic.out(1, 0.3)' }
    );
  }
}

function openReplaceCartModal(oldRestName, newRestName) {
  const modal = document.getElementById('replaceCartModal');
  if (!modal) return;

  const oldRestEl = document.getElementById('replaceCartOldRest');
  const newRestEl = document.getElementById('replaceCartNewRest');

  if (oldRestEl) oldRestEl.textContent = oldRestName;
  if (newRestEl) newRestEl.textContent = newRestName;

  modal.classList.add('active');

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(modal.querySelector('.modal-card'), 
      { scale: 0.85, opacity: 0, y: 25 },
      { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)', clearProps: 'all' }
    );
    gsap.fromTo('.replace-cart-icon-wrap',
      { rotation: -60, scale: 0.5 },
      { rotation: 0, scale: 1, duration: 0.4, delay: 0.1, ease: 'back.out(1.8)', clearProps: 'all' }
    );
  }
}

function closeReplaceCartModal() {
  const modal = document.getElementById('replaceCartModal');
  if (modal) modal.classList.remove('active');
  state.pendingCartItem = null;
}

function confirmReplaceCartAndAdd() {
  const pending = state.pendingCartItem;
  if (!pending) {
    closeReplaceCartModal();
    return;
  }

  // Discard previous restaurant items
  state.cart = [];

  // Close replace modal
  const modal = document.getElementById('replaceCartModal');
  if (modal) modal.classList.remove('active');

  // Commit new item
  commitItemToCart(pending);
  state.pendingCartItem = null;

  showToast(`Basket reset with dishes from ${pending.restaurantName}!`, 'info');
}

function clearCart() {
  if (state.cart.length === 0) return;
  const oldRest = state.cart[0].restaurantName;
  state.cart = [];
  saveCart();
  updateCartUI();
  showToast(`Cleared basket from ${oldRest}`, 'info');
}

function saveCart() {
  localStorage.setItem('bitedash_cart', JSON.stringify(state.cart));
}

function toggleCartDrawer(show) {
  const drawer = document.getElementById('cartDrawer');
  if (!drawer) return;

  const willShow = show !== undefined ? show : !drawer.classList.contains('active');

  if (willShow) {
    drawer.classList.add('active');
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(drawer, { right: -430 }, { right: 0, duration: 0.35, ease: 'power3.out' });
      gsap.fromTo('.cart-item', 
        { opacity: 0, x: 25 },
        { opacity: 1, x: 0, stagger: 0.04, duration: 0.3, ease: 'power2.out', clearProps: 'all' }
      );
    }
  } else {
    if (typeof gsap !== 'undefined') {
      gsap.to(drawer, {
        right: -430,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => drawer.classList.remove('active')
      });
    } else {
      drawer.classList.remove('active');
    }
  }
}

function updateCartUI() {
  const badge = document.getElementById('cartBadge');
  const drawerList = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('subtotalPrice');
  const discountEl = document.getElementById('discountPrice');
  const taxEl = document.getElementById('taxPrice');
  const totalEl = document.getElementById('grandTotalPrice');
  const floatingBar = document.getElementById('floatingCartBar');

  // Single Restaurant Strip Indicator in Cart Drawer
  const restStrip = document.getElementById('cartRestaurantStrip');
  const restNameEl = document.getElementById('cartRestaurantName');
  if (restStrip && restNameEl) {
    if (state.cart.length > 0) {
      restStrip.style.display = 'block';
      restNameEl.textContent = state.cart[0].restaurantName;
    } else {
      restStrip.style.display = 'none';
    }
  }

  const totalItems = state.cart.reduce((sum, i) => sum + i.qty, 0);
  if (badge) badge.textContent = totalItems;

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  let discount = 0;
  let deliveryFee = subtotal > 0 ? 40 : 0;

  if (state.activePromo) {
    if (state.activePromo.discountPct) discount = subtotal * state.activePromo.discountPct;
    if (state.activePromo.freeShip) deliveryFee = 0;
  }

  const tax = Math.round((subtotal - discount) * 0.05);
  const grandTotal = Math.max(0, Math.round(subtotal - discount + tax + deliveryFee));

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal}`;
  if (discountEl) discountEl.textContent = `-₹${Math.round(discount)}`;
  if (taxEl) taxEl.textContent = `₹${tax}`;
  if (totalEl) totalEl.textContent = `₹${grandTotal}`;

  // Floating Bottom Cart Bar (Swiggy / Zomato style)
  if (floatingBar) {
    if (totalItems > 0) {
      floatingBar.style.display = 'flex';
      document.getElementById('floatingCartCount').textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'} | ₹${grandTotal}`;
    } else {
      floatingBar.style.display = 'none';
    }
  }

  if (!drawerList) return;

  if (state.cart.length === 0) {
    drawerList.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fas fa-shopping-basket" style="font-size: 3rem; color: var(--text-dim); margin-bottom: 1rem;"></i>
        <h3>Your Basket is Empty</h3>
        <p style="font-size: 0.85rem;">Browse local restaurants to order delicious meals!</p>
      </div>
    `;
  } else {
    drawerList.innerHTML = state.cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <div>
            <span style="font-size: 0.68rem; color: var(--secondary); font-weight:700;">${item.restaurantName}</span>
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-customs">
              ${item.size ? `Size: ${item.size}` : ''}
              ${item.addons && item.addons.length ? `<br/>Addons: ${item.addons.join(', ')}` : ''}
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.35rem;">
            <span class="cart-item-price">₹${item.price * item.qty}</span>
            <div class="cart-qty-ctrl">
              <button class="qty-btn" onclick="updateCartQty(${item.cartId}, -1)"><i class="fas fa-minus"></i></button>
              <span style="font-weight: 700; font-size: 0.82rem; padding: 0 4px;">${item.qty}</span>
              <button class="qty-btn" onclick="updateCartQty(${item.cartId}, 1)"><i class="fas fa-plus"></i></button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
}

function updateCartQty(cartId, delta) {
  const idx = state.cart.findIndex(i => i.cartId === cartId);
  if (idx === -1) return;

  state.cart[idx].qty += delta;
  if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
  saveCart();
  updateCartUI();
}

function applyPromoCode() {
  const input = document.getElementById('promoInput');
  if (!input) return;
  const code = input.value.trim().toUpperCase();

  if (code === 'FEAST50') {
    state.activePromo = { code: 'FEAST50', discountPct: 0.5 };
    showToast('Promo FEAST50 Applied! 50% Flat Discount 🎉', 'success');
  } else if (code === 'FREEDELIV') {
    state.activePromo = { code: 'FREEDELIV', freeShip: true };
    showToast('Free Delivery Unlocked! 🚚', 'success');
  } else {
    showToast('Invalid Coupon Code. Try FEAST50', 'error');
    return;
  }
  updateCartUI();
}

/* ==========================================================================
   DELIVERY ADDRESS MANAGEMENT & MODAL
   ========================================================================== */
function updateAddressUI() {
  const headerText = document.getElementById('headerLocationText');
  if (headerText) {
    const shortAddr = state.deliveryAddress.length > 25 ? state.deliveryAddress.substring(0, 24) + '...' : state.deliveryAddress;
    headerText.innerHTML = `${shortAddr} <i class="fas fa-chevron-down" style="font-size: 0.65rem; margin-left: 2px;"></i>`;
  }
  const cartText = document.getElementById('cartAddressText');
  if (cartText) {
    cartText.textContent = state.deliveryAddress;
  }
  const trackerText = document.getElementById('trackerAddressDisplay');
  if (trackerText) {
    trackerText.textContent = state.deliveryAddress;
  }
  const checkoutAddr = document.getElementById('checkoutAddress');
  if (checkoutAddr) {
    checkoutAddr.value = state.deliveryAddress;
  }
}

function openAddressModal() {
  const modal = document.getElementById('addressModal');
  if (!modal) return;
  const input = document.getElementById('userAddressInput');
  if (input) input.value = state.deliveryAddress;
  const landmark = document.getElementById('userAddressLandmark');
  if (landmark) landmark.value = state.deliveryLandmark;

  modal.classList.add('active');

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(modal.querySelector('.modal-card'), 
      { scale: 0.85, opacity: 0, y: 20 },
      { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }
    );
  }
}

function closeAddressModal() {
  document.getElementById('addressModal')?.classList.remove('active');
}

function setPresetAddress(preset) {
  const input = document.getElementById('userAddressInput');
  if (input) input.value = preset;

  document.querySelectorAll('.address-preset-chip').forEach(chip => {
    chip.classList.toggle('active', chip.textContent.includes(preset.split(',')[0]));
  });
}

function saveUserAddress() {
  const input = document.getElementById('userAddressInput');
  if (!input || !input.value.trim()) {
    showToast('Please enter a valid delivery address!', 'error');
    return;
  }

  state.deliveryAddress = input.value.trim();
  const landmark = document.getElementById('userAddressLandmark')?.value.trim();
  if (landmark) state.deliveryLandmark = landmark;

  localStorage.setItem('bitedash_address', state.deliveryAddress);
  localStorage.setItem('bitedash_landmark', state.deliveryLandmark);

  updateAddressUI();
  closeAddressModal();
  showToast(`Delivery location updated to: ${state.deliveryAddress.substring(0, 30)}... 📍`, 'success');
}

/* ==========================================================================
   CHECKOUT & REAL-TIME ORDER PLACEMENT (UPI QR, Card, COD)
   ========================================================================== */
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast('Your basket is empty! Add dishes first.', 'error');
    return;
  }
  toggleCartDrawer(false);
  const modal = document.getElementById('checkoutModal');
  if (!modal) return;

  const grandTotalText = document.getElementById('grandTotalPrice')?.textContent || '₹0';
  const totalBadge = document.getElementById('checkoutTotalBadge');
  if (totalBadge) totalBadge.textContent = grandTotalText;
  const upiAmt = document.getElementById('upiAmountValue');
  if (upiAmt) upiAmt.textContent = grandTotalText;

  const addrInput = document.getElementById('checkoutAddress');
  if (addrInput) addrInput.value = state.deliveryAddress;

  switchPaymentMethod('upi');

  modal.classList.add('active');

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(modal.querySelector('.modal-card'), 
      { scale: 0.85, opacity: 0, y: 25 },
      { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }
    );
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) modal.classList.remove('active');
}

function switchPaymentMethod(method) {
  state.activePaymentMethod = method;
  document.querySelectorAll('.pay-method-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.pay-panel').forEach(p => p.style.display = 'none');

  if (method === 'upi') {
    document.getElementById('payTabUpi')?.classList.add('active');
    const panel = document.getElementById('payPanelUpi');
    if (panel) panel.style.display = 'block';
  } else if (method === 'card') {
    document.getElementById('payTabCard')?.classList.add('active');
    const panel = document.getElementById('payPanelCard');
    if (panel) panel.style.display = 'block';
  } else if (method === 'cod') {
    document.getElementById('payTabCod')?.classList.add('active');
    const panel = document.getElementById('payPanelCod');
    if (panel) panel.style.display = 'block';
  }
}

function copyUpiId() {
  const upiId = 'bitedash.pay@okaxis';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(upiId).then(() => {
      showToast('UPI ID copied to clipboard: ' + upiId + ' 📋', 'success');
    }).catch(() => {
      showToast('UPI ID: ' + upiId, 'info');
    });
  } else {
    showToast('UPI ID: ' + upiId, 'info');
  }
}

function processOrderPlacement(paymentMethod = 'UPI') {
  const addressVal = document.getElementById('checkoutAddress')?.value.trim();
  const phoneVal = document.getElementById('checkoutPhone')?.value.trim();
  const notesVal = document.getElementById('checkoutNotes')?.value.trim();

  if (!addressVal) {
    showToast('Please specify your delivery address!', 'error');
    return;
  }
  if (!phoneVal) {
    showToast('Please enter your phone number for delivery updates!', 'error');
    return;
  }

  // Persist updated address
  state.deliveryAddress = addressVal;
  if (notesVal) state.deliveryLandmark = notesVal;
  localStorage.setItem('bitedash_address', state.deliveryAddress);
  localStorage.setItem('bitedash_landmark', state.deliveryLandmark);
  updateAddressUI();

  const grandTotalText = document.getElementById('grandTotalPrice')?.textContent || '₹0';
  const newOrderId = 'BD-' + Math.floor(100000 + Math.random() * 900000);
  const firstItem = state.cart[0];
  const restaurantName = firstItem ? firstItem.restaurantName : "Bawarchi Dum Biryani House";
  const restaurantId = firstItem ? firstItem.restaurantId : "r1";

  const newOrder = {
    id: newOrderId,
    restaurantId: restaurantId,
    restaurantName: restaurantName,
    customerName: state.currentUser ? state.currentUser.name : "Rohith Kumar",
    phone: phoneVal,
    address: state.deliveryAddress + (notesVal ? ` (Note: ${notesVal})` : ''),
    items: state.cart.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
    total: grandTotalText,
    paymentMethod: paymentMethod,
    deliveryType: state.deliveryType,
    scheduledSlot: state.deliveryType === 'scheduled' ? state.scheduledSlot : "Instant ASAP (20-25 mins)",
    status: "Pending Approval",
    time: "Just now",
    placedAt: Date.now(),
    driverName: "Assigning rider...",
    driverPhone: "+91 91234 56789"
  };

  if (paymentMethod === 'UPI') {
    showToast(`Verifying UPI Payment of ${grandTotalText}... ⏳`, 'info');
  }

  setTimeout(() => {
    GLOBAL_ORDERS.unshift(newOrder);
    state.activeOrder = newOrder;

    // Clear Cart
    state.cart = [];
    saveCart();
    updateCartUI();

    closeCheckoutModal();
    showToast(`Payment Completed! Order #${newOrderId} confirmed 🎉`, 'success');
    openPaymentSuccessModal(newOrder);
  }, paymentMethod === 'UPI' ? 700 : 250);
}

function handleCheckoutSubmit(e) {
  if (e) e.preventDefault();
  processOrderPlacement('UPI');
}

/* ==========================================================================
   PAYMENT COMPLETED SUCCESS SCREEN (Real Zomato / Swiggy Model)
   ========================================================================== */
function openPaymentSuccessModal(order) {
  const modal = document.getElementById('paymentSuccessModal');
  if (!modal) {
    openOrderTrackerModal();
    return;
  }

  const txnId = 'TXN-UPI-' + Math.floor(10000000 + Math.random() * 90000000);

  const orderIdEl = document.getElementById('paySuccessOrderId');
  if (orderIdEl) orderIdEl.textContent = '#' + order.id;

  const totalEl = document.getElementById('paySuccessTotal');
  if (totalEl) totalEl.textContent = order.total;

  const restEl = document.getElementById('paySuccessRestaurant');
  if (restEl) restEl.textContent = order.restaurantName;

  const methodEl = document.getElementById('paySuccessMethod');
  if (methodEl) methodEl.textContent = (order.paymentMethod || 'UPI') + ' • ' + txnId;

  const addrEl = document.getElementById('paySuccessAddress');
  if (addrEl) addrEl.textContent = order.address;

  const itemsEl = document.getElementById('paySuccessItems');
  if (itemsEl) itemsEl.textContent = order.items.map(i => `${i.qty}x ${i.name}`).join(', ');

  modal.classList.add('active');

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(modal.querySelector('.modal-card'), 
      { scale: 0.75, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'back.out(1.6)', clearProps: 'all' }
    );
    gsap.fromTo('.payment-success-icon-wrap',
      { scale: 0, rotation: -45 },
      { scale: 1, rotation: 0, duration: 0.5, delay: 0.15, ease: 'elastic.out(1.2, 0.5)', clearProps: 'all' }
    );
  }
}

function closePaymentSuccessModal() {
  const modal = document.getElementById('paymentSuccessModal');
  if (modal) modal.classList.remove('active');
  backToDiscovery();
}

function openOrderTrackerFromSuccess() {
  const modal = document.getElementById('paymentSuccessModal');
  if (modal) modal.classList.remove('active');
  openOrderTrackerModal();
}

/* ==========================================================================
   REAL-TIME LIVE ORDER TRACKER
   ========================================================================== */
function openOrderTrackerModal() {
  const modal = document.getElementById('trackerModal');
  if (!modal) return;

  const currentOrder = state.activeOrder || GLOBAL_ORDERS[0];
  if (!currentOrder) {
    showToast('No active orders to track currently.', 'info');
    return;
  }

  modal.classList.add('active');
  document.getElementById('orderIdDisplay').textContent = currentOrder.id;
  document.getElementById('trackerRestaurantName').textContent = currentOrder.restaurantName;
  document.getElementById('trackerScheduleBadge').textContent = currentOrder.scheduledSlot;

  const trackerAddress = document.getElementById('trackerAddressDisplay');
  if (trackerAddress) {
    trackerAddress.textContent = currentOrder.address || state.deliveryAddress;
  }

  const trackerPaymentText = document.getElementById('trackerPaymentText');
  if (trackerPaymentText) {
    trackerPaymentText.innerHTML = `Payment Status: <strong>COMPLETED</strong> (${currentOrder.total} via ${currentOrder.paymentMethod || 'UPI'})`;
  }

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(modal.querySelector('.modal-card'), 
      { scale: 0.85, opacity: 0, y: 25 },
      { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }
    );
  }

  updateTrackerDisplay(currentOrder);
}

function closeTrackerModal() {
  const modal = document.getElementById('trackerModal');
  if (modal) modal.classList.remove('active');
}

function formatTrackerTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
}

function updateTrackerDisplay(order) {
  const statusMsg = document.getElementById('trackerStatusMsg');
  const etaTimeEl = document.getElementById('trackerEtaTime');

  if (!order.placedAt) {
    order.placedAt = Date.now() - 10 * 60 * 1000;
  }

  // Realistic timeline calculations: +4m for kitchen, +18m for rider pickup, +30m for delivery
  const t1Date = new Date(order.placedAt);
  const t2Date = new Date(order.placedAt + 4 * 60 * 1000);
  const t3Date = new Date(order.placedAt + 18 * 60 * 1000);
  const t4Date = new Date(order.placedAt + 30 * 60 * 1000);

  const t1Str = formatTrackerTime(t1Date);
  const t2Str = formatTrackerTime(t2Date);
  const t3Str = formatTrackerTime(t3Date);
  const t4Str = formatTrackerTime(t4Date);

  const tTime1 = document.getElementById('tTime1');
  const tTime2 = document.getElementById('tTime2');
  const tTime3 = document.getElementById('tTime3');
  const tTime4 = document.getElementById('tTime4');

  if (tTime1) tTime1.textContent = t1Str;
  if (tTime2) tTime2.textContent = t2Str;
  if (tTime3) tTime3.textContent = t3Str;
  if (tTime4) tTime4.textContent = t4Str;

  const tTag1 = document.getElementById('tTag1');
  const tTag2 = document.getElementById('tTag2');
  const tTag3 = document.getElementById('tTag3');
  const tTag4 = document.getElementById('tTag4');

  let step = 1;
  let progress = 15;

  if (order.status === "Pending Approval") {
    step = 1; progress = 15;
    if (statusMsg) statusMsg.textContent = `Order sent to ${order.restaurantName}! Waiting for kitchen confirmation...`;
    if (etaTimeEl) etaTimeEl.textContent = `25-30 Mins (by ${t4Str})`;

    if (tTag1) { tTag1.className = 'step-time-tag live'; tTag1.innerHTML = '<span class="pulse-dot"></span> Sent'; }
    if (tTag2) { tTag2.className = 'step-time-tag eta'; tTag2.textContent = 'Expected'; }
    if (tTag3) { tTag3.className = 'step-time-tag eta'; tTag3.textContent = 'Expected'; }
    if (tTag4) { tTag4.className = 'step-time-tag eta'; tTag4.textContent = 'Expected'; }

  } else if (order.status === "In Kitchen") {
    step = 2; progress = 45;
    if (statusMsg) statusMsg.textContent = `Chef at ${order.restaurantName} is preparing your food with fresh ingredients! 🍳`;
    if (etaTimeEl) etaTimeEl.textContent = `18-22 Mins (by ${t4Str})`;

    if (tTag1) { tTag1.className = 'step-time-tag done'; tTag1.innerHTML = '<i class="fas fa-check"></i> Confirmed'; }
    if (tTag2) { tTag2.className = 'step-time-tag live'; tTag2.innerHTML = '<span class="pulse-dot"></span> Cooking'; }
    if (tTag3) { tTag3.className = 'step-time-tag eta'; tTag3.textContent = 'Expected'; }
    if (tTag4) { tTag4.className = 'step-time-tag eta'; tTag4.textContent = 'Expected'; }

  } else if (order.status === "Ready for Delivery") {
    step = 3; progress = 65;
    if (statusMsg) statusMsg.textContent = `Food is hot & packed at ${order.restaurantName}! Waiting for delivery rider to pick up. 📦`;
    if (etaTimeEl) etaTimeEl.textContent = `12-15 Mins (by ${t4Str})`;

    if (tTag1) { tTag1.className = 'step-time-tag done'; tTag1.innerHTML = '<i class="fas fa-check"></i> Confirmed'; }
    if (tTag2) { tTag2.className = 'step-time-tag done'; tTag2.innerHTML = '<i class="fas fa-check"></i> Packed'; }
    if (tTag3) { tTag3.className = 'step-time-tag live'; tTag3.innerHTML = '<span class="pulse-dot"></span> Assigning'; }
    if (tTag4) { tTag4.className = 'step-time-tag eta'; tTag4.textContent = 'Expected'; }

  } else if (order.status === "On the Way") {
    step = 3; progress = 85;
    if (statusMsg) statusMsg.textContent = `${order.driverName || 'Delivery Partner Alex'} has picked up your food and is on the way! 🛵`;
    if (etaTimeEl) etaTimeEl.textContent = `5-8 Mins (by ${t4Str})`;

    if (tTag1) { tTag1.className = 'step-time-tag done'; tTag1.innerHTML = '<i class="fas fa-check"></i> Confirmed'; }
    if (tTag2) { tTag2.className = 'step-time-tag done'; tTag2.innerHTML = '<i class="fas fa-check"></i> Cooked'; }
    if (tTag3) { tTag3.className = 'step-time-tag live'; tTag3.innerHTML = '<span class="pulse-dot"></span> On the Way'; }
    if (tTag4) { tTag4.className = 'step-time-tag eta'; tTag4.textContent = 'Expected'; }

  } else if (order.status === "Delivered") {
    step = 4; progress = 100;
    if (statusMsg) statusMsg.textContent = `Order Delivered to your doorstep! Enjoy your meal! 🎉`;
    if (etaTimeEl) etaTimeEl.textContent = `Delivered at ${t4Str} 🎉`;

    if (tTag1) { tTag1.className = 'step-time-tag done'; tTag1.innerHTML = '<i class="fas fa-check"></i> Confirmed'; }
    if (tTag2) { tTag2.className = 'step-time-tag done'; tTag2.innerHTML = '<i class="fas fa-check"></i> Prepared'; }
    if (tTag3) { tTag3.className = 'step-time-tag done'; tTag3.innerHTML = '<i class="fas fa-check"></i> Picked Up'; }
    if (tTag4) { tTag4.className = 'step-time-tag done'; tTag4.innerHTML = '<i class="fas fa-check-double"></i> Delivered'; }
  }

  if (typeof gsap !== 'undefined') {
    gsap.to('#roadLine', { width: `${progress}%`, duration: 0.9, ease: 'power2.out' });
    gsap.to('#driverMarker', { left: `${progress}%`, duration: 0.9, ease: 'power2.out' });
  } else {
    const roadLine = document.getElementById('roadLine');
    const driverMarker = document.getElementById('driverMarker');
    if (roadLine) roadLine.style.width = `${progress}%`;
    if (driverMarker) driverMarker.style.left = `${progress}%`;
  }

  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById(`tStep${i}`);
    if (el) {
      if (i <= step) {
        el.classList.add('active');
        if (i === step && typeof gsap !== 'undefined') {
          gsap.fromTo(el, { scale: 0.96 }, { scale: 1, duration: 0.3, ease: 'power1.out' });
        }
      } else {
        el.classList.remove('active');
      }
    }
  }
}

/* ==========================================================================
   RESTAURANT ADMIN PORTAL (Core Requirement)
   ========================================================================== */
function renderRestaurantPortal() {
  renderAdminOrders();
  renderAdminMenuTable();
}

function renderAdminOrders() {
  const grid = document.getElementById('adminOrdersGrid');
  if (!grid) return;

  grid.innerHTML = GLOBAL_ORDERS.map(order => {
    let badgeClass = 'status-pending';
    let actionBtnHtml = '';

    if (order.status === 'Pending Approval') {
      badgeClass = 'status-pending';
      actionBtnHtml = `<button class="admin-action-btn btn-kitchen" onclick="updateOrderStatus('${order.id}', 'In Kitchen')"><i class="fas fa-fire"></i> Accept Order & Start Cooking</button>`;
    } else if (order.status === 'In Kitchen') {
      badgeClass = 'status-kitchen';
      actionBtnHtml = `<button class="admin-action-btn btn-ready" onclick="updateOrderStatus('${order.id}', 'Ready for Delivery')"><i class="fas fa-box"></i> Mark Food Ready for Pickup</button>`;
    } else if (order.status === 'Ready for Delivery') {
      badgeClass = 'status-ready';
      actionBtnHtml = `<span style="font-size:0.82rem; color:var(--success); font-weight:700;"><i class="fas fa-clock"></i> Waiting for Delivery Rider Pickup</span>`;
    } else if (order.status === 'On the Way') {
      badgeClass = 'status-transit';
      actionBtnHtml = `<span style="font-size:0.82rem; color:#A855F7; font-weight:700;"><i class="fas fa-motorcycle"></i> Out for Delivery by ${order.driverName}</span>`;
    } else {
      badgeClass = 'status-delivered';
      actionBtnHtml = `<span style="font-size:0.82rem; color:var(--text-muted);"><i class="fas fa-check-circle"></i> Completed & Delivered</span>`;
    }

    return `
      <div class="admin-order-card ${order.status === 'Pending Approval' ? 'new-pulse' : ''}">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h4 style="font-size: 1rem;">${order.id}</h4>
          <span class="order-status-badge ${badgeClass}">${order.status}</span>
        </div>
        <div style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">
          <strong>Restaurant:</strong> ${order.restaurantName}<br/>
          <strong>Customer:</strong> ${order.customerName} (${order.phone})<br/>
          <strong>Deliver to:</strong> ${order.address}<br/>
          <strong style="color: var(--secondary);"><i class="far fa-calendar-alt"></i> Delivery:</strong> ${order.scheduledSlot}
        </div>
        <div style="border-top: 1px dashed var(--border-color); border-bottom: 1px dashed var(--border-color); padding: 0.5rem 0; font-size: 0.82rem;">
          ${order.items.map(i => `<div>${i.qty}x ${i.name}</div>`).join('')}
          <div style="font-weight: 800; color: var(--primary); margin-top: 0.35rem;">Total: ${order.total}</div>
        </div>
        ${actionBtnHtml}
      </div>
    `;
  }).join('');

  if (typeof gsap !== 'undefined') {
    gsap.fromTo('.admin-order-card', 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
    );
  }
}

function updateOrderStatus(orderId, newStatus) {
  const order = GLOBAL_ORDERS.find(o => o.id === orderId);
  if (!order) return;

  order.status = newStatus;
  showToast(`Order ${orderId} updated to: ${newStatus}`, 'success');

  renderAdminOrders();
  renderDriverPortal();

  if (state.activeOrder && state.activeOrder.id === orderId) {
    state.activeOrder.status = newStatus;
    updateTrackerDisplay(state.activeOrder);
  }
}

function renderAdminMenuTable() {
  const tbody = document.getElementById('adminMenuTableBody');
  if (!tbody) return;

  tbody.innerHTML = FOOD_DATA.map(item => `
    <tr>
      <td style="padding: 0.85rem; border-bottom: 1px solid var(--border-color);">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="${item.image}" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover; border: 1px solid var(--border-color);" />
          <div>
            <strong style="color: var(--text-main); font-size: 0.9rem;">${item.name}</strong><br/>
            <span style="font-size: 0.75rem; color: var(--text-muted);"><i class="fas fa-store"></i> ${item.restaurantName}</span>
          </div>
        </div>
      </td>
      <td style="padding: 0.85rem; border-bottom: 1px solid var(--border-color); text-transform: capitalize; color: var(--text-muted);">${item.category}</td>
      <td style="padding: 0.85rem; border-bottom: 1px solid var(--border-color); font-weight: 800; color: var(--primary);">₹${item.price}</td>
      <td style="padding: 0.85rem; border-bottom: 1px solid var(--border-color);">
        <button class="dish-stock-btn ${item.available ? 'in-stock' : 'out-of-stock'}" onclick="toggleItemStock(${item.id})">
          <i class="fas ${item.available ? 'fa-check' : 'fa-times'}"></i> ${item.available ? 'In Stock' : 'Out of Stock'}
        </button>
      </td>
      <td style="padding: 0.85rem; border-bottom: 1px solid var(--border-color);">
        <button class="dish-delete-btn" onclick="deleteDish(${item.id})" title="Delete Dish"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function toggleItemStock(id) {
  const item = FOOD_DATA.find(f => f.id === id);
  if (item) {
    item.available = !item.available;
    showToast(`${item.name} stock availability toggled!`, 'info');
    renderAdminMenuTable();
    if (state.activeRestaurant) renderSwiggyRestaurantPage();
  }
}

function deleteDish(id) {
  FOOD_DATA = FOOD_DATA.filter(f => f.id !== id);
  showToast('Dish removed from restaurant menu.', 'info');
  renderAdminMenuTable();
  if (state.activeRestaurant) renderSwiggyRestaurantPage();
}

function handleAddDishSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('dishName').value;
  const restaurantSelect = document.getElementById('dishRestaurant');
  const restaurantId = restaurantSelect.value;
  const restaurantName = restaurantSelect.options[restaurantSelect.selectedIndex].text;
  const category = document.getElementById('dishCategory').value;
  const price = parseFloat(document.getElementById('dishPrice').value);
  const prepTime = document.getElementById('dishPrepTime').value;
  const diet = document.getElementById('dishDiet').value;
  const image = document.getElementById('dishImage').value || 'images/pizza.jpg';
  const description = document.getElementById('dishDesc').value;

  const newDish = {
    id: Date.now(),
    restaurantId,
    restaurantName,
    name, category, price, rating: 5.0, reviews: 1,
    prepTime, calories: "600 kcal", diet, spice: "🌶️ Medium",
    available: true, image, description,
    sizes: [{ name: 'Regular', price: 0 }],
    toppings: []
  };

  FOOD_DATA.unshift(newDish);
  showToast(`Added "${name}" to ${restaurantName}! 🎉`, 'success');
  closeAddDishModal();
  renderRestaurantPortal();
  if (state.activeRestaurant) renderSwiggyRestaurantPage();
}

function openAddDishModal() {
  const modal = document.getElementById('addDishModal');
  if (!modal) return;
  modal.classList.add('active');

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(modal.querySelector('.modal-card'), 
      { scale: 0.85, opacity: 0, y: 25 },
      { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }
    );
  }
}
function closeAddDishModal() {
  document.getElementById('addDishModal').classList.remove('active');
}

/* ==========================================================================
   DELIVERY PERSONNEL LOGISTICS
   ========================================================================== */
function renderDriverPortal() {
  const availableContainer = document.getElementById('driverAvailableJobs');
  const activeContainer = document.getElementById('driverActiveJobs');
  if (!availableContainer || !activeContainer) return;

  const readyOrders = GLOBAL_ORDERS.filter(o => o.status === 'Ready for Delivery');
  const activeDeliveries = GLOBAL_ORDERS.filter(o => o.status === 'On the Way');

  if (readyOrders.length === 0) {
    availableContainer.innerHTML = `<div style="color: var(--text-muted); font-size: 0.88rem; padding: 1rem 0;">No pickup jobs waiting at restaurants right now.</div>`;
  } else {
    availableContainer.innerHTML = readyOrders.map(o => `
      <div class="driver-job-card">
        <div style="display: flex; justify-content: space-between;">
          <h4 style="font-size: 0.95rem;">Pickup from ${o.restaurantName}</h4>
          <span style="font-weight: 800; color: var(--success);">₹120 Payout</span>
        </div>
        <div style="font-size: 0.82rem; color: var(--text-muted);">
          <i class="fas fa-map-marker-alt" style="color: var(--primary);"></i> Pickup: ${o.restaurantName}<br/>
          <i class="fas fa-location-dot" style="color: #10B981;"></i> Deliver to: ${o.address}<br/>
          <i class="far fa-clock"></i> Timing: ${o.scheduledSlot}
        </div>
        <button class="checkout-btn" style="background: var(--success);" onclick="acceptDeliveryJob('${o.id}')">
          <i class="fas fa-motorcycle"></i> Accept & Pick Up Order
        </button>
      </div>
    `).join('');
  }

  if (activeDeliveries.length === 0) {
    activeContainer.innerHTML = `<div style="color: var(--text-muted); font-size: 0.88rem; padding: 1rem 0;">No active deliveries in transit.</div>`;
  } else {
    activeContainer.innerHTML = activeDeliveries.map(o => `
      <div class="driver-job-card" style="border-left-color: var(--primary);">
        <div style="display: flex; justify-content: space-between;">
          <h4 style="font-size: 0.95rem;">Active Order #${o.id}</h4>
          <span class="order-status-badge status-transit">In Transit</span>
        </div>
        <div style="font-size: 0.82rem;">
          <strong>Restaurant:</strong> ${o.restaurantName}<br/>
          <strong>Customer:</strong> ${o.customerName} (${o.phone})<br/>
          <strong>Deliver to:</strong> ${o.address}<br/>
          <strong>Collect Payment:</strong> ${o.total}
        </div>
        <button class="checkout-btn" onclick="updateOrderStatus('${o.id}', 'Delivered')">
          <i class="fas fa-check-circle"></i> Confirm Delivered & Collect ${o.total}
        </button>
      </div>
    `).join('');
  }

  if (typeof gsap !== 'undefined') {
    gsap.fromTo('.driver-job-card', 
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.04, duration: 0.35, ease: 'power2.out', clearProps: 'all' }
    );
  }
}

function acceptDeliveryJob(orderId) {
  const order = GLOBAL_ORDERS.find(o => o.id === orderId);
  if (order) {
    order.status = 'On the Way';
    order.driverName = state.currentUser ? state.currentUser.name : 'Alex Rider';
    showToast(`You picked up Order #${orderId}! En route to customer 🛵`, 'success');
    renderDriverPortal();
    if (state.activeOrder && state.activeOrder.id === orderId) {
      updateTrackerDisplay(order);
    }
  }
}

/* ==========================================================================
   AUTH & AGE RESTRICTION VERIFICATION MODAL
   ========================================================================== */
function openAuthModal() {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.classList.add('active');

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(modal.querySelector('.modal-card'), 
      { scale: 0.85, opacity: 0, y: 25 },
      { scale: 1, opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }
    );
  }
}
function closeAuthModal() {
  document.getElementById('authModal').classList.remove('active');
}

function switchAuthTab(tabName) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`tab-${tabName}`).classList.add('active');

  if (tabName === 'login') {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
  } else {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
  }

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(tabName === 'login' ? '#loginForm' : '#registerForm', 
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.3 }
    );
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  state.currentUser = { name: email.split('@')[0], email: email, age: 22 };
  localStorage.setItem('bitedash_user', JSON.stringify(state.currentUser));
  updateUserUI();
  closeAuthModal();
  showToast(`Welcome back, ${state.currentUser.name}! 👋`, 'success');
}

function handleRegisterSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const age = parseInt(document.getElementById('regAge').value);
  const role = document.getElementById('regRole').value;

  if (role === 'driver' && age < 18) {
    showToast('Age Restriction Error: You must be at least 18 years old to register as a Delivery Partner!', 'error');
    return;
  }

  if (age < 13) {
    showToast('Age Restriction Error: You must be at least 13 years old to register.', 'error');
    return;
  }

  state.currentUser = { name, email, age, role };
  localStorage.setItem('bitedash_user', JSON.stringify(state.currentUser));
  updateUserUI();
  closeAuthModal();
  showToast(`Account created successfully! Welcome ${name}! 🎉`, 'success');
}

function updateUserUI() {
  const authBtn = document.querySelector('.auth-btn');
  if (authBtn && state.currentUser) {
    authBtn.innerHTML = `<i class="fas fa-user-circle" style="margin-right: 0.35rem; color: var(--primary);"></i> ${state.currentUser.name.substring(0, 10)}`;
  }
}

function updateFavBadge() {
  const badge = document.getElementById('favBadge');
  if (badge) {
    badge.textContent = state.favorites.length;
  }
}

/* Event Listeners */
function setupEventListeners() {
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => btn.addEventListener('click', toggleTheme));

  document.getElementById('cartTriggerBtn')?.addEventListener('click', () => toggleCartDrawer(true));
  document.getElementById('closeCartBtn')?.addEventListener('click', () => toggleCartDrawer(false));

  document.getElementById('favTriggerBtn')?.addEventListener('click', () => {
    showToast(`You have ${state.favorites.length} saved favorites! ❤️`, 'info');
  });

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value;
      if (state.activeRestaurant) {
        handleRestaurantSearch(q);
      } else {
        renderRestaurantsList(currentRestaurantFilter, q);
      }
    });
  }

  // Handle Browser Back / Forward & Mobile Back Gesture (popstate)
  window.addEventListener('popstate', (e) => {
    // 1. Close food customizer modal if open
    const foodModal = document.getElementById('foodCustomizerModal');
    if (foodModal && foodModal.classList.contains('active')) {
      closeCustomizerModal();
      return;
    }

    // 2. Close cart drawer if open
    const drawer = document.getElementById('cartDrawer');
    if (drawer && drawer.classList.contains('active')) {
      toggleCartDrawer(false);
      return;
    }

    // 3. Return to home discovery if inside a restaurant menu
    if (state.activeRestaurant) {
      backToDiscovery(false);
      showToast('Returned to Home Page 🏠', 'info');
      return;
    }

    // 4. Open restaurant if history specifies it
    if (e.state && e.state.page === 'restaurant' && e.state.restaurantId) {
      openRestaurantDetail(e.state.restaurantId, false);
    }
  });

  // Setup Touch Finger Swipes
  setupTouchSwipeGestures();

  // Restore state from URL hash if opened directly
  if (window.location.hash.startsWith('#restaurant=')) {
    const rId = window.location.hash.replace('#restaurant=', '');
    if (RESTAURANTS.some(r => r.id === rId)) {
      openRestaurantDetail(rId, false);
    }
  } else {
    try {
      history.replaceState({ page: 'home' }, '', window.location.pathname + window.location.search);
    } catch (e) {}
  }
}

/* ==========================================================================
   MOBILE & TOUCH SCREEN FINGER SWIPE NAVIGATION (Swiggy/Zomato Model)
   Swiping right with fingers returns to Home Page, NOT out of the page!
   ========================================================================== */
function setupTouchSwipeGestures() {
  let touchStartX = 0;
  let touchStartY = 0;
  let touchStartTime = 0;
  let isSwiping = false;

  const detailView = document.getElementById('restaurantDetailView');
  const cartDrawer = document.getElementById('cartDrawer');

  // Listen on window touch events to capture edge swipes or swipes anywhere on the restaurant detail page
  window.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
    isSwiping = false;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length !== 1) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX;
    const deltaY = currentY - touchStartY;

    // 1. Restaurant Menu Page Swipe-Right to go back to Home
    if (state.activeRestaurant && detailView && detailView.style.display !== 'none') {
      // If swiping right horizontally
      if (deltaX > 20 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
        isSwiping = true;
        // Prevent browser from navigating away or exiting the website
        if (e.cancelable) e.preventDefault();

        // Give tactile visual drag feedback
        const dragDistance = Math.min(deltaX * 0.4, 100);
        detailView.style.transform = `translateX(${dragDistance}px)`;
        detailView.style.transition = 'none';
      }
    }

    // 2. Cart Drawer Swipe-Right to close
    if (cartDrawer && cartDrawer.classList.contains('active')) {
      if (deltaX > 20 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
        if (e.cancelable) e.preventDefault();
      }
    }
  }, { passive: false });

  window.addEventListener('touchend', (e) => {
    if (e.changedTouches.length !== 1) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const deltaTime = Date.now() - touchStartTime;

    // 1. Restaurant Menu Page Swipe-Right to Home
    if (state.activeRestaurant && detailView && detailView.style.display !== 'none') {
      // Valid swipe if distance > 60px or fast flick (>35px in <300ms)
      if (isSwiping && ((deltaX > 60 && Math.abs(deltaX) > Math.abs(deltaY)) || (deltaX > 35 && deltaTime < 300))) {
        detailView.style.transition = 'transform 0.22s ease-out, opacity 0.22s ease-out';
        detailView.style.transform = 'translateX(100%)';
        detailView.style.opacity = '0';

        setTimeout(() => {
          detailView.style.transform = '';
          detailView.style.opacity = '';
          detailView.style.transition = '';
          backToDiscovery();
          showToast('Returned to Home Page 🏠', 'info');
        }, 220);
      } else if (isSwiping) {
        // Snap back if threshold not met
        detailView.style.transition = 'transform 0.2s ease-out';
        detailView.style.transform = 'translateX(0)';
        setTimeout(() => {
          detailView.style.transform = '';
          detailView.style.transition = '';
        }, 200);
      }
      isSwiping = false;
    }

    // 2. Cart Drawer Swipe-Right to close
    if (cartDrawer && cartDrawer.classList.contains('active')) {
      if (deltaX > 60 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        toggleCartDrawer(false);
      }
    }
  }, { passive: true });

  window.addEventListener('touchcancel', () => {
    if (detailView) {
      detailView.style.transform = '';
      detailView.style.transition = '';
    }
    isSwiping = false;
  }, { passive: true });
}

/* Toast Notifications with GSAP Bounce */
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="${type === 'success' ? 'fas fa-check-circle' : type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-info-circle'}" style="color: var(--primary);"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  if (typeof gsap !== 'undefined') {
    gsap.fromTo(toast, 
      { x: -60, opacity: 0, scale: 0.9 },
      { x: 0, opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.5)' }
    );
  }

  setTimeout(() => {
    if (typeof gsap !== 'undefined') {
      gsap.to(toast, {
        x: -60,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => toast.remove()
      });
    } else {
      toast.remove();
    }
  }, 3000);
}

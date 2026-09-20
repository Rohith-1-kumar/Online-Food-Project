# 🍔 BiteDash - Online Food Delivery & Logistics Platform

> **Live Demo**: [https://rohith-1-kumar.github.io/Online-Food-Project/](https://rohith-1-kumar.github.io/Online-Food-Project/)

An authentic, production-grade Swiggy & Zomato style Multi-Role Online Food Delivery Web Application built with **100% Pure HTML5, Vanilla CSS3, and Pure JavaScript (ES6)** with dynamic **GSAP animations**.

---

## 🌟 Key Features

### 🛒 1. Customer Storefront (Swiggy & Zomato Model)
- **Dedicated Restaurant View**: Clicking any restaurant transitions seamlessly to its complete menu page with categories, dietary filters (Veg / Non-Veg), and item search.
- **Single-Restaurant Cart Policy**: Real Swiggy / Zomato basket rule—prevents mixing orders from multiple kitchens with an interactive **"Replace cart item?"** prompt.
- **Customizer Bottom-Sheet**: Customizable dish sizes (Half / Full / Pot), extra add-ons, and cooking instructions.
- **Editable Delivery Address**: Change delivery address anytime from the header, cart drawer, or checkout modal with campus presets (Hostels, Library, Labs, etc.).
- **UPI QR Code Payment**: Instant UPI payments with verification animation and order confirmation receipt.
- **Payment Completed Screen**: Dedicated celebration modal with green animated checkmark, transaction ID, and digital receipt.
- **Live Real-Time Order Tracking**: 4-step interactive preparation & delivery status stepper with simulated GPS driver map animation.
- **Touch Gesture Swipe Navigation**: Swipe right on mobile to return to the discovery home without exiting the app.

### 🍳 2. Restaurant Kitchen Portal
- Live kitchen management view for incoming orders.
- Preparation status progression (`Pending Approval` → `In Kitchen` → `Food Ready`).
- Add new dishes to menu with image selector, pricing, dietary tags, and prep times.

### 🛵 3. Delivery Partner Logistics Portal
- Delivery tasks dashboard with distance, delivery notes, and pickup status.
- Mandatory **18+ Age Restriction Verification** for driver partners.
- Live milestone updates (`Order Picked Up` → `Out for Delivery` → `Delivered`).

---

## 🍽️ Catalog Overview
- **12 Curated Local Kitchens**:
  1. *Bawarchi Dum Biryani House* (Royal Hyderabadi Dum Biryani)
  2. *Milano Woodfired Pizzeria* (Artisan Neapolitan Pizzas & Pastas)
  3. *The Smash Burger Garage* (Smashed Burgers, Loaded Fries & Shakes)
  4. *Sakura Tokyo Sushi Bar* (Sushi Rolls, Miso Ramen & Gyoza)
  5. *Pure Green Buddha Bowls* (Organic Quinoa & Detox Juices)
  6. *El Cantina Street Tacos* (Fiesta Tacos, Quesadillas & Nachos)
  7. *Velvet Chocolate Cafe & Boba* (Lava Cakes, Waffles & Boba Teas)
  8. *Punjab Grill & Tandoor Express* (Butter Chicken, Dal Makhani & Garlic Naan)
  9. *Madras Tiffin Room (MTR 1924)* (Ghee Podi Dosas, Idli-Vada & Filter Coffee)
  10. *Wok & Roll Asian Street* (Darjeeling Momos, Schezwan Noodles & Fried Rice)
  11. *Haldiram's Sweets & Chaat Express* (Raj Kachori, Pani Puri & Gulab Jamun)
  12. *Chai Point & Irani Chai Bakery* (Kadak Irani Chai, Bun Maska & Samosas)
- **84 Authentic Menu Items** with distinct high-resolution photography, caloric data, prep times, and spice indicators.

---

## 🚀 Live Deployment on GitHub Pages

This repository is configured to run live directly via **GitHub Pages**:

1. In this repository, go to **Settings** → **Pages** (in the left sidebar).
2. Under **Build and deployment** → **Branch**:
   - Select **`main`** branch.
   - Select folder: **`/ (root)`**.
   - Click **Save**.
3. In 1–2 minutes, your live site will be accessible at:
   👉 **`https://rohith-1-kumar.github.io/Online-Food-Project/`**

---

## 🛠️ Local Development

To run locally:
```bash
# Using Python
python -m http.server 8080

# Or using Node.js npx serve
npx serve .
```
Then open `http://localhost:8080` in your web browser.

---

## 📄 Evaluation & Standards
- **Pure Web Technologies**: No React/Vue/Angular build dependencies required.
- **Responsive Design**: Flawless UI experience across mobile, tablet, and desktop screens.
- **Zero Console Errors**: Thoroughly tested and validated syntax.

import { useState } from "react";
import { PRODUCTS } from "./products";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [query, setQuery] = useState("");
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);
  const [raw, setRaw] = useState("");

  const callAI = () => {
    if (!query.trim()) {
      alert("Please describe what you're looking for!");
      return;
    }

    setLoading(true);
    setRecommended([]);
    setRaw("");

    const lowerQuery = query.toLowerCase();
    let aiText = "";

    if (lowerQuery.includes("phone") && (lowerQuery.includes("500") || lowerQuery.includes("cheap") || lowerQuery.includes("budget"))) {
      aiText = "Pixel 7a, Samsung Galaxy A54";
    } else if (lowerQuery.includes("phone")) {
      aiText = "iPhone 13, Pixel 7a, Samsung Galaxy A54";
    } else if (lowerQuery.includes("laptop") && (lowerQuery.includes("budget") || lowerQuery.includes("cheap"))) {
      aiText = "HP Pavilion, Dell Inspiron 15";
    } else if (lowerQuery.includes("laptop") && (lowerQuery.includes("gaming") || lowerQuery.includes("powerful"))) {
      aiText = "MacBook Air M2, Dell Inspiron 15";
    } else if (lowerQuery.includes("laptop")) {
      aiText = "Dell Inspiron 15, HP Pavilion, MacBook Air M2";
    } else if (lowerQuery.includes("cloth") || lowerQuery.includes("wear") || lowerQuery.includes("shirt") || lowerQuery.includes("jeans")) {
      aiText = "Nike T-Shirt, Levi's Jeans, Adidas Hoodie, Puma Sneakers";
    } else if (lowerQuery.includes("furniture") || lowerQuery.includes("desk") || lowerQuery.includes("chair") || lowerQuery.includes("office")) {
      aiText = "IKEA Desk, Office Chair, Bookshelf";
    } else if (lowerQuery.includes("book") || lowerQuery.includes("read")) {
      aiText = "Harry Potter Book Set, Atomic Habits, The Alchemist";
    } else if (lowerQuery.includes("sport") || lowerQuery.includes("fitness") || lowerQuery.includes("gym") || lowerQuery.includes("exercise")) {
      aiText = "Yoga Mat, Dumbbells Set, Tennis Racket";
    } else if (lowerQuery.includes("food") || lowerQuery.includes("eat") || lowerQuery.includes("snack")) {
      aiText = "Organic Green Tea, Protein Powder, Dark Chocolate Box";
    } else {
      aiText = "Pixel 7a, Nike T-Shirt, Yoga Mat, Atomic Habits";
    }

    setTimeout(() => {
      setRaw(`AI Analysis Complete: ${aiText}`);
      const names = aiText.split(",").map(s => s.trim().toLowerCase());
      const filtered = PRODUCTS.filter(p =>
        names.some(name => p.name.toLowerCase().includes(name) || name.includes(p.name.toLowerCase()))
      );
      setRecommended(filtered);
      setPage("recommendations");
      setLoading(false);
    }, 1500);
  };

  const categories = [...new Set(PRODUCTS.map(p => p.category))];

  return (
    <div className="app">
      {/* Amazon-style Header */}
      <header className="header">
        <div className="header-top">
          <div className="logo-section">
            <h1 className="logo">ShopAI</h1>
            <span className="tagline">AI-Powered Shopping</span>
          </div>
          
          <div className="search-header">
            <input 
              type="text" 
              placeholder="Search products..." 
              className="search-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="search-btn" onClick={callAI} disabled={loading}>
              {loading ? "⏳" : "🔍"}
            </button>
          </div>

          <div className="header-actions">
            <button className="header-btn">
              <span className="icon">👤</span>
              <span className="label">Account</span>
            </button>
            <button className="header-btn">
              <span className="icon">🛒</span>
              <span className="label">Cart</span>
            </button>
          </div>
        </div>

        <nav className="nav-bar">
          <button onClick={() => setPage("home")} className={page === "home" ? "nav-item active" : "nav-item"}>
            Home
          </button>
          <button onClick={() => setPage("products")} className={page === "products" ? "nav-item active" : "nav-item"}>
            All Products
          </button>
          <button onClick={() => setPage("recommendations")} className={page === "recommendations" ? "nav-item active" : "nav-item"}>
            AI Recommendations
          </button>
        </nav>
      </header>

      {/* Home Page */}
      {page === "home" && (
        <div className="home-page">
          {/* Hero Banner */}
          <div className="hero-banner">
            <div className="hero-content">
              <h1 className="hero-title">Experience AI-Powered Shopping</h1>
              <p className="hero-text">
                Discover products tailored to your needs with our intelligent recommendation system
              </p>
              <button className="cta-button" onClick={() => setPage("products")}>
                Shop Now
              </button>
            </div>
          </div>

          {/* AI Search Section */}
          <div className="ai-search-section">
            <div className="section-header">
              <h2 className="section-title">Find Products with AI</h2>
              <p className="section-subtitle">Describe what you need, and let AI find it for you</p>
            </div>
            <div className="ai-search-box">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Try: "I need a budget-friendly laptop for programming" or "Looking for comfortable running shoes under $150"'
                rows={3}
                className="ai-textarea"
              />
              <button onClick={callAI} disabled={loading} className="ai-search-btn">
                {loading ? "🔄 Analyzing..." : "Get AI Recommendations"}
              </button>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="categories-section">
            <h2 className="section-title">Shop by Category</h2>
            <div className="categories-grid">
              {categories.map((cat, idx) => (
                <div key={idx} className="category-card" onClick={() => setPage("products")}>
                  <div className="category-icon">
                    {cat === "phone" && "📱"}
                    {cat === "laptop" && "💻"}
                    {cat === "clothing" && "👕"}
                    {cat === "furniture" && "🪑"}
                    {cat === "books" && "📚"}
                    {cat === "sports" && "⚽"}
                    {cat === "food" && "🍎"}
                  </div>
                  <h3 className="category-name">{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
                  <p className="category-count">{PRODUCTS.filter(p => p.category === cat).length} items</p>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="how-section">
            <h2 className="section-title">How ShopAI Works</h2>
            <div className="how-grid">
              <div className="how-card">
                <div className="how-number">1</div>
                <h3 className="how-title">Describe Your Need</h3>
                <p className="how-text">
                  Simply type what you're looking for in natural language. Include details like budget, 
                  preferences, or specific features you want.
                </p>
              </div>
              <div className="how-card">
                <div className="how-number">2</div>
                <h3 className="how-title">AI Analyzes</h3>
                <p className="how-text">
                  Our advanced AI processes your request, understanding context, budget constraints, 
                  and product categories to find the best matches.
                </p>
              </div>
              <div className="how-card">
                <div className="how-number">3</div>
                <h3 className="how-title">Get Results</h3>
                <p className="how-text">
                  Receive personalized product recommendations instantly. Each suggestion is carefully 
                  selected based on your specific requirements.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="features-section">
            <h2 className="section-title">Why Choose ShopAI?</h2>
            <div className="features-grid">
              <div className="feature-box">
                <div className="feature-icon">🤖</div>
                <h3 className="feature-title">AI-Powered Intelligence</h3>
                <p className="feature-desc">
                  Advanced machine learning algorithms understand your needs and preferences to deliver 
                  accurate product recommendations every time.
                </p>
              </div>
              <div className="feature-box">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">Instant Results</h3>
                <p className="feature-desc">
                  Get personalized recommendations in seconds. No more endless scrolling or searching 
                  through irrelevant products.
                </p>
              </div>
              <div className="feature-box">
                <div className="feature-icon">🎯</div>
                <h3 className="feature-title">Smart Filtering</h3>
                <p className="feature-desc">
                  Automatically filters products based on your budget, category preferences, and specific 
                  requirements mentioned in your query.
                </p>
              </div>
              <div className="feature-box">
                <div className="feature-icon">💬</div>
                <h3 className="feature-title">Natural Language</h3>
                <p className="feature-desc">
                  No complex filters or forms. Just describe what you want in plain English, and our AI 
                  does the rest.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Page */}
      {page === "products" && (
        <div className="products-page">
          <div className="page-header">
            <h1 className="page-title">All Products</h1>
            <p className="page-subtitle">Browse our complete collection of {PRODUCTS.length} products</p>
          </div>
          <div className="products-grid">
            {PRODUCTS.map(p => (
              <div key={p.id} className="product-card">
                <div className="product-image">
                  <div className="product-placeholder">
                    {p.category === "phone" && "📱"}
                    {p.category === "laptop" && "💻"}
                    {p.category === "clothing" && "👕"}
                    {p.category === "furniture" && "🪑"}
                    {p.category === "books" && "📚"}
                    {p.category === "sports" && "⚽"}
                    {p.category === "food" && "🍎"}
                  </div>
                </div>
                <div className="product-info">
                  <span className="product-category">{p.category}</span>
                  <h3 className="product-name">{p.name}</h3>
                  <div className="product-rating">⭐⭐⭐⭐⭐ (4.5)</div>
                  <div className="product-price">${p.price}</div>
                  <button className="add-cart-btn">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations Page */}
      {page === "recommendations" && (
        <div className="recommendations-page">
          <div className="page-header">
            <h1 className="page-title">AI Recommendations</h1>
            <p className="page-subtitle">Products selected specifically for you</p>
          </div>

          {recommended.length > 0 ? (
            <>
              <div className="recommended-grid">
                {recommended.map(p => (
                  <div key={p.id} className="recommended-card">
                    <div className="rec-badge">AI Recommended</div>
                    <div className="product-image">
                      <div className="product-placeholder">
                        {p.category === "phone" && "📱"}
                        {p.category === "laptop" && "💻"}
                        {p.category === "clothing" && "👕"}
                        {p.category === "furniture" && "🪑"}
                        {p.category === "books" && "📚"}
                        {p.category === "sports" && "⚽"}
                        {p.category === "food" && "🍎"}
                      </div>
                    </div>
                    <div className="product-info">
                      <span className="product-category">{p.category}</span>
                      <h3 className="product-name">{p.name}</h3>
                      <div className="product-rating">⭐⭐⭐⭐⭐ (4.8)</div>
                      <div className="product-price">${p.price}</div>
                      <button className="add-cart-btn primary">Add to Cart</button>
                    </div>
                  </div>
                ))}
              </div>

              {raw && (
                <div className="ai-analysis">
                  <h3 className="analysis-title">🤖 AI Analysis</h3>
                  <p className="analysis-text">{raw}</p>
                </div>
              )}
            </>
          ) : (
            <div className="empty-recommendations">
              <div className="empty-icon">🔍</div>
              <h2 className="empty-title">No Recommendations Yet</h2>
              <p className="empty-text">
                Use the AI search feature on the home page to get personalized product recommendations
              </p>
              <button onClick={() => setPage("home")} className="cta-button">
                Try AI Search
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4 className="footer-title">About ShopAI</h4>
            <p className="footer-text">
              ShopAI revolutionizes online shopping with AI-powered product recommendations. 
              Find exactly what you need, faster than ever before.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>About Us</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Customer Service</h4>
            <ul className="footer-links">
              <li>Help Center</li>
              <li>Returns</li>
              <li>Shipping Info</li>
              <li>Track Order</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 ShopAI. All rights reserved. | Powered by AI Technology</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

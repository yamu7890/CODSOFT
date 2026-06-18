import React, { useState } from 'react';
import './App.css';

const PRODUCT_CATALOG = [
    { id: 1, name: 'Developer Keyboard', price: 120, category: 'Hardware' },
    { id: 2, name: 'Precision Wireless Mouse', price: 80, category: 'Hardware' },
    { id: 3, name: 'UltraWide Pro Monitor', price: 450, category: 'Electronics' },
    { id: 4, name: 'Premium Noise-Cancelling Headphones', price: 290, category: 'Electronics' }
];

export default function App() {
    const [cart, setCart] = useState([]);
    const [filterCategory, setFilterCategory] = useState('All');

    const addToCart = (product) => {
        setCart(prevCart => {
            const matchIndex = prevCart.findIndex(item => item.id === product.id);
            if (matchIndex > -1) {
                const nextCart = [...prevCart];
                nextCart[matchIndex].quantity += 1;
                return nextCart;
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const filteredItems = filterCategory === 'All' 
        ? PRODUCT_CATALOG 
        : PRODUCT_CATALOG.filter(p => p.category === filterCategory);

    const totalCheckoutPrice = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

    return (
        <div className="storefront-app">
            <header className="store-header">
                <h2>ProTech Systems Marketplace</h2>
                <div className="filter-controls">
                    <button onClick={() => setFilterCategory('All')}>All Products</button>
                    <button onClick={() => setFilterCategory('Hardware')}>Hardware</button>
                    <button onClick={() => setFilterCategory('Electronics')}>Electronics</button>
                </div>
            </header>

            <main className="store-layout">
                <section className="catalog-grid">
                    {filteredItems.map(prod => (
                        <div key={prod.id} className="item-card">
                            <h3>{prod.name}</h3>
                            <p className="price">${prod.price}</p>
                            <button onClick={() => addToCart(prod)}>Add to Order Cart</button>
                        </div>
                    ))}
                </section>

                <aside className="checkout-sidebar">
                    <h3>Your Cart</h3>
                    {cart.length === 0 ? <p>Cart is empty</p> : (
                        <div>
                            {cart.map(item => (
                                <div key={item.id} className="cart-row">
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>${item.price * item.quantity}</span>
                                </div>
                            ))}
                            <hr />
                            <div className="total-row">
                                <strong>Total: ${totalCheckoutPrice}</strong>
                            </div>
                            <button className="checkout-btn" onClick={() => alert('Proceeding to Gateway Payment setup')}>Proceed to Secure Payment</button>
                        </div>
                    )}
                </aside>
            </main>
        </div>
    );
}

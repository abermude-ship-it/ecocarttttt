import React, { useEffect, useState } from "react";

// Ecommerce Prototype - Single-file React component
// Drop this into a Create React App or Vite React project as `src/App.jsx`.
// Requirements: Tailwind CSS configured in the project.
// Optional: replace placeholder images with your own. This is a small storefront prototype
// with product catalog, cart, localStorage persistence, and a mock checkout flow.

export default function EcommercePrototype() {
  const initialProducts = [
    {
      id: "p1",
      title: "Eco Tumbler",
      desc: "Insulated stainless steel tumbler — keeps drinks hot or cold.",
      price: 24.99,
      img: "https://images.unsplash.com/photo-1516594798943-3f6e6b1b6d5b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2b8b1e2d4a9e4f5c2c6f1a1d2c9b1f6d",
      inventory: 12,
    },
    {
      id: "p2",
      title: "Canvas Tote",
      desc: "Durable canvas tote bag — perfect for groceries or work.",
      price: 18.5,
      img: "https://images.unsplash.com/photo-1475180098328-9b0b77a4f6b2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=9f3d9c2b8a1b4b7e1d6c1f7a8b9c3d2e",
      inventory: 20,
    },
    {
      id: "p3",
      title: "Notebook Pack",
      desc: "3-pack ruled notebooks. Great for students and notes.",
      price: 12.0,
      img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
      inventory: 30,
    },
    {
      id: "p4",
      title: "Desk Plant",
      desc: "Low-maintenance desk plant — brightens up your workspace.",
      price: 15.75,
      img: "https://images.unsplash.com/photo-1445820135717-2e0a1f1f7fdf?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=abc123def456ghi789jkl012mno345pq",
      inventory: 8,
    },
  ];

  const [products] = useState(initialProducts);
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("proto_cart_v1");
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  useEffect(() => {
    localStorage.setItem("proto_cart_v1", JSON.stringify(cart));
  }, [cart]);

  function addToCart(productId, qty = 1) {
    setCart((prev) => {
      const existing = prev[productId] || 0;
      return { ...prev, [productId]: existing + qty };
    });
    setIsCartOpen(true);
  }

  function updateQty(productId, qty) {
    setCart((prev) => {
      if (qty <= 0) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return { ...prev, [productId]: qty };
    });
  }

  function clearCart() {
    setCart({});
  }

  function checkoutMock(customer) {
    // A mock checkout that simulates placing an order.
    // In a real CSP integration you'd call the platform API or redirect to a hosted checkout.
    const items = Object.entries(cart).map(([id, qty]) => {
      const p = products.find((x) => x.id === id);
      return { id, title: p?.title, qty, price: p?.price };
    });
    const subtotal = items.reduce((s, it) => s + it.qty * it.price, 0);
    const order = {
      id: `ORD-${Date.now()}`,
      items,
      subtotal,
      customer,
      placedAt: new Date().toISOString(),
    };
    // pretend it's placed
    setOrderComplete(order);
    clearCart();
    setCheckoutOpen(false);
    setIsCartOpen(false);
  }

  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const p = products.find((x) => x.id === id);
    return { ...p, qty };
  });

  const subtotal = cartItems.reduce((s, it) => s + it.qty * it.price, 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-xl font-bold">EcoCart Prototype</h1>
              <p className="text-sm text-gray-600">A small storefront demo — CSP-ready design</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartOpen((s) => !s)}
                className="relative inline-flex items-center px-4 py-2 border rounded-md bg-white hover:bg-gray-50"
              >
                Cart
                <span className="ml-2 inline-block bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {Object.values(cart).reduce((a, b) => a + b, 0)}
                </span>
              </button>
              <button
                onClick={() => {
                  // quick demo action: open checkout
                  setCheckoutOpen(true);
                }}
                className="inline-flex items-center px-4 py-2 border rounded-md bg-blue-600 text-white hover:brightness-90"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <article key={p.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                <div className="aspect-w-4 aspect-h-3 mb-3 bg-gray-100 rounded overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-medium text-lg">{p.title}</h3>
                <p className="text-sm text-gray-600 flex-1">{p.desc}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold">${p.price.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">{p.inventory} in stock</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(p.id, 1)}
                      className="px-3 py-1 rounded-md border hover:bg-gray-50"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => addToCart(p.id, 3)}
                      className="px-3 py-1 rounded-md border text-sm text-gray-600 hover:bg-gray-50"
                    >
                      +3
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">About this Prototype</h2>
          <div className="bg-white p-4 rounded shadow text-sm text-gray-700">
            This single-file prototype is meant to mirror what you'd build on a Commerce Service
            Provider platform. To integrate with a real CSP (Shopify, WooCommerce, Odoo, etc.) you
            would replace local product data with an API call and use the platform's checkout
            flow or payment gateway.
          </div>
        </section>

        {orderComplete && (
          <section className="mt-8">
            <div className="bg-green-50 border border-green-200 p-4 rounded">
              <h3 className="font-semibold">Order placed — {orderComplete.id}</h3>
              <p className="text-sm text-gray-700">Placed on {new Date(orderComplete.placedAt).toLocaleString()}</p>
              <ul className="mt-2 space-y-1">
                {orderComplete.items.map((it) => (
                  <li key={it.id} className="text-sm">{it.qty} × {it.title} (${(it.price * it.qty).toFixed(2)})</li>
                ))}
              </ul>
              <div className="mt-2 font-semibold">Subtotal: ${orderComplete.subtotal.toFixed(2)}</div>
            </div>
          </section>
        )}
      </main>

      {/* Cart drawer */}
      <aside
        className={`fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg transform transition-transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Your Cart</h3>
          <div className="flex items-center gap-2">
            <button onClick={() => clearCart()} className="text-sm text-red-600">Clear</button>
            <button onClick={() => setIsCartOpen(false)} className="px-2 py-1 border rounded">Close</button>
          </div>
        </div>
        <div className="p-4 overflow-auto h-[calc(100%-160px)]">
          {cartItems.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((it) => (
                <li key={it.id} className="flex items-center gap-3">
                  <img src={it.img} alt={it.title} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium">{it.title}</div>
                    <div className="text-sm text-gray-500">${it.price.toFixed(2)}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => updateQty(it.id, it.qty - 1)} className="px-2 py-0.5 border rounded">-</button>
                      <div className="px-3">{it.qty}</div>
                      <button onClick={() => updateQty(it.id, it.qty + 1)} className="px-2 py-0.5 border rounded">+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-4 border-t">
          <div className="flex justify-between items-center mb-3">
            <div className="text-sm text-gray-600">Subtotal</div>
            <div className="text-lg font-semibold">${subtotal.toFixed(2)}</div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCheckoutOpen(true)}
              disabled={cartItems.length === 0}
              className="flex-1 px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
            >
              Checkout
            </button>
            <button onClick={() => setIsCartOpen(false)} className="px-3 py-2 border rounded">Continue</button>
          </div>
        </div>
      </aside>

      {/* Checkout modal */}
      {checkoutOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-6">
            <h3 className="text-xl font-semibold mb-2">Checkout</h3>
            <p className="text-sm text-gray-600 mb-4">This is a mock checkout. Fill in details and submit to simulate an order.</p>
            <CheckoutForm
              subtotal={subtotal}
              onCancel={() => setCheckoutOpen(false)}
              onSubmit={(customer) => checkoutMock(customer)}
            />
          </div>
        </div>
      )}

      <footer className="mt-12 py-6 text-center text-sm text-gray-500">
        Built for a class prototype — replace with an actual CSP integration for production.
      </footer>
    </div>
  );
}

function CheckoutForm({ subtotal, onCancel, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Basic validation
    if (!name || !email) return alert("Please enter name and email.");
    onSubmit({ name, email, address, total: subtotal });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs text-gray-600">Full name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-xs text-gray-600">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 block w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-xs text-gray-600">Shipping address (optional)</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm">Total: <span className="font-semibold">${subtotal.toFixed(2)}</span></div>
        <div className="flex gap-2">
          <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white">Place order</button>
        </div>
      </div>
    </form>
  );
}

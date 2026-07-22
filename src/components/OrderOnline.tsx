'use client';

import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Utensils } from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

interface CartItem extends FoodItem {
  quantity: number;
}

const FOOD_MENU: FoodItem[] = [
  {
    id: 501,
    name: "Classic Butter Popcorn",
    price: 149,
    category: "Snacks",
    image: "https://unsplash.com",
    description: "Fluffy, freshly popped kernels tossed in real melted gourmet butter."
  },
  {
    id: 502,
    name: "Cheesy Loaded Nachos",
    price: 199,
    category: "Snacks",
    image: "https://unsplash.com",
    description: "Crispy tortilla chips smothered in warm, spicy liquid cheddar and jalapeños."
  },
  {
    id: 503,
    name: "Crispy Chicken Master Burger",
    price: 249,
    category: "Meals",
    image: "https://unsplash.com",
    description: "Golden fried tender chicken breast topped with fresh lettuce and secret smoky mayo."
  },
  {
    id: 504,
    name: "Double-Blast Choco Shake",
    price: 129,
    category: "Beverages",
    image: "https://unsplash.com",
    description: "Rich Belgian chocolate blended with creamy vanilla gelato and fudge bits."
  }
];

export default function OrderOnline() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  // Add Item to Reactive Cart
  const addToCart = (item: FoodItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Reduce or Remove Item Quantity
  const updateQuantity = (id: number, delta: number) => {
    setCart((prevCart) => 
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[]
    );
  };

  // Calculate Aggregates
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const filteredMenu = activeCategory === 'All' 
    ? FOOD_MENU 
    : FOOD_MENU.filter(item => item.category === activeCategory);

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    setTimeout(() => setOrderPlaced(false), 4000);
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in pb-12 text-left">
      
      {/* 1. LEFT 2-COLUMNS: FOOD MENU SECTION */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-3xl font-black text-white flex items-center gap-2">
              CineSnack Food Court <Utensils className="text-amber-500" size={26} />
            </h2>
            <p className="text-zinc-400 text-xs mt-1">Premium theater bites prepared fresh and delivered directly to your streaming seat.</p>
          </div>

          {/* Filter Pill Badges */}
          <div className="flex gap-2 self-start sm:self-center">
            {['All', 'Snacks', 'Meals', 'Beverages'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Food Items Catalog Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredMenu.map((item) => (
            <div key={item.id} className="bg-zinc-900 border border-zinc-800/80 rounded-xl overflow-hidden p-3 flex gap-4 hover:border-zinc-700 transition-colors">
              <div className="w-24 h-24 rounded-lg overflow-hidden bg-black flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <h3 className="text-sm font-bold text-white truncate">{item.name}</h3>
                  <p className="text-[11px] text-zinc-500 line-clamp-2 mt-0.5 leading-tight">{item.description}</p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-black text-amber-500">₹{item.price}</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="flex items-center gap-1 px-3 py-1 bg-zinc-800 hover:bg-amber-500 hover:text-black rounded-lg text-xs font-bold transition-all text-zinc-200"
                  >
                    <Plus size={12} /> Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. RIGHT COLUMN: LIVE BASKET SIDEBAR CARD */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 h-max sticky top-24 shadow-2xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
            <h3 className="font-black text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <ShoppingCart size={16} className="text-amber-500" /> Your Theater Basket
            </h3>
            <span className="bg-zinc-800 text-zinc-300 font-bold px-2 py-0.5 rounded text-[10px] font-mono">
              {totalItems} items
            </span>
          </div>

          {orderPlaced && (
            <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-medium rounded-lg mb-4 text-center animate-scale-up">
              🚀 Order sent to kitchen! Packing your cravings...
            </div>
          )}

          {cart.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 space-y-2">
              <ShoppingCart size={32} className="mx-auto text-zinc-700 stroke-[1.5]" />
              <p className="text-xs font-medium">Your shopping cart is completely empty.</p>
            </div>
          ) : (
            /* Selected Cart List Group */
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-black/30 p-2 border border-zinc-800/40 rounded-lg animate-fade-in">
                  <div className="min-w-0 flex-1 pr-2">
                    <h4 className="text-xs font-bold text-zinc-200 truncate">{item.name}</h4>
                    <span className="text-[10px] text-zinc-500 font-bold font-mono">₹{item.price * item.quantity}</span>
                  </div>
                  
                  {/* Quantity Control Stepper */}
                  <div className="flex items-center gap-2.5 bg-zinc-800 px-2 py-1 rounded-md">
                    <button onClick={() => updateQuantity(item.id, -1)} className="text-zinc-400 hover:text-white cursor-pointer"><Minus size={12} /></button>
                    <span className="text-xs font-black text-white font-mono w-3 text-center">{item.quantity}</span>
                    <button onClick={() => addToCart(item)} className="text-zinc-400 hover:text-white cursor-pointer"><Plus size={12} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Aggregates Calculation & Checkout Action Button */}
        {cart.length > 0 && (
          <div className="border-t border-zinc-800 pt-4 mt-6 space-y-4 animate-fade-in">
            <div className="space-y-1.5 text-xs text-zinc-400">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-mono text-zinc-300">₹{totalPrice}</span></div>
              <div className="flex justify-between text-[11px] text-zinc-500"><span>Kitchen Tax & Delivery Charge</span><span>FREE</span></div>
              <div className="flex justify-between text-sm font-black text-white border-t border-zinc-800/60 pt-2">
                <span>Grand Total</span><span className="text-amber-500 font-mono">₹{totalPrice}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-black font-black text-xs uppercase tracking-wider rounded-lg transition-colors shadow-md"
            >
              Dispatch Order Now 🚀
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_PRODUCTS, Product } from '../data/klookData';
import { 
  Search, 
  ShoppingBag, 
  Star, 
  MapPin, 
  Compass, 
  Ticket, 
  Hotel, 
  Train, 
  Car, 
  Wifi, 
  X, 
  User, 
  LogOut 
} from 'lucide-react';

export default function Home() {
  const { user, login, logout, cart, addToCart, removeFromCart, checkout, orders } = useApp();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'home' | 'bookings'>('home');
  
  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [emailInput, setEmailInput] = useState('');
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Booking Form State
  const [quantity, setQuantity] = useState(1);
  const [bookingDate, setBookingDate] = useState('2026-09-15');

  // Filter Products
  const filteredProducts = ALL_PRODUCTS.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    login(emailInput);
    setIsAuthOpen(false);
    alert(`เข้าสู่ระบบสำเร็จในชื่อ: ${emailInput}`);
  };

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    addToCart(selectedProduct, quantity, bookingDate);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    if (!user) {
      alert('กรุณาเข้าสู่ระบบก่อนทำการชำระเงิน');
      setIsAuthOpen(true);
      return;
    }
    checkout();
    setIsCartOpen(false);
    setActiveTab('bookings');
    alert('🎉 ชำระเงินสำเร็จ! รายการจองของคุณถูกบันทึกเรียบร้อยแล้ว');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 lg:px-8 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => { setActiveTab('home'); setSelectedCategory('all'); }} 
            className="text-2xl font-black text-orange-500 tracking-wider"
          >
            KLOOK
          </button>
          
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-600">
            <button onClick={() => { setActiveTab('home'); setSelectedCategory('theme-park'); }} className="hover:text-orange-500">สวนสนุก & กิจกรรม</button>
            <button onClick={() => { setActiveTab('home'); setSelectedCategory('hotel'); }} className="hover:text-orange-500">โรงแรม & ที่พัก</button>
            <button onClick={() => { setActiveTab('home'); setSelectedCategory('car'); }} className="hover:text-orange-500">เช่ารถยนต์</button>
            <button onClick={() => { setActiveTab('home'); setSelectedCategory('transport'); }} className="hover:text-orange-500">ตั๋วรถไฟ JR</button>
            <button onClick={() => { setActiveTab('home'); setSelectedCategory('wifi'); }} className="hover:text-orange-500">SIM Card & Wi-Fi</button>
          </nav>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          {user && (
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${activeTab === 'bookings' ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:text-orange-500'}`}
            >
              การจองของฉัน ({orders.length})
            </button>
          )}

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-600 hover:text-orange-500"
          >
            <ShoppingBag className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3 bg-gray-100 px-3 py-1.5 rounded-full">
              <User className="w-4 h-4 text-orange-500" />
              <span className="font-bold text-gray-700 text-xs">{user.name}</span>
              <button onClick={logout} title="ออกจากระบบ" className="text-gray-400 hover:text-red-500 ml-1">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setIsAuthOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-md active:scale-95"
            >
              เข้าสู่ระบบ / สมัครสมาชิก
            </button>
          )}
        </div>
      </header>

      {/* TAB 1: HOME PAGE */}
      {activeTab === 'home' && (
        <>
          <section className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white py-14 px-4 text-center">
            {/* เนื้อหา Hero Banner และส่วนค้นหา */}
          </section>
        </>
      )}
    </div>
  );
}

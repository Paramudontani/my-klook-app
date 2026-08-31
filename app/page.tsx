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
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [emailInput, setEmailInput] = useState<string>('');
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  
  // Booking Form State
  const [quantity, setQuantity] = useState<number>(1);
  const [bookingDate, setBookingDate] = useState<string>('2026-09-15');

// Filter Products (Validates selected category and matches search query string)
const filteredProducts = ALL_PRODUCTS.filter((item) => {
  const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    login(emailInput);
    setIsAuthOpen(false);
    setEmailInput('');
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

  const handleCategorySelect = (categoryId: string) => {
    setActiveTab('home');
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 px-4 lg:px-8 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => handleCategorySelect('all')} 
            className="text-2xl font-black text-orange-500 tracking-wider hover:opacity-90 transition-opacity"
          >
            KLOOK
          </button>
          
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-600">
            <button onClick={() => handleCategorySelect('theme-park')} className="hover:text-orange-500 transition-colors">สวนสนุก & กิจกรรม</button>
            <button onClick={() => handleCategorySelect('hotel')} className="hover:text-orange-500 transition-colors">โรงแรม & ที่พัก</button>
            <button onClick={() => handleCategorySelect('car')} className="hover:text-orange-500 transition-colors">เช่ารถยนต์</button>
            <button onClick={() => handleCategorySelect('transport')} className="hover:text-orange-500 transition-colors">ตั๋วรถไฟ JR</button>
            <button onClick={() => handleCategorySelect('wifi')} className="hover:text-orange-500 transition-colors">SIM Card & Wi-Fi</button>
          </nav>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          {user && (
            <button 
              onClick={() => setActiveTab('bookings')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeTab === 'bookings' ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:text-orange-500'
              }`}
            >
              การจองของฉัน ({orders.length})
            </button>
          )}

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-gray-600 hover:text-orange-500 transition-colors"
            aria-label="ตะกร้าสินค้า"
          >
            <ShoppingBag className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {cart.length}
              </span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3 bg-gray-100 px-3 py-1.5 rounded-full">
              <User className="w-4 h-4 text-orange-500" />
              <span className="font-bold text-gray-700 text-xs">{user.name || user.email}</span>
              <button onClick={logout} title="ออกจากระบบ" className="text-gray-400 hover:text-red-500 ml-1 transition-colors">
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
          {/* HERO BANNER & SEARCH BAR */}
          <section className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white py-14 px-4 text-center">
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-3xl sm:text-5xl font-extrabold">ค้นหาและจองประสบการณ์เที่ยวทั่วโลก</h1>
              <p className="text-orange-100 text-base">ตั๋วสวนสนุก โรงแรมหรู รถเช่า และซิมการ์ด ครบจบในที่เดียว</p>
              
              <div className="mt-8 bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto text-gray-700">
                <div className="flex-1 flex items-center px-3 gap-2">
                  <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="พิมพ์ค้นหา (เช่น USJ, โตเกียว, โรงแรม, รถเช่า, SIM)..." 
                    className="w-full bg-transparent focus:outline-none text-sm py-2"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* CATEGORIES & PRODUCTS */}
          <section className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
              {[
                { id: 'all', name: 'ทั้งหมด', icon: Compass },
                { id: 'theme-park', name: 'สวนสนุก & กิจกรรม', icon: Ticket },
                { id: 'hotel', name: 'โรงแรม & ที่พัก', icon: Hotel },
                { id: 'car', name: 'เช่ารถยนต์', icon: Car },
                { id: 'transport', name: 'ตั๋วรถไฟ JR', icon: Train },
                { id: 'wifi', name: 'SIM Card & Wi-Fi', icon: Wifi },
              ].map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      isActive ? 'bg-orange-500 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {selectedCategory === 'all' ? 'รายการแนะนำยอดนิยมทั้งหมด' : `รายการในหมวดหมู่: ${selectedCategory}`}
              </h2>
              <p className="text-sm text-gray-500 mb-6">คลิกรายการเพื่อดูรายละเอียด เลือกวัน และสั่งจองได้ทันที</p>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                  <p className="text-gray-400">ไม่พบรายการที่คุณค้นหา</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => { setSelectedProduct(product); setQuantity(1); }}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                    >
                      <div className="relative h-48 bg-gray-100">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow">
                          {product.tag}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <span className="text-xs text-gray-400 flex items-center gap-1 mb-1">
                            <MapPin className="w-3 h-3" /> {product.location}
                          </span>
                          <h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors">
                            {product.title}
                          </h3>
                        </div>

                        <div className="pt-2 border-t border-gray-50">
                          <div className="flex items-center gap-1 text-xs mb-1">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-bold">{product.rating}</span>
                            <span className="text-gray-400">({product.reviews.toLocaleString()})</span>
                          </div>
                          <div className="flex items-baseline justify-between">
                            <span className="text-xs text-gray-400 line-through">฿{product.originalPrice.toLocaleString()}</span>
                            <span className="text-lg font-black text-orange-500">฿{product.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* TAB 2: MY BOOKINGS PAGE */}
      {activeTab === 'bookings' && (
        <section className="max-w-4xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">ประวัติการสั่งซื้อและวอเชอร์ของคุณ</h2>
          
          {orders.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl text-center shadow-sm border border-gray-100">
              <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">คุณยังไม่มีรายการจองในระบบ</p>
              <button 
                onClick={() => setActiveTab('home')} 
                className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-sm"
              >
                เลือกซื้อกิจกรรมเลย
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex gap-4">
                    <img src={item.product.image} alt={item.product.title} className="w-24 h-24 object-cover rounded-xl bg-gray-100" />
                    <div>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded">ชำระเงินเรียบร้อย</span>
                      <h3 className="font-bold text-gray-900 text-base mt-1">{item.product.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">วันเดินทาง/ใช้งาน: {item.date}</p>
                      <p className="text-xs text-gray-500">จำนวน: {item.quantity} รายการ</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col justify-between items-end sm:items-end">
                    <span className="text-xl font-black text-orange-500">฿{(item.product.price * item.quantity).toLocaleString()}</span>
                    <button 
                      onClick={() => alert(`QR Code วอเชอร์ของคุณคือ: KLOOK-VO-${Math.floor(Math.random() * 899999 + 100000)}`)} 
                      className="bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors mt-2 sm:mt-0"
                    >
                      แสดง QR วอเชอร์
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* MODAL 1: PRODUCT DETAIL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full sm:w-48 h-36 object-cover rounded-xl bg-gray-100" />
              <div>
                <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2.5 py-0.5 rounded">{selectedProduct.tag}</span>
                <h3 className="font-bold text-lg text-gray-900 mt-1">{selectedProduct.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{selectedProduct.location}</p>
                <p className="text-xs text-gray-600 mt-2">{selectedProduct.description}</p>
              </div>
            </div>

            <div className="space-y-4 border-t border-gray-100 pt-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1">ระบุวันเดินทาง / วันเข้าพัก</label>
                <input 
                  type="date" 
                  value={bookingDate} 
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-500" 
                />
              </div>

              <div className="flex items-center justify-between py-2 border-y border-gray-100">
                <span className="font-bold text-sm">จำนวน (บัตร/ห้อง/คัน)</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-lg border font-bold text-lg hover:bg-gray-100">-</button>
                  <span className="font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 rounded-lg border font-bold text-lg hover:bg-gray-100">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-xs text-gray-400">ราคารวม</p>
                  <p className="text-2xl font-black text-orange-500">฿{(selectedProduct.price * quantity).toLocaleString()}</p>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
                >
                  ใส่ตะกร้าสินค้า
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CART */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 relative flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-900">ตะกร้าของคุณ ({cart.length})</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-400">ยังไม่มีสินค้าในตะกร้า</div>
              ) : (
                <div className="mt-4 space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                  {cart.map((item, index) => (
                    <div key={index} className="p-3 border border-gray-100 rounded-xl flex justify-between gap-3 bg-gray-50">
                      <div>
                        <h4 className="text-xs font-bold line-clamp-1">{item.product.title}</h4>
                        <p className="text-xs text-gray-500">วันที่: {item.date}</p>
                        <p className="text-xs text-gray-500">จำนวน: {item.quantity}</p>
                        <p className="text-sm font-bold text-orange-500 mt-1">฿{(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <button onClick={() => removeFromCart(index)} className="text-red-400 text-xs hover:underline">ลบ</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>ราคารวมทั้งหมด</span>
                  <span className="text-orange-500">฿{cart.reduce((s, i) => s + (i.product.price * i.quantity), 0).toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-95"
                >
                  สั่งซื้อและชำระเงินทันที
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: AUTH */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative shadow-2xl">
            <button onClick={() => setIsAuthOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-black text-center text-gray-900 mb-2">
              {authMode === 'login' ? 'เข้าสู่ระบบ Klook' : 'สมัครสมาชิก Klook'}
            </h3>

            <form onSubmit={handleLoginSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">อีเมลของคุณ</label>
                <input 
                  type="email" 
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">รหัสผ่าน</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••" 
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-500" 
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all shadow-md active:scale-95"
              >
                {authMode === 'login' ? 'เข้าสู่ระบบ' : 'ยืนยันการสมัครสมาชิก'}
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-gray-500">
              {authMode === 'login' ? (
                <p>ยังไม่มีบัญชี? <button onClick={() => setAuthMode('register')} className="text-orange-500 font-bold hover:underline">สมัครสมาชิก</button></p>
              ) : (
                <p>มีบัญชีอยู่แล้ว? <button onClick={() => setAuthMode('login')} className="text-orange-500 font-bold hover:underline">เข้าสู่ระบบ</button></p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

import React from 'react';
import { Search, Globe, User, ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* 1. HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 lg:px-8 py-3 flex items-center justify-between shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <span className="text-2xl font-black text-orange-500 tracking-wider">
            KLOOK
          </span>
          {/* Quick Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-orange-500 transition-colors">เที่ยวไทย</a>
            <a href="#" className="hover:text-orange-500 transition-colors">ตั๋วรถไฟ / ตั๋วเครื่องบิน</a>
            <a href="#" className="hover:text-orange-500 transition-colors">โรงแรม & ที่พัก</a>
            <a href="#" className="hover:text-orange-500 transition-colors">บัตรเข้าชมสถานที่ท่องเที่ยว</a>
          </nav>
        </div>

        {/* Right Action Menu */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <button className="hidden sm:flex items-center gap-1 text-gray-600 hover:text-orange-500">
            <Globe className="w-4 h-4" />
            <span>THB / TH</span>
          </button>
          <button className="text-gray-600 hover:text-orange-500">
            <ShoppingBag className="w-5 h-5" />
          </button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-orange-600 transition-colors shadow-sm">
            เข้าสู่ระบบ / สมัครสมาชิก
          </button>
        </div>
      </header>

      {/* 2. HERO BANNER + SEARCH BAR */}
      <section className="relative bg-gradient-to-r from-orange-500 to-amber-500 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            ปลดล็อกประสบการณ์เที่ยวทั่วโลก
          </h1>
          <p className="text-orange-100 text-base sm:text-lg">
            ค้นหากิจกรรม บัตรเข้าชม โรงแรม และรถเช่าราคาพิเศษ
          </p>

          {/* Search Box */}
          <div className="mt-8 bg-white rounded-2xl p-2 sm:p-3 shadow-xl flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto text-gray-700">
            <div className="flex-1 flex items-center px-3 gap-2 border-b sm:border-b-0 sm:border-r border-gray-200 py-2 sm:py-0">
              <Search className="w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="ไปเที่ยวที่ไหนดี? (เช่น โตเกียว, ภูเก็ต, บานาฮิลล์)" 
                className="w-full bg-transparent focus:outline-none text-sm sm:text-base"
              />
            </div>
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md">
              ค้นหา
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}

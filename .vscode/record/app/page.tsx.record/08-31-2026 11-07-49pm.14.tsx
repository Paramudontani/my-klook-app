import React from 'react';
import { Search, Globe, ShoppingBag, Star, MapPin } from 'lucide-react';

// ข้อมูลจำลองกิจกรรมยอดนิยม
const POPULAR_ACTIVITIES = [
  {
    id: 1,
    title: 'บัตรเข้าชมสวนสนุก สวนน้ำ และธีมพาร์ค ยูนิเวอร์แซล สตูดิโอ เจแปน (USJ)',
    location: 'โอซาก้า, ญี่ปุ่น',
    rating: 4.8,
    reviews: '52,410',
    price: '2,150',
    originalPrice: '2,400',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    tag: 'ขายดีที่สุด'
  },
  {
    id: 2,
    title: 'บัตรเข้าชมจุดชมวิว Shibuya Sky ตั๋วเข้าชมล่วงหน้าราคาพิเศษ',
    location: 'โตเกียว, ญี่ปุ่น',
    rating: 4.9,
    reviews: '38,120',
    price: '580',
    originalPrice: '650',
    image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&q=80',
    tag: 'ยอดนิยม'
  },
  {
    id: 3,
    title: 'ทัวร์วันเดียว เที่ยวเกาะพีพี เกาะไข่ และมาหยา โดยเรือสปีดโบ๊ท',
    location: 'ภูเก็ต, ไทย',
    rating: 4.7,
    reviews: '12,940',
    price: '1,290',
    originalPrice: '1,800',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    tag: 'ลดพิเศษ'
  },
  {
    id: 4,
    title: 'บัตรเข้าชมสวนสนุก Hong Kong Disneyland ลิขสิทธิ์แท้',
    location: 'ฮ่องกง',
    rating: 4.8,
    reviews: '41,050',
    price: '2,890',
    originalPrice: '3,100',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    tag: 'ขายดีที่สุด'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      
      {/* 1. HEADER / NAVBAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 lg:px-8 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-black text-orange-500 tracking-wider cursor-pointer">
            KLOOK
          </span>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-orange-500 transition-colors">เที่ยวไทย</a>
            <a href="#" className="hover:text-orange-500 transition-colors">ตั๋วรถไฟ / ตั๋วเครื่องบิน</a>
            <a href="#" className="hover:text-orange-500 transition-colors">โรงแรม & ที่พัก</a>
            <a href="#" className="hover:text-orange-500 transition-colors">บัตรเข้าชมสถานที่ท่องเที่ยว</a>
          </nav>
        </div>

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

      {/* 3. POPULAR ACTIVITIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">กิจกรรมยอดนิยมฮิตติดเทรนด์</h2>
            <p className="text-sm text-gray-500 mt-1">จุดหมายปลายทางและประสบการณ์สุดพิเศษที่คุณไม่ควรพลาด</p>
          </div>
          <a href="#" className="text-sm font-bold text-orange-500 hover:underline">ดูทั้งหมด →</a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_ACTIVITIES.map((activity) => (
            <div 
              key={activity.id} 
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
            >
              {/* Image & Badge */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md">
                  {activity.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{activity.location}</span>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 leading-snug group-hover:text-orange-500 transition-colors">
                    {activity.title}
                  </h3>
                </div>

                <div>
                  {/* Rating */}
                  <div className="flex items-center gap-1 text-xs mb-2">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-gray-800">{activity.rating}</span>
                    <span className="text-gray-400">({activity.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 pt-2 border-t border-gray-50">
                    <span className="text-xs text-gray-400 line-through">฿{activity.originalPrice}</span>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">เริ่มต้น </span>
                      <span className="text-lg font-bold text-orange-500">฿{activity.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
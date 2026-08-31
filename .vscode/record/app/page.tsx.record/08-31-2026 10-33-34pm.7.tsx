import Navbar from '@/components/Navbar';
import HeroSearch from '@/components/HeroSearch';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <HeroSearch />
      
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">กิจกรรมยอดนิยม</h2>
        <div className="text-slate-500 italic">กำลังเตรียมการดึงข้อมูลจาก Database...</div>
      </section>
    </main>
  );
}

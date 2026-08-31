import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Hotel, Ticket, Car, Utensils, Sparkles, Wifi, Search } from 'lucide-react';

export default function HeroSearch() {
  return (
    <div className="relative bg-gradient-to-r from-orange-500 to-amber-500 py-16 px-4 text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          ปลดล็อกทุกความสนุกในการเดินทาง
        </h1>
        <p className="mt-3 text-lg opacity-90">
          จองโรงแรม ตั๋วท่องเที่ยว รถเช่า และกิจกรรมมากมายทั่วโลก
        </p>

        {/* Service Search Box */}
        <div className="mt-8 rounded-xl bg-white p-4 shadow-2xl text-slate-800">
          <Tabs defaultValue="attractions" className="w-full">
            {/* Tab List */}
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-1 bg-slate-100 p-1 rounded-lg">
              <TabsTrigger value="attractions" className="flex gap-2 items-center">
                <Ticket className="h-4 w-4" /> ตั๋ว/กิจกรรม
              </TabsTrigger>
              <TabsTrigger value="hotels" className="flex gap-2 items-center">
                <Hotel className="h-4 w-4" /> ที่พัก
              </TabsTrigger>
              <TabsTrigger value="cars" className="flex gap-2 items-center">
                <Car className="h-4 w-4" /> เช่ารถ
              </TabsTrigger>
              <TabsTrigger value="food" className="flex gap-2 items-center">
                <Utensils className="h-4 w-4" /> ร้านอาหาร
              </TabsTrigger>
              <TabsTrigger value="spa" className="flex gap-2 items-center">
                <Sparkles className="h-4 w-4" /> สปา
              </TabsTrigger>
              <TabsTrigger value="sim" className="flex gap-2 items-center">
                <Wifi className="h-4 w-4" /> ซิม/eSIM
              </TabsTrigger>
            </TabsList>

            {/* Search Input Box */}
            <div className="mt-4 flex flex-col md:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="ค้นหาสถานที่ท่องเที่ยว, จุดหมายปลายทาง หรือชื่อกิจกรรม..."
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button size="lg" className="h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8">
                ค้นหา
              </Button>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

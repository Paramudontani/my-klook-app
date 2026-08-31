import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Globe } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight text-orange-500">
            MY<span className="text-slate-900">KLOOK</span>
          </span>
        </Link>

        {/* Right Menu */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Globe className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <Button variant="default" className="bg-orange-500 hover:bg-orange-600">
            <User className="mr-2 h-4 w-4" /> เข้าสู่ระบบ / สมัครสมาชิก
          </Button>
        </div>
      </div>
    </header>
  );
}

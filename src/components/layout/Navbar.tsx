'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, ShoppingBag, Video, Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const consumerNavItems = [
  { href: '/consumer', label: '首页', icon: Leaf },
  { href: '/consumer/dramas', label: '短剧广场', icon: Video },
  { href: '/consumer/shop', label: '农产品商城', icon: ShoppingBag },
];

const farmerNavItems = [
  { href: '/farmer', label: '首页', icon: Leaf },
  { href: '/farmer/create', label: '创建短剧', icon: Video },
  { href: '/farmer/products', label: '我的商品', icon: ShoppingBag },
];

interface NavbarProps {
  mode: 'consumer' | 'farmer';
}

export function Navbar({ mode }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navItems = mode === 'consumer' ? consumerNavItems : farmerNavItems;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={mode === 'consumer' ? '/' : '/'} className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2d5016] to-[#4a7c23] flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-[#2d5016]">乡见</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className={`gap-2 ${
                      isActive
                        ? 'bg-[#2d5016] text-white hover:bg-[#4a7c23]'
                        : 'text-[#2d5016]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Mode Switch */}
          <div className="flex items-center gap-2">
            <Link href={mode === 'consumer' ? '/farmer' : '/'}>
              <Button variant="outline" size="sm" className="border-[#4a7c23] text-[#2d5016] hover:bg-[#4a7c23]/10">
                切换为{mode === 'consumer' ? '农户端' : '消费端'}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px]">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <Button
                          variant={isActive ? 'secondary' : 'ghost'}
                          className={`w-full justify-start gap-2 ${
                            isActive
                              ? 'bg-[#2d5016] text-white'
                              : 'text-[#2d5016]'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, ShoppingCart, Package, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

interface NavigationProps {
  cartItemsCount?: number;
}

export function Navigation({ cartItemsCount = 0 }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { name: '首頁', href: '/' },
    { name: '商品總覽', href: '/products' },
    { name: '關於品牌', href: '/about' },
  ];

  return (
    <nav className="h-16 bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground hidden sm:block">
            紙箱小屋
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Cart and Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Shopping Cart */}
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground border-0"
                >
                  {cartItemsCount > 99 ? '99+' : cartItemsCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-xl">紙箱小屋</span>
                  </div>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon">
                      <X className="w-5 h-5" />
                    </Button>
                  </SheetClose>
                </div>

                {navigationItems.map((item) => (
                  <SheetClose asChild key={item.name}>
                    <Link
                      href={item.href}
                      className="text-lg font-medium py-2 px-4 rounded-lg hover:bg-primary/10 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}

                <div className="pt-4 border-t">
                  <SheetClose asChild>
                    <Link
                      href="/cart"
                      className="flex items-center space-x-3 text-lg font-medium py-2 px-4 rounded-lg hover:bg-primary/10 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span>購物車</span>
                      {cartItemsCount > 0 && (
                        <Badge className="bg-primary text-primary-foreground">
                          {cartItemsCount}
                        </Badge>
                      )}
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
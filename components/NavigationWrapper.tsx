'use client';

import { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { useCart } from '@/lib/CartContext';

export function NavigationWrapper() {
  const [mounted, setMounted] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Navigation cartItemsCount={0} />;
  }

  return <Navigation cartItemsCount={totalItems} />;
}
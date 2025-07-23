'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  ArrowLeft,
  Package,
  Truck
} from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [deletingItems, setDeletingItems] = useState<Set<number>>(new Set());

  const formatPrice = (priceInCents: number): string => {
    return `NT$ ${(priceInCents / 100).toLocaleString()}`;
  };

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId: number) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    // Add cardboard folding animation effect
    setDeletingItems(prev => new Set(prev).add(itemId));
    
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 300));
    
    removeFromCart(itemId);
    setDeletingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
    
    toast.success('已移除商品', {
      description: `${item.name} 已從購物車中移除`,
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('購物車已清空');
  };

  const shippingFee = totalPrice > 0 ? (totalPrice >= 150000 ? 0 : 8000) : 0; // Free shipping over NT$1500
  const finalTotal = totalPrice + shippingFee;

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
            <div className="text-6xl">🐻📦</div>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">購物車是空的</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            還沒有選購任何商品嗎？快去看看我們的精美紙箱傢俱吧！
          </p>
          <Link href="/products">
            <Button size="lg" className="cardboard-btn-primary">
              <Package className="w-5 h-5 mr-2" />
              開始購物
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">購物車</h1>
          <p className="text-muted-foreground">
            共 {totalItems} 件商品
          </p>
        </div>
        <Link href="/products">
          <Button variant="outline" className="cardboard-btn-secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            繼續購物
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="cardboard-card">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  購物清單
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleClearCart}
                  className="text-muted-foreground hover:text-destructive"
                >
                  清空購物車
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className={`flex flex-col sm:flex-row gap-4 p-4 border border-border rounded-lg transition-all duration-300 ${
                    deletingItems.has(item.id) 
                      ? 'opacity-0 scale-95 transform rotate-1' 
                      : 'opacity-100 scale-100'
                  }`}
                >
                  {/* Product Image */}
                  <Link href={`/products/${item.id}`} className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-semibold text-foreground mb-2 hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <div className="text-muted-foreground text-sm mb-2">
                      單價: {formatPrice(item.price_in_cents)}
                    </div>
                    <Badge className="cardboard-badge-success">現貨</Badge>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={deletingItems.has(item.id)}
                        className="h-8 w-8"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="px-3 py-1 min-w-[50px] text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        disabled={deletingItems.has(item.id)}
                        className="h-8 w-8"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[100px]">
                      <div className="cardboard-price text-lg">
                        {formatPrice(item.subtotal)}
                      </div>
                    </div>

                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={deletingItems.has(item.id)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Checkout Summary */}
        <div className="lg:col-span-1">
          <Card className="cardboard-card sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                訂單摘要
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Summary */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">商品總計</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Truck className="w-4 h-4" />
                    運費
                  </span>
                  <span className="font-medium">
                    {shippingFee === 0 ? (
                      <span className="text-primary">免費</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>

                {shippingFee === 0 && totalPrice > 0 && (
                  <div className="text-xs text-primary bg-primary/10 rounded p-2">
                    🎉 您已享有免運優惠！
                  </div>
                )}

                {totalPrice < 150000 && totalPrice > 0 && (
                  <div className="text-xs text-muted-foreground bg-muted/50 rounded p-2">
                    再購買 {formatPrice(150000 - totalPrice)} 即可享免運
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>總計</span>
                  <span className="cardboard-price text-xl">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" className="block w-full">
                <Button size="lg" className="w-full cardboard-btn-primary">
                  <CreditCard className="w-5 h-5 mr-2" />
                  前往結帳
                </Button>
              </Link>

              {/* Additional Info */}
              <div className="text-xs text-muted-foreground space-y-2 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Package className="w-3 h-3" />
                  <span>預計 3-5 個工作天到貨</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-3 h-3" />
                  <span>支援宅配到府或門市取貨</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
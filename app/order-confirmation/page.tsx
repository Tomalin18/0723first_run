'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  Package, 
  Home, 
  Mail,
  Calendar,
  Truck,
  Heart,
  Star
} from 'lucide-react';
import { OrderInfo } from '@/lib/types';

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    // Get order info from session storage
    const storedOrderInfo = sessionStorage.getItem('orderInfo');
    if (storedOrderInfo) {
      setOrderInfo(JSON.parse(storedOrderInfo));
    } else {
      // Redirect if no order info
      router.push('/');
      return;
    }

    // Animation sequence
    const timer1 = setTimeout(() => setAnimationStep(1), 500);
    const timer2 = setTimeout(() => setAnimationStep(2), 1000);
    const timer3 = setTimeout(() => setAnimationStep(3), 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [router]);

  const formatPrice = (priceInCents: number): string => {
    return `NT$ ${(priceInCents / 100).toLocaleString()}`;
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!orderInfo) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Success Animation */}
      <div className="text-center mb-12">
        <div className="relative mx-auto w-32 h-32 mb-8">
          {/* Cardboard Box Animation */}
          <div className={`absolute inset-0 transition-all duration-1000 ${
            animationStep >= 1 ? 'scale-110 opacity-90' : 'scale-100 opacity-100'
          }`}>
            <div className={`text-8xl transition-all duration-500 ${
              animationStep >= 2 ? 'transform rotate-12' : ''
            }`}>
              📦
            </div>
          </div>
          
          {/* Success Check Animation */}
          <div className={`absolute -top-4 -right-4 transition-all duration-500 ${
            animationStep >= 2 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
          }`}>
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>

          {/* Sparkles Animation */}
          {animationStep >= 3 && (
            <>
              <div className="absolute -top-2 -left-2 animate-bounce delay-100">✨</div>
              <div className="absolute -bottom-2 -right-2 animate-bounce delay-200">✨</div>
              <div className="absolute top-1/2 -left-6 animate-bounce delay-300">⭐</div>
              <div className="absolute top-1/2 -right-6 animate-bounce delay-150">⭐</div>
            </>
          )}
        </div>

        <div className={`transition-all duration-700 delay-500 ${
          animationStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            訂單完成！🎉
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            感謝您選擇紙箱小屋！
          </p>
          <p className="text-muted-foreground">
            我們將用心為您準備每一件商品，期待您再次光臨
          </p>
        </div>
      </div>

      {/* Order Details */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Order Number */}
        <Card className="cardboard-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">訂單編號</span>
                </div>
                <p className="text-2xl font-bold text-primary font-mono">
                  {orderInfo.orderNumber}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">下單時間</span>
                </div>
                <p className="font-medium">
                  {formatDate(orderInfo.createdAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Info */}
        <Card className="cardboard-card">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              收件資訊
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">收件人：</span>
                <span className="font-medium">{orderInfo.customerName}</span>
              </div>
              <div>
                <span className="text-muted-foreground">聯絡電話：</span>
                <span className="font-medium">{orderInfo.phone}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-muted-foreground">電子郵件：</span>
                <span className="font-medium">{orderInfo.email}</span>
              </div>
              <div className="md:col-span-2">
                <span className="text-muted-foreground">
                  {orderInfo.deliveryMethod === 'delivery' ? '收件地址' : '取貨門市'}：
                </span>
                <span className="font-medium">{orderInfo.address}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="cardboard-card">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" />
              訂購商品
            </h3>
            <div className="space-y-4">
              {orderInfo.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{item.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>數量：{item.quantity}</span>
                      <span>單價：{formatPrice(item.price_in_cents)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="cardboard-price font-bold">
                      {formatPrice(item.subtotal)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">商品總計</span>
                <span className="font-medium">
                  {formatPrice(orderInfo.items.reduce((sum, item) => sum + item.subtotal, 0))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">運費</span>
                <span className="font-medium">
                  {orderInfo.deliveryMethod === 'pickup' ? (
                    <span className="text-primary">免費</span>
                  ) : orderInfo.totalAmount - orderInfo.items.reduce((sum, item) => sum + item.subtotal, 0) === 0 ? (
                    <span className="text-primary">免費</span>
                  ) : (
                    formatPrice(orderInfo.totalAmount - orderInfo.items.reduce((sum, item) => sum + item.subtotal, 0))
                  )}
                </span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between text-lg font-bold">
                <span>總計</span>
                <span className="cardboard-price text-xl">
                  {formatPrice(orderInfo.totalAmount)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="cardboard-card">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              接下來會怎麼樣？
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium">訂單確認</p>
                  <p className="text-muted-foreground">我們會透過電子郵件發送訂單確認信</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium">商品準備</p>
                  <p className="text-muted-foreground">我們將仔細包裝您的紙箱傢俱</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium">配送/取貨通知</p>
                  <p className="text-muted-foreground">
                    {orderInfo.deliveryMethod === 'delivery' 
                      ? '預計 3-5 個工作天內送達您指定的地址' 
                      : '商品到店後我們會電話通知您取貨'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="cardboard-btn-primary cardboard-bounce">
              <Home className="w-5 h-5 mr-2" />
              回到首頁
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="lg" className="cardboard-btn-secondary">
              <Heart className="w-5 h-5 mr-2" />
              繼續購物
            </Button>
          </Link>
        </div>

        {/* Customer Satisfaction */}
        <Card className="cardboard-card">
          <CardContent className="p-6 text-center">
            <div className="mb-4">
              <h3 className="font-semibold text-foreground mb-2">滿意我們的服務嗎？</h3>
              <p className="text-muted-foreground text-sm">您的評價是我們持續進步的動力</p>
            </div>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  className="text-yellow-400 hover:scale-110 transition-transform"
                >
                  <Star className="w-8 h-8 fill-current hover:text-yellow-500" />
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              點擊星星給我們評分
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
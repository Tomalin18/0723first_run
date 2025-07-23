'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  MapPin,
  Phone,
  Mail,
  User,
  MessageSquare,
  CheckCircle,
  Package,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { CheckoutFormData, OrderInfo } from '@/lib/types';
import { toast } from 'sonner';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Current step is 2 (checkout info)
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: '',
    phone: '',
    email: '',
    address: '',
    deliveryMethod: 'delivery',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  const formatPrice = (priceInCents: number): string => {
    return `NT$ ${(priceInCents / 100).toLocaleString()}`;
  };

  const shippingFee = totalPrice >= 150000 ? 0 : 8000;
  const finalTotal = totalPrice + shippingFee;

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CheckoutFormData> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = '請輸入姓名';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = '請輸入電話號碼';
    } else if (!/^[\d\-\s\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = '請輸入正確的電話號碼';
    }

    if (!formData.email.trim()) {
      newErrors.email = '請輸入電子郵件';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '請輸入正確的電子郵件格式';
    }

    if (formData.deliveryMethod === 'delivery' && !formData.address.trim()) {
      newErrors.address = '請輸入收件地址';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOrderNumber = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const random = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    return `CCF${year}${month}${day}${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('請檢查表單內容');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create order info
      const orderInfo: OrderInfo = {
        ...formData,
        orderNumber: generateOrderNumber(),
        items: [...items],
        totalAmount: finalTotal,
        createdAt: new Date(),
      };

      // Store order info for confirmation page
      sessionStorage.setItem('orderInfo', JSON.stringify(orderInfo));

      // Clear cart
      clearCart();

      // Navigate to confirmation page
      router.push('/order-confirmation');

      toast.success('訂單提交成功！');
    } catch {
      toast.error('訂單提交失敗，請稍後重試');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return null; // Will redirect via useEffect
  }

  const storeLocations = [
    '台北信義門市 - 台北市信義區信義路五段7號',
    '台中西屯門市 - 台中市西屯區台灣大道三段99號',
    '高雄夢時代門市 - 高雄市前鎮區中華五路789號',
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-8">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <span className="ml-2 text-muted-foreground">購物車</span>
          </div>
          <div className="w-16 h-0.5 bg-primary"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <span className="ml-2 font-medium text-foreground">收件資訊</span>
          </div>
          <div className="w-16 h-0.5 bg-border"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-border text-muted-foreground rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <span className="ml-2 text-muted-foreground">完成</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Form */}
        <div className="lg:col-span-2">
          <Card className="cardboard-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                收件資訊
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName" className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      姓名
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      placeholder="請輸入您的姓名"
                      className={`cardboard-input ${errors.customerName ? 'border-destructive focus:border-destructive' : ''}`}
                    />
                    {errors.customerName && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.customerName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      電話號碼
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="請輸入聯絡電話"
                      className={`cardboard-input ${errors.phone ? 'border-destructive focus:border-destructive' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    電子郵件
                    <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="請輸入電子郵件地址"
                    className={`cardboard-input ${errors.email ? 'border-destructive focus:border-destructive' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Delivery Method */}
                <div className="space-y-4">
                  <Label className="text-base font-semibold">配送方式</Label>
                  <RadioGroup
                    value={formData.deliveryMethod}
                    onValueChange={(value) => handleInputChange('deliveryMethod', value as 'delivery' | 'pickup')}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="flex items-center gap-2 cursor-pointer">
                        <Truck className="w-4 h-4" />
                        宅配到府
                        <Badge variant="secondary" className="ml-2">
                          {shippingFee > 0 ? formatPrice(shippingFee) : '免費'}
                        </Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer">
                        <MapPin className="w-4 h-4" />
                        門市取貨
                        <Badge variant="secondary" className="ml-2">免費</Badge>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Address/Store Selection */}
                {formData.deliveryMethod === 'delivery' ? (
                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      收件地址
                      <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="請輸入完整收件地址（包含郵遞區號）"
                      className={`cardboard-input ${errors.address ? 'border-destructive focus:border-destructive' : ''}`}
                      rows={3}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.address}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="pickupStore">
                      選擇取貨門市
                    </Label>
                    <Select onValueChange={(value) => handleInputChange('address', value)}>
                      <SelectTrigger className="cardboard-input">
                        <SelectValue placeholder="請選擇門市" />
                      </SelectTrigger>
                      <SelectContent>
                        {storeLocations.map((store, index) => (
                          <SelectItem key={index} value={store}>
                            {store}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    備註 (選填)
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="如有特殊配送需求，請在此說明..."
                    className="cardboard-input"
                    rows={2}
                  />
                </div>

                {/* Back Button - Mobile */}
                <div className="block lg:hidden">
                  <Link href="/cart">
                    <Button variant="outline" className="w-full cardboard-btn-secondary">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      返回購物車
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Order Summary */}
        <div className="lg:col-span-1">
          <Card className="cardboard-card sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                訂單摘要
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Items */}
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">數量: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium">
                      {formatPrice(item.subtotal)}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">商品總計 ({totalItems} 件)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">運費</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-primary">免費</span>
                    ) : (
                      formatPrice(shippingFee)
                    )}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>總計</span>
                <span className="cardboard-price">{formatPrice(finalTotal)}</span>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                size="lg"
                className="w-full cardboard-btn-primary"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
                    處理中...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    確認訂單
                  </>
                )}
              </Button>

              {/* Back Button - Desktop */}
              <div className="hidden lg:block">
                <Link href="/cart" className="block w-full">
                  <Button variant="outline" size="lg" className="w-full cardboard-btn-secondary">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    返回購物車
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
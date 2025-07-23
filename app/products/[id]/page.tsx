'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  ChevronDown, 
  Star, 
  Shield, 
  Truck, 
  RotateCcw,
  Heart,
  Share2
} from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { Product } from '@/lib/types';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addToCart } = useCart();

  // Mock additional images for demo
  const mockImages = [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1503602642458-232111445657?w=600&h=600&auto=format&fit=crop',
  ];

  useEffect(() => {
    async function fetchProduct() {
      if (!params.id) return;
      
      try {
        const response = await fetch('/api/products');
        const products = await response.json();
        const foundProduct = products.find((p: Product) => p.id === parseInt(params.id as string));
        
        if (foundProduct) {
          // Add mock data for demo
          setProduct({
            ...foundProduct,
            inStock: Math.random() > 0.2,
            description: '這款紙箱傢俱採用優質環保材料製作，安全無毒，適合3-8歲兒童使用。可以激發孩子的創造力和想像力，是親子互動的絶佳選擇。',
            category: '遊戲傢俱',
          });
        } else {
          router.push('/products');
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
        router.push('/products');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [params.id, router]);

  const handleAddToCart = async () => {
    if (!product || !product.inStock) return;
    
    setIsAddingToCart(true);
    
    // Add some delay for loading effect
    await new Promise(resolve => setTimeout(resolve, 500));
    
    addToCart(product, quantity);
    toast.success(`已加入 ${quantity} 件商品到購物車！`, {
      description: product.name,
    });
    
    setIsAddingToCart(false);
  };

  const increaseQuantity = () => {
    setQuantity(prev => Math.min(prev + 1, 99));
  };

  const decreaseQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const formatPrice = (priceInCents: number): string => {
    return `NT$ ${(priceInCents / 100).toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square bg-muted rounded-xl animate-pulse"></div>
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-20 h-20 bg-muted rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-muted rounded w-1/2 animate-pulse"></div>
            <div className="h-20 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const productImages = [product.image_url, ...mockImages];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">首頁</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products">商品總覽</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side - Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl overflow-hidden">
            <img
              src={productImages[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  selectedImageIndex === index 
                    ? 'border-primary shadow-md' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side - Product Information */}
        <div className="space-y-6">
          {/* Product Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-primary border-primary">
                {product.category}
              </Badge>
              <Badge className={
                product.inStock 
                  ? "cardboard-badge-success" 
                  : "cardboard-badge-warning"
              }>
                {product.inStock ? '現貨供應' : '暫時缺貨'}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-muted-foreground">(4.8 分 • 126 評價)</span>
            </div>
          </div>

          {/* Price */}
          <div className="border-t border-b border-border py-4">
            <div className="text-3xl font-bold text-primary mb-2">
              {formatPrice(product.price_in_cents)}
            </div>
            <p className="text-muted-foreground">
              免運費配送 • 7天無條件退換
            </p>
          </div>

          {/* Creative Play Description */}
          <Card className="cardboard-card">
            <CardContent className="p-4">
              <h3 className="font-semibold text-foreground mb-2">創意遊戲玩法</h3>
              <p className="text-muted-foreground">
                可以變身為火車頭、太空船或城堡！激發孩子無限創意，打造屬於他們的奇幻世界。
                每次組裝都是新的冒險，讓想像力自由飛翔。
              </p>
            </CardContent>
          </Card>

          {/* Quantity Selector and Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="font-medium text-foreground">數量:</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 min-w-[60px] text-center font-medium">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={increaseQuantity}
                  disabled={quantity >= 99}
                  className="h-10 w-10"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
                className="flex-1 cardboard-btn-primary text-lg h-12"
              >
                <ShoppingCart className={`w-5 h-5 mr-2 ${isAddingToCart ? 'cardboard-shake' : ''}`} />
                {isAddingToCart ? '加入中...' : product.inStock ? '加入購物車' : '暫時缺貨'}
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Product Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">安全無毒</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">免運配送</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">7天退換</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">品質保證</span>
            </div>
          </div>

          {/* Collapsible Detailed Description */}
          <Collapsible open={isDescriptionOpen} onOpenChange={setIsDescriptionOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                詳細說明
                <ChevronDown className={`w-4 h-4 transition-transform ${isDescriptionOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 pt-4">
              <div className="prose prose-sm max-w-none">
                <h4 className="font-semibold text-foreground mb-2">產品特色</h4>
                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>
                
                <h4 className="font-semibold text-foreground mb-2">規格說明</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>材質：環保高強度瓦楞紙板</li>
                  <li>尺寸：60cm × 40cm × 80cm</li>
                  <li>適用年齡：3-8歲</li>
                  <li>承重：最大20公斤</li>
                  <li>組裝時間：約10-15分鐘</li>
                </ul>

                <h4 className="font-semibold text-foreground mb-2">注意事項</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>請避免接觸水分，保持乾燥環境使用</li>
                  <li>組裝時請大人陪同協助</li>
                  <li>使用後請妥善收納，可重複使用</li>
                </ul>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Package, Heart, Shield, Users } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import { Product } from '@/lib/types';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const products = await response.json();
        // Take first 4 products as featured
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const formatPrice = (priceInCents: number): string => {
    return `NT$ ${(priceInCents / 100).toLocaleString()}`;
  };

  const categories = [
    { name: '遊戲桌', icon: '🍽️', description: '讓孩子享受用餐樂趣' },
    { name: '小沙發', icon: '🛋️', description: '舒適的休息空間' },
    { name: 'DIY 小屋', icon: '🏠', description: '激發創造力的遊戲屋' },
    { name: '收納箱', icon: '📦', description: '整理玩具的好幫手' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="cardboard-hero mx-4 mt-8 mb-16 md:mx-8">
        <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              讓創意從<span className="text-primary">紙箱</span>開始
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              專為幼兒設計的環保紙箱傢俱，安全無毒，創意無限。給孩子一個充滿想像力的童年空間。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/products">
                <Button size="lg" className="cardboard-btn-primary text-lg px-8">
                  探索產品
                  <Package className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="cardboard-btn-secondary text-lg px-8">
                了解更多
                <Heart className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl flex items-center justify-center">
              <div className="text-8xl">📦</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">精選商品</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              最受歡迎的紙箱傢俱系列，每一件都是孩子創意遊戲的好伙伴
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="cardboard-card animate-pulse">
                  <div className="aspect-square bg-muted rounded-lg mb-4"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="cardboard-card group">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 text-lg">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mb-4">
                        <span className="cardboard-price">
                          {formatPrice(product.price_in_cents)}
                        </span>
                        <Badge className="cardboard-badge-success">現貨</Badge>
                      </div>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full cardboard-btn-primary group-hover:cardboard-bounce"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        加入購物車
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/products">
              <Button variant="outline" size="lg" className="cardboard-btn-secondary">
                查看所有商品
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">產品分類</h2>
            <p className="text-muted-foreground text-lg">
              多樣化的紙箱傢俱，滿足孩子各種遊戲需求
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="cardboard-card text-center group cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4 group-hover:cardboard-bounce">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-xl">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">為什麼選擇紙箱小屋？</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-3 text-xl">安全無毒</h3>
              <p className="text-muted-foreground">
                使用食品級安全材料，通過國際安全認證，讓家長完全放心
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-3 text-xl">環保材質</h3>
              <p className="text-muted-foreground">
                100% 可回收紙箱材料，既保護環境又培養孩子的環保意識
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-3 text-xl">親子互動</h3>
              <p className="text-muted-foreground">
                DIY 組裝過程增進親子關係，讓組裝成為美好的家庭時光
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

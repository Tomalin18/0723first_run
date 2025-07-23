'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ShoppingCart, Package, Grid3X3, List, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/lib/CartContext';
import { Product } from '@/lib/types';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        // Add mock inStock status for demo
        const productsWithStock = data.map((product: Product) => ({
          ...product,
          inStock: Math.random() > 0.2, // 80% chance of being in stock
        }));
        setProducts(productsWithStock);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    if (product.inStock) {
      addToCart(product);
    }
  };

  const formatPrice = (priceInCents: number): string => {
    return `NT$ ${(priceInCents / 100).toLocaleString()}`;
  };

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price_in_cents - b.price_in_cents;
        case 'price-high':
          return b.price_in_cents - a.price_in_cents;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

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
            <BreadcrumbPage>所有紙箱傢俱</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">所有紙箱傢俱</h1>
          <p className="text-muted-foreground">
            發現我們全系列的創意紙箱傢俱，為孩子打造夢想空間
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="搜尋產品..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">按名稱排序</SelectItem>
            <SelectItem value="price-low">價格：低到高</SelectItem>
            <SelectItem value="price-high">價格：高到低</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className={`grid gap-6 ${viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
        }`}>
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="cardboard-card animate-pulse">
              <div className="aspect-square bg-muted rounded-lg mb-4"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-8 bg-muted rounded w-full"></div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-4 text-muted-foreground">
            找到 {filteredAndSortedProducts.length} 項產品
          </div>
          
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">沒有找到產品</h3>
              <p className="text-muted-foreground">
                試試調整搜尋條件或瀏覽所有產品
              </p>
            </div>
          ) : (
            <div className={`grid gap-6 ${viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 lg:grid-cols-2'
            }`}>
              {filteredAndSortedProducts.map((product) => (
                <Card key={product.id} className="cardboard-card group">
                  <CardContent className="p-0">
                    {viewMode === 'grid' ? (
                      // Grid View
                      <>
                        <div className="relative">
                          <Link href={`/products/${product.id}`}>
                            <div className="aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              {!product.inStock && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                  <Badge variant="secondary" className="bg-muted text-muted-foreground">
                                    售完
                                  </Badge>
                                </div>
                              )}
                            </div>
                          </Link>
                        </div>
                        <div className="p-4">
                          <Link href={`/products/${product.id}`}>
                            <h3 className="font-semibold text-foreground mb-2 text-lg line-clamp-2 hover:text-primary transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <div className="flex items-center justify-between mb-4">
                            <span className="cardboard-price">
                              {formatPrice(product.price_in_cents)}
                            </span>
                            <Badge className={
                              product.inStock 
                                ? "cardboard-badge-success" 
                                : "cardboard-badge-warning"
                            }>
                              {product.inStock ? '現貨' : '售完'}
                            </Badge>
                          </div>
                          <Button
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.inStock}
                            className="w-full cardboard-btn-primary group-hover:cardboard-bounce disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2 group-hover:cardboard-shake" />
                            {product.inStock ? '加入購物車' : '已售完'}
                          </Button>
                        </div>
                      </>
                    ) : (
                      // List View
                      <div className="flex flex-col sm:flex-row gap-4 p-4">
                        <Link href={`/products/${product.id}`} className="flex-shrink-0">
                          <div className="w-full sm:w-32 aspect-square bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center overflow-hidden relative">
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {!product.inStock && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Badge variant="secondary" className="bg-muted text-muted-foreground">
                                  售完
                                </Badge>
                              </div>
                            )}
                          </div>
                        </Link>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <Link href={`/products/${product.id}`}>
                              <h3 className="font-semibold text-foreground mb-2 text-xl hover:text-primary transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-muted-foreground mb-4">
                              高品質紙箱傢俱，安全環保，啟發孩子創造力
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <span className="cardboard-price text-xl">
                                {formatPrice(product.price_in_cents)}
                              </span>
                              <Badge className={
                                product.inStock 
                                  ? "cardboard-badge-success" 
                                  : "cardboard-badge-warning"
                              }>
                                {product.inStock ? '現貨' : '售完'}
                              </Badge>
                            </div>
                            <Button
                              onClick={() => handleAddToCart(product)}
                              disabled={!product.inStock}
                              className="cardboard-btn-primary group-hover:cardboard-bounce disabled:opacity-50"
                            >
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              {product.inStock ? '加入購物車' : '已售完'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Load More Button (for demo purposes) */}
      {!loading && filteredAndSortedProducts.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="cardboard-btn-secondary">
            載入更多商品
            <Package className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
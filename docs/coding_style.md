# 程式碼風格指南

## 命名規範

### 文件命名
- **元件文件**: 使用 PascalCase，如 `ProductCard.tsx`、`ShoppingCart.tsx`
- **工具函數**: 使用 camelCase，如 `formatPrice.ts`、`fetchProducts.ts`
- **樣式文件**: 使用 kebab-case，如 `product-card.module.css`（如使用 CSS Modules）
- **常量文件**: 使用 UPPER_SNAKE_CASE，如 `API_ENDPOINTS.ts`

### 變量和函數命名
```typescript
// 變量使用 camelCase
const productName = "經典白色運動鞋";
const isLoading = true;

// 函數使用 camelCase
function calculateTotalPrice(items: CartItem[]): number {
  // ...
}

// 常量使用 UPPER_SNAKE_CASE
const MAX_PRODUCT_NAME_LENGTH = 50;
const API_BASE_URL = "/api";
```

### React 元件命名
```typescript
// 元件使用 PascalCase
function ProductCard({ product }: ProductCardProps) {
  // ...
}

// Props 接口命名
interface ProductCardProps {
  product: Product;
  onAddToCart: (id: number) => void;
}
```

## TypeScript 使用規範

### 優先使用 interface 而非 type
```typescript
// 推薦
interface User {
  id: number;
  name: string;
}

// 只在需要聯合類型或交叉類型時使用 type
type Status = 'pending' | 'completed' | 'failed';
```

### 明確的類型定義
```typescript
// 避免使用 any
// ❌ 錯誤
function processData(data: any) { }

// ✅ 正確
function processData(data: Product[]) { }

// 使用 unknown 替代 any
function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
```

### 函數類型定義
```typescript
// 明確定義參數和返回值類型
function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

// 異步函數
async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('/api/products');
  return response.json();
}
```

## React/Next.js 最佳實踐

### 元件結構
```typescript
// 1. 導入語句
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

// 2. 類型定義
interface ProductListProps {
  category?: string;
}

// 3. 元件定義
export function ProductList({ category }: ProductListProps) {
  // 4. 狀態和 hooks
  const [products, setProducts] = useState<Product[]>([]);
  
  // 5. 副作用
  useEffect(() => {
    // ...
  }, []);
  
  // 6. 事件處理器
  const handleAddToCart = (id: number) => {
    // ...
  };
  
  // 7. 渲染
  return (
    <div>
      {/* ... */}
    </div>
  );
}
```

### 使用自定義 Hooks
```typescript
// 將複雜邏輯抽取到自定義 Hook
function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    // 獲取產品邏輯
  }, [category]);
  
  return { products, loading, error };
}
```

## 註釋規範

### 函數註釋
```typescript
/**
 * 將價格從分轉換為格式化的貨幣字符串
 * @param cents - 以分為單位的價格
 * @returns 格式化的價格字符串（如 "$29.99"）
 */
function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
```

### 複雜邏輯註釋
```typescript
function calculateDiscount(price: number, quantity: number): number {
  // 批量購買折扣規則：
  // 5-9 件：9折
  // 10件以上：8折
  if (quantity >= 10) return price * 0.8;
  if (quantity >= 5) return price * 0.9;
  return price;
}
```

### TODO 註釋
```typescript
// TODO: 實現分頁功能
// TODO: 添加商品搜索
// FIXME: 修復價格計算精度問題
```

## 導入語句順序

1. React/Next.js 核心導入
2. 第三方庫導入
3. UI 元件庫導入
4. 本地元件導入
5. 工具函數導入
6. 類型導入
7. 樣式導入

```typescript
// 1. React/Next.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. 第三方庫
import { z } from 'zod';

// 3. UI 元件
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// 4. 本地元件
import { ProductCard } from '@/components/ProductCard';

// 5. 工具函數
import { formatPrice } from '@/lib/utils';

// 6. 類型
import type { Product } from '@/types';

// 7. 樣式
import styles from './product-list.module.css';
```

## 性能優化規範

### 使用 React.memo 優化渲染
```typescript
export const ProductCard = React.memo(function ProductCard({ product }: Props) {
  // ...
});
```

### 使用 useMemo 和 useCallback
```typescript
const expensiveCalculation = useMemo(() => {
  return products.reduce((sum, product) => sum + product.price_in_cents, 0);
}, [products]);

const handleClick = useCallback((id: number) => {
  // ...
}, [dependency]);
```

## 錯誤處理

```typescript
// 使用 try-catch 處理異步錯誤
try {
  const data = await fetchProducts();
  setProducts(data);
} catch (error) {
  console.error('Failed to fetch products:', error);
  setError(error instanceof Error ? error : new Error('Unknown error'));
}

// 使用錯誤邊界處理元件錯誤
class ErrorBoundary extends React.Component {
  // ...
}
```

## 禁止事項

1. ❌ 不要使用 `var`，使用 `const` 或 `let`
2. ❌ 不要使用 `==`，使用 `===`
3. ❌ 不要在循環中使用 async/await，使用 Promise.all
4. ❌ 不要直接修改 state，使用不可變更新
5. ❌ 不要在元件內定義常量，將其移到元件外
6. ❌ 不要使用內聯樣式，使用 Tailwind CSS 類
7. ❌ 不要忽略 TypeScript 錯誤，正確處理類型問題
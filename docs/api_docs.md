# API 文檔

## 商品 API

### 獲取所有商品

**端點**: `GET /api/products`

**描述**: 獲取所有可用商品的列表

**請求方法**: GET

**請求參數**: 無

**成功響應**:
- **狀態碼**: 200 OK
- **內容類型**: application/json
- **響應格式**:

```json
[
  {
    "id": 1,
    "name": "經典白色運動鞋",
    "price_in_cents": 298000,
    "image_url": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&auto=format&fit=crop"
  },
  {
    "id": 2,
    "name": "極簡主義皮革錢包",
    "price_in_cents": 158000,
    "image_url": "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&auto=format&fit=crop"
  }
  // ... 更多商品
]
```

**錯誤響應**:
- **狀態碼**: 500 Internal Server Error
- **內容**:
```json
{
  "error": "Failed to load products"
}
```

### 使用範例

#### JavaScript/TypeScript
```typescript
async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}
```

#### React Hook 範例
```typescript
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return { products, loading, error };
}
```

## 注意事項

1. 此 API 端點是模擬端點，實際讀取 `/public/products.json` 文件
2. 未來將替換為真實的數據庫 API
3. 所有價格都以分為單位（cents），顯示時需要轉換為元
4. 圖片 URL 使用 Unsplash 的公開圖片，確保始終可訪問
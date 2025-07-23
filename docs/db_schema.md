# 數據庫架構文檔

## products 表

商品數據目前存儲在 `/public/products.json` 文件中，以下是數據結構定義：

| 字段名 | 數據類型 | 描述 | 必填 | 範例 |
|--------|----------|------|------|------|
| id | number | 商品唯一標識符 | 是 | 1 |
| name | string | 商品名稱 | 是 | "經典白色運動鞋" |
| price_in_cents | number | 商品價格（以分為單位） | 是 | 298000 |
| image_url | string | 商品圖片 URL | 是 | "https://images.unsplash.com/..." |

## 數據規範

### ID 規範
- 必須為正整數
- 在整個數據集中必須唯一
- 建議使用遞增序列

### 名稱規範
- 必須為非空字符串
- 建議長度在 3-50 個字符之間
- 可包含中文、英文、數字和常見符號

### 價格規範
- 必須為非負整數
- 單位為分（cents），顯示時需除以 100 轉換為元
- 範例：298000 分 = 2980.00 元

### 圖片 URL 規範
- 必須為有效的 HTTPS URL
- 建議使用可靠的圖片服務（如 Unsplash）
- 建議圖片尺寸為正方形（如 400x400）
- 必須支持 CORS 以便前端直接訪問

## 數據範例

```json
{
  "id": 1,
  "name": "經典白色運動鞋",
  "price_in_cents": 298000,
  "image_url": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&auto=format&fit=crop"
}
```

## TypeScript 類型定義

```typescript
interface Product {
  id: number;
  name: string;
  price_in_cents: number;
  image_url: string;
}
```

## 未來擴展計劃

以下字段可能在未來版本中添加：
- `description`: 商品詳細描述
- `category`: 商品分類
- `stock`: 庫存數量
- `created_at`: 創建時間
- `updated_at`: 更新時間
- `is_active`: 是否上架

## 注意事項

1. 當前使用 JSON 文件作為數據源，適合原型開發
2. 生產環境應遷移到真實數據庫（如 PostgreSQL）
3. 所有數據修改應通過 API 進行，不應直接修改 JSON 文件
4. 價格計算時注意精度問題，建議使用整數運算
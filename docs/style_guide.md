# 視覺風格指南

## 色彩系統

### 主色調
- **主色 (Primary)**: `#3B82F6` (藍色) - 用於主要按鈕、連結和重要元素
- **主色懸停 (Primary Hover)**: `#2563EB`
- **主色淺色 (Primary Light)**: `#DBEAFE`

### 輔助色
- **成功 (Success)**: `#10B981` (綠色) - 用於成功訊息、確認狀態
- **警告 (Warning)**: `#F59E0B` (橙色) - 用於警告訊息
- **錯誤 (Error)**: `#EF4444` (紅色) - 用於錯誤訊息、刪除操作
- **信息 (Info)**: `#3B82F6` (藍色) - 用於一般提示信息

### 中性色
- **背景 (Background)**: `#FFFFFF` (白色)
- **次要背景 (Secondary Background)**: `#F9FAFB`
- **邊框 (Border)**: `#E5E7EB`
- **文字主色 (Text Primary)**: `#111827`
- **文字次要色 (Text Secondary)**: `#6B7280`
- **文字淺色 (Text Light)**: `#9CA3AF`

### 深色模式
- **背景 (Dark Background)**: `#0A0A0A`
- **次要背景 (Dark Secondary)**: `#1A1A1A`
- **邊框 (Dark Border)**: `#2A2A2A`
- **文字主色 (Dark Text)**: `#EDEDED`
- **文字次要色 (Dark Text Secondary)**: `#A3A3A3`

## 字體系統

### 字體家族
```css
--font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
--font-mono: "SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace;
```

### 字體大小
- **標題1 (H1)**: `2.25rem` (36px) - 頁面主標題
- **標題2 (H2)**: `1.875rem` (30px) - 區塊標題
- **標題3 (H3)**: `1.5rem` (24px) - 子標題
- **標題4 (H4)**: `1.25rem` (20px) - 小標題
- **正文 (Body)**: `1rem` (16px) - 一般內容
- **小字 (Small)**: `0.875rem` (14px) - 輔助文字
- **極小字 (Tiny)**: `0.75rem` (12px) - 標籤、提示

### 字重
- **細體 (Light)**: 300
- **正常 (Normal)**: 400
- **中等 (Medium)**: 500
- **半粗 (Semibold)**: 600
- **粗體 (Bold)**: 700

### 行高
- **緊密 (Tight)**: 1.25
- **正常 (Normal)**: 1.5
- **寬鬆 (Relaxed)**: 1.75

## 間距系統

使用 4px 的倍數作為間距單位：

- **xs**: `0.25rem` (4px)
- **sm**: `0.5rem` (8px)
- **md**: `1rem` (16px)
- **lg**: `1.5rem` (24px)
- **xl**: `2rem` (32px)
- **2xl**: `3rem` (48px)
- **3xl**: `4rem` (64px)

## 元件樣式

### 按鈕
```css
/* 主要按鈕 */
.btn-primary {
  background: #3B82F6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #2563EB;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### 卡片
```css
.card {
  background: white;
  border: 1px solid #E5E7EB;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
```

### 輸入框
```css
.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #E5E7EB;
  border-radius: 0.375rem;
  font-size: 1rem;
  transition: all 0.2s;
}

.input:focus {
  outline: none;
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

## 圖標使用

- 使用簡潔的線條圖標
- 保持圖標大小一致（通常為 20px 或 24px）
- 確保圖標與文字對齊
- 在按鈕中使用圖標時，保持適當間距

## 動畫與過渡

### 過渡時長
- **快速**: `150ms` - 顏色變化、小型互動
- **正常**: `200ms` - 大部分過渡效果
- **慢速**: `300ms` - 複雜動畫、頁面過渡

### 緩動函數
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### 常用動畫
```css
/* 淡入 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 滑入 */
@keyframes slideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* 縮放 */
@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

## 響應式設計斷點

- **手機**: `640px` 以下
- **平板**: `640px - 1024px`
- **桌面**: `1024px - 1280px`
- **大屏**: `1280px` 以上

```css
/* Tailwind CSS 斷點 */
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## 陰影系統

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

## 邊框圓角

- **無**: `0`
- **小**: `0.25rem` (4px)
- **默認**: `0.375rem` (6px)
- **中**: `0.5rem` (8px)
- **大**: `0.75rem` (12px)
- **特大**: `1rem` (16px)
- **圓形**: `9999px`

## 設計原則

1. **簡潔優先**: 避免過度設計，保持界面清爽
2. **一致性**: 確保整個應用的視覺元素保持一致
3. **可訪問性**: 確保顏色對比度符合 WCAG 標準
4. **響應式**: 所有設計必須在不同設備上良好呈現
5. **性能優先**: 避免過度動畫影響性能
6. **用戶友好**: 交互反饋明確，操作直觀
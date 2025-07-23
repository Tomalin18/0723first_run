# Shadcn/UI 元件清單

本專案已預先安裝了以下 Shadcn/UI 元件，可供 AI 和開發者使用。

## 基礎元件 (Basic Components)

| 元件名稱 | 元件路徑 | 說明 |
|---------|---------|------|
| Button | `@/components/ui/button` | 按鈕元件，支援多種變體和尺寸 |
| Card | `@/components/ui/card` | 卡片容器，包含 Header、Content、Footer 等子元件 |
| Input | `@/components/ui/input` | 基礎輸入框元件 |
| Label | `@/components/ui/label` | 表單標籤元件 |
| Textarea | `@/components/ui/textarea` | 多行文字輸入元件 |
| Separator | `@/components/ui/separator` | 分隔線元件 |

## 表單元件 (Form Components)

| 元件名稱 | 元件路徑 | 說明 |
|---------|---------|------|
| Form | `@/components/ui/form` | 表單容器，整合 react-hook-form |
| Checkbox | `@/components/ui/checkbox` | 複選框元件 |
| RadioGroup | `@/components/ui/radio-group` | 單選按鈕群組 |
| Select | `@/components/ui/select` | 下拉選單元件 |
| Switch | `@/components/ui/switch` | 開關切換元件 |
| Slider | `@/components/ui/slider` | 滑動條元件 |
| Toggle | `@/components/ui/toggle` | 切換按鈕元件 |
| ToggleGroup | `@/components/ui/toggle-group` | 切換按鈕群組 |

## 對話框元件 (Dialog Components)

| 元件名稱 | 元件路徑 | 說明 |
|---------|---------|------|
| Dialog | `@/components/ui/dialog` | 模態對話框元件 |
| AlertDialog | `@/components/ui/alert-dialog` | 警告確認對話框 |
| Sheet | `@/components/ui/sheet` | 側邊滑出面板 |
| Drawer | `@/components/ui/drawer` | 抽屜式面板 |
| Popover | `@/components/ui/popover` | 彈出框元件 |
| Tooltip | `@/components/ui/tooltip` | 工具提示元件 |
| HoverCard | `@/components/ui/hover-card` | 懸停卡片元件 |

## 導航元件 (Navigation Components)

| 元件名稱 | 元件路徑 | 說明 |
|---------|---------|------|
| NavigationMenu | `@/components/ui/navigation-menu` | 導航選單元件 |
| Menubar | `@/components/ui/menubar` | 選單欄元件 |
| DropdownMenu | `@/components/ui/dropdown-menu` | 下拉選單元件 |
| ContextMenu | `@/components/ui/context-menu` | 右鍵選單元件 |
| Breadcrumb | `@/components/ui/breadcrumb` | 麵包屑導航元件 |
| Tabs | `@/components/ui/tabs` | 標籤頁元件 |
| Pagination | `@/components/ui/pagination` | 分頁元件 |

## 反饋元件 (Feedback Components)

| 元件名稱 | 元件路徑 | 說明 |
|---------|---------|------|
| Alert | `@/components/ui/alert` | 警告提示元件 |
| Badge | `@/components/ui/badge` | 徽章元件 |
| Progress | `@/components/ui/progress` | 進度條元件 |
| Skeleton | `@/components/ui/skeleton` | 骨架屏載入元件 |
| Sonner | `@/components/ui/sonner` | 通知提示元件（toast 替代品） |

## 數據展示元件 (Data Display Components)

| 元件名稱 | 元件路徑 | 說明 |
|---------|---------|------|
| Table | `@/components/ui/table` | 表格元件 |
| Avatar | `@/components/ui/avatar` | 頭像元件 |
| AspectRatio | `@/components/ui/aspect-ratio` | 縱橫比容器元件 |

## 進階元件 (Advanced Components)

| 元件名稱 | 元件路徑 | 說明 |
|---------|---------|------|
| Accordion | `@/components/ui/accordion` | 手風琴折疊面板 |
| Calendar | `@/components/ui/calendar` | 日曆選擇器元件 |
| Carousel | `@/components/ui/carousel` | 輪播元件 |
| Chart | `@/components/ui/chart` | 圖表元件（基於 Recharts） |
| Command | `@/components/ui/command` | 命令面板/搜尋元件 |
| Collapsible | `@/components/ui/collapsible` | 可折疊區域元件 |
| ScrollArea | `@/components/ui/scroll-area` | 自定義滾動區域 |
| Resizable | `@/components/ui/resizable` | 可調整大小的面板 |

## 使用範例

### 基礎按鈕使用
```tsx
import { Button } from "@/components/ui/button"

<Button variant="default">預設按鈕</Button>
<Button variant="secondary">次要按鈕</Button>
<Button variant="destructive">危險按鈕</Button>
<Button variant="outline">輪廓按鈕</Button>
<Button variant="ghost">幽靈按鈕</Button>
<Button variant="link">連結按鈕</Button>
```

### 卡片使用
```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>卡片標題</CardTitle>
    <CardDescription>卡片描述</CardDescription>
  </CardHeader>
  <CardContent>
    卡片內容
  </CardContent>
  <CardFooter>
    卡片頁腳
  </CardFooter>
</Card>
```

### 對話框使用
```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>開啟對話框</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>對話框標題</DialogTitle>
      <DialogDescription>
        對話框描述文字
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

### 通知提示使用 (Sonner)
```tsx
import { toast } from "sonner"

// 成功通知
toast.success("操作成功！")

// 錯誤通知
toast.error("操作失敗！")

// 資訊通知
toast.info("這是一條資訊")

// 警告通知
toast.warning("請注意！")
```

## 注意事項

1. **必須使用預安裝的元件** - AI 在實現功能時必須優先使用這些已安裝的 Shadcn/UI 元件
2. **遵循設計系統** - 所有元件都遵循統一的設計語言和主題系統
3. **響應式設計** - 大部分元件都支援響應式設計
4. **無障礙支援** - 所有元件都內建無障礙功能支援
5. **主題切換** - 元件自動支援亮色/暗色主題切換

## 測試頁面

可以訪問 `/test` 頁面查看所有元件的實際效果和使用範例。
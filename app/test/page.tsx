"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar } from "@/components/ui/calendar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { toast } from "sonner"
import { Info, AlertCircle } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price_in_cents: number
  image_url: string
}

export default function TestPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [progress, setProgress] = useState(33)
  const [sliderValue, setSliderValue] = useState([50])
  const [products, setProducts] = useState<Product[]>([])

  // 測試 API
  const testAPI = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data)
      toast.success('API 測試成功！')
    } catch {
      toast.error('API 測試失敗！')
    }
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto p-8 space-y-8">
        <h1 className="text-4xl font-bold mb-8">Shadcn/UI 元件測試頁面</h1>
        
        {/* API 測試區域 */}
        <Card>
          <CardHeader>
            <CardTitle>API 測試</CardTitle>
            <CardDescription>測試 /api/products 端點</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={testAPI}>測試商品 API</Button>
            {products.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">商品列表：</h3>
                <div className="grid gap-2">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center gap-2 p-2 border rounded">
                      <Image 
                        src={product.image_url} 
                        alt={product.name} 
                        width={48} 
                        height={48} 
                        className="object-cover rounded" 
                      />
                      <div className="flex-1">
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${(product.price_in_cents / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">基礎元件</TabsTrigger>
            <TabsTrigger value="form">表單元件</TabsTrigger>
            <TabsTrigger value="dialog">對話框元件</TabsTrigger>
            <TabsTrigger value="navigation">導航元件</TabsTrigger>
            <TabsTrigger value="advanced">進階元件</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>基礎元件</CardTitle>
                <CardDescription>按鈕、卡片、輸入框等基本元件</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">按鈕 (Button)</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Button>Default</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link</Button>
                    <Button size="sm">Small</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">徽章 (Badge)</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                    <Badge variant="outline">Outline</Badge>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">警告 (Alert)</h3>
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>提示</AlertTitle>
                    <AlertDescription>這是一個預設的警告訊息。</AlertDescription>
                  </Alert>
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>錯誤</AlertTitle>
                    <AlertDescription>這是一個錯誤警告訊息。</AlertDescription>
                  </Alert>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">頭像 (Avatar)</h3>
                  <div className="flex gap-2">
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar>
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">骨架屏 (Skeleton)</h3>
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">縱橫比 (Aspect Ratio)</h3>
                  <div className="w-[300px]">
                    <AspectRatio ratio={16 / 9} className="bg-muted">
                      <div className="flex h-full items-center justify-center">
                        <span className="text-muted-foreground">16:9</span>
                      </div>
                    </AspectRatio>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="form" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>表單元件</CardTitle>
                <CardDescription>各種表單輸入元件</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="input">輸入框 (Input)</Label>
                  <Input id="input" placeholder="請輸入文字..." />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="textarea">文字區域 (Textarea)</Label>
                  <Textarea id="textarea" placeholder="請輸入多行文字..." />
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">選擇器 (Select)</h3>
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="選擇一個選項" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">選項 1</SelectItem>
                      <SelectItem value="option2">選項 2</SelectItem>
                      <SelectItem value="option3">選項 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">複選框 (Checkbox)</h3>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">同意服務條款</Label>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">單選按鈕 (Radio Group)</h3>
                  <RadioGroup defaultValue="option-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-1" id="option-1" />
                      <Label htmlFor="option-1">選項 1</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-2" id="option-2" />
                      <Label htmlFor="option-2">選項 2</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">開關 (Switch)</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="airplane-mode" />
                    <Label htmlFor="airplane-mode">飛航模式</Label>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">滑塊 (Slider)</h3>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                    className="w-[300px]"
                  />
                  <p className="text-sm text-muted-foreground">值: {sliderValue[0]}</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">切換按鈕 (Toggle)</h3>
                  <div className="flex gap-2">
                    <Toggle>Toggle</Toggle>
                    <Toggle variant="outline">Outline</Toggle>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">切換群組 (Toggle Group)</h3>
                  <ToggleGroup type="single">
                    <ToggleGroupItem value="a">A</ToggleGroupItem>
                    <ToggleGroupItem value="b">B</ToggleGroupItem>
                    <ToggleGroupItem value="c">C</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dialog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>對話框元件</CardTitle>
                <CardDescription>各種彈出式對話框</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">對話框 (Dialog)</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>開啟對話框</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>對話框標題</DialogTitle>
                        <DialogDescription>這是對話框的描述文字。</DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button>確認</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">警告對話框 (Alert Dialog)</h3>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">刪除項目</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>確定要刪除嗎？</AlertDialogTitle>
                        <AlertDialogDescription>此操作無法撤銷。</AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>取消</AlertDialogCancel>
                        <AlertDialogAction>確認刪除</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">側邊欄 (Sheet)</h3>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button>開啟側邊欄</Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>側邊欄標題</SheetTitle>
                        <SheetDescription>這是側邊欄的內容區域。</SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">抽屜 (Drawer)</h3>
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button>開啟抽屜</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                      <DrawerHeader>
                        <DrawerTitle>抽屜標題</DrawerTitle>
                        <DrawerDescription>這是抽屜的描述。</DrawerDescription>
                      </DrawerHeader>
                      <DrawerFooter>
                        <Button>確認</Button>
                      </DrawerFooter>
                    </DrawerContent>
                  </Drawer>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">彈出框 (Popover)</h3>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">開啟彈出框</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="space-y-2">
                        <h4 className="font-medium">彈出框標題</h4>
                        <p className="text-sm text-muted-foreground">這是彈出框的內容。</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">工具提示 (Tooltip)</h3>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">懸停查看提示</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>這是工具提示內容</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">懸停卡片 (Hover Card)</h3>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link">@shadcn</Button>
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">@shadcn</h4>
                        <p className="text-sm">Shadcn/UI 的創建者</p>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">通知 (Toast/Sonner)</h3>
                  <Button onClick={() => toast.success("操作成功！")}>顯示成功通知</Button>
                  <Button variant="destructive" onClick={() => toast.error("操作失敗！")}>顯示錯誤通知</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="navigation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>導航元件</CardTitle>
                <CardDescription>選單、麵包屑等導航相關元件</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">下拉選單 (Dropdown Menu)</h3>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">開啟選單</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>我的帳戶</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>個人資料</DropdownMenuItem>
                      <DropdownMenuItem>設定</DropdownMenuItem>
                      <DropdownMenuItem>登出</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">選單欄 (Menubar)</h3>
                  <Menubar>
                    <MenubarMenu>
                      <MenubarTrigger>檔案</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>新增</MenubarItem>
                        <MenubarItem>開啟</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>儲存</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                    <MenubarMenu>
                      <MenubarTrigger>編輯</MenubarTrigger>
                      <MenubarContent>
                        <MenubarItem>復原</MenubarItem>
                        <MenubarItem>重做</MenubarItem>
                      </MenubarContent>
                    </MenubarMenu>
                  </Menubar>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">導航選單 (Navigation Menu)</h3>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>產品</NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid gap-3 p-6 w-[400px]">
                            <NavigationMenuLink>
                              <div>
                                <div className="text-sm font-medium">功能介紹</div>
                                <p className="text-sm text-muted-foreground">了解我們的核心功能</p>
                              </div>
                            </NavigationMenuLink>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">麵包屑 (Breadcrumb)</h3>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">首頁</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/components">元件</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>麵包屑</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">右鍵選單 (Context Menu)</h3>
                  <ContextMenu>
                    <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
                      右鍵點擊此區域
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem>複製</ContextMenuItem>
                      <ContextMenuItem>貼上</ContextMenuItem>
                      <ContextMenuItem>刪除</ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>進階元件</CardTitle>
                <CardDescription>日曆、表格、手風琴等複雜元件</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">進度條 (Progress)</h3>
                  <Progress value={progress} className="w-[300px]" />
                  <Button onClick={() => setProgress(progress + 10)}>增加進度</Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">手風琴 (Accordion)</h3>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>第一項</AccordionTrigger>
                      <AccordionContent>這是第一項的內容。</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>第二項</AccordionTrigger>
                      <AccordionContent>這是第二項的內容。</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">日曆 (Calendar)</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">輪播 (Carousel)</h3>
                  <Carousel className="w-full max-w-xs">
                    <CarouselContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <span className="text-4xl font-semibold">{index + 1}</span>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">命令面板 (Command)</h3>
                  <Command className="rounded-lg border shadow-md">
                    <CommandInput placeholder="輸入命令..." />
                    <CommandList>
                      <CommandEmpty>找不到結果。</CommandEmpty>
                      <CommandGroup heading="建議">
                        <CommandItem>日曆</CommandItem>
                        <CommandItem>搜尋表情符號</CommandItem>
                        <CommandItem>計算機</CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">表格 (Table)</h3>
                  <Table>
                    <TableCaption>發票清單</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>發票編號</TableHead>
                        <TableHead>狀態</TableHead>
                        <TableHead>方式</TableHead>
                        <TableHead className="text-right">金額</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>INV001</TableCell>
                        <TableCell>已付款</TableCell>
                        <TableCell>信用卡</TableCell>
                        <TableCell className="text-right">$250.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>INV002</TableCell>
                        <TableCell>待處理</TableCell>
                        <TableCell>PayPal</TableCell>
                        <TableCell className="text-right">$150.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">分頁 (Pagination)</h3>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">可折疊區域 (Collapsible)</h3>
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline">點擊展開/收合</Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <div className="rounded-md border px-4 py-3 text-sm">
                        這是可折疊的內容區域。
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">滾動區域 (Scroll Area)</h3>
                  <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
                    <div className="space-y-4">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i}>
                          <div className="text-sm">項目 {i + 1}</div>
                          <p className="text-xs text-muted-foreground">這是項目 {i + 1} 的描述文字。</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  )
}
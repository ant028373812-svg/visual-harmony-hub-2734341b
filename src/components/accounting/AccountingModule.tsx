import { useState } from 'react';
import { TrendingUp, Truck, Users, BarChart3, ChevronDown, ChevronRight, AlertCircle, Package, CalendarIcon, Check, Copy } from 'lucide-react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { StatusBadge } from '@/components/ui/status-badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { demoTransactions } from '@/lib/demo-data';
import { AddTransactionModal } from './AddTransactionModal';
import { cn } from '@/lib/utils';
const statCards = [{
  title: 'Надходження',
  value: '370 000 грн',
  icon: TrendingUp,
  color: 'text-success'
}, {
  title: 'Витрати на дроп',
  value: '83 000 грн',
  icon: Package,
  color: 'text-warning'
}, {
  title: 'Витрати на перевізників',
  value: '12 000 грн',
  icon: Truck,
  color: 'text-info'
}, {
  title: 'Офісні витрати',
  value: '8 500 грн',
  icon: BarChart3,
  color: 'text-muted-foreground'
}, {
  title: 'Виплати команді',
  value: '35 000 грн',
  icon: Users,
  color: 'text-purple-500'
}, {
  title: 'Статистика магазинів',
  value: '370 000 грн',
  icon: BarChart3,
  color: 'text-success'
}];
interface DropPayment {
  id: string;
  name: string;
  dropExpense: number;
  carrierExpense: number;
  additionalExpense: number;
  status: 'Видав фактуру' | 'Оплачено';
  dropCard: string;
  carrierCard: string;
}
const dropPayments: DropPayment[] = [{
  id: '1',
  name: 'Svitlana',
  dropExpense: 40500,
  carrierExpense: 13500,
  additionalExpense: 6750,
  status: 'Видав фактуру',
  dropCard: '',
  carrierCard: ''
}, {
  id: '2',
  name: 'Oleksandr',
  dropExpense: 32000,
  carrierExpense: 10600,
  additionalExpense: 5300,
  status: 'Оплачено',
  dropCard: '',
  carrierCard: ''
}, {
  id: '3',
  name: 'Maria',
  dropExpense: 25200,
  carrierExpense: 8400,
  additionalExpense: 4200,
  status: 'Видав фактуру',
  dropCard: '',
  carrierCard: ''
}];
const boxingExpenses = [{
  id: '1',
  method: 'Ftid',
  amount: 15000
}, {
  id: '2',
  method: 'DNA',
  amount: 25500
}, {
  id: '3',
  method: 'EB',
  amount: 15000
}];
export function AccountingModule() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedDrops, setExpandedDrops] = useState<Record<string, boolean>>({
    '1': true
  });
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('uk-UA').format(value) + ' грн';
  };
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  return <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">БУХГАЛТЕРІЯ</h1>
            <p className="text-sm text-muted-foreground mt-1">Статистика</p>
          </div>
          <div className="flex gap-2">
            <AddTransactionModal />
            <Button variant="outline">Статистика</Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="flex gap-6 p-6">
          {/* Left sidebar - Carrier payments */}
          <div className="w-72 space-y-4">
            {/* Carrier Payments */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-warning" />
                  Виплати перевізник
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-2">
                {dropPayments.map(drop => (
                  <div key={drop.id} className="p-3 border border-border rounded-lg space-y-3 bg-muted/30">
                    {/* Drop Header */}
                    <div 
                      className="flex items-center justify-between cursor-pointer" 
                      onClick={() => setExpandedDrops(prev => ({
                        ...prev,
                        [drop.id]: !prev[drop.id]
                      }))}
                    >
                      <span className="font-medium text-sm">{drop.name}</span>
                      {expandedDrops[drop.id] ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>

                    {expandedDrops[drop.id] && (
                      <div className="space-y-4">
                        {/* Row 1: Витрата дроп with Status and Skup */}
                        <div className="flex gap-2">
                          {/* Left: Витрата дроп */}
                          <div className="flex-1 space-y-1">
                            <label className="text-xs text-muted-foreground">Витрата дроп</label>
                            <Input 
                              className="h-7 text-xs" 
                              type="number"
                              defaultValue={drop.dropExpense} 
                            />
                          </div>
                          {/* Right: Status + Skup selectors */}
                          <div className="space-y-1">
                            <Select defaultValue={drop.status}>
                              <SelectTrigger className="h-7 text-xs w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Оплачено">Оплачено</SelectItem>
                                <SelectItem value="Видав фактуру">Видав фактуру</SelectItem>
                              </SelectContent>
                            </Select>
                            <Select defaultValue="oleg">
                              <SelectTrigger className="h-7 text-xs w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="oleg">Олег</SelectItem>
                                <SelectItem value="ivan">Іван</SelectItem>
                                <SelectItem value="mono">Моно</SelectItem>
                                <SelectItem value="ya">Я</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Row 2: Додат. вит. дроп */}
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">Додат. вит. дроп</label>
                          <Input 
                            className="h-7 text-xs" 
                            type="number"
                            defaultValue={drop.additionalExpense} 
                          />
                        </div>

                        {/* Row 3: Витрата перевізник */}
                        <div className="space-y-1">
                          <label className="text-xs text-muted-foreground">Витрата перевізник</label>
                          <Input 
                            className="h-7 text-xs" 
                            type="number"
                            defaultValue={drop.carrierExpense} 
                          />
                        </div>

                        {/* Row 4: Drop Card */}
                        <div className="flex gap-2 items-end pt-2 border-t border-border">
                          <div className="flex-1 space-y-1">
                            <label className="text-xs text-muted-foreground">Карта</label>
                            <Input className="h-7 text-xs" placeholder="" />
                          </div>
                          <div className="w-24 space-y-1">
                            <label className="text-xs text-muted-foreground">Сума грн</label>
                            <div className="flex items-center gap-1">
                              <Input className="h-7 text-xs" type="number" />
                              <button className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                                <Copy className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Row 5: Carrier Card */}
                        <div className="flex gap-2 items-end">
                          <div className="flex-1 space-y-1">
                            <label className="text-xs text-muted-foreground">Карта перевізник</label>
                            <Input className="h-7 text-xs" placeholder="" />
                          </div>
                          <div className="w-24 space-y-1">
                            <label className="text-xs text-muted-foreground">Сума грн</label>
                            <div className="flex items-center gap-1">
                              <Input className="h-7 text-xs" type="number" />
                              <button className="h-7 w-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                                <Copy className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Boxing Expenses */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Package className="h-4 w-4 text-info" />
                  Витрати боксинг
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Загальна сума: <span className="font-semibold text-info">55 500 грн</span>
                </p>
              </CardHeader>
              <CardContent className="space-y-2 pt-2">
                {boxingExpenses.map(expense => <div key={expense.id} className="flex items-center justify-between p-2 border border-border rounded">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{expense.method}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(expense.amount)}</span>
                  </div>)}
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="flex-1 space-y-6">
            {/* Title */}
            <div>
              <h2 className="text-xl font-bold">Фінансовий дашборд</h2>
              <p className="text-sm text-muted-foreground">Огляд фінансових показників вашого бізнесу</p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-4">
              {statCards.map((stat, index) => <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <stat.icon className={cn('h-6 w-6', stat.color)} />
                    </div>
                  </CardContent>
                </Card>)}
            </div>

            {/* Transactions table */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Таблиця транзакцій</CardTitle>
                {/* Filters Row */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {/* Дата */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 w-28 justify-start text-left font-normal">
                        <CalendarIcon className="mr-1 h-3 w-3" />
                        <span className="text-xs">Дата</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" className="pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                  
                  {/* Сума */}
                  <Input placeholder="Сума" className="h-8 w-24 text-xs" />
                  
                  {/* Тип */}
                  <Select>
                    <SelectTrigger className="h-8 w-24 text-xs">
                      <SelectValue placeholder="Тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Прихід</SelectItem>
                      <SelectItem value="expense">Вихід</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* Скуп */}
                  <Select>
                    <SelectTrigger className="h-8 w-24 text-xs">
                      <SelectValue placeholder="Скуп" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oleg">Oleg</SelectItem>
                      <SelectItem value="ivan">Ivan</SelectItem>
                      <SelectItem value="nazar">Nazar</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* Звідки */}
                  <Select>
                    <SelectTrigger className="h-8 w-24 text-xs">
                      <SelectValue placeholder="Звідки" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="binance">Binance</SelectItem>
                      <SelectItem value="mono">Mono</SelectItem>
                      <SelectItem value="privat">Privat</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* Куди */}
                  <Select>
                    <SelectTrigger className="h-8 w-24 text-xs">
                      <SelectValue placeholder="Куди" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="drop">Дроп</SelectItem>
                      <SelectItem value="carrier">Перевізник</SelectItem>
                      <SelectItem value="team">Команда</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* Пройоб */}
                  <div className="flex items-center gap-1 h-8 px-2 border border-input rounded-md bg-background hover:bg-muted/50 cursor-pointer transition-colors">
                    <Checkbox id="propiob" className="h-3 w-3" />
                    <label htmlFor="propiob" className="text-xs cursor-pointer">Пройоб</label>
                  </div>
                  
                  {/* Хто виконав */}
                  <Select>
                    <SelectTrigger className="h-8 w-28 text-xs">
                      <SelectValue placeholder="Хто виконав" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oleg">Олег</SelectItem>
                      <SelectItem value="ivan">Іван</SelectItem>
                      <SelectItem value="nazar">Назар</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr className="text-left text-muted-foreground">
                      <th className="py-2 px-2 font-medium text-xs">Дата</th>
                      <th className="py-2 px-2 font-medium text-xs">Тип</th>
                      <th className="py-2 px-2 font-medium text-xs">Скуп</th>
                      <th className="py-2 px-2 font-medium text-xs">Сума</th>
                      <th className="py-2 px-2 font-medium text-xs">Звідки</th>
                      <th className="py-2 px-2 font-medium text-xs">Куди</th>
                      <th className="py-2 px-2 font-medium text-xs">Пройоб</th>
                      <th className="py-2 px-2 font-medium text-xs">Хто виконав</th>
                      <th className="py-2 px-2 font-medium text-xs">Коментар</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoTransactions.map(tx => (
                      <tr key={tx.id} className="border-b border-border">
                        <td className="py-2 px-2 text-xs">{formatDate(tx.date)}</td>
                        <td className="py-2 px-2">
                          <StatusBadge status={tx.type} type={tx.type === 'Прихід' ? 'completed' : 'waiting'} />
                        </td>
                        <td className="py-2 px-2 text-xs">{tx.skup}</td>
                        <td className={cn('py-2 px-2 text-xs font-medium', tx.type === 'Прихід' ? 'text-success' : 'text-destructive')}>
                          {tx.type === 'Прихід' ? '+' : '-'}{formatCurrency(tx.amount)}
                        </td>
                        <td className="py-2 px-2 text-xs">{tx.source}</td>
                        <td className="py-2 px-2 text-xs">{tx.destination}</td>
                        <td className="py-2 px-2">
                          {tx.propiob ? (
                            <Check className="h-4 w-4 text-success" />
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="py-2 px-2 text-xs">{tx.executor}</td>
                        <td className="py-2 px-2 text-xs text-muted-foreground">{tx.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
}
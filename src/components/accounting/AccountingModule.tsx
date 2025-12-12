import { useState } from 'react';
import { TrendingUp, Truck, Users, BarChart3, ChevronDown, ChevronRight, AlertCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { StatusBadge } from '@/components/ui/status-badge';
import { demoTransactions } from '@/lib/demo-data';
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
            <Button className="bg-primary text-primary-foreground">
              Додати транзакцію
            </Button>
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
                {dropPayments.map(drop => <div key={drop.id} className="p-3 border border-border rounded-lg space-y-3 bg-info-foreground mx-0 py-px">
                    {/* Drop Header */}
                    <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedDrops(prev => ({
                  ...prev,
                  [drop.id]: !prev[drop.id]
                }))}>
                      <span className="font-medium text-sm">{drop.name}</span>
                      {expandedDrops[drop.id] ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    </div>

                    {expandedDrops[drop.id] && <>
                        {/* Status Selection */}
                        <Select defaultValue={drop.status}>
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Видав фактуру">Видав фактуру</SelectItem>
                            <SelectItem value="Оплачено">Оплачено</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* Expenses Section */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Витрата Дроп</span>
                            <span className="font-medium">{formatCurrency(drop.dropExpense)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Витрати перевізника</span>
                            <span className="font-medium">{formatCurrency(drop.carrierExpense)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Додаткові витрати Дроп</span>
                            <span className="font-medium">{formatCurrency(drop.additionalExpense)}</span>
                          </div>
                        </div>

                        {/* Cards Section */}
                        <div className="space-y-3 pt-2 border-t border-border">
                          <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">Дроп карта</label>
                            <Input className="h-8 text-sm" placeholder="" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">Перевізник карта</label>
                            <Input className="h-8 text-sm" placeholder="" />
                          </div>
                        </div>
                      </>}
                  </div>)}
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
              <CardHeader>
                <CardTitle className="text-lg">Таблиця транзакцій</CardTitle>
                <div className="flex items-center gap-4 mt-2">
                  <Input placeholder="Пошук транзакцій..." className="max-w-sm" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Всі типи" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Всі типи</SelectItem>
                      <SelectItem value="income">Прихід</SelectItem>
                      <SelectItem value="expense">Витрата</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Всі категорії" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Всі категорії</SelectItem>
                      <SelectItem value="revenue">Виручка магазину</SelectItem>
                      <SelectItem value="drop">Оплата дропу</SelectItem>
                      <SelectItem value="carrier">Оплата перевізнику</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr className="text-left text-muted-foreground">
                      <th className="py-3 font-medium">Дата</th>
                      <th className="py-3 font-medium">Тип</th>
                      <th className="py-3 font-medium">Категорія</th>
                      <th className="py-3 font-medium">Сума</th>
                      <th className="py-3 font-medium">Опис</th>
                      <th className="py-3 font-medium">Магазин</th>
                      <th className="py-3 font-medium">Статус оплати</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoTransactions.map(tx => <tr key={tx.id} className="border-b border-border">
                        <td className="py-3">{formatDate(tx.date)}</td>
                        <td className="py-3">
                          <StatusBadge status={tx.type} type={tx.type === 'Прихід' ? 'completed' : 'waiting'} />
                        </td>
                        <td className="py-3">{tx.category}</td>
                        <td className={cn('py-3 font-medium', tx.type === 'Прихід' ? 'text-success' : 'text-destructive')}>
                          {tx.type === 'Прихід' ? '+' : '-'}{formatCurrency(tx.amount)}
                        </td>
                        <td className="py-3 text-muted-foreground">{tx.description}</td>
                        <td className="py-3">{tx.store || '—'}</td>
                        <td className="py-3">
                          <StatusBadge status={tx.status} type={tx.status === 'Оплачено' ? 'completed' : tx.status === 'Очікує' ? 'pending' : 'canceled'} />
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>;
}
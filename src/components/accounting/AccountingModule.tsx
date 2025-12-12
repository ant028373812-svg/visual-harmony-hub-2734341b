import { useState } from 'react';
import { TrendingUp, Truck, Users, BarChart3, ChevronDown, ChevronRight, AlertCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { StatusBadge } from '@/components/ui/status-badge';
import { demoTransactions } from '@/lib/demo-data';
import { cn } from '@/lib/utils';

const statCards = [
  { title: 'Загальна виручка', value: '370 000 грн', icon: TrendingUp, color: 'text-success' },
  { title: 'Витрати на дроп', value: '83 000 грн', icon: Package, color: 'text-warning' },
  { title: 'Витрати на перевізників', value: '12 000 грн', icon: Truck, color: 'text-info' },
  { title: 'Офісні витрати', value: '8 500 грн', icon: BarChart3, color: 'text-muted-foreground' },
  { title: 'Виплати команді', value: '35 000 грн', icon: Users, color: 'text-purple-500' },
  { title: 'Статистика магазинів', value: '370 000 грн', icon: BarChart3, color: 'text-success' },
];

interface CarrierPayment {
  id: string;
  drop: string;
  amount: number;
  status: 'Чекає на оплату' | 'Оплачено';
  dueDate: string;
}

const carrierPayments: CarrierPayment[] = [
  { id: '1', drop: 'Львів', amount: 67500, status: 'Чекає на оплату', dueDate: '20 січ.' },
  { id: '2', drop: 'Харків', amount: 53000, status: 'Чекає на оплату', dueDate: '18 січ.' },
  { id: '3', drop: 'Дніпро', amount: 42000, status: 'Чекає на оплату', dueDate: '25 січ.' },
];

const boxingExpenses = [
  { id: '1', method: 'Ftid', amount: 15000 },
  { id: '2', method: 'DNA', amount: 25500 },
  { id: '3', method: 'EB', amount: 15000 },
];

export function AccountingModule() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedCarrier, setExpandedCarrier] = useState(true);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('uk-UA').format(value) + ' грн';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="h-full flex flex-col bg-background">
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
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-warning" />
                    Виплати перевізник
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => setExpandedCarrier(!expandedCarrier)}
                  >
                    {expandedCarrier ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Загальна сума: <span className="font-semibold">162 500 грн</span>
                </p>
              </CardHeader>
              {expandedCarrier && (
                <CardContent className="space-y-3 pt-2">
                  {carrierPayments.map(payment => (
                    <div key={payment.id} className="p-2 border border-border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">Дроп {payment.drop}</span>
                        <StatusBadge 
                          status={payment.status} 
                          type={payment.status === 'Оплачено' ? 'completed' : 'pending'} 
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{payment.dueDate}</p>
                      <p className="font-semibold text-right">{formatCurrency(payment.amount)}</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-success">● Оплата дропу</span>
                          <span>{formatCurrency(payment.amount * 0.6)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Іванов І.І.</span>
                          <StatusBadge status="Чекає на оплату" type="pending" className="text-[10px]" />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-info">● Оплата перевізнику</span>
                          <span>{formatCurrency(payment.amount * 0.2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">УкрПошта</span>
                          <StatusBadge status="Чекає на оплату" type="pending" className="text-[10px]" />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">+ Додаткові витрати</span>
                          <span>{formatCurrency(payment.amount * 0.1)}</span>
                        </div>
                        <StatusBadge status="Оплачено" type="completed" className="text-[10px]" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
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
                {boxingExpenses.map(expense => (
                  <div key={expense.id} className="flex items-center justify-between p-2 border border-border rounded">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{expense.method}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(expense.amount)}</span>
                  </div>
                ))}
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
              {statCards.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <stat.icon className={cn('h-6 w-6', stat.color)} />
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                    {demoTransactions.map(tx => (
                      <tr key={tx.id} className="border-b border-border">
                        <td className="py-3">{formatDate(tx.date)}</td>
                        <td className="py-3">
                          <StatusBadge 
                            status={tx.type} 
                            type={tx.type === 'Прихід' ? 'completed' : 'waiting'} 
                          />
                        </td>
                        <td className="py-3">{tx.category}</td>
                        <td className={cn('py-3 font-medium', tx.type === 'Прихід' ? 'text-success' : 'text-destructive')}>
                          {tx.type === 'Прихід' ? '+' : '-'}{formatCurrency(tx.amount)}
                        </td>
                        <td className="py-3 text-muted-foreground">{tx.description}</td>
                        <td className="py-3">{tx.store || '—'}</td>
                        <td className="py-3">
                          <StatusBadge 
                            status={tx.status} 
                            type={tx.status === 'Оплачено' ? 'completed' : tx.status === 'Очікує' ? 'pending' : 'canceled'} 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { demoStores } from '@/lib/demo-data';
import { cn } from '@/lib/utils';

export function SkupTableModule() {
  const [activeStore, setActiveStore] = useState(demoStores[0]?.id || '1');
  const [searchQuery, setSearchQuery] = useState('');
  
  const currentStore = demoStores.find(s => s.id === activeStore) || demoStores[0];
  
  // Calculate stats
  const totalSum = currentStore?.items.reduce((sum, item) => sum + item.sum, 0) || 0;
  const unorderedSum = currentStore?.items.reduce((sum, item) => sum + (item.remaining > 0 ? item.sum : 0), 0) || 0;
  const orderedSum = totalSum - unorderedSum;
  const unorderedCount = currentStore?.items.filter(item => item.remaining > 0).length || 0;
  const orderedCount = (currentStore?.items.length || 0) - unorderedCount;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Скуп таблиць</h1>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Глобальний пошук..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-8 w-48"
            />
          </div>
        </div>
      </div>

      {/* Store tabs */}
      <div className="border-b border-border bg-card px-4 overflow-x-auto">
        <Tabs value={activeStore} onValueChange={setActiveStore}>
          <TabsList className="bg-transparent h-10 gap-1">
            {demoStores.map(store => (
              <TabsTrigger
                key={store.id}
                value={store.id}
                className="data-[state=active]:bg-muted text-sm px-3"
              >
                {store.name} ({store.items.length})
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Stats bar */}
      <div className="border-b border-border bg-card px-4 py-2 flex items-center gap-6 text-sm">
        <div>
          <span className="text-muted-foreground">Сума:</span>{' '}
          <span className="font-semibold">{totalSum.toLocaleString()} ₴</span>
        </div>
        <div>
          <span className="text-muted-foreground">Не замовлені:</span>{' '}
          <span className="font-semibold">{unorderedSum.toLocaleString()} ₴</span>
        </div>
        <div>
          <span className="text-muted-foreground">Замовлені:</span>{' '}
          <span className="font-semibold">{orderedSum.toLocaleString()} ₴</span>
        </div>
        <div>
          <span className="text-muted-foreground">К-сть не замовлених:</span>{' '}
          <span className="font-semibold">{unorderedCount}</span>
        </div>
        <div>
          <span className="text-muted-foreground">К-сть замовлених:</span>{' '}
          <span className="font-semibold">{orderedCount}</span>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-xs border-collapse">
          <thead className="bg-muted/50 sticky top-0">
            <tr className="text-left text-muted-foreground">
              <th className="px-2 py-1.5 w-10 border-r border-border">№</th>
              <th className="px-2 py-1.5 w-48 border-r border-border">Силка ▼</th>
              <th className="px-2 py-1.5 w-16 border-r border-border">Розмір ▼</th>
              <th className="px-2 py-1.5 w-24 border-r border-border">Наявність ▼</th>
              <th className="px-2 py-1.5 w-20 border-r border-border">Колір ▼</th>
              <th className="px-2 py-1.5 w-12 border-r border-border">% ▼</th>
              <th className="px-2 py-1.5 w-16 border-r border-border">Сума ▼</th>
              <th className="px-2 py-1.5 w-12 border-r border-border">К-сть ▼</th>
              <th className="px-2 py-1.5 w-24 border-r border-border">Хто замовив ▼</th>
              <th className="px-2 py-1.5 w-24 border-r border-border">Хто замовив ▼</th>
              <th className="px-2 py-1.5 w-24 border-r border-border">Хто замовив ▼</th>
              <th className="px-2 py-1.5 w-24 border-r border-border">Хто замовив ▼</th>
              <th className="px-2 py-1.5 w-24 border-r border-border">Хто замовив ▼</th>
              <th className="px-2 py-1.5 w-20">Залишилось</th>
            </tr>
          </thead>
          <tbody>
            {currentStore?.items.map((item, index) => (
              <tr key={item.id} className="border-b border-border hover:bg-muted/20">
                <td className="px-2 py-1 border-r border-border">{item.number}</td>
                <td className="px-2 py-1 border-r border-border">
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-info hover:underline truncate block max-w-44">
                    {item.link}
                  </a>
                </td>
                <td className="px-2 py-1 border-r border-border">{item.size}</td>
                <td className="px-2 py-1 border-r border-border">
                  <span className={cn(
                    'px-1.5 py-0.5 rounded text-[10px] font-medium',
                    item.availability === 'В наявності' 
                      ? 'bg-success/20 text-success' 
                      : 'bg-muted text-muted-foreground'
                  )}>
                    {item.availability}
                  </span>
                </td>
                <td className="px-2 py-1 border-r border-border">{item.color}</td>
                <td className="px-2 py-1 border-r border-border">{item.percent}%</td>
                <td className="px-2 py-1 border-r border-border font-medium">{item.sum.toLocaleString()}</td>
                <td className="px-2 py-1 border-r border-border">{item.quantity}</td>
                {[0, 1, 2, 3, 4].map(i => (
                  <td key={i} className="px-2 py-1 border-r border-border text-muted-foreground">
                    {item.orderedBy[i] || ''}
                  </td>
                ))}
                <td className="px-2 py-1">{item.remaining}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

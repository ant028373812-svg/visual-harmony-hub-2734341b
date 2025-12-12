import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const currencies = ['Євро', 'Гривня', 'Долар'];
const executors = ['Олег', 'Іван', 'Назар', 'Марія'];
const sources = ['Рахунок', 'Каса', 'PayPal', 'Wise'];
const destinations = ['Зарплата', 'Податки', 'Оренда', 'Логістика', 'Маркетинг'];

interface RefCheck {
  id: string;
  packName: string;
  billing: string;
  card: string;
  amount: number;
  inProcess: boolean;
  received: boolean;
  erased: boolean;
}

const demoRefChecks: RefCheck[] = [
  { id: '1', packName: 'Pack #12345 Львівська адреса', billing: 'Zen Anton', card: '1234', amount: 2500, inProcess: true, received: true, erased: false },
  { id: '2', packName: 'Pack #12346 Київська довга назва', billing: 'Zen Yaroslav', card: '5678', amount: 1800, inProcess: true, received: true, erased: false },
  { id: '3', packName: 'Pack #12347', billing: 'Zen Anton', card: '9012', amount: 150, inProcess: false, received: true, erased: false },
];

export function DropAccountingModule() {
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('Гривня');
  const [executor, setExecutor] = useState('');
  const [expensePropiob, setExpensePropiob] = useState(false);
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [comment, setComment] = useState('');
  const [refChecks, setRefChecks] = useState(demoRefChecks);
  
  // Add new items state
  const [sourcesList, setSourcesList] = useState(sources);
  const [destinationsList, setDestinationsList] = useState(destinations);
  const [executorsList, setExecutorsList] = useState(executors);
  const [newSource, setNewSource] = useState('');
  const [newDestination, setNewDestination] = useState('');
  const [newExecutor, setNewExecutor] = useState('');

  const handleAddSource = () => {
    if (newSource.trim() && !sourcesList.includes(newSource.trim())) {
      setSourcesList(prev => [...prev, newSource.trim()]);
      setNewSource('');
    }
  };

  const handleAddDestination = () => {
    if (newDestination.trim() && !destinationsList.includes(newDestination.trim())) {
      setDestinationsList(prev => [...prev, newDestination.trim()]);
      setNewDestination('');
    }
  };

  const handleAddExecutor = () => {
    if (newExecutor.trim() && !executorsList.includes(newExecutor.trim())) {
      setExecutorsList(prev => [...prev, newExecutor.trim()]);
      setNewExecutor('');
    }
  };

  const toggleRefCheck = (id: string, field: 'inProcess' | 'received' | 'erased') => {
    setRefChecks(prev =>
      prev.map(check =>
        check.id === id ? { ...check, [field]: !check[field] } : check
      )
    );
  };

  return (
    <div className="h-full flex flex-col bg-background p-6">
      <div className="grid grid-cols-2 gap-6 flex-1">
        {/* Left - Accounting Form */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Бухгалтерія</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Top Row: Сума + Currency, Хто виконав, Витрата пройоб */}
            <div className="flex items-end gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Сума</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    className="h-9 w-24"
                  />
                  <div className="flex border border-input rounded-md overflow-hidden">
                    {currencies.map((cur, idx) => (
                      <button
                        key={cur}
                        type="button"
                        onClick={() => setCurrency(cur)}
                        className={`h-9 px-3 text-xs font-medium transition-colors ${
                          currency === cur
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-background text-muted-foreground hover:bg-muted'
                        } ${idx !== currencies.length - 1 ? 'border-r border-input' : ''}`}
                      >
                        {cur}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5 flex-1">
                <Label className="text-xs text-muted-foreground">Хто виконав</Label>
                <Select value={executor} onValueChange={setExecutor}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Оберіть" />
                  </SelectTrigger>
                  <SelectContent>
                    {executorsList.map(exec => (
                      <SelectItem key={exec} value={exec}>{exec}</SelectItem>
                    ))}
                    <div className="p-2 border-t border-border">
                      <div className="flex gap-2">
                        <Input
                          value={newExecutor}
                          onChange={(e) => setNewExecutor(e.target.value)}
                          placeholder="Новий виконавець"
                          className="h-8 text-sm"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddExecutor();
                          }}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Додати
                        </Button>
                      </div>
                    </div>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2 pb-2">
                <Checkbox
                  id="expense-propiob"
                  checked={expensePropiob}
                  onCheckedChange={(checked) => setExpensePropiob(checked as boolean)}
                />
                <Label htmlFor="expense-propiob" className="text-xs cursor-pointer">
                  Витрата пройоб
                </Label>
              </div>
            </div>

            {/* Second Row: Звідки */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Звідки</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Оберіть джерело" />
                </SelectTrigger>
                <SelectContent>
                  {sourcesList.map(src => (
                    <SelectItem key={src} value={src}>{src}</SelectItem>
                  ))}
                  <div className="p-2 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        value={newSource}
                        onChange={(e) => setNewSource(e.target.value)}
                        placeholder="Нове джерело"
                        className="h-8 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddSource();
                        }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Додати
                      </Button>
                    </div>
                  </div>
                </SelectContent>
              </Select>
            </div>

            {/* Third Row: Куди */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Куди</Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Оберіть призначення" />
                </SelectTrigger>
                <SelectContent>
                  {destinationsList.map(dest => (
                    <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                  ))}
                  <div className="p-2 border-t border-border">
                    <div className="flex gap-2">
                      <Input
                        value={newDestination}
                        onChange={(e) => setNewDestination(e.target.value)}
                        placeholder="Нове призначення"
                        className="h-8 text-sm"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddDestination();
                        }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Додати
                      </Button>
                    </div>
                  </div>
                </SelectContent>
              </Select>
            </div>

            {/* Fourth Row: Коментар */}
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Коментар</Label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Введіть коментар..."
                rows={3}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Right - Ref Check Table */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Перевірка реф</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {refChecks.map((check, index) => (
                <div
                  key={check.id}
                  className="flex items-center gap-3 p-2 border border-border rounded-lg text-sm"
                >
                  <span className="w-6 text-muted-foreground">{index + 1}</span>
                  <span className="flex-1 truncate">{check.packName}</span>
                  <span className="w-24 text-muted-foreground">{check.billing}</span>
                  <span className="w-16 font-medium">€{check.amount.toLocaleString()}</span>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-1 text-xs">
                      <Checkbox
                        checked={check.inProcess}
                        onCheckedChange={() => toggleRefCheck(check.id, 'inProcess')}
                      />
                      <span className="text-info">В процесі</span>
                    </label>
                    <label className="flex items-center gap-1 text-xs">
                      <Checkbox
                        checked={check.received}
                        onCheckedChange={() => toggleRefCheck(check.id, 'received')}
                      />
                      <span className="text-success">Отримано</span>
                    </label>
                    <label className="flex items-center gap-1 text-xs">
                      <Checkbox
                        checked={check.erased}
                        onCheckedChange={() => toggleRefCheck(check.id, 'erased')}
                      />
                      <span className="text-muted-foreground">Затерте</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

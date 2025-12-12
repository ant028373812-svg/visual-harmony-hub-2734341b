import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';

const currencies = ['Гривня', 'Євро', 'Долар'];
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
  const [currencyIndex, setCurrencyIndex] = useState(0);
  const [amount, setAmount] = useState('0');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [note, setNote] = useState('');
  const [refChecks, setRefChecks] = useState(demoRefChecks);
  const { toast } = useToast();

  const handleCurrencyChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrencyIndex(prev => (prev === 0 ? currencies.length - 1 : prev - 1));
    } else {
      setCurrencyIndex(prev => (prev === currencies.length - 1 ? 0 : prev + 1));
    }
  };

  const handleSubmit = () => {
    toast({
      title: 'Транзакцію додано',
      description: `${amount} ${currencies[currencyIndex]} додано до бухгалтерії`,
    });
    setAmount('0');
    setSource('');
    setDestination('');
    setNote('');
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
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Бухгалтерія</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Сума:</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1"
                />
                <div className="flex items-center gap-1 border border-border rounded-md px-2 py-1.5">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleCurrencyChange('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="w-16 text-center text-sm">{currencies[currencyIndex]}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleCurrencyChange('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Звідки:</Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть джерело" />
                </SelectTrigger>
                <SelectContent>
                  {sources.map(src => (
                    <SelectItem key={src} value={src}>{src}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Куди:</Label>
              <Select value={destination} onValueChange={setDestination}>
                <SelectTrigger>
                  <SelectValue placeholder="Оберіть призначення" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map(dest => (
                    <SelectItem key={dest} value={dest}>{dest}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Примітка:</Label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Введіть примітку..."
                rows={4}
              />
            </div>

            <Button 
              className="w-full bg-primary text-primary-foreground"
              onClick={handleSubmit}
            >
              Додати
            </Button>
          </CardContent>
        </Card>

        {/* Right - Ref Check Table */}
        <Card>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Перевірка реф</CardTitle>
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

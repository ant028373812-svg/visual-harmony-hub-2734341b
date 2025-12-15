import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

interface RefInboxItem {
  id: string;
  created_at: string;
  status: string;
  order_id: string | null;
  store_id: string | null;
  drop_id: string | null;
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'new':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'checked':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'sent_to_ref':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'new':
      return 'Новий';
    case 'checked':
      return 'Перевірено';
    case 'sent_to_ref':
      return 'Відправлено';
    default:
      return status;
  }
};

export function RefInboxModule() {
  const [items, setItems] = useState<RefInboxItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('ref_inbox')
          .select('id, created_at, status, order_id, store_id, drop_id')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setItems(data || []);
      } catch (err: any) {
        setError(err.message || 'Помилка завантаження даних');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-destructive mb-2">{error}</p>
          <p className="text-sm text-muted-foreground">Перевірте підключення до бази даних</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/80 px-4 py-3">
        <h2 className="text-lg font-semibold">Ref Inbox</h2>
        <p className="text-sm text-muted-foreground">
          {items.length} записів
        </p>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto bg-muted/20">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-muted/60 sticky top-0">
            <tr className="text-left text-xs text-muted-foreground">
              <th className="px-4 py-3" style={{ width: '25%' }}>Дата створення</th>
              <th className="px-4 py-3" style={{ width: '15%' }}>Статус</th>
              <th className="px-4 py-3" style={{ width: '20%' }}>Order ID</th>
              <th className="px-4 py-3" style={{ width: '20%' }}>Store ID</th>
              <th className="px-4 py-3" style={{ width: '20%' }}>Drop ID</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  Немає даних
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr
                  key={item.id}
                  className={cn(
                    "border-b border-border/50 hover:bg-muted/40 transition-colors",
                    index % 2 === 0 ? "bg-card/40" : "bg-background/60"
                  )}
                >
                  <td className="px-4 py-2.5 text-sm">
                    {formatDate(item.created_at)}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-1 rounded text-xs font-medium border',
                      getStatusBadgeClass(item.status)
                    )}>
                      {getStatusLabel(item.status)}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                    {item.order_id || '—'}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                    {item.store_id || '—'}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">
                    {item.drop_id || '—'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

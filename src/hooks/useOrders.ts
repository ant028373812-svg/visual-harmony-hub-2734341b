import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Drop {
  id: string;
  name: string;
  geo: string;
}

export interface Address {
  id: string;
  drop_id: string;
  geo: string;
  delivery_method: string;
  address: string;
}

export interface Billing {
  id: string;
  name: string;
}

export interface Skup {
  id: string;
  name: string;
}

export interface Pack {
  id: string;
  pack_id: string;
  store_name: string;
  status: string;
  card: string;
  amount: number;
  amount_without_discount: number;
  quantity: number;
  billing: string | null;
  email: string | null;
  password: string | null;
  drop_id: string | null;
  address_id: string | null;
  skup_id: string | null;
  product_type: string;
  track_numbers: string[];
  comments: string[];
  created_at: string;
  delivered_at: string | null;
  drop?: Drop;
  address?: Address;
}

export interface PackArchive extends Omit<Pack, 'created_at' | 'delivered_at'> {
  original_pack_id: string;
  original_created_at: string | null;
  archived_at: string;
}

export const ORDER_STATUSES = [
  'Замовлено',
  'Товар в дорозі',
  'На відділенні',
  'Видав виписку',
  'Взяти Лейбл',
  'Перезамовить',
  'Повертається',
  'Доставлено',
] as const;

export function useDrops() {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDrops = useCallback(async () => {
    const { data, error } = await supabase
      .from('drops')
      .select('*')
      .order('name');
    
    if (error) {
      toast.error('Помилка завантаження дропів');
      console.error(error);
    } else {
      setDrops(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchDrops();
  }, [fetchDrops]);

  const addDrop = async (name: string, geo: string) => {
    const { data, error } = await supabase
      .from('drops')
      .insert({ name, geo })
      .select()
      .single();
    
    if (error) {
      toast.error('Помилка створення дропа');
      return null;
    }
    
    setDrops(prev => [...prev, data]);
    return data;
  };

  return { drops, loading, fetchDrops, addDrop };
}

export function useAddresses(dropId?: string) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAddresses = useCallback(async () => {
    let query = supabase.from('addresses').select('*');
    
    if (dropId) {
      query = query.eq('drop_id', dropId);
    }
    
    const { data, error } = await query.order('address');
    
    if (error) {
      toast.error('Помилка завантаження адрес');
      console.error(error);
    } else {
      setAddresses(data || []);
    }
    setLoading(false);
  }, [dropId]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  return { addresses, loading, fetchAddresses };
}

export function useBillings() {
  const [billings, setBillings] = useState<Billing[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBillings = useCallback(async () => {
    const { data, error } = await supabase
      .from('billings')
      .select('*')
      .order('name');
    
    if (error) {
      toast.error('Помилка завантаження білінгів');
      console.error(error);
    } else {
      setBillings(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchBillings();
  }, [fetchBillings]);

  const addBilling = async (name: string) => {
    const { data, error } = await supabase
      .from('billings')
      .insert({ name })
      .select()
      .single();
    
    if (error) {
      if (error.code === '23505') {
        toast.error('Білінг з такою назвою вже існує');
      } else {
        toast.error('Помилка створення білінга');
      }
      return null;
    }
    
    setBillings(prev => [...prev, data]);
    return data;
  };

  return { billings, loading, fetchBillings, addBilling };
}

export function useSkups() {
  const [skups, setSkups] = useState<Skup[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSkups = useCallback(async () => {
    const { data, error } = await supabase
      .from('skups')
      .select('*')
      .order('name');
    
    if (error) {
      toast.error('Помилка завантаження скупів');
      console.error(error);
    } else {
      setSkups(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSkups();
  }, [fetchSkups]);

  const addSkup = async (name: string) => {
    const { data, error } = await supabase
      .from('skups')
      .insert({ name })
      .select()
      .single();
    
    if (error) {
      if (error.code === '23505') {
        toast.error('Скуп з такою назвою вже існує');
      } else {
        toast.error('Помилка створення скупа');
      }
      return null;
    }
    
    setSkups(prev => [...prev, data]);
    return data;
  };

  return { skups, loading, fetchSkups, addSkup };
}

export interface PackFilters {
  drop?: string;
  geo?: string;
  address?: string;
  billing?: string;
  status?: string;
  skup?: string;
  store?: string;
  search?: string;
  showReturning?: boolean;
}

export function usePacks(filters?: PackFilters) {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPacks = useCallback(async () => {
    let query = supabase
      .from('packs')
      .select(`
        *,
        drop:drops(*),
        address:addresses(*)
      `)
      .order('created_at', { ascending: false });

    // Don't show "Повертається" status by default unless explicitly requested
    if (!filters?.showReturning) {
      query = query.neq('status', 'Повертається');
    }

    // Don't show "Доставлено" status (already transferred)
    query = query.neq('status', 'Доставлено');

    if (filters?.drop) {
      query = query.eq('drop_id', filters.drop);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.billing) {
      query = query.eq('billing', filters.billing);
    }
    if (filters?.skup) {
      query = query.eq('skup_id', filters.skup);
    }
    if (filters?.store) {
      query = query.ilike('store_name', `%${filters.store}%`);
    }

    const { data, error } = await query;

    if (error) {
      toast.error('Помилка завантаження паків');
      console.error(error);
    } else {
      let filteredData = data || [];
      
      // Client-side search filtering
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filteredData = filteredData.filter(pack => 
          pack.pack_id.toLowerCase().includes(searchLower) ||
          pack.store_name.toLowerCase().includes(searchLower) ||
          pack.card.includes(searchLower) ||
          pack.status.toLowerCase().includes(searchLower)
        );
      }
      
      setPacks(filteredData);
    }
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    fetchPacks();
  }, [fetchPacks]);

  const createPack = async (packData: {
    pack_id: string;
    store_name: string;
    card: string;
    amount: number;
    amount_without_discount: number;
    quantity: number;
    billing?: string;
    email?: string;
    password?: string;
    drop_id?: string;
    address_id?: string;
    skup_id?: string;
    product_type: string;
  }) => {
    const { data, error } = await supabase
      .from('packs')
      .insert({
        ...packData,
        status: 'Замовлено',
        track_numbers: [],
        comments: [],
      })
      .select(`
        *,
        drop:drops(*),
        address:addresses(*)
      `)
      .single();

    if (error) {
      toast.error('Помилка створення паку');
      console.error(error);
      return null;
    }

    toast.success('Пак успішно створено');
    setPacks(prev => [data, ...prev]);
    return data;
  };

  const updatePackStatus = async (packId: string, newStatus: string) => {
    // If status is "Доставлено", we need to transfer to ref_processes
    if (newStatus === 'Доставлено') {
      const pack = packs.find(p => p.id === packId);
      if (!pack) return false;

      // Create ref_process entry
      const { error: refError } = await supabase
        .from('ref_processes')
        .insert({
          pack_id: packId,
          pack_name: pack.pack_id,
          store_name: pack.store_name,
          status: 'Актив',
          track_number: pack.track_numbers?.[0] || '',
          comments: pack.comments || [],
          drop_id: pack.drop_id,
        });

      if (refError) {
        toast.error('Помилка переміщення в Реф Процес');
        console.error(refError);
        return false;
      }
    }

    const { error } = await supabase
      .from('packs')
      .update({ 
        status: newStatus,
        delivered_at: newStatus === 'Доставлено' ? new Date().toISOString() : null
      })
      .eq('id', packId);

    if (error) {
      toast.error('Помилка оновлення статусу');
      console.error(error);
      return false;
    }

    toast.success('Статус оновлено');
    
    // If delivered, remove from list
    if (newStatus === 'Доставлено') {
      setPacks(prev => prev.filter(p => p.id !== packId));
    } else {
      setPacks(prev => prev.map(p => 
        p.id === packId ? { ...p, status: newStatus } : p
      ));
    }
    
    return true;
  };

  const deletePack = async (packId: string) => {
    const pack = packs.find(p => p.id === packId);
    if (!pack) return false;

    // First, archive the pack
    const { error: archiveError } = await supabase
      .from('pack_archive')
      .insert({
        original_pack_id: pack.id,
        pack_id: pack.pack_id,
        store_name: pack.store_name,
        status: pack.status,
        card: pack.card,
        amount: pack.amount,
        amount_without_discount: pack.amount_without_discount,
        quantity: pack.quantity,
        billing: pack.billing,
        email: pack.email,
        password: pack.password,
        drop_id: pack.drop_id,
        address_id: pack.address_id,
        skup_id: pack.skup_id,
        product_type: pack.product_type,
        track_numbers: pack.track_numbers,
        comments: pack.comments,
        original_created_at: pack.created_at,
      });

    if (archiveError) {
      toast.error('Помилка архівації паку');
      console.error(archiveError);
      return false;
    }

    // Then delete the pack
    const { error: deleteError } = await supabase
      .from('packs')
      .delete()
      .eq('id', packId);

    if (deleteError) {
      toast.error('Помилка видалення паку');
      console.error(deleteError);
      return false;
    }

    toast.success('Пак переміщено в архів');
    setPacks(prev => prev.filter(p => p.id !== packId));
    return true;
  };

  const updatePack = async (packId: string, updates: Partial<Pack>) => {
    const { error } = await supabase
      .from('packs')
      .update(updates)
      .eq('id', packId);

    if (error) {
      toast.error('Помилка оновлення паку');
      console.error(error);
      return false;
    }

    setPacks(prev => prev.map(p => 
      p.id === packId ? { ...p, ...updates } : p
    ));
    return true;
  };

  return { 
    packs, 
    loading, 
    fetchPacks, 
    createPack, 
    updatePackStatus, 
    deletePack,
    updatePack 
  };
}

export function usePackArchive() {
  const [archives, setArchives] = useState<PackArchive[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArchives = useCallback(async () => {
    const { data, error } = await supabase
      .from('pack_archive')
      .select('*')
      .order('archived_at', { ascending: false })
      .limit(20);

    if (error) {
      toast.error('Помилка завантаження архіву');
      console.error(error);
    } else {
      setArchives(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchArchives();
  }, [fetchArchives]);

  return { archives, loading, fetchArchives };
}

import { Task, Reminder, Pack, Drop, Address, Skup, RefProcess, Transaction, Store, StoreItem } from './types';

export const demoTasks: Task[] = [
  { id: '1', title: 'Перевірити звіт продажів', assignedTo: 'Олег', date: new Date('2025-12-12'), completed: false },
  { id: '2', title: 'Оновити базу клієнтів', assignedTo: 'Іван', date: new Date('2025-12-13'), completed: false },
  { id: '3', title: 'Підготувати презентацію', assignedTo: 'Назар', date: new Date('2025-12-14'), completed: true },
];

export const demoReminders: Reminder[] = [
  { id: '1', text: 'Зателефонувати постачальнику', date: new Date('2025-12-15'), completed: false },
  { id: '2', text: 'Відправити документи бухгалтеру', date: new Date('2025-12-16'), completed: true },
];

export const demoSkups: Skup[] = [
  { id: '1', name: 'Oleg' },
  { id: '2', name: 'Ivan' },
  { id: '3', name: 'Nazar' },
];

export const demoDrops: Drop[] = [
  { id: '1', name: 'Vlad', geo: 'UA', addresses: [] },
  { id: '2', name: 'Oleg', geo: 'DE', addresses: [] },
  { id: '3', name: 'Максим', geo: 'IT', addresses: [] },
];

export const demoAddresses: Address[] = [
  { id: '1', dropId: '1', geo: 'UA', deliveryMethod: 'DHL', address: 'Kyiv, вул. Хрещатик 1' },
  { id: '2', dropId: '1', geo: 'UA', deliveryMethod: 'DPD', address: 'Lviv, пр. Свободи 5' },
  { id: '3', dropId: '2', geo: 'DE', deliveryMethod: 'DHL', address: 'Berlin, Alexanderplatz 10' },
  { id: '4', dropId: '3', geo: 'IT', deliveryMethod: 'GLS', address: 'Milano, Via Roma 25' },
];

export const demoPacks: Pack[] = [
  {
    id: '1',
    packId: '1V15',
    storeName: 'Zara',
    status: 'Замовлено',
    card: '1234',
    amount: 420.50,
    amountWithoutDiscount: 525.00,
    quantity: 5,
    billing: 'Zen Anton',
    email: 'test@email.com',
    password: '****',
    dropId: '1',
    addressId: '1',
    skupId: '1',
    productType: 'Шмот',
    trackNumbers: ['1Z999AA10123456784', '1Z999AA10123456785'],
    comments: [],
    createdAt: new Date('2025-01-10'),
  },
  {
    id: '2',
    packId: '2A23',
    storeName: 'Nike Shoes',
    status: 'Товар в дорозі',
    card: '5678',
    amount: 189.99,
    amountWithoutDiscount: 229.99,
    quantity: 2,
    billing: 'Zen Yaroslav',
    email: 'nike@email.com',
    password: '****',
    dropId: '1',
    addressId: '2',
    skupId: '2',
    productType: 'Шмот',
    trackNumbers: ['1Z999AA10123456786'],
    comments: [],
    createdAt: new Date('2025-01-11'),
  },
  {
    id: '3',
    packId: '3B12',
    storeName: 'Adidas Hoodie',
    status: 'На відділенні',
    card: '9012',
    amount: 145.00,
    amountWithoutDiscount: 180.00,
    quantity: 3,
    billing: 'Zen Anton',
    email: 'adidas@email.com',
    password: '****',
    dropId: '1',
    addressId: '1',
    skupId: '1',
    productType: 'Шмот',
    trackNumbers: ['1Z999AA10123456787', '1Z999AA10123456788', '1Z999AA10123456789'],
    comments: [],
    createdAt: new Date('2025-01-12'),
  },
];

export const demoRefProcesses: RefProcess[] = [
  {
    id: '1',
    packId: '1V15',
    storeName: 'Zara Jacket',
    status: 'Актив',
    trackNumber: '1Z999AA10123456784',
    refMethod: 'DNA',
    deliveryDate: new Date('2025-01-15'),
    writeDate: new Date('2025-01-18'),
    dropPayment: 50,
    carrierPayment: 27,
    additionalExpenses: 5,
    boxerExpenses: 15,
    netProfit: 323.50,
  },
  {
    id: '2',
    packId: '2A23',
    storeName: 'Nike Shoes',
    status: 'Очіку',
    trackNumber: '1Z999AA10123456785',
    refMethod: 'FTID',
    deliveryDate: new Date('2025-01-16'),
    writeDate: new Date('2025-01-19'),
    dropPayment: 45,
    carrierPayment: 25,
    additionalExpenses: 3,
    boxerExpenses: 12,
    netProfit: 104.99,
  },
  {
    id: '3',
    packId: '3B08',
    storeName: 'Apple Watch',
    status: 'Чекає',
    trackNumber: '1Z999AA10123456786',
    refMethod: 'EB',
    dropPayment: 60,
    carrierPayment: 30,
    additionalExpenses: 8,
    boxerExpenses: 20,
    netProfit: 0,
  },
  {
    id: '4',
    packId: '4C12',
    storeName: 'Adidas Hoodie',
    status: 'Актив',
    trackNumber: '1Z999AA10123456787',
    refMethod: 'DNA',
    deliveryDate: new Date('2025-01-17'),
    writeDate: new Date('2025-01-20'),
    dropPayment: 40,
    carrierPayment: 22,
    additionalExpenses: 4,
    boxerExpenses: 10,
    netProfit: 68.00,
  },
  {
    id: '5',
    packId: '5D19',
    storeName: 'Samsung Phone',
    status: 'Актив',
    trackNumber: '1Z999AA10123456788',
    refMethod: 'FTID',
    deliveryDate: new Date('2025-01-18'),
    writeDate: new Date('2025-01-21'),
    dropPayment: 80,
    carrierPayment: 35,
    additionalExpenses: 10,
    boxerExpenses: 25,
    netProfit: 450.00,
  },
  {
    id: '6',
    packId: '6E05',
    storeName: 'H&M Dress',
    status: 'Очіку',
    trackNumber: '1Z999AA10123456789',
    refMethod: 'DNA',
    deliveryDate: new Date('2025-01-19'),
    writeDate: new Date('2025-01-22'),
    dropPayment: 35,
    carrierPayment: 20,
    additionalExpenses: 2,
    boxerExpenses: 8,
    netProfit: 55.00,
  },
  {
    id: '7',
    packId: '7F14',
    storeName: 'Sony Headphones',
    status: 'Актив',
    trackNumber: '1Z999AA10123456790',
    refMethod: 'FTID',
    deliveryDate: new Date('2025-01-20'),
    writeDate: new Date('2025-01-23'),
    dropPayment: 55,
    carrierPayment: 28,
    additionalExpenses: 6,
    boxerExpenses: 15,
    netProfit: 196.00,
  },
  {
    id: '8',
    packId: '8G21',
    storeName: 'Puma Backpack',
    status: 'Очіку',
    trackNumber: '1Z999AA10123456791',
    refMethod: 'DNA',
    deliveryDate: new Date('2025-01-21'),
    writeDate: new Date('2025-01-24'),
    dropPayment: 30,
    carrierPayment: 18,
    additionalExpenses: 2,
    boxerExpenses: 7,
    netProfit: 43.00,
  },
];

export const demoTransactions: Transaction[] = [
  { id: '1', date: new Date('2025-01-15'), type: 'Прихід', category: 'Виручка магазину', amount: 125000, description: 'Продаж товарів', store: 'Магазин Київ', status: 'Оплачено' },
  { id: '2', date: new Date('2025-01-14'), type: 'Витрата', category: 'Оплата дропу', amount: 45000, description: 'Оплата дропу', status: 'Не оплачено' },
  { id: '3', date: new Date('2025-01-14'), type: 'Витрата', category: 'Оплата перевізнику', amount: 12000, description: 'Доставка товарів', status: 'Оплачено' },
  { id: '4', date: new Date('2025-01-13'), type: 'Прихід', category: 'Виручка магазину', amount: 89000, description: 'Онлайн замовлення', store: 'Магазин Одеса', status: 'Оплачено' },
  { id: '5', date: new Date('2025-01-12'), type: 'Витрата', category: 'Офісні витрати', amount: 8500, description: 'Оренда офісу', status: 'Очікує' },
  { id: '6', date: new Date('2025-01-11'), type: 'Витрата', category: 'Виплати команді', amount: 35000, description: 'Зарплата співробітників', status: 'Оплачено' },
  { id: '7', date: new Date('2025-01-10'), type: 'Прихід', category: 'Виручка магазину', amount: 156000, description: 'Роздрібні продажі', store: 'Магазин Київ', status: 'Оплачено' },
  { id: '8', date: new Date('2025-01-09'), type: 'Витрата', category: 'Оплата дропу', amount: 38000, description: 'Оплата дропу', status: 'Не оплачено' },
];

export const demoStores: Store[] = [
  {
    id: '1',
    name: 'Zara',
    items: generateStoreItems(35),
  },
  {
    id: '2',
    name: 'Mango',
    items: generateStoreItems(35),
  },
  {
    id: '3',
    name: 'H&M',
    items: generateStoreItems(35),
  },
  {
    id: '4',
    name: 'Bershka',
    items: generateStoreItems(35),
  },
  {
    id: '5',
    name: 'Pull&Bear',
    items: generateStoreItems(35),
  },
];

function generateStoreItems(count: number): StoreItem[] {
  const colors = ['Білий', 'Чорний', 'Синій', 'Червоний'];
  const sizes = ['S', 'M', 'L', 'XL'];
  const buyers = ['Олена', 'Іван', 'Марія', ''];
  
  return Array.from({ length: count }, (_, i) => {
    const quantity = Math.floor(Math.random() * 5) + 1;
    const orderedBy = buyers.filter(() => Math.random() > 0.5).slice(0, 5);
    const orderedQuantity = orderedBy.length;
    
    return {
      id: `item-${i + 1}`,
      number: i + 1,
      link: `https://example.com/product/${i}`,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      availability: Math.random() > 0.5 ? 'В наявності' : 'Немає',
      color: colors[Math.floor(Math.random() * colors.length)],
      percent: Math.floor(Math.random() * 60) + 10,
      sum: Math.floor(Math.random() * 5000) + 500,
      quantity,
      orderedBy,
      remaining: Math.max(0, quantity - orderedQuantity),
    };
  });
}

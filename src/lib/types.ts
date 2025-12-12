// Core CRM Types

export type OrderStatus = 
  | 'Замовлено' 
  | 'Товар в дорозі' 
  | 'На відділенні' 
  | 'Видав виписку' 
  | 'Взяти Лейбл' 
  | 'Перезамовить' 
  | 'Повертаєтся' 
  | 'Доставлено';

export type RefStatus = 
  | 'Актив' 
  | 'Очіку' 
  | 'Чекає' 
  | 'Написав очікую' 
  | 'Чекаєм на реф' 
  | 'Рефнуто';

export type DeliveryMethod = 'DHL' | 'DPD' | 'UPS' | 'FedEx' | 'GLS' | 'UkrPoshta';

export type ProductType = 'Техніка' | 'Шмот';

export interface Drop {
  id: string;
  name: string;
  geo: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  dropId: string;
  geo: string;
  deliveryMethod: DeliveryMethod;
  address: string;
}

export interface Pack {
  id: string;
  packId: string; // e.g., "1V15"
  storeName: string; // e.g., "Zara"
  status: OrderStatus;
  card: string; // last 4 digits
  amount: number;
  amountWithoutDiscount: number;
  quantity: number;
  billing: string;
  email: string;
  password: string;
  dropId: string;
  addressId: string;
  skupId: string;
  productType: ProductType;
  trackNumbers: string[];
  comments: string[];
  createdAt: Date;
  deliveredAt?: Date;
}

export interface RefProcess {
  id: string;
  packId: string;
  storeName: string;
  status: RefStatus;
  trackNumber: string;
  refMethod: 'FTID' | 'DNA' | 'EB' | '';
  deliveryDate?: Date;
  writeDate?: Date;
  dropPayment: number;
  carrierPayment: number;
  additionalExpenses: number;
  boxerExpenses: number;
  netProfit: number;
}

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  date: Date;
  completed: boolean;
}

export interface Reminder {
  id: string;
  text: string;
  date: Date;
  completed: boolean;
}

export interface Skup {
  id: string;
  name: string;
}

export interface Transaction {
  id: string;
  date: Date;
  type: 'Прихід' | 'Витрата';
  category: string;
  amount: number;
  description: string;
  store?: string;
  status: 'Оплачено' | 'Не оплачено' | 'Очікує';
}

export interface StoreItem {
  id: string;
  number: number;
  link: string;
  size: string;
  availability: 'Так' | 'Ні' | 'В наявності' | 'Немає';
  color: string;
  percent: number;
  sum: number;
  quantity: number;
  orderedBy: string[];
  remaining: number;
}

export interface Store {
  id: string;
  name: string;
  items: StoreItem[];
}

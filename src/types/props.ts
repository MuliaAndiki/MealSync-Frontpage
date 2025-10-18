import { CardProfileType, HistoryType, OrderType, ProductsType, PurchaseType } from './components';

export interface ProductsProps {
  data: ProductsType;
}
export interface CardProfileProps {
  data: CardProfileType;
}

export interface HistoryProps {
  data: HistoryType;
}

export interface OrderCardProps {
  data: OrderType;
}

export interface PurchaseProps {
  data: PurchaseType;
  onViewDetail?: (_id: string) => void;
}

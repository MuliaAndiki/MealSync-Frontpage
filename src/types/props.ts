import { HistoryType, OrderType, ProductsType, PurchaseType } from './components';
import { ProfileType } from './config';

export interface ProductsProps {
  data: ProductsType;
}

export interface HistoryProps {
  data: HistoryType;
}

export interface OrderCardProps {
  data: OrderType;
}

export interface ProfilProps {
  data: ProfileType;
}

export interface PurchaseProps {
  data: PurchaseType;
  onViewDetail?: (_id: string) => void;
}

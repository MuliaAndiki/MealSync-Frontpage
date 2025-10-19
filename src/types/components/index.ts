export interface SosmedType {
  icon: any;
  value: string;
}

export interface SponsorType {
  image: string;
  title: string;
  desc: string;
}

export interface ProductsType {
  _id: string;
  pictProduct: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  count: number;
  category: string;
  isAvailable: boolean;
}

export interface CardProfileType {
  _id: string;
  profile: {
    address: string;
    description: string;
    profile: string;
    logoUrl: string;
    banner: string;
    pitch: string;
    vocher: string;
  };
  name: string;
  email: string;
  uniqueUrl: string;
}

export interface RestaurantCardType {
  image: string;
  title: string;
  button: string;
}

export interface MenusType {
  title: string;
  url: string;
  icon: any;
}

export interface HistoryType {
  image: string;
  title: string;
  price: number;
  rating: number;
  date: string;
  time: string;
  totalprice: number;
  status: string;
}

export interface ChairType {
  _id: string;
  noChair: number;
  status: string;
}

export interface CartType {
  _id: string;
  userId: string;
  items: {
    _id: string;
    quantity: number;
    subtotal: number;
    product: ProductsType;
  }[];
  total: number;
}

export interface OrderType {
  _id: string;
  userId: string;
  restaurantId: string;
  items: {
    _id: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: string;
  chairNo: number;
  createdAt: string;
  updatedAt: string;
}

export interface UniqueUrlProfileType {
  restaurant: {
    _id: string;
    name: string;
    uniqueUrl: string;
    profile: {
      address: string | null;
      description: string | null;
      logoUrl: string | null;
      banner: string | null;
      pitch: string | null;
      certi: string[];
    };
  };
  products: ProductsType[];
  chairs: ChairType[];
}

export interface PurchaseType {
  _id: string;
  orderId: string;
  amount: number;
  status: 'completed' | 'failed';
  paymentMethod: string;
  createdAt: string;
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
}

type ModalType = 'Form';

export type ParentModalType = ModalType | 'Add' | 'Chair' | 'Order' | 'Pay' | null;

export type StatusType = 'pending' | 'paid' | 'failed' | 'completed' | 'cancelled';

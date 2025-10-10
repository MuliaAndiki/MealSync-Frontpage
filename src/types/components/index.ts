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

export interface RestaurantCardType {
  image: string;
  title: string;
  button: string;
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

type ModalType = 'Form';

export type ParentModalType = ModalType | 'Add' | 'Chair' | null;

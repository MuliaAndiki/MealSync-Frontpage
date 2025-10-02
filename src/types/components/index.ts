export interface SosmedType {
  icon: any;
  value: string;
}

export interface RestaurantCardType {
  image: string;
  title: string;
  button: string;
}

export interface SponsorType {
  image: string;
  title: string;
  desc: string;
}

export interface ProductsType {
  image: string;
  title: string;
  price: number;
  rating: number;
  count: number;
  category: string;
}

export interface CardProfileType {
  banner: string;
  logo: string;
  desc: string;
  lokasi: string;
  phone: string;
  image: {
    label1: string;
    label2: string;
    label3: string;
  };
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

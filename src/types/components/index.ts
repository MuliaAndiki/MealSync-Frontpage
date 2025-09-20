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

export interface CategoryType {
  image: any;
  params?: string;
}

export interface ProductsType {
  image: string;
  title: string;
  price: number;
  min: any;
  max: any;
  star: any;
  rating: number;
  count: number;
}

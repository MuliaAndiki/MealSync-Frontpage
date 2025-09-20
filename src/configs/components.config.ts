import {
  CategoryType,
  ProductsType,
  RestaurantCardType,
  SosmedType,
  SponsorType,
} from '@/types/components';
import { IconHome, IconMail, IconPhoneCall, IconBurger, IconStar } from '@tabler/icons-react';

export const SosmedData: SosmedType[] = [
  {
    icon: IconHome,
    value: '5th Eve, Colombo Road, Galle.',
  },
  {
    icon: IconPhoneCall,
    value: '+94 111 123 457',
  },
  {
    icon: IconMail,
    value: 'brastra@gmail.com',
  },
];

export const RestaurantCardData: RestaurantCardType[] = [
  {
    image: '/images/restaurant.png',
    title: 'De Morden',
    button: 'View',
  },
  {
    image: '/images/restaurant.png',
    title: 'De Morden',
    button: 'View',
  },
  {
    image: '/images/restaurant.png',
    title: 'De Morden',
    button: 'View',
  },
  {
    image: '/images/restaurant.png',
    title: 'De Morden',
    button: 'View',
  },
];

export const SponsorData: SponsorType[] = [
  {
    image: '/images/logo1.svg',
    title: 'The Flavor House',
    desc: 'These nutrients support everything from immune function to bone health.',
  },
  {
    image: '/images/logo2.svg',
    title: 'Skilled Chefs',
    desc: 'excellent culinary skills, time management expertise, the ability to work',
  },
  {
    image: '/images/logo 3.svg',
    title: 'Unique Recipes',
    desc: 'Having an extra visual element around these items on your menu will help attract your guest',
  },
];

export const CategoryData: CategoryType[] = [
  {
    image: IconBurger,
    params: '#',
  },
  {
    image: IconBurger,
    params: '#',
  },
  {
    image: IconBurger,
    params: '#',
  },
  {
    image: IconBurger,
    params: '#',
  },
  {
    image: IconBurger,
    params: '#',
  },
  {
    image: IconBurger,
    params: '#',
  },
];

export const ProductsData: ProductsType[] = [
  {
    image: '/images/burger.svg',
    max: '+',
    min: '-',
    price: 30000,
    star: IconStar,
    title: 'Burger',
    count: 0,
    rating: 4,
  },
];

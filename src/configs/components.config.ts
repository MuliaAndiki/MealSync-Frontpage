import { IconHome, IconMail, IconMenu2,IconPhoneCall } from '@tabler/icons-react';
import { IconCircleCheck, IconClipboardText, IconToolsKitchen2 } from '@tabler/icons-react';
import { Home } from 'lucide-react';

import {
  HistoryType,
  MenusType,
  RestaurantCardType,
  SosmedType,
  SponsorType,
} from '@/types/components';

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

export const MenuData: MenusType[] = [
  {
    title: 'Home',
    url: '/restaurant/dashboard',
    icon: Home,
  },
  {
    title: 'Menu',
    url: '/restaurant/dashboard/menu',
    icon: IconToolsKitchen2,
  },
  {
    title: 'Purchase History',
    url: '/restaurant/dashboard/history',
    icon: IconClipboardText,
  },
  {
    title: 'Order Status',
    url: '#',
    icon: IconCircleCheck,
  },
  {
    title: 'Manajement',
    icon: IconMenu2,
    url: '/restaurant/dashboard/manage',
  },
];

export const HistoryData: HistoryType[] = [
  {
    title: 'Burger',
    price: 10000,
    date: '15-Agustus-2025',
    image: '/images/burger.svg',
    rating: 5,
    status: 'selesai',
    time: '14.30',
    totalprice: 20000,
  },
];

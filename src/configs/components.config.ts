import { IconHome, IconMail, IconMenu2, IconPhoneCall } from '@tabler/icons-react';
import { IconCircleCheck, IconClipboardText, IconSettings,IconToolsKitchen2 } from '@tabler/icons-react';
import { Home, UserPen } from 'lucide-react';

import {
  HistoryType,
  MenusType,
  OrderType,
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

export const MenuDataRestaurant: MenusType[] = [
  {
    title: 'Home',
    url: '/restaurant/dashboard',
    icon: Home,
  },
  {
    title: 'Purchase History',
    url: '/restaurant/dashboard/history',
    icon: IconClipboardText,
  },
  {
    title: 'Order Status',
    url: '/restaurant/dashboard/order',
    icon: IconCircleCheck,
  },
  {
    title: 'Manajement',
    icon: IconMenu2,
    url: '/restaurant/dashboard/manage',
  },
  {
    title: 'Profile',
    icon: UserPen,
    url: '/restaurant/dashboard/profile',
  },
  {
    title: 'Settings',
    icon: IconSettings,
    url: '/restaurant/dashboard/settings',
  },
];

export const MenuDataUser: MenusType[] = [
  {
    title: 'Home',
    url: '/user/dashboard',
    icon: Home,
  },
  {
    title: 'Purchase History',
    url: '/user/dashboard/history',
    icon: IconClipboardText,
  },
  {
    title: 'Order Status',
    url: '/user/dashboard/order',
    icon: IconCircleCheck,
  },
  {
    title: 'Profile',
    icon: UserPen,
    url: '/user/dashboard/profile',
  },
  {
    title: 'Settings',
    icon: IconSettings,
    url: '/user/dashboard/settings',
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

export const OrderCardData: OrderType[] = [
  {
    _id: '1',
    userId: 'u1',
    restaurantId: 'r1',
    items: [
      {
        _id: 'i1',
        productId: 'p1',
        name: 'Burger',
        price: 10000,
        quantity: 2,
      },
    ],
    total: 20000,
    status: 'selesai',
    chairNo: 5,
    createdAt: '2023-08-15T10:00:00Z',
    updatedAt: '2023-08-15T12:00:00Z',
  },
];

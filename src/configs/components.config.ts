import {
  CardProfileType,
  HistoryType,
  MenusType,
  ProductsType,
  RestaurantCardType,
  SosmedType,
  SponsorType,
} from '@/types/components';
import { IconHome, IconMail, IconPhoneCall, IconMenu2 } from '@tabler/icons-react';
import { IconCircleCheck, IconClipboardText, IconToolsKitchen2 } from '@tabler/icons-react';
import { Home, Settings } from 'lucide-react';

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

export const CardProfileData: CardProfileType[] = [
  {
    banner: '/images/restaurant.svg',
    desc: 'Kami menghadirkan rasa dengan sentuhan seni dan inovasi, agar setiap piring menjadi pengalaman baru yang tak terlupakan',
    logo: '/images/logo2.svg',
    lokasi: 'Lorong Tunggai V, Lamgugob, Kec. Syiah Kuala.',
    phone: '082216903771',
    image: {
      label1: '/images/logo4.svg',
      label2: '/images/logo4.svg',
      label3: '/images/logo4.svg',
    },
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
    title: 'Settings',
    url: '#',
    icon: Settings,
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

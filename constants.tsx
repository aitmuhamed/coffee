
import React from 'react';
import { MenuItem, GalleryImage } from './types';

export const HERO_CAROUSEL_IMAGES = [
  // {
  //   url: 'https://images.unsplash.com/photo-1559925393-8be0ec41b5ec?auto=format&fit=crop&q=80&w=2070',
  //   caption: 'Modern glass architecture and urban vibes'
  // },
  {
    url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2070',
    caption: 'Greenery interior and minimalist sanctuary'
  },
  {
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=2070',
    caption: 'Artisan brewing excellence'
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800', caption: 'The Green Wall' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1559925393-8be0ec41b5ec?auto=format&fit=crop&q=80&w=800', caption: 'Glass Oasis' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&q=80&w=800', caption: 'Modern Aesthetics' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=800', caption: 'Minimalist Design' },
  { id: 'g5', url: 'https://images.unsplash.com/photo-1511081134294-24617055a63c?auto=format&fit=crop&q=80&w=800', caption: 'Fresh Extraction' },
  { id: 'g6', url: 'https://images.unsplash.com/photo-1521017432531-fbd92d744264?auto=format&fit=crop&q=80&w=800', caption: 'Warm Spaces' }
];

export const MENU_ITEMS: MenuItem[] = [
  // COFFEE
  {
    id: '1',
    name: 'Signature 57 Latte',
    description: 'Double shot of our house espresso with silky steamed milk and a touch of honeycomb.',
    price: 5.50,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80&w=800',
    sizes: [
      { label: 'S', price: 4.50 },
      { label: 'M', price: 5.50 },
      { label: 'L', price: 6.50 }
    ]
  },
  {
    id: '2',
    name: 'Nitro Cold Brew',
    description: '12-hour steeped cold brew infused with nitrogen for a creamy, stout-like finish.',
    price: 4.75,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&q=80&w=800',
    sizes: [
      { label: 'R', price: 4.75 },
      { label: 'L', price: 5.75 }
    ]
  },
  {
    id: '6',
    name: 'V60 Pour Over',
    description: 'Single origin beans brewed precisely to highlight floral and citrus notes.',
    price: 6.50,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1544787210-282aa0630b72?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '10',
    name: 'Flat White',
    description: 'Micro-foam milk poured over a double ristretto for a smooth, intense finish.',
    price: 4.50,
    category: 'Coffee',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&q=80&w=800',
    sizes: [
      { label: 'S', price: 4.50 },
      { label: 'M', price: 5.25 }
    ]
  },

  // TEA
  {
    id: '3',
    name: 'Emerald Matcha',
    description: 'Ceremonial grade Japanese matcha whisked with creamy oat milk.',
    price: 6.00,
    category: 'Tea',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80&w=800',
    sizes: [
      { label: 'S', price: 5.50 },
      { label: 'M', price: 6.00 },
      { label: 'L', price: 7.00 }
    ]
  },
  {
    id: '11',
    name: 'London Fog',
    description: 'Earl Grey tea infused with lavender, vanilla, and velvety steamed milk.',
    price: 5.25,
    category: 'Tea',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
    sizes: [
      { label: 'M', price: 5.25 },
      { label: 'L', price: 6.25 }
    ]
  },

  // CAKES
  {
    id: '12',
    name: 'Dark Chocolate Ganache',
    description: 'Decadent 70% cocoa layers finished with a smooth espresso-infused ganache.',
    price: 7.50,
    category: 'Cake',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '13',
    name: 'Lemon Raspberry Zest',
    description: 'Light sponge cake with citrus zest, fresh raspberry filling, and cream frosting.',
    price: 6.75,
    category: 'Cake',
    image: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '14',
    name: 'New York Cheesecake',
    description: 'A classic rich and creamy cheesecake with a buttery graham cracker crust.',
    price: 8.00,
    category: 'Cake',
    image: 'https://images.unsplash.com/photo-1524350303359-3663c58253bb?auto=format&fit=crop&q=80&w=800'
  },

  // PASTRY
  {
    id: '5',
    name: 'Pain au Chocolat',
    description: 'Flaky, buttery layers of French pastry with rich dark chocolate.',
    price: 4.25,
    category: 'Pastry',
    image: 'https://images.unsplash.com/photo-1505253149613-112d21d9f6a9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '15',
    name: 'Almond Croissant',
    description: 'Twice-baked croissant filled with almond frangipane and topped with toasted flakes.',
    price: 4.75,
    category: 'Pastry',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800'
  },

  // BRUNCH
  {
    id: '4',
    name: 'Artisan Sourdough Toast',
    description: 'Crushed avocado, chili flakes, and a poached egg on freshly baked sourdough.',
    price: 12.50,
    category: 'Brunch',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '16',
    name: 'Truffle Mushroom Omelette',
    description: 'Organic eggs, wild mushrooms, and black truffle oil served with side gardens.',
    price: 14.50,
    category: 'Brunch',
    image: 'https://images.unsplash.com/photo-1510629954389-c1e0da47d4ec?auto=format&fit=crop&q=80&w=800'
  }
];

export const ICONS = {
  Cart: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  Menu: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  ),
  Close: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Sparkles: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  ChevronDown: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  Search: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  Plus: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  ),
  Image: (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
};

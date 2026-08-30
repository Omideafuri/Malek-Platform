export const siteConfig = {
  name: 'Malek',
  nameFa: 'ملک طلا',
  brandHandle: '@malektalaa',
  instagramUrl: 'https://www.instagram.com/malektalaa/',
  whatsappUrl: 'https://wa.me/989120000000',
  description: 'گالری و خانه رسمی طلا، مسکوکات و شمش‌های استاندارد سرمایه‌گذاری ملک طلا',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/images/og-image.jpg',
  links: {
    support: '/support',
    terms: '/terms',
    privacy: '/privacy',
    instagram: 'https://www.instagram.com/malektalaa/',
  },
  contact: {
    email: 'concierge@malektalaa.com',
    phone: '۰۲۱-۸۸۸۸۰۰۰۰',
  },
} as const;

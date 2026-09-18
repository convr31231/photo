/** Единый источник изображений — замените URL на свои фото */
export const images = {
  hero: {
    main: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&q=80',
    overlay: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&q=80',
    mobile: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80',
  },
  studio: {
    main: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1400&q=80',
    secondary: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4d9?w=1000&q=80',
  },
  beforeAfter: {
    before: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1400&q=80',
    after: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1400&q=80',
  },
  contact: {
    map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80',
  },
  cta: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1600&q=80',
} as const;

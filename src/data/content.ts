import { images } from './images';

export type RoomId = 'loft' | 'minimal' | 'white' | 'dark';

export interface Room {
  id: RoomId;
  name: string;
  area: string;
  capacity: string;
  priceFrom: number;
  equipment: string[];
  description: string;
  image: string;
}

export const rooms: Room[] = [
  {
    id: 'loft',
    name: 'LOFT',
    area: '65 м²',
    capacity: 'до 8 человек',
    priceFrom: 2500,
    equipment: ['Софтбоксы', 'Рефлекторы', 'Фоны', 'Гримерная'],
    description: 'Индустриальное пространство с большими окнами и фактурными стенами.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=80',
  },
  {
    id: 'minimal',
    name: 'MINIMAL',
    area: '48 м²',
    capacity: 'до 6 человек',
    priceFrom: 2000,
    equipment: ['Постоянный свет', 'Рефлекторы', 'Стойки', 'Гримерная'],
    description: 'Чистые линии и нейтральные тона для спокойных портретов.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80',
  },
  {
    id: 'white',
    name: 'WHITE',
    area: '55 м²',
    capacity: 'до 10 человек',
    priceFrom: 2200,
    equipment: ['Циклорама', 'Софтбоксы', 'Вспышки', 'Гримерная'],
    description: 'Светлый зал с циклорамой — идеально для fashion и брендов.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1400&q=80',
  },
  {
    id: 'dark',
    name: 'DARK',
    area: '40 м²',
    capacity: 'до 5 человек',
    priceFrom: 1800,
    equipment: ['Импульсный свет', 'Цветные гели', 'Фоны', 'Гримерная'],
    description: 'Контролируемый свет для драматичных и студийных кадров.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=80',
  },
];

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  image: string;
  span?: 'wide' | 'tall' | 'large';
}

export type PortfolioCategory =
  | 'все'
  | 'портрет'
  | 'fashion'
  | 'love story'
  | 'бренды'
  | 'контент';

export const portfolioCategories: PortfolioCategory[] = [
  'все',
  'портрет',
  'fashion',
  'love story',
  'бренды',
  'контент',
];

export const portfolio: PortfolioItem[] = [
  {
    id: 'p01',
    title: 'Светлый портрет',
    category: 'портрет',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1000&q=80',
    span: 'tall',
  },
  {
    id: 'p02',
    title: 'Fashion editorial',
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=80',
    span: 'wide',
  },
  {
    id: 'p03',
    title: 'Городская история',
    category: 'love story',
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1000&q=80',
  },
  {
    id: 'p04',
    title: 'Бренд-кампания',
    category: 'бренды',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=80',
    span: 'large',
  },
  {
    id: 'p05',
    title: 'Контент для соцсетей',
    category: 'контент',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1000&q=80',
  },
  {
    id: 'p06',
    title: 'Студийный портрет',
    category: 'портрет',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&q=80',
  },
  {
    id: 'p07',
    title: 'Тренд-съёмка',
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=80',
    span: 'tall',
  },
  {
    id: 'p08',
    title: 'Утренний свет',
    category: 'love story',
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&q=80',
    span: 'wide',
  },
  {
    id: 'p09',
    title: 'Продуктовая серия',
    category: 'бренды',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1000&q=80',
  },
  {
    id: 'p10',
    title: 'Lifestyle-контент',
    category: 'контент',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1000&q=80',
    span: 'tall',
  },
  {
    id: 'p11',
    title: 'Мягкий свет',
    category: 'портрет',
    image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1000&q=80',
  },
  {
    id: 'p12',
    title: 'Lookbook',
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80',
    span: 'wide',
  },
];

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  priceFrom: number;
  image: string;
}

export const services: Service[] = [
  {
    id: 'photoshoot',
    name: 'Фотосессии',
    description: 'Индивидуальные и парные съёмки с продуманной постановкой света.',
    duration: '1–3 часа',
    priceFrom: 5000,
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80',
  },
  {
    id: 'rental',
    name: 'Аренда студии',
    description: 'Готовые залы с оборудованием для самостоятельной работы.',
    duration: 'от 1 часа',
    priceFrom: 1500,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    id: 'fashion',
    name: 'Fashion-съёмка',
    description: 'Editorial и lookbook для коллекций и персональных проектов.',
    duration: '2–4 часа',
    priceFrom: 10000,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
  },
  {
    id: 'brand',
    name: 'Контент для бренда',
    description: 'Визуальный язык продукта: каталог, реклама, соцсети.',
    duration: '2–6 часов',
    priceFrom: 8000,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  },
  {
    id: 'love',
    name: 'Love Story',
    description: 'Истории пары — от нежных портретов до кинематографичных кадров.',
    duration: '1.5–3 часа',
    priceFrom: 7000,
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80',
  },
  {
    id: 'family',
    name: 'Семейная съёмка',
    description: 'Тёплая атмосфера для семьи любого состава.',
    duration: '1–2 часа',
    priceFrom: 6000,
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80',
  },
  {
    id: 'portrait',
    name: 'Портрет',
    description: 'Классический и современный портрет с акцентом на характер.',
    duration: '1–2 часа',
    priceFrom: 5000,
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
  },
  {
    id: 'social',
    name: 'Съёмка для соцсетей',
    description: 'Серия кадров под форматы Instagram, Reels и Stories.',
    duration: '1–2 часа',
    priceFrom: 5500,
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80',
  },
];

export interface PriceItem {
  id: string;
  name: string;
  priceLabel: string;
  note?: string;
}

export const prices: PriceItem[] = [
  { id: 'hall', name: 'Аренда зала', priceLabel: 'от 1 500 ₽ / час', note: 'Демонстрационные цены шаблона' },
  { id: 'portrait', name: 'Портретная съёмка', priceLabel: 'от 5 000 ₽' },
  { id: 'love', name: 'Love Story', priceLabel: 'от 7 000 ₽' },
  { id: 'fashion', name: 'Fashion', priceLabel: 'от 10 000 ₽' },
  { id: 'content', name: 'Контент-съёмка', priceLabel: 'от 8 000 ₽' },
];

export interface Review {
  id: string;
  text: string;
  author: string;
  role: string;
}

export const reviews: Review[] = [
  {
    id: 'r1',
    text: 'Здесь каждая деталь работает на кадр.',
    author: 'Анна К.',
    role: 'Фотограф',
  },
  {
    id: 'r2',
    text: 'Пространство, в котором хочется снимать снова и снова.',
    author: 'Михаил Д.',
    role: 'Креативный директор',
  },
  {
    id: 'r3',
    text: 'Свет, тишина и идеальная организация — редкое сочетание.',
    author: 'Елена В.',
    role: 'Модель',
  },
  {
    id: 'r4',
    text: 'Бронирование заняло минуту, а результат превзошёл ожидания.',
    author: 'Игорь С.',
    role: 'Основатель бренда',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    id: 'f1',
    question: 'Сколько длится аренда?',
    answer:
      'Минимальная аренда — 1 час. Можно бронировать блоки по 1–4 часа и дольше по согласованию.',
  },
  {
    id: 'f2',
    question: 'Можно ли прийти со своим фотографом?',
    answer:
      'Да. Вы можете работать со своей командой или заказать фотографа студии отдельно.',
  },
  {
    id: 'f3',
    question: 'Есть ли оборудование?',
    answer:
      'В каждом зале — базовый свет, стойки и фоны. Дополнительное оборудование можно арендовать.',
  },
  {
    id: 'f4',
    question: 'Можно ли перенести бронирование?',
    answer:
      'Да, перенос возможен не позднее чем за 24 часа до начала сессии — при наличии свободных слотов.',
  },
  {
    id: 'f5',
    question: 'Есть ли визажист?',
    answer:
      'Визажиста можно добавить при бронировании или рассчитать в калькуляторе съёмки.',
  },
  {
    id: 'f6',
    question: 'Можно ли снимать видео?',
    answer:
      'Да, видеосъёмка разрешена. Сообщите об этом при бронировании — подскажем оптимальный зал.',
  },
  {
    id: 'f7',
    question: 'Как происходит оплата?',
    answer:
      'Предоплата фиксирует слот. Остаток — в день съёмки. Детали подтверждаются менеджером.',
  },
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'Как подготовиться к первой фотосессии',
    excerpt: 'Простые шаги, которые помогут чувствовать себя уверенно в кадре.',
    category: 'Советы',
    readTime: '4 мин',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=900&q=80',
    content: [
      'Выберите настроение съёмки заранее: спокойный портрет, fashion или lifestyle.',
      'Подготовьте 2–3 образа и удобную обувь для смены поз.',
      'Приходите за 10–15 минут — так будет время освоиться в пространстве.',
      'Доверьтесь процессу: лучшие кадры часто появляются после первых дублей.',
    ],
  },
  {
    id: 'b2',
    title: '5 идей для fashion-съёмки',
    excerpt: 'Как сделать образ выразительным без лишней сложности.',
    category: 'Fashion',
    readTime: '5 мин',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=80',
    content: [
      'Монохром: один цвет — и максимум внимания к силуэту.',
      'Контраст фактур: шерсть, шёлк, кожа в одном кадре.',
      'Движение: платье, пальто или шарф в динамике.',
      'Крупные планы аксессуаров как отдельная серия.',
      'Светлый зал + графичный образ для editorial-настроения.',
    ],
  },
  {
    id: 'b3',
    title: 'Как выбрать образ',
    excerpt: 'Что работает в студии и почему «любимое» не всегда лучший выбор.',
    category: 'Стиль',
    readTime: '3 мин',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&q=80',
    content: [
      'Смотрите на линии одежды: чистый силуэт читается лучше принтов.',
      'Учитывайте фон зала — светлый образ в Dark, графичный в White.',
      'Избегайте мелкого логотипа на груди — он отвлекает.',
      'Возьмите запасной верх: часто он спасает серию.',
    ],
  },
  {
    id: 'b4',
    title: 'Как подготовить контент для бренда',
    excerpt: 'Структура съёмки, которая закрывает ленту и рекламу сразу.',
    category: 'Бренды',
    readTime: '6 мин',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80',
    content: [
      'Составьте moodboard и список кадров до съёмки.',
      'Снимайте в 3 форматах: квадрат, вертикаль, широкий горизонталь.',
      'Закладывайте время на детали продукта крупным планом.',
      'Оставьте слот на «сырые» lifestyle-кадры — они оживляют ленту.',
    ],
  },
];

export const stats = [
  { id: 's1', value: 4, suffix: '', label: 'зала' },
  { id: 's2', value: 120, suffix: '+', label: 'съёмок' },
  { id: 's3', value: 24, suffix: '/7', label: 'бронирование' },
  { id: 's4', value: 5, suffix: '', label: 'лет в фотографии' },
] as const;

export const navLinks = [
  { id: 'studio', label: 'Студия', href: '#studio' },
  { id: 'rooms', label: 'Залы', href: '#rooms' },
  { id: 'portfolio', label: 'Портфолио', href: '#portfolio' },
  { id: 'services', label: 'Услуги', href: '#services' },
  { id: 'prices', label: 'Цены', href: '#prices' },
  { id: 'booking', label: 'Бронирование', href: '#booking' },
  { id: 'contacts', label: 'Контакты', href: '#contacts' },
] as const;

export const heroNav = [
  { label: 'СТУДИЯ', href: '#studio' },
  { label: 'ЗАЛЫ', href: '#rooms' },
  { label: 'ПОРТФОЛИО', href: '#portfolio' },
  { label: 'УСЛУГИ', href: '#services' },
  { label: 'БРОНЬ', href: '#booking' },
] as const;

export const contacts = {
  phone: '+7 (900) 000-00-00',
  email: 'hello@shablon.studio',
  telegram: '@shablon_studio',
  vk: 'vk.com/shablon',
  address: 'г. Москва, демонстрационный адрес, 1',
  hours: 'Бронирование 24/7',
};

export { images };

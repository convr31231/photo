export const CALCULATOR_BASE: Record<string, number> = {
  portrait: 5000,
  love: 7000,
  fashion: 10000,
  content: 8000,
};

export const CALCULATOR_HOURS: Record<number, number> = {
  1: 1,
  2: 1.8,
  3: 2.5,
  4: 3.2,
};

export const CALCULATOR_EXTRAS = {
  makeup: 3500,
  photographer: 4000,
  equipment: 1500,
  stylist: 3000,
} as const;

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

export function calcShootPrice(params: {
  type: keyof typeof CALCULATOR_BASE;
  hours: 1 | 2 | 3 | 4;
  extras: {
    makeup: boolean;
    photographer: boolean;
    equipment: boolean;
    stylist: boolean;
  };
}): number {
  const base = CALCULATOR_BASE[params.type] * CALCULATOR_HOURS[params.hours];
  let extras = 0;
  if (params.extras.makeup) extras += CALCULATOR_EXTRAS.makeup;
  if (params.extras.photographer) extras += CALCULATOR_EXTRAS.photographer;
  if (params.extras.equipment) extras += CALCULATOR_EXTRAS.equipment;
  if (params.extras.stylist) extras += CALCULATOR_EXTRAS.stylist;
  return Math.round(base + extras);
}

export function calcBookingPrice(params: {
  roomPriceFrom: number;
  hours: number;
  shootType: string;
}): number {
  const shootAdd: Record<string, number> = {
    rental: 0,
    portrait: 3500,
    love: 5000,
    fashion: 7000,
    content: 5500,
  };
  return Math.round(params.roomPriceFrom * params.hours + (shootAdd[params.shootType] ?? 0));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

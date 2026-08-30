/**
 * Persian formatting utilities for Malek Talaa.
 * Handles Persian numerals, currency, dates, and phone numbers.
 */

const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/**
 * Convert Latin digits to Persian digits.
 */
export function toPersianDigits(input: string | number): string {
  return input
    .toString()
    .replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}

/**
 * Format a number with thousand separators (Persian).
 */
export function formatNumber(value: number | string): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) return '۰';
  const formatted = num.toLocaleString('en-US');
  return toPersianDigits(formatted);
}

/**
 * Format a Toman amount with the currency label.
 * Example: ۱۲۳,۴۵۶ تومان
 */
export function formatToman(toman: number | string): string {
  return `${formatNumber(toman)} تومان`;
}

/**
 * Format a Rial amount as Toman display.
 * Divides by 10 first.
 */
export function formatRialAsToman(rial: bigint | number | string): string {
  const rialNum = typeof rial === 'bigint' ? Number(rial) : Number(rial);
  const toman = Math.floor(rialNum / 10);
  return formatToman(toman);
}

/**
 * Format gold weight in grams with Persian digits.
 * Example: ۰.۲۵۰۰ گرم
 */
export function formatGrams(grams: number | string, decimals = 4): string {
  const num = typeof grams === 'string' ? parseFloat(grams) : grams;
  if (isNaN(num)) return '۰ گرم';
  return `${toPersianDigits(num.toFixed(decimals))} گرم`;
}

/**
 * Format nanograms as displayable grams.
 */
export function formatNgAsGrams(ng: bigint | number, decimals = 4): string {
  const ngNum = typeof ng === 'bigint' ? Number(ng) : ng;
  const grams = ngNum / 1_000_000_000;
  return formatGrams(grams, decimals);
}

/**
 * Format a percentage with Persian digits.
 * Example: ۲.۵%+ or ۱.۳%-
 */
export function formatPercentage(
  value: number,
  options?: { showSign?: boolean; decimals?: number }
): string {
  const { showSign = true, decimals = 2 } = options ?? {};
  const sign = showSign ? (value >= 0 ? '+' : '-') : '';
  const formatted = toPersianDigits(Math.abs(value).toFixed(decimals));
  return `${sign}${formatted}٪`;
}

/**
 * Format Iranian mobile number for display.
 * Input: 09123456789 → ۰۹۱۲ ۳۴۵ ۶۷۸۹
 */
export function formatMobile(mobile: string): string {
  const cleaned = mobile.replace(/\D/g, '');
  if (cleaned.length === 11 && cleaned.startsWith('09')) {
    const formatted = `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    return toPersianDigits(formatted);
  }
  return toPersianDigits(mobile);
}

/**
 * Mask a mobile number for privacy.
 * 09123456789 → ۰۹۱۲***۶۷۸۹
 */
export function maskMobile(mobile: string): string {
  const cleaned = mobile.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return toPersianDigits(`${cleaned.slice(0, 4)}***${cleaned.slice(7)}`);
  }
  return toPersianDigits(mobile);
}

/**
 * Format Sheba number for display.
 * IR123456789012345678901234 → IR۱۲ ۳۴۵۶ ۷۸۹۰ ۱۲۳۴ ۵۶۷۸ ۹۰۱۲ ۳۴
 */
export function formatSheba(sheba: string): string {
  if (!sheba.startsWith('IR') || sheba.length !== 26) return sheba;
  const digits = sheba.slice(2);
  const parts = digits.match(/.{1,4}/g) || [];
  return `IR${toPersianDigits(parts.join(' '))}`;
}

/**
 * Transaction type labels in Persian.
 */
export const transactionTypeLabels: Record<string, string> = {
  BUY: 'خرید',
  SELL: 'فروش',
  DEPOSIT: 'واریز',
  WITHDRAWAL: 'برداشت',
  TRANSFER_IN: 'دریافت انتقال',
  TRANSFER_OUT: 'ارسال انتقال',
  FEE: 'کارمزد',
  DELIVERY: 'تحویل فیزیکی',
  REFUND: 'بازگشت وجه',
  ADJUSTMENT: 'تعدیل',
};

/**
 * Transaction status labels in Persian.
 */
export const transactionStatusLabels: Record<string, string> = {
  PENDING: 'در انتظار',
  PROCESSING: 'در حال پردازش',
  COMPLETED: 'تکمیل شده',
  FAILED: 'ناموفق',
  CANCELLED: 'لغو شده',
  REVERSED: 'برگشت خورده',
};

/**
 * KYC status labels in Persian.
 */
export const kycStatusLabels: Record<string, string> = {
  PENDING: 'در انتظار بررسی',
  UNDER_REVIEW: 'در حال بررسی',
  VERIFIED: 'تأیید شده',
  REJECTED: 'رد شده',
};

/**
 * Format a Date to Persian calendar string or relative time.
 */
export function formatDate(
  date: Date | string | number,
  format: 'date' | 'datetime' | 'time' | 'relative' = 'date'
): string {
  const d = typeof date === 'object' ? date : new Date(date);
  if (isNaN(d.getTime())) return '';

  if (format === 'relative') {
    const diffSec = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diffSec < 60) return 'چند لحظه پیش';
    if (diffSec < 3600) return `${toPersianDigits(Math.floor(diffSec / 60))} دقیقه پیش`;
    if (diffSec < 86400) return `${toPersianDigits(Math.floor(diffSec / 3600))} ساعت پیش`;
    return `${toPersianDigits(Math.floor(diffSec / 86400))} روز پیش`;
  }

  const options: Intl.DateTimeFormatOptions = {
    calendar: 'persian',
    numberingSystem: 'persian',
  };

  if (format === 'time') {
    options.hour = '2-digit';
    options.minute = '2-digit';
  } else if (format === 'datetime') {
    options.year = 'numeric';
    options.month = 'long';
    options.day = 'numeric';
    options.hour = '2-digit';
    options.minute = '2-digit';
  } else {
    options.year = 'numeric';
    options.month = 'long';
    options.day = 'numeric';
  }

  return new Intl.DateTimeFormat('fa-IR', options).format(d);
}


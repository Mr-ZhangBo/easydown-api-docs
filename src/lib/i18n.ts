import { defineI18n } from 'fumadocs-core/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';

export const languages = ['en', 'zh', 'ja', 'es'] as const;
export type Language = (typeof languages)[number];

export const documentLanguages: Record<Language, string> = {
  en: 'en',
  zh: 'zh-Hans',
  ja: 'ja',
  es: 'es',
};

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: [...languages],
  hideLocale: 'never',
  fallbackLanguage: 'en',
});

export const uiI18n = defineI18nUI(i18n, {
  en: { displayName: 'English' },
  zh: { displayName: '中文' },
  ja: { displayName: '日本語' },
  es: { displayName: 'Español' },
});

export function isLanguage(value: string): value is Language {
  return (languages as readonly string[]).includes(value);
}

export function localizedPath(lang: string, slugs: readonly string[] = []) {
  const suffix = slugs.length > 0 ? `/${slugs.join('/')}` : '';
  return `/${lang}${suffix}`;
}

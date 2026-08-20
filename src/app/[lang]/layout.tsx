import { RootProvider } from 'fumadocs-ui/provider/next';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { Metadata, Viewport } from 'next';
import { baseOptions } from '@/lib/layout.shared';
import { documentLanguages, isLanguage, languages, uiI18n, type Language } from '@/lib/i18n';
import { source } from '@/lib/source';
import { appName, siteUrl } from '@/lib/shared';
import '../global.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

const localizedDescriptions: Record<Language, string> = {
  en: 'EasyDown video downloader API reference, platform data contracts, supported URL formats, authentication, billing, and MCP guides.',
  zh: 'EasyDown 视频下载 API 参考文档，包含平台数据契约、支持的链接格式、鉴权、计费和 MCP 指南。',
  ja: 'EasyDown動画ダウンロードAPIのリファレンス、プラットフォームデータ契約、対応URL形式、認証、料金、MCPガイド。',
  es: 'Referencia de la API de descarga de EasyDown: contratos de datos, URL compatibles, autenticación, facturación y MCP.',
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  return {
    metadataBase: new URL(siteUrl),
    title: { default: appName, template: `%s | ${appName}` },
    description: localizedDescriptions[lang],
    applicationName: appName,
    creator: 'EasyDown',
    publisher: 'EasyDown',
  };
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export default async function LanguageLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  return (
    <html lang={documentLanguages[lang]} className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <RootProvider i18n={uiI18n.provider(lang)}>
          <DocsLayout tree={source.getPageTree(lang)} {...baseOptions(lang)}>
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}

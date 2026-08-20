import { ImageResponse } from 'next/og';
import { isLanguage } from '@/lib/i18n';
import { source } from '@/lib/source';

const localeLabels = {
  en: 'Developer documentation',
  zh: '开发者文档',
  ja: '開発者ドキュメント',
  es: 'Documentación para desarrolladores',
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lang = url.searchParams.get('lang') ?? 'en';
  if (!isLanguage(lang)) return new Response('Not found', { status: 404 });

  const slug = url.searchParams.get('slug')?.split('/').filter(Boolean) ?? [];
  const page = source.getPage(slug, lang);
  if (!page) return new Response('Not found', { status: 404 });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          color: '#171717',
          padding: '70px 78px',
          borderTop: '18px solid #047857',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', fontSize: 28 }}>
          <div
            style={{
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#047857',
              color: '#ffffff',
              borderRadius: 8,
              fontWeight: 700,
            }}
          >
            {'{}'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 700 }}>EasyDown API Docs</span>
            <span style={{ color: '#525252', fontSize: 21 }}>{localeLabels[lang]}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 1040 }}>
          <div style={{ fontSize: 62, lineHeight: 1.08, fontWeight: 750 }}>{page.data.title}</div>
          <div style={{ fontSize: 27, lineHeight: 1.35, color: '#404040' }}>
            {page.data.description}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#525252' }}>
          <span>OpenAPI 3.1 · 11 platforms · REST + MCP</span>
          <span>docs.easydown.org</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

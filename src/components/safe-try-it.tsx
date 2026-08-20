'use client';

import capabilities from '@/generated/capabilities.json';
import { apiUrl } from '@/lib/shared';
import type { APIPlaygroundProps } from 'fumadocs-openapi/ui';
import { CheckCircle2, Loader2, Play, Trash2, TriangleAlert } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';

const copy = {
  en: {
    title: 'Try it', token: 'Bearer token', url: 'Public media URL', send: 'Send request',
    warning: 'A successful response with downloadable media costs 1 credit. Failed requests are not charged.',
    memory: 'The token stays only in this page memory and is cleared when the page is closed or reloaded.',
    clear: 'Clear token and result', result: 'Response', missing: 'Enter both a token and a public URL.',
    network: 'The request could not reach the EasyDown API.',
  },
  zh: {
    title: '在线调试', token: 'Bearer Token', url: '公开视频链接', send: '发送请求',
    warning: '成功返回可下载媒体将扣除 1 credit；失败请求不扣费。',
    memory: 'Token 仅保存在当前页面内存中，关闭或刷新页面后立即清除。',
    clear: '清除 Token 和结果', result: '响应', missing: '请填写 Token 和公开视频链接。',
    network: '请求未能连接 EasyDown API。',
  },
  ja: {
    title: '試してみる', token: 'Bearer トークン', url: '公開メディア URL', send: 'リクエスト送信',
    warning: 'ダウンロード可能なメディアを返す成功リクエストは 1 credit を消費します。失敗時は課金されません。',
    memory: 'トークンはこのページのメモリにだけ保持され、再読み込みまたは終了時に消去されます。',
    clear: 'トークンと結果を消去', result: 'レスポンス', missing: 'トークンと公開 URL を入力してください。',
    network: 'EasyDown API に接続できませんでした。',
  },
  es: {
    title: 'Probar', token: 'Token Bearer', url: 'URL pública del medio', send: 'Enviar solicitud',
    warning: 'Una respuesta correcta con medios descargables consume 1 credit. Las solicitudes fallidas no se cobran.',
    memory: 'El token solo permanece en la memoria de esta página y se borra al cerrar o recargar.',
    clear: 'Borrar token y resultado', result: 'Respuesta', missing: 'Introduce un token y una URL pública.',
    network: 'No se pudo conectar con la API de EasyDown.',
  },
} as const;

type ResultState = {
  ok: boolean;
  status: number | null;
  creditsCharged?: string | null;
  creditsRemaining?: string | null;
  body: unknown;
};

function getDefaultUrl(path: string) {
  const platform = path.match(/\/platforms\/([^/]+)\/parse/)?.[1];
  const entry = capabilities.data.platforms.find((item) => item.id === platform);
  return entry?.examples[0] ?? capabilities.data.platforms[0]?.examples[0] ?? '';
}

export function SafeTryIt({ path, method }: APIPlaygroundProps) {
  const params = useParams<{ lang?: string }>();
  const lang = params.lang && params.lang in copy ? params.lang as keyof typeof copy : 'en';
  const text = copy[lang];
  const initialUrl = useMemo(() => getDefaultUrl(path), [path]);
  const [token, setToken] = useState('');
  const [url, setUrl] = useState(initialUrl);
  const [result, setResult] = useState<ResultState | null>(null);
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token.trim() || !url.trim()) {
      setFormError(text.missing);
      return;
    }

    setPending(true);
    setFormError('');
    setResult(null);
    try {
      const response = await fetch(new URL(path, apiUrl), {
        method: method.toUpperCase(),
        headers: {
          Authorization: `Bearer ${token.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
        credentials: 'omit',
        cache: 'no-store',
      });
      const body = await response.json().catch(() => ({ message: response.statusText }));
      setResult({
        ok: response.ok,
        status: response.status,
        creditsCharged: response.headers.get('X-Credits-Charged'),
        creditsRemaining: response.headers.get('X-Credits-Remaining'),
        body,
      });
    } catch {
      setResult({ ok: false, status: null, body: { message: text.network } });
    } finally {
      setPending(false);
    }
  }

  function clear() {
    setToken('');
    setResult(null);
    setFormError('');
  }

  return (
    <section className="my-5 overflow-hidden rounded-lg border bg-fd-card text-fd-card-foreground not-prose">
      <div className="flex min-h-11 items-center gap-3 border-b px-4 py-2.5">
        <span className="api-method rounded bg-emerald-100 px-2 py-1 font-mono text-xs font-semibold dark:bg-emerald-950">POST</span>
        <h3 className="min-w-0 flex-1 text-sm font-semibold">{text.title}</h3>
        <button
          type="button"
          onClick={clear}
          className="flex size-8 shrink-0 items-center justify-center rounded-md text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
          title={text.clear}
          aria-label={text.clear}
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </button>
      </div>

      <form className="space-y-4 p-4" autoComplete="off" onSubmit={submit}>
        <div className="grid gap-4 lg:grid-cols-2">
          <label className="space-y-1.5 text-sm font-medium">
            <span>{text.token}</span>
            <input
              type="password"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              name="easydown-memory-token"
              autoComplete="off"
              spellCheck={false}
              placeholder="ed_live_..."
              className="h-10 w-full rounded-md border bg-fd-background px-3 font-mono text-sm outline-none focus:ring-2 focus:ring-fd-ring"
            />
          </label>
          <label className="space-y-1.5 text-sm font-medium">
            <span>{text.url}</span>
            <input
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              name="public-media-url"
              autoComplete="off"
              spellCheck={false}
              className="h-10 w-full rounded-md border bg-fd-background px-3 font-mono text-sm outline-none focus:ring-2 focus:ring-fd-ring"
            />
          </label>
        </div>

        <div className="flex gap-2 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-medium">{text.warning}</p>
            <p className="mt-1 text-xs opacity-80">{text.memory}</p>
          </div>
        </div>

        {formError ? <p className="text-sm text-red-600 dark:text-red-400">{formError}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-emerald-700 px-4 text-sm font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
        >
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
          {text.send}
        </button>
      </form>

      {result ? (
        <div className="border-t">
          <div className="flex min-h-10 items-center gap-2 px-4 py-2 text-sm">
            {result.ok ? <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" /> : <TriangleAlert className="size-4 text-red-600" aria-hidden="true" />}
            <span className="font-medium">{text.result}</span>
            <span className="font-mono text-xs text-fd-muted-foreground">HTTP {result.status ?? 'network'}</span>
            {result.creditsCharged ? <span className="ml-auto font-mono text-xs">credits: {result.creditsCharged}</span> : null}
            {result.creditsRemaining ? <span className="font-mono text-xs">remaining: {result.creditsRemaining}</span> : null}
          </div>
          <pre className="max-h-96 overflow-auto border-t bg-zinc-950 p-4 text-xs leading-5 text-zinc-100">
            <code>{JSON.stringify(result.body, null, 2)}</code>
          </pre>
        </div>
      ) : null}
    </section>
  );
}

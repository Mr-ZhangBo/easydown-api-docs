import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { platformSeoContent } from './platform-seo-content.mjs';

const root = path.resolve('content/docs');
const capabilities = JSON.parse(await readFile(path.resolve('src/generated/capabilities.json'), 'utf8'));
const platforms = capabilities.data.platforms;
const contentRoutes = [
  'index',
  'quick-start',
  'authentication',
  'billing',
  'errors',
  'supported-links',
  'media-downloads',
  'mcp',
  'api/index',
  'api/common',
  ...platforms.map((platform) => `api/${platform.id}`),
];

const fallbackContentDate = '2026-08-14T00:00:00.000Z';
const existingContentMetadata = await readFile(path.resolve('src/generated/content-meta.json'), 'utf8')
  .then((value) => JSON.parse(value))
  .catch(() => ({}));

function gitDate(args, fallback) {
  try {
    const output = execFileSync('git', args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return output.split('\n').find(Boolean) ?? fallback;
  } catch {
    return fallback;
  }
}

const contentMetadata = {
  datePublished: gitDate(
    ['log', '--reverse', '--format=%cI', '--', 'scripts/generate-content.mjs'],
    existingContentMetadata.datePublished ?? fallbackContentDate,
  ),
  dateModified: gitDate(
    [
      'log',
      '-1',
      '--format=%cI',
      '--',
      'scripts/generate-content.mjs',
      'scripts/platform-seo-content.mjs',
      'src/generated/capabilities.json',
    ],
    process.env.VERCEL
      ? new Date().toISOString()
      : existingContentMetadata.dateModified ?? fallbackContentDate,
  ),
};

const platformSectionLabels = {
  en: {
    responseContains: 'What the platform response contains',
    downloadGuidance: 'Download and proxy guidance',
    contractFields: 'Published platform data fields',
    troubleshooting: 'Troubleshooting',
    fieldType: 'Type',
    additionalFields: 'The API preserves additional public fields from the final target object after recursive sensitive-field filtering. The documented fields below remain stable for this platformDataVersion.',
    hubDescription: 'Compare the 11 platform-specific EasyDown video downloader APIs, supported URL formats, downloadable media, complete sanitized platform data, and request schemas.',
    hubIntro: 'Choose a platform endpoint when your integration needs both the stable EasyDown media model and the final sanitized public data object for the requested post.',
  },
  zh: {
    responseContains: '该平台响应会返回什么',
    downloadGuidance: '下载与代理建议',
    contractFields: '已发布的平台数据字段',
    troubleshooting: '故障排查',
    fieldType: '类型',
    additionalFields: '接口会保留目标作品最终响应中的其他公开字段，并递归删除敏感字段。下表字段在当前 platformDataVersion 内保持稳定。',
    hubDescription: '对比 EasyDown 11 个平台专用视频下载 API，查看支持的 URL、可下载媒体、清理后的平台全量数据和请求模式。',
    hubIntro: '当业务既需要稳定的 EasyDown 媒体结构，也需要请求作品对应的完整公开平台数据时，请选择平台专用接口。',
  },
  ja: {
    responseContains: 'このプラットフォームのレスポンス内容',
    downloadGuidance: 'ダウンロードとプロキシの注意点',
    contractFields: '公開済みプラットフォームデータ項目',
    troubleshooting: 'トラブルシューティング',
    fieldType: '型',
    additionalFields: '対象投稿の最終レスポンスに含まれるその他の公開項目も、機密情報を再帰的に除去したうえで保持します。以下の項目は現在の platformDataVersion 内で安定しています。',
    hubDescription: 'EasyDownの11種類のプラットフォーム別動画ダウンロードAPI、対応URL、取得メディア、サニタイズ済み完全データ、リクエストスキーマを比較します。',
    hubIntro: '共通のEasyDownメディア形式に加えて、指定投稿の完全な公開プラットフォームデータが必要な場合は、プラットフォーム別APIを使用します。',
  },
  es: {
    responseContains: 'Contenido de la respuesta de la plataforma',
    downloadGuidance: 'Descarga y uso de proxy',
    contractFields: 'Campos publicados de la plataforma',
    troubleshooting: 'Solución de problemas',
    fieldType: 'Tipo',
    additionalFields: 'La API conserva otros campos públicos del objeto final después de eliminar de forma recursiva los datos sensibles. Los campos documentados se mantienen estables durante esta versión de platformData.',
    hubDescription: 'Compara las 11 API de descarga por plataforma de EasyDown, sus URL compatibles, archivos disponibles, datos públicos completos y esquemas de petición.',
    hubIntro: 'Elige una API específica cuando necesites tanto el modelo multimedia estable de EasyDown como los datos públicos completos y depurados de la publicación solicitada.',
  },
};

const platformNames = {
  en: {
    tiktok: 'TikTok',
    douyin: 'Douyin',
    toutiao: 'Toutiao',
    youtube: 'YouTube',
    twitter: 'Twitter / X',
    instagram: 'Instagram',
    threads: 'Threads',
    xiaohongshu: 'RedNote / Xiaohongshu',
    bilibili: 'Bilibili (mainland China)',
    kuaishou: 'Kuaishou / Kwai',
    weibo: 'Weibo',
  },
  zh: {
    tiktok: 'TikTok',
    douyin: '抖音（Douyin）',
    toutiao: '今日头条（Toutiao）',
    youtube: 'YouTube',
    twitter: 'Twitter / X',
    instagram: 'Instagram',
    threads: 'Threads',
    xiaohongshu: '小红书 / RedNote',
    bilibili: 'Bilibili / B站（仅大陆站）',
    kuaishou: '快手 / Kwai',
    weibo: '微博（Weibo）',
  },
  ja: {
    tiktok: 'TikTok',
    douyin: 'Douyin（抖音）',
    toutiao: 'Toutiao（今日頭条）',
    youtube: 'YouTube',
    twitter: 'Twitter / X',
    instagram: 'Instagram',
    threads: 'Threads',
    xiaohongshu: 'RedNote / Xiaohongshu（小紅書）',
    bilibili: 'Bilibili（中国本土版）',
    kuaishou: 'Kuaishou / Kwai（快手）',
    weibo: 'Weibo（微博）',
  },
  es: {
    tiktok: 'TikTok',
    douyin: 'Douyin',
    toutiao: 'Toutiao',
    youtube: 'YouTube',
    twitter: 'Twitter / X',
    instagram: 'Instagram',
    threads: 'Threads',
    xiaohongshu: 'RedNote / Xiaohongshu',
    bilibili: 'Bilibili (China continental)',
    kuaishou: 'Kuaishou / Kwai',
    weibo: 'Weibo',
  },
};

const copy = {
  en: {
    overview: 'Social Media Video Downloader API',
    overviewDesc: 'Developer docs for one video downloader API across TikTok, YouTube, Instagram, X, RedNote, Bilibili, Douyin, Threads, Kuaishou, Weibo, and Toutiao.',
    intro: 'Build one social media video downloader integration for 11 platforms. Use the common API for normalized media or a platform endpoint for downloadable media plus the complete sanitized platform data object.',
    quick: 'Video Downloader API quick start',
    auth: 'API authentication',
    billing: 'API credits and billing',
    errors: 'Video downloader API error codes',
    links: 'Supported video URL formats',
    media: 'Download media from API responses',
    mcp: 'Video Downloader MCP server',
    common: 'Unified Social Media Video Downloader API',
    platformApis: 'Platform video downloader APIs',
    endpoint: 'Endpoints',
    request: 'Request',
    response: 'Response',
    formats: 'Supported URL formats',
    examples: 'Accepted examples',
    fields: 'Response fields',
    limits: 'Limits and behavior',
    reference: 'Interactive API reference',
    choose: 'Choose an API response',
    apiType: 'API',
    useWhen: 'Use it when',
    supportedPlatforms: 'Supported platforms',
    supportedMedia: 'Downloadable media',
    related: 'Related guides',
    faq: 'Common questions',
    commonChoice: 'You need one stable media model across every supported platform.',
    platformChoice: 'You need normalized media and the final sanitized platform data object.',
    platformListIntro: 'Each platform page documents its accepted links, full-data response, limits, errors, and live request schema.',
    mediaIntro: 'Successful responses can contain video, image, or audio files. The normalized media model keeps client code stable even when upstream platform fields change.',
    platformTitle: (name) => `${name} Video Downloader API`,
    platformDescription: (name) => `Use EasyDown's ${name} video downloader API for supported public URLs. Return downloadable video, images, audio, and sanitized platform data.`,
    fullIntro: (name) => `Use the ${name} video downloader API to parse supported public links into downloadable media and the final sanitized platform data object.`,
    target: 'When an upstream response contains related posts, EasyDown selects only the object matching the requested URL. platformDataVersion changes only when the published data contract changes.',
    publicOnly: 'Only public content is supported. Private, deleted, age-restricted, region-restricted, live, or otherwise unavailable content can fail without a credit charge.',
    billingNote: 'A response is charged only after downloadable media is returned. Each successful parse costs 1 credit. Authentication, validation, permission, unavailable-content, no-media, and upstream failures are not charged.',
    tokenNote: 'Send the token in the Authorization header. Never place production tokens in URLs, client logs, source control, or analytics.',
    tryNote: 'The Try it panel sends requests directly to api.easydown.org. Its token is held in React memory only and disappears on reload.',
    generated: 'The curl, JavaScript, and Python examples and schemas below are rendered from the production OpenAPI 3.1 contract.',
    international: 'Bilibili support is limited to mainland China URLs. bilibili.tv and bili.im (Bstation / international) are not supported.',
    descriptions: {
      quick: 'Send your first authenticated social media video downloader API request and read the normalized media response.',
      auth: 'Authenticate EasyDown video downloader API requests with a Bearer token and keep production credentials secure.',
      billing: 'Understand the 1-credit success charge, free failed requests, balance headers, and cache behavior.',
      errors: 'Map stable EasyDown errors for unsupported URLs, unavailable content, no media, platform mismatch, and upstream failures.',
      links: 'See every supported video, post, photo, short-link, and mobile URL pattern for all 11 EasyDown platforms.',
      media: 'Use video, image, and audio URLs, required public headers, quality metadata, and expiry behavior correctly.',
      mcp: 'Connect the EasyDown social media video downloader to MCP clients with the same token, permissions, and credit rules.',
      common: 'Parse any supported social media URL into one normalized video, image, and audio response with POST /api/v1/parse.',
    },
    authRules: [
      'Tokens can be restricted to selected platforms.',
      'Missing, expired, revoked, or invalid tokens return an authentication error and consume 0 credits.',
      'Platform permission failures return `platform_not_allowed` and consume 0 credits.',
      'Browser requests support CORS, but production tokens should normally stay on your server.',
    ],
    billingSuccess: 'Successful commercial responses include:',
    cacheBilling: 'Cache hits still return media and therefore cost 1 credit. Failed responses never decrement the balance.',
    errorPrivacy: 'EasyDown never returns provider names, provider request IDs, provider endpoints, billing hints, credentials, traces, or raw provider error text.',
    mediaObject: 'The `media` object contains separate `images`, `videos`, and `audios` arrays.',
    mediaFields: [
      '`url`: public or time-limited media URL.',
      '`quality`, `mimeType`, `width`, `height`, `bitrate`: metadata for choosing a rendition.',
      '`source`: `direct`, `adaptive`, `dash`, `live_photo`, or `native_voice`.',
      '`headers`: public request headers required by the media host, such as `Referer`.',
    ],
    mediaExpiry: 'Download URLs can expire. Fetch media soon after parsing, follow redirects, preserve URL query strings, and send only the public headers returned with that media item. EasyDown does not store full platform data in Supabase.',
    mcpIntro: 'EasyDown exposes a video downloader MCP endpoint at `https://api.easydown.org/mcp`.',
    mcpRules: [
      'Keep the token in the MCP client\'s secure secret store.',
      'Do not place it in prompts, tool arguments, URLs, or shared configuration files.',
      'REST and MCP requests use the same success-only credit policy.',
    ],
    commonIntro: 'The common endpoint preserves the compact contract: `data` is the normalized media object itself and does not include `platformData`.',
    fieldHeader: ['Field', 'Description'],
    fieldMedia: 'Normalized images, videos, audios, title, thumbnail, and duration.',
    fieldPlatformData: 'Complete final target object after recursive sensitive-field filtering.',
    fieldVersion: (name, version) => `Published data contract version for ${name}; currently ${version}.`,
    useEndpoint: 'Use this endpoint when you need platform-specific fields in addition to stable downloadable media.',
    relatedLinks: ['All platform APIs', 'Common normalized API', 'All supported URL formats', 'Error codes', 'Downloading media', 'Authentication', 'Credits and billing'],
    failedQuestion: 'Does a failed request consume credits?',
    failedAnswer: 'No. A credit is charged only after the API returns downloadable media.',
    validQuestion: 'Why can a valid public link still fail?',
    validAnswer: 'The post can be deleted, private, region-restricted, live, missing media, or temporarily unavailable upstream.',
    cardLinks: '11 platforms and URL patterns',
    cardCommon: 'One normalized media response',
    cardPlatform: 'Media plus full platform data',
  },
  zh: {
    overview: '社交媒体视频下载 API',
    overviewDesc: '面向开发者的多平台视频解析与下载 API 文档，支持 TikTok、YouTube、Instagram、X、小红书、Bilibili、抖音、Threads、快手、微博和今日头条。',
    intro: '通过一套社交媒体视频下载 API 对接 11 个平台。通用接口返回统一的视频、图片和音频结构，平台专用接口还会返回经过安全清理的平台全量数据。',
    quick: '视频下载 API 快速开始',
    auth: 'API 鉴权',
    billing: 'API 计费与额度',
    errors: '视频下载 API 错误码',
    links: '支持的视频链接格式',
    media: '下载 API 返回的媒体',
    mcp: '视频下载 MCP 服务',
    common: '通用社交媒体视频下载 API',
    platformApis: '各平台视频下载 API',
    endpoint: '接口地址',
    request: '请求',
    response: '响应',
    formats: '支持的 URL 格式',
    examples: '可用示例',
    fields: '响应字段',
    limits: '限制与行为',
    reference: '交互式 API 参考',
    choose: '选择合适的响应结构',
    apiType: '接口',
    useWhen: '适用场景',
    supportedPlatforms: '已支持平台',
    supportedMedia: '可下载媒体',
    related: '相关指南',
    faq: '常见问题',
    commonChoice: '需要用一套稳定媒体结构处理所有已支持平台。',
    platformChoice: '除了统一媒体结构，还需要目标作品经过清理的平台全量数据。',
    platformListIntro: '每个平台页面都包含已支持链接、全量响应、平台限制、错误处理和实时请求模式。',
    mediaIntro: '成功响应可以包含视频、图片或音频。即使上游平台字段变化，统一媒体结构也能让客户端代码保持稳定。',
    platformTitle: (name) => `${name}视频下载 API`,
    platformDescription: (name) => `使用 ${name} 视频下载 API 解析已支持的公开链接，返回视频、图片、音频和清理敏感字段后的平台全量数据。`,
    fullIntro: (name) => `${name} 视频下载 API 可将已支持的公开链接解析为可下载媒体，并返回清理敏感字段后的目标作品平台数据。`,
    target: '如果上游响应包含关联作品，EasyDown 只保留与请求 URL 对应的目标作品。只有公开的数据契约变化时，platformDataVersion 才会更新。',
    publicOnly: '仅支持公开内容。私密、已删除、年龄限制、地区限制、直播或其他不可用内容可能解析失败，失败不消耗额度。',
    billingNote: '只有返回可下载媒体后才扣费，每次成功解析消耗 1 个额度（credit）。鉴权、参数校验、权限、内容不可用、无媒体和上游故障均不扣费。',
    tokenNote: '请在 Authorization 请求头中发送 Token。不要把生产 Token 写入 URL、客户端日志、源码仓库或分析事件。',
    tryNote: '在线调试面板会直接请求 `api.easydown.org`。Token 只保存在当前页面内存中，刷新后立即清除。',
    generated: '下方 curl、JavaScript、Python 示例和接口模式定义均由生产 OpenAPI 3.1 契约生成。',
    international: 'Bilibili 仅支持大陆站链接。bilibili.tv 与 bili.im（Bstation / 国际版）目前不支持。',
    descriptions: {
      quick: '发送第一次带鉴权的社交媒体视频下载 API 请求，了解请求格式、统一媒体响应和成功扣费规则。',
      auth: '使用 Bearer Token 调用 EasyDown 视频下载 API，并安全保护生产凭证。',
      billing: '了解成功请求消耗 1 个额度（credit）、失败不扣费、余额响应头、缓存命中和剩余额度的计费规则。',
      errors: '处理视频链接不支持、内容不可用、无媒体、平台不匹配和上游故障等稳定错误码，并正确映射客户端提示。',
      links: '查看 EasyDown 11 个平台已支持的视频、作品、图片、短链和移动端 URL 形态。',
      media: '正确使用 API 返回的视频、图片和音频 URL、公开请求头、清晰度信息、重定向及链接过期机制。',
      mcp: '使用同一套 Token、平台权限和计费规则，将 EasyDown 视频下载能力接入 MCP 客户端。',
      common: '通过 POST /api/v1/parse 将任意已支持的社交媒体链接转换为统一的视频、图片和音频响应。',
    },
    authRules: [
      'Token 可以限制为仅允许调用指定平台。',
      'Token 缺失、过期、已吊销或无效时返回鉴权错误，不消耗额度。',
      '没有平台权限时返回 `platform_not_allowed`，不消耗额度。',
      '浏览器请求支持 CORS，但生产 Token 通常应保留在服务端。',
    ],
    billingSuccess: '商业 API 成功响应会包含：',
    cacheBilling: '缓存命中仍然返回媒体，因此会消耗 1 个额度；任何失败响应都不会减少余额。',
    errorPrivacy: 'EasyDown 不会返回第三方供应商名称、请求 ID、接口地址、计费提示、凭证、调用链或原始第三方错误文案。',
    mediaObject: '`media` 对象将媒体拆分为 `images`、`videos` 和 `audios` 三个数组。',
    mediaFields: [
      '`url`：公开或带有效期的媒体 URL。',
      '`quality`、`mimeType`、`width`、`height`、`bitrate`：用于选择媒体版本的信息。',
      '`source`：媒体来源类型，包括 `direct`、`adaptive`、`dash`、`live_photo` 或 `native_voice`。',
      '`headers`：媒体源要求的公开请求头，例如 `Referer`。',
    ],
    mediaExpiry: '下载 URL 可能过期。请在解析后尽快下载、跟随重定向、完整保留查询参数，并且只发送媒体项中明确返回的公开请求头。EasyDown 不会把平台全量数据写入 Supabase。',
    mcpIntro: 'EasyDown 在 `https://api.easydown.org/mcp` 提供视频下载 MCP 服务。',
    mcpRules: [
      '将 Token 保存在 MCP 客户端的安全密钥存储中。',
      '不要把 Token 写入提示词、工具参数、URL 或共享配置文件。',
      'REST API 与 MCP 使用同一套“成功返回媒体才扣费”规则。',
    ],
    commonIntro: '通用接口保持精简兼容结构：`data` 本身就是统一媒体对象，不包含 `platformData`。',
    fieldHeader: ['字段', '说明'],
    fieldMedia: '统一的图片、视频、音频、标题、封面和时长。',
    fieldPlatformData: '递归清理敏感字段后的目标作品全量数据。',
    fieldVersion: (name, version) => `${name}的公开数据契约版本，当前为 ${version}。`,
    useEndpoint: '当你既需要稳定的可下载媒体，又需要平台专属字段时，使用此接口。',
    relatedLinks: ['全部平台 API', '通用统一媒体 API', '全部支持的 URL 格式', '错误码', '下载媒体', 'API 鉴权', '计费与额度'],
    failedQuestion: '失败请求会消耗额度吗？',
    failedAnswer: '不会。只有 API 成功返回可下载媒体后才消耗 1 个额度。',
    validQuestion: '为什么有效的公开链接仍可能失败？',
    validAnswer: '作品可能已经删除、设为私密、存在地区限制、属于直播、没有可下载媒体，或上游服务暂时不可用。',
    cardLinks: '11 个平台及 URL 形态',
    cardCommon: '一套统一媒体响应',
    cardPlatform: '媒体与平台全量数据',
  },
  ja: {
    overview: 'SNS動画ダウンロードAPI',
    overviewDesc: 'TikTok、YouTube、Instagram、X、RedNote、Bilibili、Douyin、Threads、Kuaishou、Weibo、Toutiaoに対応した開発者向け動画ダウンロードAPIドキュメントです。',
    intro: '11のプラットフォームを1つのSNS動画ダウンロードAPIで統合できます。共通APIは正規化されたメディアを返し、プラットフォーム別APIは機密項目を除去した完全データも返します。',
    quick: '動画ダウンロードAPIクイックスタート',
    auth: '動画APIの認証',
    billing: 'API料金とCredits',
    errors: '動画ダウンロードAPIのエラーコード',
    links: '対応動画URL形式',
    media: 'APIレスポンスからメディアをダウンロード',
    mcp: '動画ダウンロードMCPサーバー',
    common: '共通SNS動画ダウンロードAPI',
    platformApis: 'プラットフォーム別動画ダウンロードAPI',
    endpoint: 'エンドポイント',
    request: 'リクエスト',
    response: 'レスポンス',
    formats: '対応URL形式',
    examples: '利用可能な例',
    fields: 'レスポンス項目',
    limits: '制限と動作',
    reference: '対話型APIリファレンス',
    choose: 'APIレスポンスの選び方',
    apiType: 'API',
    useWhen: '適した用途',
    supportedPlatforms: '対応プラットフォーム',
    supportedMedia: 'ダウンロード可能なメディア',
    related: '関連ガイド',
    faq: 'よくある質問',
    commonChoice: 'すべての対応プラットフォームを1つの安定したメディア形式で扱う場合。',
    platformChoice: '正規化メディアに加えて、機密項目を除去した完全なプラットフォームデータが必要な場合。',
    platformListIntro: '各ページで、対応URL、完全データのレスポンス、制限、エラー、最新のリクエストスキーマを確認できます。',
    mediaIntro: '成功レスポンスには動画、画像、音声が含まれます。外部サービスの項目が変わっても、正規化メディア形式によりクライアント実装を安定させられます。',
    platformTitle: (name) => `${name}動画ダウンロードAPI`,
    platformDescription: (name) => `${name}の対応する公開URLを解析し、ダウンロード可能な動画・画像・音声と、機密項目を除去したプラットフォームデータを取得します。URL形式、レスポンス項目、エラー、実装例を掲載しています。`,
    fullIntro: (name) => `${name}動画ダウンロードAPIは、対応する公開URLをダウンロード可能なメディアへ変換し、機密項目を除去した対象投稿のデータも返します。`,
    target: '外部サービスのレスポンスに関連投稿が含まれる場合、EasyDownはリクエストしたURLに一致する投稿だけを選択します。platformDataVersionは公開データ契約を変更した場合にのみ更新されます。',
    publicOnly: '公開コンテンツのみ対象です。非公開、削除済み、年齢・地域制限、ライブ配信、その他利用できないコンテンツは解析に失敗する場合があります。失敗時にクレジットは消費されません。',
    billingNote: 'ダウンロード可能なメディアを返した場合のみ1クレジットを消費します。認証、入力検証、権限、コンテンツ利用不可、メディアなし、外部サービス障害は課金されません。',
    tokenNote: 'トークンはAuthorizationヘッダーで送信します。本番トークンをURL、クライアントログ、ソース管理、分析イベントに保存しないでください。',
    tryNote: '「Try it」パネルは`api.easydown.org`へ直接リクエストします。トークンはページのメモリだけに保持され、再読み込みすると消去されます。',
    generated: '以下のcurl、JavaScript、Pythonの例とスキーマは、本番環境のOpenAPI 3.1契約から生成されます。',
    international: 'Bilibiliは中国本土版URLのみ対応します。bilibili.tvとbili.im（Bstation / 国際版）は未対応です。',
    descriptions: {
      quick: '認証付きの最初のSNS動画ダウンロードAPIリクエストを送り、正規化メディアレスポンスを確認します。',
      auth: 'BearerトークンでEasyDown動画ダウンロードAPIを認証し、本番認証情報を安全に管理します。',
      billing: '成功時の1クレジット課金、失敗時の無料扱い、残高ヘッダー、キャッシュの課金ルールを説明します。',
      errors: '未対応URL、利用不可コンテンツ、メディアなし、プラットフォーム不一致、外部サービス障害の安定したエラーコードを扱います。',
      links: 'EasyDownが対応する11プラットフォームの動画、投稿、画像、短縮URL、モバイルURL形式を確認できます。',
      media: 'APIが返す動画・画像・音声URL、必要な公開ヘッダー、品質情報、リダイレクト、有効期限を正しく扱います。',
      mcp: '同じトークン、権限、課金ルールでEasyDown動画ダウンロード機能をMCPクライアントに接続します。',
      common: 'POST /api/v1/parseで対応するSNS URLを正規化された動画・画像・音声レスポンスへ変換します。',
    },
    authRules: [
      'トークンは利用可能なプラットフォームを限定できます。',
      'トークンがない、期限切れ、無効化済み、または不正な場合は認証エラーとなり、0 creditsです。',
      '権限のないプラットフォームでは`platform_not_allowed`を返し、0 creditsです。',
      'ブラウザーからのCORSリクエストに対応しますが、本番トークンは通常サーバー側で管理してください。',
    ],
    billingSuccess: '商用APIの成功レスポンスには次のヘッダーが含まれます：',
    cacheBilling: 'キャッシュヒットでもメディアを返すため1クレジットを消費します。失敗レスポンスで残高が減ることはありません。',
    errorPrivacy: 'EasyDownはプロバイダー名、リクエストID、内部エンドポイント、課金情報、認証情報、トレース、外部サービスの生エラー文を返しません。',
    mediaObject: '`media`オブジェクトには`images`、`videos`、`audios`の配列があります。',
    mediaFields: [
      '`url`：公開または有効期限付きのメディアURL。',
      '`quality`、`mimeType`、`width`、`height`、`bitrate`：メディア形式を選ぶための情報。',
      '`source`：`direct`、`adaptive`、`dash`、`live_photo`、`native_voice`のいずれか。',
      '`headers`：メディア配信元が必要とする`Referer`などの公開リクエストヘッダー。',
    ],
    mediaExpiry: 'ダウンロードURLには有効期限があります。解析後すぐに取得し、リダイレクトに従い、クエリ文字列を維持し、返された公開ヘッダーだけを送信してください。完全なプラットフォームデータはSupabaseに保存されません。',
    mcpIntro: 'EasyDownは`https://api.easydown.org/mcp`で動画ダウンロードMCPエンドポイントを提供します。',
    mcpRules: [
      'トークンはMCPクライアントの安全なシークレットストアに保存してください。',
      'プロンプト、ツール引数、URL、共有設定ファイルにトークンを記載しないでください。',
      'RESTとMCPは、メディアを返した成功時のみ課金する同じルールを使用します。',
    ],
    commonIntro: '共通エンドポイントは既存の簡潔な契約を維持します。`data`自体が正規化メディアオブジェクトで、`platformData`は含まれません。',
    fieldHeader: ['項目', '説明'],
    fieldMedia: '正規化された画像、動画、音声、タイトル、サムネイル、再生時間。',
    fieldPlatformData: '機密項目を再帰的に除去した対象投稿の完全データ。',
    fieldVersion: (name, version) => `${name}の公開データ契約バージョン。現在は${version}です。`,
    useEndpoint: '安定したダウンロードメディアに加えてプラットフォーム固有項目が必要な場合に使用します。',
    relatedLinks: ['全プラットフォームAPI', '共通の正規化API', '対応する全URL形式', 'エラーコード', 'メディアのダウンロード', 'API認証', '料金とクレジット'],
    failedQuestion: '失敗したリクエストは課金されますか？',
    failedAnswer: 'いいえ。ダウンロード可能なメディアを返した場合のみ1クレジットを消費します。',
    validQuestion: '正しい公開URLでも失敗するのはなぜですか？',
    validAnswer: '投稿が削除済み、非公開、地域制限、ライブ、メディアなし、または外部サービスが一時的に利用できない可能性があります。',
    cardLinks: '11プラットフォームのURL形式',
    cardCommon: '1つの正規化レスポンス',
    cardPlatform: 'メディアと完全データ',
  },
  es: {
    overview: 'API para descargar videos de redes sociales',
    overviewDesc: 'Documentación para desarrolladores de una API compatible con TikTok, YouTube, Instagram, X, RedNote, Bilibili, Douyin, Threads, Kuaishou, Weibo y Toutiao.',
    intro: 'Integra 11 plataformas con una sola API para descargar videos de redes sociales. La API común normaliza los medios y cada API específica añade los datos completos de la plataforma después de eliminar campos sensibles.',
    quick: 'Inicio rápido de la API de descarga',
    auth: 'Autenticación de la API',
    billing: 'Créditos y facturación de la API',
    errors: 'Códigos de error de la API de descarga',
    links: 'Formatos de URL de video compatibles',
    media: 'Descargar medios de la respuesta de la API',
    mcp: 'Servidor MCP de descarga de videos',
    common: 'API unificada para descargar videos de redes sociales',
    platformApis: 'API para descargar videos por plataforma',
    endpoint: 'Endpoints',
    request: 'Solicitud',
    response: 'Respuesta',
    formats: 'Formatos de URL compatibles',
    examples: 'Ejemplos aceptados',
    fields: 'Campos de respuesta',
    limits: 'Límites y comportamiento',
    reference: 'Referencia interactiva de la API',
    choose: 'Elige el tipo de respuesta',
    apiType: 'API',
    useWhen: 'Úsala cuando',
    supportedPlatforms: 'Plataformas compatibles',
    supportedMedia: 'Medios descargables',
    related: 'Guías relacionadas',
    faq: 'Preguntas frecuentes',
    commonChoice: 'Necesitas un modelo multimedia estable para todas las plataformas compatibles.',
    platformChoice: 'Necesitas medios normalizados y el objeto completo de la plataforma, sin campos sensibles.',
    platformListIntro: 'Cada página explica las URL aceptadas, la respuesta completa, los límites, los errores y el esquema de solicitud actualizado.',
    mediaIntro: 'Las respuestas correctas pueden incluir videos, imágenes o audio. El modelo normalizado mantiene estable el código cliente aunque cambien los campos de la plataforma.',
    platformTitle: (name) => `API para descargar videos de ${name}`,
    platformDescription: (name) => `Usa la API de ${name} con URL públicas compatibles y recibe videos, imágenes, audio y datos completos sin campos sensibles.`,
    fullIntro: (name) => `La API para descargar videos de ${name} convierte URL públicas compatibles en medios descargables y devuelve también los datos depurados de la publicación solicitada.`,
    target: 'Si la respuesta externa incluye publicaciones relacionadas, EasyDown selecciona solo el objeto de la URL solicitada. platformDataVersion cambia únicamente cuando cambia el contrato público.',
    publicOnly: 'Solo se admite contenido público. El contenido privado, eliminado, restringido por edad o región, en directo o no disponible puede fallar sin consumir créditos.',
    billingNote: 'Solo se cobra después de devolver medios descargables: 1 crédito por análisis correcto. Los fallos de autenticación, validación, permisos, contenido, medios o servicio externo no se cobran.',
    tokenNote: 'Envía el token en la cabecera Authorization. No guardes tokens de producción en URL, registros del cliente, control de código ni eventos de analítica.',
    tryNote: 'El panel «Try it» envía solicitudes directamente a `api.easydown.org`. El token solo permanece en la memoria de la página y se elimina al recargar.',
    generated: 'Los ejemplos en curl, JavaScript y Python, junto con los esquemas, se generan desde el contrato OpenAPI 3.1 de producción.',
    international: 'Bilibili solo admite URL de China continental. bilibili.tv y bili.im (Bstation / internacional) no son compatibles.',
    descriptions: {
      quick: 'Envía tu primera solicitud autenticada a la API de descarga de redes sociales y procesa la respuesta multimedia normalizada.',
      auth: 'Autentica la API de descarga de EasyDown con un token Bearer y protege las credenciales de producción.',
      billing: 'Consulta el cargo de 1 crédito por éxito, los fallos gratuitos, las cabeceras de saldo y el comportamiento de caché.',
      errors: 'Gestiona códigos estables para URL no compatibles, contenido no disponible, ausencia de medios, plataforma incorrecta y fallos externos.',
      links: 'Consulta los formatos de videos, publicaciones, fotos, enlaces cortos y URL móviles de las 11 plataformas compatibles.',
      media: 'Usa correctamente las URL de video, imagen y audio, las cabeceras públicas, la calidad y la caducidad.',
      mcp: 'Conecta la descarga de videos de EasyDown a clientes MCP con el mismo token, permisos y reglas de créditos.',
      common: 'Convierte cualquier URL social compatible en una respuesta normalizada de video, imagen y audio mediante POST /api/v1/parse.',
    },
    authRules: [
      'Los tokens se pueden limitar a plataformas concretas.',
      'Un token ausente, caducado, revocado o inválido devuelve un error de autenticación y no consume créditos.',
      'Sin permiso para la plataforma se devuelve `platform_not_allowed` y no se consumen créditos.',
      'Las solicitudes del navegador admiten CORS, pero los tokens de producción deben permanecer normalmente en el servidor.',
    ],
    billingSuccess: 'Las respuestas comerciales correctas incluyen:',
    cacheBilling: 'Una respuesta desde caché también devuelve medios y consume 1 crédito. Una respuesta fallida nunca reduce el saldo.',
    errorPrivacy: 'EasyDown nunca devuelve nombres de proveedores, identificadores de solicitud, endpoints internos, avisos de cobro, credenciales, trazas ni errores externos sin filtrar.',
    mediaObject: 'El objeto `media` contiene matrices separadas para `images`, `videos` y `audios`.',
    mediaFields: [
      '`url`: URL pública o temporal del medio.',
      '`quality`, `mimeType`, `width`, `height`, `bitrate`: datos para elegir una versión.',
      '`source`: `direct`, `adaptive`, `dash`, `live_photo` o `native_voice`.',
      '`headers`: cabeceras públicas que exige el host, como `Referer`.',
    ],
    mediaExpiry: 'Las URL de descarga pueden caducar. Descarga el archivo poco después del análisis, sigue redirecciones, conserva la consulta completa y envía solo las cabeceras públicas devueltas. EasyDown no guarda los datos completos de la plataforma en Supabase.',
    mcpIntro: 'EasyDown ofrece un endpoint MCP de descarga en `https://api.easydown.org/mcp`.',
    mcpRules: [
      'Guarda el token en el almacén seguro de secretos del cliente MCP.',
      'No incluyas el token en prompts, argumentos de herramientas, URL ni archivos de configuración compartidos.',
      'REST y MCP usan la misma regla: solo se cobra cuando se devuelven medios.',
    ],
    commonIntro: 'El endpoint común conserva el contrato compacto: `data` es el objeto multimedia normalizado y no incluye `platformData`.',
    fieldHeader: ['Campo', 'Descripción'],
    fieldMedia: 'Imágenes, videos, audios, título, miniatura y duración normalizados.',
    fieldPlatformData: 'Objeto completo de la publicación tras eliminar campos sensibles de forma recursiva.',
    fieldVersion: (name, version) => `Versión pública del contrato de datos de ${name}; actualmente ${version}.`,
    useEndpoint: 'Usa este endpoint cuando necesites campos propios de la plataforma además de medios descargables estables.',
    relatedLinks: ['Todas las API por plataforma', 'API común normalizada', 'Todos los formatos de URL', 'Códigos de error', 'Descarga de medios', 'Autenticación', 'Créditos y facturación'],
    failedQuestion: '¿Una solicitud fallida consume créditos?',
    failedAnswer: 'No. Solo se cobra 1 crédito cuando la API devuelve medios descargables.',
    validQuestion: '¿Por qué puede fallar una URL pública válida?',
    validAnswer: 'La publicación puede estar eliminada, ser privada, tener restricciones regionales, ser un directo, no contener medios o sufrir una indisponibilidad externa.',
    cardLinks: '11 plataformas y formatos URL',
    cardCommon: 'Una respuesta multimedia normalizada',
    cardPlatform: 'Medios y datos completos',
  },
};

const searchIntent = {
  en: {
    tiktok: 'Use it to add TikTok downloader and TikTok video download support without maintaining platform-specific extraction logic.',
    douyin: 'Use it to build a Douyin video downloader backend for supported public video and image posts.',
    toutiao: 'Use it when an application needs a Toutiao video downloader API for supported public article and video links.',
    youtube: 'Use it to add YouTube video downloader support while keeping one normalized media contract across your application.',
    twitter: 'Use it for X video downloader workflows or to download video from Twitter while accepting both x.com and twitter.com links.',
    instagram: 'Use it to add Instagram video download support for public posts, reels, and compatible shared links.',
    threads: 'Use it to build a Threads video downloader for supported public post URLs without returning unrelated posts.',
    xiaohongshu: 'Use it for both RedNote downloader and Xiaohongshu video downloader integrations, including supported short links.',
    bilibili: 'Use it to build a Bilibili video downloader for mainland China video, bangumi, cheese, and b23.tv links.',
    kuaishou: 'Use it to add Kuaishou or Kwai video downloader support for compatible public post and short-link formats.',
    weibo: 'Use it to build a Weibo video downloader for supported public status and video links.',
  },
  zh: {
    tiktok: '适合为网站、应用或自动化流程增加 TikTok 视频下载能力，无需自行维护平台解析逻辑。',
    douyin: '适合构建抖音视频下载 API 后端，处理已支持的公开视频、图集和分享链接。',
    toutiao: '适合需要今日头条视频下载能力的应用，处理已支持的文章和视频链接。',
    youtube: '适合增加 YouTube 视频下载能力，并让业务端继续使用统一媒体结构。',
    twitter: '同时适用于 X 视频下载和 Twitter 视频下载场景，可接收 x.com 与 twitter.com 链接。',
    instagram: '适合增加 Instagram 视频下载能力，处理已支持的公开帖子、Reels 和分享链接。',
    threads: '适合构建 Threads 视频下载功能，只返回请求 URL 对应的目标帖子。',
    xiaohongshu: '同时覆盖小红书视频下载和 RedNote 视频下载场景，并支持已列出的短链格式。',
    bilibili: '适合构建 Bilibili / B站视频下载能力，仅覆盖大陆站视频、番剧、课程和 b23.tv 链接。',
    kuaishou: '适合增加快手或 Kwai 视频下载能力，处理已支持的公开视频和短链。',
    weibo: '适合构建微博视频下载 API，处理已支持的公开微博正文和视频链接。',
  },
  ja: {
    tiktok: 'TikTok動画保存・ダウンロード機能をWebサービスやアプリに追加し、プラットフォーム固有の解析処理を自前で保守したくない場合に適しています。',
    douyin: '対応する公開動画、画像投稿、共有URLを扱うDouyin動画ダウンロード機能の実装に適しています。',
    toutiao: '対応する記事URLや動画URLを処理するToutiao動画ダウンロードAPIが必要な場合に適しています。',
    youtube: 'YouTube動画保存・ダウンロード機能を追加しながら、アプリ側では共通のメディア形式を維持できます。',
    twitter: 'x.comとtwitter.comの両方を受け付けるX / Twitter動画ダウンロード機能の実装に適しています。',
    instagram: '対応する公開投稿、リール、共有URLからInstagram動画を保存・ダウンロードする機能に適しています。',
    threads: 'リクエストした投稿だけを返すThreads動画ダウンロード機能の実装に適しています。',
    xiaohongshu: 'RedNoteとXiaohongshu（小紅書）の動画ダウンロードに対応し、記載された短縮URLも処理できます。',
    bilibili: '中国本土版の動画、番組、講座、b23.tv URLに対応するBilibili動画保存・ダウンロード機能に適しています。',
    kuaishou: '対応する公開投稿と短縮URLを扱うKuaishou / Kwai動画ダウンロード機能に適しています。',
    weibo: '対応する公開投稿と動画URLを処理するWeibo動画保存・ダウンロードAPIの実装に適しています。',
  },
  es: {
    tiktok: 'Úsala para añadir descarga de videos de TikTok a una web, aplicación o automatización sin mantener extractores propios.',
    douyin: 'Úsala como backend para descargar videos de Douyin a partir de publicaciones públicas y enlaces compartidos compatibles.',
    toutiao: 'Úsala cuando una aplicación necesite descargar videos de Toutiao desde artículos y URL de video compatibles.',
    youtube: 'Úsala para añadir descarga de videos de YouTube y conservar un único modelo multimedia en toda la aplicación.',
    twitter: 'Úsala para descargar videos de X o Twitter y aceptar tanto enlaces de x.com como de twitter.com.',
    instagram: 'Úsala para descargar videos de Instagram desde publicaciones públicas, reels y enlaces compartidos compatibles.',
    threads: 'Úsala para crear un descargador de videos de Threads que devuelva solo la publicación solicitada.',
    xiaohongshu: 'Úsala para integrar descarga de videos de RedNote y Xiaohongshu, incluidos los enlaces cortos compatibles.',
    bilibili: 'Úsala para descargar videos de Bilibili de China continental desde videos, series, cursos y enlaces b23.tv.',
    kuaishou: 'Úsala para añadir descarga de videos de Kuaishou o Kwai desde publicaciones públicas y enlaces cortos compatibles.',
    weibo: 'Úsala para crear una API de descarga de videos de Weibo para estados y URL públicas compatibles.',
  },
};

function frontmatter(title, description) {
  return `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\n---\n\n`;
}

function code(value, language = 'json') {
  return `\n\`\`\`${language}\n${value}\n\`\`\`\n`;
}

function endpointBlock(pathname) {
  return code(`curl --request POST \\\n  --url https://api.easydown.org${pathname} \\\n  --header 'Authorization: Bearer ed_live_your_token' \\\n  --header 'Content-Type: application/json' \\\n  --data '{"url":"https://www.youtube.com/watch?v=BiBY6TeIvJ4"}'`, 'bash');
}

function normalizedExample(platform = 'youtube', lang = 'en') {
  const exampleTitles = {
    en: 'Example public post',
    zh: '公开作品示例',
    ja: '公開投稿の例',
    es: 'Ejemplo de publicación pública',
  };
  return JSON.stringify({
    status: 200,
    data: {
      platform,
      title: exampleTitles[lang],
      thumbnail: 'https://public-cdn.example/cover.jpg',
      duration: 18,
      images: [],
      videos: [{
        url: 'https://public-cdn.example/video.mp4',
        quality: '1080p',
        mimeType: 'video/mp4',
        width: 1920,
        height: 1080,
        hasAudio: true,
        source: 'direct',
      }],
      audios: [],
    },
    msg: 'success',
  }, null, 2);
}

function fullExample(platform, lang) {
  return JSON.stringify({
    status: 200,
    data: {
      media: JSON.parse(normalizedExample(platform.id, lang)).data,
      platformData: platform.dataContract.example,
      platformDataVersion: platform.dataVersion,
    },
    msg: 'success',
  }, null, 2);
}

function localizedFieldDescription(lang, field, contract) {
  if (lang === 'en') return contract.description;

  const semantic = (() => {
    if (/^(?:aweme_id|group_id|item_id|id|id_str|note_id|photoId|mid|mblogid|code)$/.test(field)) return 'identifier';
    if (/^(?:desc|text|full_text|text_raw|abstract|caption|title)$/.test(field)) return 'text';
    if (/^(?:author|user)$/.test(field)) return 'author';
    if (/^(?:images|images_list|pics|carousel_media|image_versions|coverUrls)$/.test(field)) return 'images';
    if (/^(?:statistics|metrics|interact_info)$/.test(field)) return 'metrics';
    if (/^(?:video|video_info_v2|video_play_info|streamingData|dash|mainMvUrls|manifest|video_versions|page_info)$/.test(field)) return 'playback';
    if (/^(?:music|native_voice_info)$/.test(field)) return 'audio';
    if (/^(?:pic|poster_url|video_details_url|media_url)$/.test(field)) return 'url';
    if (/^(?:duration|video_duration|timelength|width|height|quality)$/.test(field)) return 'technical';
    if (/^(?:support_formats|format|media_type|playabilityStatus|microformat|captions)$/.test(field)) return 'metadata';
    return contract.type === 'array' ? 'collection' : contract.type === 'object' ? 'metadata' : 'value';
  })();

  const descriptions = {
    zh: {
      identifier: '目标作品在平台中的公开标识，请按字符串保存以避免大整数精度丢失。',
      text: '目标作品公开展示的标题、正文或说明文字。',
      author: '目标作品作者的公开资料字段，不包含联系方式或鉴权信息。',
      images: '目标作品的图片、封面或图集项目；数组顺序与平台返回顺序一致。',
      metrics: '平台公开展示的播放、点赞、评论、收藏或分享等互动统计。',
      playback: '目标作品的视频播放、清晰度、编码、尺寸和媒体地址信息。',
      audio: '目标作品的公开配乐、原声或独立音轨信息。',
      url: '平台公开返回的媒体、封面或作品详情地址。',
      technical: '平台返回的时长、尺寸、清晰度等技术参数。',
      metadata: '平台公开返回的播放状态、格式或补充元数据。',
      collection: '目标作品相关公开项目的有序数组。',
      value: '目标作品在平台响应中的公开字段。',
    },
    ja: {
      identifier: '対象投稿の公開識別子です。大きな数値の精度を失わないよう文字列として保存します。',
      text: '対象投稿に公開表示されるタイトル、本文、説明です。',
      author: '対象投稿の投稿者に関する公開プロフィール項目です。連絡先や認証情報は含みません。',
      images: '対象投稿の画像、カバー、カルーセル項目です。配列順はプラットフォームの返却順を維持します。',
      metrics: '再生、いいね、コメント、保存、共有など公開されているエンゲージメント指標です。',
      playback: '動画の再生候補、画質、コーデック、サイズ、メディアURLに関する情報です。',
      audio: '対象投稿で公開されている楽曲、オリジナル音声、分離音声の情報です。',
      url: 'プラットフォームが公開しているメディア、カバー、詳細ページのURLです。',
      technical: '再生時間、サイズ、画質などプラットフォーム由来の技術情報です。',
      metadata: '再生状態、形式、その他の公開メタデータです。',
      collection: '対象投稿に関連する公開項目の順序付き配列です。',
      value: '対象投稿のプラットフォームレスポンスに含まれる公開項目です。',
    },
    es: {
      identifier: 'Identificador público del contenido. Guárdalo como texto para evitar pérdidas de precisión con números grandes.',
      text: 'Título, texto o descripción que se muestra públicamente en la publicación solicitada.',
      author: 'Datos públicos del autor de la publicación, sin contactos ni credenciales.',
      images: 'Imágenes, portadas o elementos del carrusel; el orden coincide con la respuesta de la plataforma.',
      metrics: 'Métricas públicas de reproducciones, Me gusta, comentarios, guardados o compartidos.',
      playback: 'Datos de reproducción, calidad, códec, dimensiones y URL multimedia del video solicitado.',
      audio: 'Información pública de música, sonido original o pistas de audio independientes.',
      url: 'URL pública de un archivo, portada o página de detalle devuelta por la plataforma.',
      technical: 'Duración, dimensiones, calidad u otros parámetros técnicos publicados por la plataforma.',
      metadata: 'Estado de reproducción, formato u otros metadatos públicos del contenido.',
      collection: 'Lista ordenada de elementos públicos relacionados con la publicación solicitada.',
      value: 'Campo público incluido en la respuesta de la plataforma para el contenido solicitado.',
    },
  };

  return descriptions[lang][semantic];
}

function errorTable(lang) {
  const c = copy[lang];
  const meanings = {
    en: ['URL belongs to another platform endpoint', 'URL shape is not accepted', 'Post is private, deleted, restricted, or unavailable', 'No downloadable media was found', 'Platform service is temporarily unavailable'],
    zh: ['URL 与请求的平台接口不匹配', 'URL 形态暂不支持', '作品私密、删除、受限或不可用', '未找到可下载媒体', '平台服务暂时不可用'],
    ja: ['URLが別のプラットフォームに属します', 'URL形式が未対応です', '投稿が非公開、削除、制限、利用不可です', 'ダウンロード可能なメディアがありません', 'プラットフォームサービスが一時的に利用できません'],
    es: ['La URL pertenece a otra plataforma', 'El formato de URL no es compatible', 'El contenido es privado, eliminado, restringido o no disponible', 'No se encontraron medios descargables', 'El servicio de la plataforma no está disponible temporalmente'],
  }[lang];
  const codes = ['platform_mismatch', 'unsupported_url', 'content_unavailable', 'no_media', 'upstream_unavailable'];
  return `| ${c.fieldHeader[0]} | ${c.fieldHeader[1]} |\n|---|---|\n${codes.map((item, index) => `| \`${item}\` | ${meanings[index]} |`).join('\n')}`;
}

function platformLabel(lang, platform) {
  return platformNames[lang][platform.id] ?? platform.name;
}

function platformPageTitle(lang, platform) {
  return platformSeoContent[platform.id]?.h1?.[lang]
    ?? copy[lang].platformTitle(platformLabel(lang, platform));
}

function localizedPrefix(lang) {
  return `/${lang}`;
}

function supportedLinksContent(lang) {
  const c = copy[lang];
  const prefix = localizedPrefix(lang);
  const sections = platforms.map((platform) => {
    const name = platformLabel(lang, platform);
    const note = platform.id === 'bilibili' ? `\n\n> ${c.international}` : '';
    return `## [${name}](${prefix}/api/${platform.id})\n\n${platform.linkFormats.map((format) => `- \`${format}\``).join('\n')}\n\n### ${c.examples}\n\n${platform.examples.slice(0, 3).map((example) => `- \`${example}\``).join('\n')}${note}`;
  });
  return `${c.platformListIntro}\n\n${sections.join('\n\n')}`;
}

function platformLinks(lang) {
  const prefix = localizedPrefix(lang);
  return platforms.map((platform) => `- [${platformPageTitle(lang, platform)}](${prefix}/api/${platform.id})`).join('\n');
}

function overview(lang) {
  const c = copy[lang];
  const prefix = localizedPrefix(lang);
  return frontmatter(c.overview, c.overviewDesc) + `${c.intro}

<Cards>
  <Card title="${c.quick}" href="${prefix}/quick-start" description="POST /api/v1/parse" />
  <Card title="${c.links}" href="${prefix}/supported-links" description="${c.cardLinks}" />
  <Card title="${c.common}" href="${prefix}/api/common" description="${c.cardCommon}" />
  <Card title="${c.platformApis}" href="${prefix}/api" description="${c.cardPlatform}" />
</Cards>

## ${c.choose}

| ${c.apiType} | ${c.useWhen} |
|---|---|
| [\`POST /api/v1/parse\`](${prefix}/api/common) | ${c.commonChoice} |
| \`POST /api/v1/platforms/{platform}/parse\` | ${c.platformChoice} |

## ${c.supportedPlatforms}

${c.platformListIntro}

${platformLinks(lang)}

## ${c.supportedMedia}

${c.mediaIntro}

## ${c.endpoint}

- \`POST https://api.easydown.org/api/v1/parse\`
- \`POST https://api.easydown.org/api/v1/platforms/{platform}/parse\`
- \`GET https://api.easydown.org/api/v1/capabilities\`
- \`GET https://api.easydown.org/openapi.json\`

## ${c.billing}

${c.billingNote}
`;
}

function quickStart(lang) {
  const c = copy[lang];
  return frontmatter(c.quick, c.descriptions.quick) + `## 1. ${c.auth}\n\n${c.tokenNote}\n\n## 2. ${c.request}\n${endpointBlock('/api/v1/parse')}\n## 3. ${c.response}\n${code(normalizedExample('youtube', lang))}\n${c.billingNote}`;
}

function authentication(lang) {
  const c = copy[lang];
  return frontmatter(c.auth, c.descriptions.auth) + `${c.tokenNote}
${code('Authorization: Bearer ed_live_your_token', 'http')}
## ${c.limits}

${c.authRules.map((item) => `- ${item}`).join('\n')}
`;
}

function billing(lang) {
  const c = copy[lang];
  return frontmatter(c.billing, c.descriptions.billing) + `${c.billingNote}

## ${c.response}

${c.billingSuccess}

- \`X-Credits-Charged: 1\`
- \`X-Credits-Remaining: {balance}\`
- \`X-EasyDown-Cache: HIT | MISS | SUPABASE | BYPASS\`

${c.cacheBilling}
`;
}

function errors(lang) {
  const c = copy[lang];
  return frontmatter(c.errors, c.descriptions.errors) + `${errorTable(lang)}

## ${c.response}
${code(JSON.stringify({ status: 404, data: null, msg: 'The content is unavailable', code: 'content_unavailable' }, null, 2))}
${c.errorPrivacy}
`;
}

function mediaDownloads(lang) {
  const c = copy[lang];
  return frontmatter(c.media, c.descriptions.media) + `${c.mediaObject}

## ${c.fields}

${c.mediaFields.map((item) => `- ${item}`).join('\n')}

## ${c.limits}

${c.mediaExpiry}
`;
}

function mcp(lang) {
  const c = copy[lang];
  return frontmatter(c.mcp, c.descriptions.mcp) + `${c.mcpIntro}

## ${c.auth}

${c.tokenNote}

${c.billingNote}

## ${c.limits}

${c.mcpRules.map((item) => `- ${item}`).join('\n')}
`;
}

function commonApi(lang) {
  const c = copy[lang];
  return frontmatter(c.common, c.descriptions.common) + `${c.commonIntro}

${c.generated}

## ${c.response}

${code(normalizedExample('youtube', lang))}

${c.tryNote}

<ApiReference path="/api/v1/parse" />
`;
}

function platformApiIndex(lang) {
  const c = copy[lang];
  const labels = platformSectionLabels[lang];
  const prefix = localizedPrefix(lang);
  const cards = platforms.map((platform) => {
    const seo = platformSeoContent[platform.id];
    const mediaKinds = seo.mediaKinds.map((kind) => `\`${kind}[]\``).join(', ');
    return `  <Card title="${platformPageTitle(lang, platform)}" href="${prefix}/api/${platform.id}" description="${mediaKinds}" />`;
  }).join('\n');

  return frontmatter(c.platformApis, labels.hubDescription) + `${labels.hubIntro}

<Cards>
${cards}
</Cards>

## ${c.choose}

| ${c.apiType} | ${c.useWhen} |
|---|---|
| [\`POST /api/v1/parse\`](${prefix}/api/common) | ${c.commonChoice} |
| \`POST /api/v1/platforms/{platform}/parse\` | ${c.platformChoice} |

## ${c.billing}

${c.billingNote}
`;
}

function relatedGuides(lang) {
  const c = copy[lang];
  const prefix = localizedPrefix(lang);
  const hrefs = [`${prefix}/api`, `${prefix}/api/common`, `${prefix}/supported-links`, `${prefix}/errors`, `${prefix}/media-downloads`, `${prefix}/authentication`, `${prefix}/billing`];
  return c.relatedLinks.map((label, index) => `- [${label}](${hrefs[index]})`).join('\n');
}

function platformPage(lang, platform) {
  const c = copy[lang];
  const name = platformLabel(lang, platform);
  const title = platformPageTitle(lang, platform);
  const description = c.platformDescription(name);
  const endpoint = `/api/v1/platforms/${platform.id}/parse`;
  const special = platform.id === 'bilibili' ? `\n\n> ${c.international}` : '';
  const seo = platformSeoContent[platform.id];
  const labels = platformSectionLabels[lang];
  const fieldRows = Object.entries(platform.dataContract.fields)
    .map(([field, contract]) => `| \`data.platformData.${field}\` | \`${contract.type}\` | ${localizedFieldDescription(lang, field, contract)} |`)
    .join('\n');
  return frontmatter(title, description) + `${seo.intro[lang]}

${searchIntent[lang][platform.id] ?? ''}

${c.useEndpoint}

## ${c.endpoint}

\`POST https://api.easydown.org${endpoint}\`

## ${c.formats}

${platform.linkFormats.map((format) => `- \`${format}\``).join('\n')}

### ${c.examples}

${platform.examples.slice(0, 4).map((example) => `- \`${example}\``).join('\n')}${special}

## ${labels.responseContains}

${seo.media[lang]}

## ${labels.contractFields}

${labels.additionalFields}

| ${c.fieldHeader[0]} | ${labels.fieldType} | ${c.fieldHeader[1]} |
|---|---|---|
| \`data.media\` | \`object\` | ${c.fieldMedia} |
| \`data.platformDataVersion\` | \`string\` | ${c.fieldVersion(name, `\`${platform.dataVersion}\``)} |
${fieldRows}

${code(fullExample(platform, lang))}

## ${labels.downloadGuidance}

${seo.proxy[lang]}

## ${c.limits}

${seo.limits[lang]}

${c.publicOnly}

${c.billingNote}

## ${labels.troubleshooting}

${seo.troubleshooting[lang].map((item) => `- ${item}`).join('\n')}

## ${c.faq}

### ${c.failedQuestion}

${c.failedAnswer}

### ${c.validQuestion}

${c.validAnswer}

## ${c.related}

${relatedGuides(lang)}

## ${c.reference}

${c.generated}

${c.tryNote}

<ApiReference path="${endpoint}" />
`;
}

await rm(root, { recursive: true, force: true });
await mkdir(path.join(root, 'api'), { recursive: true });

const rootMeta = {
  title: 'Video Downloader API Docs',
  pages: ['index', 'quick-start', 'authentication', 'billing', 'errors', 'supported-links', 'media-downloads', 'mcp', 'api'],
};
const apiMeta = {
  title: 'Platform Video Downloader APIs',
  pages: ['index', 'common', ...platforms.map((platform) => platform.id)],
};
const localizedMeta = {
  zh: { root: '视频下载 API 文档', api: '各平台视频下载 API' },
  ja: { root: '動画ダウンロードAPIドキュメント', api: 'プラットフォーム別動画API' },
  es: { root: 'Documentación de API de descarga', api: 'API de descarga por plataforma' },
};

await Promise.all([
  writeFile(path.join(root, 'meta.json'), `${JSON.stringify(rootMeta, null, 2)}\n`),
  writeFile(path.join(root, 'api/meta.json'), `${JSON.stringify(apiMeta, null, 2)}\n`),
]);

const writes = [];
for (const lang of Object.keys(copy)) {
  const suffix = lang === 'en' ? '' : `.${lang}`;
  const add = (relative, body) => writes.push(writeFile(path.join(root, relative.replace('.mdx', `${suffix}.mdx`)), body));
  if (lang !== 'en') {
    writes.push(writeFile(path.join(root, `meta.${lang}.json`), `${JSON.stringify({ ...rootMeta, title: localizedMeta[lang].root }, null, 2)}\n`));
    writes.push(writeFile(path.join(root, `api/meta.${lang}.json`), `${JSON.stringify({ ...apiMeta, title: localizedMeta[lang].api }, null, 2)}\n`));
  }
  add('index.mdx', overview(lang));
  add('quick-start.mdx', quickStart(lang));
  add('authentication.mdx', authentication(lang));
  add('billing.mdx', billing(lang));
  add('errors.mdx', errors(lang));
  add('supported-links.mdx', frontmatter(copy[lang].links, copy[lang].descriptions.links) + supportedLinksContent(lang));
  add('media-downloads.mdx', mediaDownloads(lang));
  add('mcp.mdx', mcp(lang));
  add('api/index.mdx', platformApiIndex(lang));
  add('api/common.mdx', commonApi(lang));
  for (const platform of platforms) add(`api/${platform.id}.mdx`, platformPage(lang, platform));
}

await Promise.all(writes);

const pageMetadata = {};
for (const lang of Object.keys(copy)) {
  const suffix = lang === 'en' ? '' : `.${lang}`;
  for (const route of contentRoutes) {
    const pagePath = route === 'index' ? '' : route.replace(/\/index$/, '');
    const key = `${lang}:${pagePath}`;
    const file = `content/docs/${route}${suffix}.mdx`;
    const previous = existingContentMetadata.pages?.[key] ?? {};
    pageMetadata[key] = {
      datePublished: gitDate(
        ['log', '--reverse', '--format=%cI', '--', file],
        previous.datePublished ?? contentMetadata.datePublished,
      ),
      dateModified: gitDate(
        ['log', '-1', '--format=%cI', '--', file],
        previous.dateModified ?? contentMetadata.dateModified,
      ),
    };
  }
}

await writeFile(
  path.resolve('src/generated/content-meta.json'),
  `${JSON.stringify({ ...contentMetadata, pages: pageMetadata }, null, 2)}\n`,
);
console.log(`Generated ${Object.keys(copy).length * (10 + platforms.length)} localized MDX pages from ${platforms.length} platform capabilities`);

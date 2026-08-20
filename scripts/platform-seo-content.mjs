export const platformSeoContent = {
  "youtube": {
    "h1": {
      "en": "YouTube Video Downloader API",
      "zh": "YouTube 视频下载 API",
      "ja": "YouTube 動画ダウンロード API",
      "es": "API de descarga de videos de YouTube"
    },
    "secondaryKeywords": {
      "en": [
        "YouTube video download API",
        "YouTube Shorts download API"
      ],
      "zh": [
        "YouTube 视频解析 API",
        "YouTube Shorts 下载 API"
      ],
      "ja": [
        "YouTube 動画取得 API",
        "YouTube Shorts ダウンロード API"
      ],
      "es": [
        "API para descargar videos de YouTube",
        "descargador de YouTube por API"
      ]
    },
    "intro": {
      "en": "Send one public YouTube URL to the shared REST endpoint. The response preserves every available video and audio candidate so your backend can choose a format instead of accepting a single preselected file.",
      "zh": "把一个公开 YouTube URL 发送到统一 REST Endpoint。接口会保留全部可用视频与音频候选，方便后端自行选择格式，而不是被限制为单个文件。",
      "ja": "公開 YouTube URL を共通 REST Endpoint に送信すると、利用可能な動画・音声候補をすべて保持したレスポンスを返し、バックエンド側で形式を選択できます。",
      "es": "Envía una URL pública de YouTube, Shorts o youtu.be a la API. La respuesta conserva las variantes de video y audio para que el backend elija el formato adecuado."
    },
    "media": {
      "en": "Videos can include progressive files and video-only streams. Separate audio candidates are returned in audios[]; high-quality DASH results may require FFmpeg merging after both streams are downloaded.",
      "zh": "videos[] 可能同时包含渐进式文件和纯视频流，独立音频位于 audios[]。部分高画质 DASH 结果需要分别下载音视频后使用 FFmpeg 合并。",
      "ja": "videos[] にはプログレッシブ形式と動画のみのストリームが含まれます。分離音声は audios[] に入り、高画質 DASH は保存後に FFmpeg で結合する場合があります。",
      "es": "Puede mostrar distintas resoluciones y pistas de audio. Algunos formatos DASH de alta calidad requieren combinar video y audio después de descargarlos."
    },
    "proxy": {
      "en": "Fetch media from your backend with a browser User-Agent, Referer: https://www.youtube.com/, Origin: https://www.youtube.com, and forwarded Range headers. Some streams are tied to the parsing server IP or region.",
      "zh": "建议后端携带浏览器 User-Agent、YouTube Referer、Origin 并透传 Range 请求下载。部分流会绑定解析服务器 IP 或受地区限制。",
      "ja": "バックエンドからブラウザー User-Agent、YouTube Referer、Origin、Range を付けて取得します。ストリームが解析サーバーの IP や地域に依存する場合があります。",
      "es": "Descarga desde el backend con User-Agent de navegador, Referer y Origin de YouTube, y reenvía Range. Algunos flujos dependen de la región o IP que realizó el análisis."
    },
    "limits": {
      "en": "Playlists, channels, community posts, private videos, members-only media, DRM-protected content, and region-unavailable videos are not supported.",
      "zh": "不支持播放列表、频道页、社区帖子、私密视频、会员内容、DRM 内容和地区不可用视频。",
      "ja": "再生リスト、チャンネル、コミュニティ投稿、非公開、メンバー限定、DRM、地域制限動画には対応しません。",
      "es": "No admite listas, canales, publicaciones de comunidad, videos privados, contenido para miembros, DRM ni bloqueos regionales."
    },
    "troubleshooting": {
      "en": [
        "Merge separate video and audio streams when a selected quality has no audio.",
        "Re-parse the source URL when a signed stream expires or returns 403.",
        "Use an accessible backend region for region-limited public media."
      ],
      "zh": [
        "所选画质没有声音时，下载独立音频并与视频合并。",
        "签名流过期或返回 403 时，重新解析原始 URL。",
        "地区受限的公开媒体需要使用可访问该内容的后端地区。"
      ],
      "ja": [
        "選択画質に音声がない場合は分離音声を結合します。",
        "署名 URL が期限切れまたは 403 の場合は元 URL を再解析します。",
        "地域制限がある公開メディアはアクセス可能なサーバー地域を使用します。"
      ],
      "es": [
        "Combina el video y el audio por separado cuando la calidad elegida no incluya sonido.",
        "Vuelve a analizar la URL original si un flujo firmado caduca o responde con 403.",
        "Usa una región de backend que tenga acceso cuando el video público esté limitado geográficamente."
      ]
    },
    "mediaKinds": [
      "videos",
      "audios"
    ]
  },
  "tiktok": {
    "h1": {
      "en": "TikTok Video Downloader API",
      "zh": "TikTok 视频下载 API",
      "ja": "TikTok 動画ダウンロード API",
      "es": "API de descarga de videos de TikTok"
    },
    "secondaryKeywords": {
      "en": [
        "TikTok video download API",
        "TikTok photo post API"
      ],
      "zh": [
        "TikTok 视频解析 API",
        "TikTok 图文下载 API"
      ],
      "ja": [
        "TikTok 動画取得 API",
        "TikTok 写真投稿ダウンロード API"
      ],
      "es": [
        "API para descargar videos de TikTok",
        "descargador de TikTok por API"
      ]
    },
    "intro": {
      "en": "Normal video pages, photo posts, and TikTok share redirects all use the same authenticated REST request. EasyDown normalizes the result without discarding alternate qualities or gallery items.",
      "zh": "普通视频页、图文作品和 TikTok 分享跳转都使用同一个鉴权 REST 请求，EasyDown 会统一结果并保留不同画质和图集项目。",
      "ja": "通常の動画、写真投稿、TikTok 共有リダイレクトを同じ認証付き REST リクエストで処理し、画質やギャラリー項目を省略せず共通化します。",
      "es": "Envía a la API la URL de un video, una publicación de fotos o un enlace compartido de TikTok. EasyDown conserva las calidades y todos los elementos de la galería."
    },
    "media": {
      "en": "Video posts may return several video qualities, cover images, and audio. Photo posts return every public gallery image exposed by the source response.",
      "zh": "视频作品可能返回多种清晰度、封面和音频；图文作品会返回源响应中公开的全部图集图片。",
      "ja": "動画投稿では複数画質、カバー、音声を、写真投稿では公開ギャラリー画像をすべて返します。",
      "es": "Puede devolver varias calidades de video, audio, portadas y todas las imágenes de una publicación fotográfica."
    },
    "proxy": {
      "en": "Use a backend proxy with Referer: https://www.tiktok.com/ and a browser User-Agent. Some media requires a valid access cookie from your own browsing context, and availability can vary by server region.",
      "zh": "请通过后端代理携带 TikTok Referer 和浏览器 User-Agent。部分媒体需要来自你自己浏览环境的有效访问 Cookie，也可能受服务器地区影响。",
      "ja": "TikTok Referer とブラウザー User-Agent を付けたバックエンドプロキシを使用します。自身の閲覧環境の Cookie やサーバー地域が必要な場合があります。",
      "es": "Usa un proxy de backend con Referer de TikTok y User-Agent de navegador. La disponibilidad puede variar por región y algunos medios requieren una cookie de tu propio contexto autorizado."
    },
    "limits": {
      "en": "Profiles, LIVE pages, sound pages, search results, TikTok Lite pages, private posts, deleted posts, and region-unavailable media are unsupported.",
      "zh": "不支持用户主页、直播页、声音页、搜索结果、TikTok Lite、私密作品、已删除作品和地区不可用媒体。",
      "ja": "プロフィール、LIVE、サウンド、検索、TikTok Lite、非公開・削除済み投稿、地域で利用できないメディアには対応しません。",
      "es": "No admite perfiles, directos, páginas de sonido, TikTok Lite, publicaciones privadas o eliminadas ni enlaces incompletos."
    },
    "troubleshooting": {
      "en": [
        "Resolve short share URLs before caching their final post URL.",
        "Re-parse when a media URL returns 403 or 404 because TikTok links can expire.",
        "Do not expose API tokens or source cookies in browser JavaScript."
      ],
      "zh": [
        "分享短链解析完成后再缓存最终作品 URL。",
        "媒体 URL 返回 403 或 404 时重新解析，TikTok 链接可能过期。",
        "不要在浏览器 JavaScript 中暴露 API Token 或源站 Cookie。"
      ],
      "ja": [
        "共有短縮 URL は最終投稿 URL に解決してから保存します。",
        "メディア URL が 403/404 の場合は期限切れの可能性があるため再解析します。",
        "API Token や元サイト Cookie をブラウザー JavaScript に公開しません。"
      ],
      "es": [
        "Resuelve los enlaces compartidos antes de guardar en caché la URL final de la publicación.",
        "Vuelve a analizar cuando una URL multimedia caduque y responda con 403 o 404.",
        "No expongas el token de la API ni cookies del sitio de origen en JavaScript del navegador."
      ]
    },
    "mediaKinds": [
      "images",
      "videos",
      "audios"
    ]
  },
  "instagram": {
    "h1": {
      "en": "Instagram Video Downloader API",
      "zh": "Instagram 视频与图片下载 API",
      "ja": "Instagram 動画・画像ダウンロード API",
      "es": "API de descarga de videos de Instagram"
    },
    "secondaryKeywords": {
      "en": [
        "Instagram video download API",
        "Instagram Reels download API"
      ],
      "zh": [
        "Instagram 视频下载 API",
        "Instagram Reels 下载 API"
      ],
      "ja": [
        "Instagram 動画ダウンロード API",
        "Instagram リール取得 API"
      ],
      "es": [
        "API para descargar videos de Instagram",
        "descargador de Instagram por API"
      ]
    },
    "intro": {
      "en": "One REST request supports post, Reel, embed, and share URLs. Carousel order is preserved so integrations can display or store the complete public post instead of only the first item.",
      "zh": "一个 REST 请求即可处理帖子、Reel、embed 和分享链接，并保留图集顺序，方便集成展示或保存完整公开帖子。",
      "ja": "一つの REST リクエストで投稿、リール、embed、共有 URL を処理し、カルーセル順序を維持して公開投稿全体を利用できます。",
      "es": "Envía la URL de una publicación, un Reel o una Story pública compatible. La API devuelve por separado el video y todas las imágenes disponibles del carrusel."
    },
    "media": {
      "en": "The response can contain both images[] and videos[] for mixed or carousel posts. Available cover and thumbnail candidates remain separate from downloadable post media.",
      "zh": "混合或图集帖子可能同时返回 images[] 与 videos[]；封面和缩略图候选会与可下载的帖子媒体分开保留。",
      "ja": "混合・カルーセル投稿では images[] と videos[] の両方を返し、カバーやサムネイル候補は投稿メディアと分けて保持します。",
      "es": "Devuelve videos e imágenes por separado y conserva todos los elementos disponibles de un carrusel público."
    },
    "proxy": {
      "en": "Use a backend request with Referer: https://www.instagram.com/ and a browser User-Agent. Direct browser previews can fail because Instagram CDNs enforce CORS, CORP, cookies, or expiring signatures.",
      "zh": "建议后端携带 Instagram Referer 和浏览器 User-Agent 请求。Instagram CDN 可能检查 CORS、CORP、Cookie 或过期签名，浏览器直连并不稳定。",
      "ja": "Instagram Referer とブラウザー User-Agent を付けてバックエンドから取得します。CDN の CORS、CORP、Cookie、期限付き署名によりブラウザー直アクセスは不安定です。",
      "es": "Descarga desde el backend con Referer de Instagram y User-Agent de navegador. Las vistas directas pueden fallar por CORS, CORP, cookies o firmas temporales."
    },
    "limits": {
      "en": "Profiles, Highlights, Explore pages, direct messages, private posts, login-only media, and expired Stories are not supported.",
      "zh": "不支持主页、Highlights、Explore、私信、私密帖子、仅登录可见媒体和已过期 Stories。",
      "ja": "プロフィール、ハイライト、Explore、DM、非公開・ログイン限定投稿、期限切れ Stories には対応しません。",
      "es": "No admite perfiles, mensajes directos, Explore, cuentas privadas, Stories caducadas ni Highlights no accesibles públicamente."
    },
    "troubleshooting": {
      "en": [
        "Use the full public post or Reel URL rather than an account profile.",
        "Proxy CDN media through your backend when the browser reports CORS or CORP.",
        "Re-parse the post after an Instagram CDN URL expires."
      ],
      "zh": [
        "提交完整公开帖子或 Reel URL，不要提交账号主页。",
        "浏览器出现 CORS 或 CORP 时，通过后端代理 CDN 媒体。",
        "Instagram CDN URL 过期后重新解析帖子。"
      ],
      "ja": [
        "アカウントではなく完全な公開投稿・リール URL を送信します。",
        "CORS/CORP の場合は CDN メディアをバックエンド経由で取得します。",
        "Instagram CDN URL が期限切れになったら投稿を再解析します。"
      ],
      "es": [
        "Usa la URL completa de la publicación o del Reel, no la de un perfil.",
        "Pasa los archivos de la CDN por tu backend si el navegador informa de CORS o CORP.",
        "Vuelve a analizar la publicación cuando caduque una URL multimedia de Instagram."
      ]
    },
    "mediaKinds": [
      "images",
      "videos"
    ]
  },
  "twitter": {
    "h1": {
      "en": "Twitter / X Video Downloader API",
      "zh": "Twitter / X 视频下载 API",
      "ja": "Twitter / X 動画ダウンロード API",
      "es": "API de descarga de videos de Twitter / X"
    },
    "secondaryKeywords": {
      "en": [
        "Twitter video download API",
        "X video download API"
      ],
      "zh": [
        "Twitter 视频解析 API",
        "X 视频下载 API"
      ],
      "ja": [
        "Twitter 動画取得 API",
        "X 動画ダウンロード API"
      ],
      "es": [
        "API para descargar videos de Twitter / X",
        "descargador de Twitter / X por API"
      ]
    },
    "intro": {
      "en": "Both x.com and twitter.com status links enter the same REST workflow. Large status IDs stay strings and all returned media variants are preserved for backend selection.",
      "zh": "x.com 与 twitter.com 的 status 链接进入同一 REST 流程，大整数帖子 ID 始终按字符串处理，并保留全部媒体规格。",
      "ja": "x.com と twitter.com の status URL を同じ REST フローで処理し、大きな投稿 ID は文字列のまま、全メディア候補を保持します。",
      "es": "Envía una URL de estado de x.com o twitter.com. La API conserva los identificadores largos como texto y devuelve todas las variantes multimedia de la publicación."
    },
    "media": {
      "en": "Video posts can return multiple bitrate and dimension variants. Image posts keep every post image; thumbnails are not substituted for full post media.",
      "zh": "视频帖子可能返回多种码率和尺寸；图片帖子会保留全部正文图片，不会用缩略图替代原媒体。",
      "ja": "動画投稿では複数ビットレート・サイズを返し、画像投稿ではすべての投稿画像を保持してサムネイルで代用しません。",
      "es": "Muestra las variantes de video accesibles desde la publicación pública, con la calidad indicada cuando está disponible."
    },
    "proxy": {
      "en": "Fetch selected media from your backend with Referer: https://x.com/ and a browser User-Agent. Forward Range for large files and re-parse if a selected variant expires.",
      "zh": "后端下载时携带 X Referer 与浏览器 User-Agent，大文件透传 Range；所选规格过期后重新解析。",
      "ja": "X Referer とブラウザー User-Agent を付け、Range を転送してバックエンド取得します。選択 URL が期限切れなら再解析します。",
      "es": "Descarga desde el backend con Referer de X, User-Agent de navegador y Range. Selecciona la variante por calidad y vuelve a analizar si caduca."
    },
    "limits": {
      "en": "Profiles, search pages, Spaces, Communities, Broadcast URLs, private posts, deleted posts, and direct CDN URLs are unsupported.",
      "zh": "不支持主页、搜索页、Spaces、社区、Broadcast、私密帖子、已删除帖子和 CDN 直链。",
      "ja": "プロフィール、検索、Spaces、コミュニティ、Broadcast、非公開・削除済み投稿、CDN 直 URL には対応しません。",
      "es": "No admite perfiles, búsquedas, Spaces, publicaciones privadas o eliminadas ni enlaces directos de la CDN multimedia."
    },
    "troubleshooting": {
      "en": [
        "Submit a status URL containing one post ID.",
        "Choose a videos[] variant by quality and dimensions instead of array position alone.",
        "Re-parse the original status when a media variant stops responding."
      ],
      "zh": [
        "提交包含单个帖子 ID 的 status URL。",
        "按清晰度和尺寸选择 videos[]，不要只依赖数组位置。",
        "媒体规格失效时重新解析原始 status。"
      ],
      "ja": [
        "一つの投稿 ID を含む status URL を送信します。",
        "配列位置だけでなく画質とサイズで videos[] を選択します。",
        "メディアが無効になったら元 status を再解析します。"
      ],
      "es": [
        "Envía una URL de estado que contenga un único identificador de publicación.",
        "Elige una variante de videos[] por calidad y dimensiones, no solo por su posición.",
        "Vuelve a analizar el estado original cuando una variante multimedia deje de responder."
      ]
    },
    "mediaKinds": [
      "images",
      "videos"
    ]
  },
  "threads": {
    "h1": {
      "en": "Threads Video Downloader API",
      "zh": "Threads 视频与图片下载 API",
      "ja": "Threads 動画・画像ダウンロード API",
      "es": "API de descarga de videos de Threads"
    },
    "secondaryKeywords": {
      "en": [
        "Threads video download API",
        "Threads media API"
      ],
      "zh": [
        "Threads 视频解析 API",
        "Threads 图片下载 API"
      ],
      "ja": [
        "Threads 動画取得 API",
        "Threads メディア API"
      ],
      "es": [
        "API para descargar videos de Threads",
        "descargador de Threads por API"
      ]
    },
    "intro": {
      "en": "EasyDown resolves Threads share redirects, decodes the requested shortcode locally to a precision-safe numeric post ID, and makes one detail request for the exact post.",
      "zh": "EasyDown 会解析 Threads 分享跳转，在本地把 shortcode 无精度损失地转换为数值帖子 ID，并只请求一次目标帖子详情。",
      "ja": "Threads の共有リダイレクトを解決し、shortcode を精度を失わず数値投稿 ID にローカル変換して、対象投稿の詳細を一度だけ取得します。",
      "es": "EasyDown resuelve los enlaces compartidos de Threads, convierte el shortcode localmente en un ID numérico sin perder precisión y realiza una sola petición de detalle."
    },
    "media": {
      "en": "Media posts can return every valid video and image candidate from direct fields, carousels, and text_post_app_info.linked_inline_media. Duplicate upstream variants are preserved.",
      "zh": "媒体帖会返回直属字段、轮播及 text_post_app_info.linked_inline_media 中的全部有效视频与图片候选，并保留上游重复规格。",
      "ja": "直属フィールド、カルーセル、text_post_app_info.linked_inline_media の有効な動画・画像候補を返し、上流の重複バリアントも保持します。",
      "es": "Devuelve videos e imágenes de los campos directos, carruseles y text_post_app_info.linked_inline_media, conservando las variantes del proveedor."
    },
    "proxy": {
      "en": "Use a backend proxy with a browser User-Agent and the matching Threads origin as Referer. Store returned media URLs only briefly because source signatures and variants can change.",
      "zh": "使用后端代理并携带浏览器 User-Agent 与对应 Threads Referer。源签名和规格可能变化，返回 URL 只适合短期保存。",
      "ja": "ブラウザー User-Agent と Threads Referer を付けてバックエンド取得し、署名や候補が変わるため URL は短期間だけ保持します。",
      "es": "Descarga desde el backend con Referer de Threads o Instagram y User-Agent de navegador. Las URL de la CDN pueden caducar o bloquear solicitudes sin contexto."
    },
    "limits": {
      "en": "Text-only posts, profiles, feeds, replies, search results, private posts, and deleted posts return no downloadable media.",
      "zh": "纯文本帖子、主页、内容流、回复、搜索结果、私密和已删除帖子不会返回可下载媒体。",
      "ja": "テキストのみの投稿、プロフィール、フィード、返信、検索、非公開・削除済み投稿はダウンロード可能なメディアを返しません。",
      "es": "No admite publicaciones de solo texto, perfiles, feeds de respuestas, búsquedas, contenido privado ni publicaciones eliminadas."
    },
    "troubleshooting": {
      "en": [
        "Use a threads.com or threads.net post URL, /media URL, or /share/ redirect link.",
        "Treat text-only success responses as no-media results.",
        "Read linked_inline_media as well as direct and carousel media."
      ],
      "zh": [
        "使用 threads.com 或 threads.net 的帖子、/media 或 /share/ 分享链接。",
        "纯文本成功响应应按无媒体结果处理。",
        "除直属和轮播媒体外，也要读取 linked_inline_media。"
      ],
      "ja": [
        "threads.com または threads.net の投稿、/media、/share/ URL を使用します。",
        "テキストのみの成功レスポンスはメディアなしとして扱います。",
        "直属・カルーセルに加えて linked_inline_media も読み取ります。"
      ],
      "es": [
        "Envía una URL de publicación, /media o /share/ de threads.com o threads.net.",
        "Trata una publicación realmente textual como un resultado sin contenido multimedia.",
        "Lee linked_inline_media además de los campos directos y del carrusel."
      ]
    },
    "mediaKinds": [
      "images",
      "videos"
    ]
  },
  "bilibili": {
    "h1": {
      "en": "Bilibili Video Downloader API",
      "zh": "Bilibili / B站视频下载 API",
      "ja": "Bilibili 動画ダウンロード API",
      "es": "API de descarga de videos de Bilibili"
    },
    "secondaryKeywords": {
      "en": [
        "Bilibili video download API",
        "Bilibili media API"
      ],
      "zh": [
        "B站视频解析 API",
        "Bilibili 下载接口"
      ],
      "ja": [
        "Bilibili 動画取得 API",
        "Bilibili メディア API"
      ],
      "es": [
        "API para descargar videos de Bilibili",
        "descargador de Bilibili por API"
      ]
    },
    "intro": {
      "en": "Several Bilibili URL families are normalized into one selected video item. The REST response keeps available video, separate audio, thumbnail, duration, and quality data.",
      "zh": "多种 Bilibili URL 会被统一为一个选定视频项目，REST 响应保留可用视频、独立音频、缩略图、时长和画质数据。",
      "ja": "複数の Bilibili URL 形式を一つの動画項目に正規化し、動画、分離音声、サムネイル、再生時間、画質情報を保持します。",
      "es": "Envía una URL de video, episodio, curso o b23.tv de Bilibili China continental. La API conserva cada parte y las pistas DASH disponibles."
    },
    "media": {
      "en": "Some qualities use DASH with separate videos[] and audios[] entries. Download both selected streams and merge them with FFmpeg without re-encoding when compatible.",
      "zh": "部分画质使用 DASH，视频与音频分别位于 videos[] 和 audios[]。选择两条流下载后，可在兼容时使用 FFmpeg 无重编码合并。",
      "ja": "一部画質は DASH で videos[] と audios[] が分離します。両方を保存し、互換性があれば FFmpeg で再エンコードせず結合します。",
      "es": "Bilibili suele entregar flujos DASH de video y audio separados; también puede devolver portadas y distintas calidades."
    },
    "proxy": {
      "en": "Send Referer: https://www.bilibili.com/, a browser User-Agent, and forwarded Range headers. Signed stream URLs expire and must be refreshed by parsing the original page again.",
      "zh": "下载时携带 Bilibili Referer、浏览器 User-Agent 并透传 Range。签名流过期后需要重新解析原始页面。",
      "ja": "Bilibili Referer、ブラウザー User-Agent、Range を付けます。署名 URL の期限切れ後は元ページを再解析します。",
      "es": "Descarga video y audio desde el backend con Referer de Bilibili, User-Agent y Range. Combina las pistas DASH con FFmpeg cuando estén separadas."
    },
    "limits": {
      "en": "Profiles, favorites, watch-later lists, list pages without one video ID, paid content, DRM media, and region-restricted items are unsupported.",
      "zh": "不支持主页、收藏夹、稍后再看、没有单视频 ID 的列表、付费内容、DRM 媒体和地区受限作品。",
      "ja": "プロフィール、お気に入り、後で見る、単一動画 ID のないリスト、有料、DRM、地域制限コンテンツには対応しません。",
      "es": "No admite Bilibili International/Bstation, listas para ver más tarde, favoritos, perfiles, contenido de pago ni videos bloqueados por región."
    },
    "troubleshooting": {
      "en": [
        "Merge selected DASH video and audio streams before delivery to users.",
        "Always include the Bilibili Referer when fetching signed streams.",
        "Re-parse when a stream returns 403 or its signature expires."
      ],
      "zh": [
        "向用户交付前合并选定的 DASH 视频与音频流。",
        "请求签名流时始终携带 Bilibili Referer。",
        "流返回 403 或签名过期时重新解析。"
      ],
      "ja": [
        "配信前に選択した DASH 動画と音声を結合します。",
        "署名ストリーム取得時は常に Bilibili Referer を付けます。",
        "403 または署名期限切れの場合は再解析します。"
      ],
      "es": [
        "Conserva el bvid, cid y número de parte como texto en el cliente y en la base de datos.",
        "Combina la pista de video elegida con una pista de audio cuando el resultado sea DASH.",
        "No envíes URL de bilibili.tv ni bili.im: corresponden a Bstation y no están admitidas."
      ]
    },
    "mediaKinds": [
      "videos",
      "audios"
    ]
  },
  "xiaohongshu": {
    "h1": {
      "en": "RedNote / Xiaohongshu Video Downloader API",
      "zh": "小红书 / RedNote 视频与图片下载 API",
      "ja": "Xiaohongshu / RedNote 動画・画像ダウンロード API",
      "es": "API de descarga de videos de Xiaohongshu / RedNote"
    },
    "secondaryKeywords": {
      "en": [
        "RedNote download API",
        "Xiaohongshu media API"
      ],
      "zh": [
        "小红书视频下载 API",
        "小红书图片解析 API"
      ],
      "ja": [
        "RedNote 動画取得 API",
        "小紅書 画像 API"
      ],
      "es": [
        "API para descargar videos de Xiaohongshu / RedNote",
        "descargador de Xiaohongshu / RedNote por API"
      ]
    },
    "intro": {
      "en": "xhslink.com and xhslink.cn share URLs are resolved before the note workflow runs. EasyDown maps content media only and avoids mixing author avatars into the downloadable image list.",
      "zh": "xhslink.com 与 xhslink.cn 分享短链会在进入笔记流程前解析完成；EasyDown 只映射作品媒体，不会把作者头像混入可下载图片列表。",
      "ja": "xhslink.com と xhslink.cn の共有 URL をノート処理前に解決し、投稿メディアだけをマッピングして作者アバターを画像一覧に混在させません。",
      "es": "Envía una nota pública o un enlace corto compatible de RedNote/Xiaohongshu. La API devuelve el video y todos los elementos de la galería solicitada."
    },
    "media": {
      "en": "Image notes return every available content image and first-frame candidate. Video notes return mapped videos plus related content images while keeping source order.",
      "zh": "图文笔记返回全部内容图片和首帧候选；视频笔记返回映射后的视频及相关作品图片，并保持源顺序。",
      "ja": "画像ノートは全コンテンツ画像と first-frame 候補を、動画ノートは動画と関連画像を元の順序で返します。",
      "es": "Una nota puede devolver video, portada y todas las imágenes del carrusel, cada elemento como archivo independiente."
    },
    "proxy": {
      "en": "Use Referer: https://www.xiaohongshu.com/ and a browser User-Agent from your backend. Image and video CDNs can enforce anti-hotlinking, cookies, expiring URLs, and regional access.",
      "zh": "后端请求携带小红书 Referer 与浏览器 User-Agent。图片和视频 CDN 可能检查防盗链、Cookie、过期 URL 和地区访问。",
      "ja": "Xiaohongshu Referer とブラウザー User-Agent を付けてバックエンド取得します。CDN のリファラー、Cookie、期限、地域制限に注意します。",
      "es": "Descarga desde el backend con Referer de Xiaohongshu, User-Agent y Range. Conserva los parámetros de las URL firmadas y vuelve a analizar cuando caduquen."
    },
    "limits": {
      "en": "Profiles, search pages, collections, private notes, deleted notes, login-only media, and region-unavailable content are unsupported.",
      "zh": "不支持主页、搜索页、合集、私密笔记、已删除笔记、仅登录可见媒体和地区不可用内容。",
      "ja": "プロフィール、検索、コレクション、非公開・削除済みノート、ログイン限定、地域で利用できない内容には対応しません。",
      "es": "No admite perfiles, búsquedas, colecciones, notas privadas o eliminadas ni enlaces cortos que ya hayan caducado."
    },
    "troubleshooting": {
      "en": [
        "Keep the full note URL when it contains access parameters required by the public page.",
        "Proxy media instead of requesting Xiaohongshu CDNs directly from a browser.",
        "Re-parse short or expired media URLs before retrying a download."
      ],
      "zh": [
        "公开页面需要访问参数时，保留完整笔记 URL。",
        "通过后端代理媒体，不要让浏览器直接请求小红书 CDN。",
        "短链或媒体 URL 过期后重新解析再重试。"
      ],
      "ja": [
        "公開ページに必要なアクセスパラメータを含む完全な URL を保持します。",
        "ブラウザーから CDN を直接呼ばずバックエンドでプロキシします。",
        "短縮 URL やメディア URL が期限切れなら再解析します。"
      ],
      "es": [
        "Resuelve el enlace corto y conserva el note_id como texto antes de guardarlo en caché.",
        "Recorre images[] completo para no perder elementos de una publicación con varias imágenes.",
        "Vuelve a analizar la nota si una URL multimedia firmada ha caducado."
      ]
    },
    "mediaKinds": [
      "images",
      "videos"
    ]
  },
  "douyin": {
    "h1": {
      "en": "Douyin Video Downloader API",
      "zh": "抖音视频下载 API",
      "ja": "Douyin 動画ダウンロード API",
      "es": "API de descarga de videos de Douyin"
    },
    "secondaryKeywords": {
      "en": [
        "Douyin video download API",
        "Douyin photo note API"
      ],
      "zh": [
        "抖音视频解析 API",
        "抖音图文下载 API"
      ],
      "ja": [
        "Douyin 動画取得 API",
        "抖音 画像ノート API"
      ],
      "es": [
        "API para descargar videos de Douyin",
        "descargador de Douyin por API"
      ]
    },
    "intro": {
      "en": "EasyDown keeps the work ID as a string, resolves share URLs when required, and returns the same REST response shape for Douyin video and photo-note content.",
      "zh": "EasyDown 始终按字符串处理作品 ID，在需要时解析分享链接，并用同一 REST 结构返回抖音视频和图文内容。",
      "ja": "作品 ID を文字列として保持し、必要に応じて共有 URL を解決して動画・画像ノートを同じ REST 形式で返します。",
      "es": "Envía una URL pública de video, foto o nota de Douyin, incluida una URL compartida compatible. La API conserva todas las variantes y elementos disponibles."
    },
    "media": {
      "en": "The response can include mapped video qualities, audio, covers, and note images. Supported direct-media URLs avoid an unnecessary upstream post lookup.",
      "zh": "响应可能包含映射后的视频画质、音频、封面和笔记图片；受支持的媒体直链不会进行不必要的作品查询。",
      "ja": "動画画質、音声、カバー、ノート画像を返し、対応するメディア直 URL では不要な投稿検索を行いません。",
      "es": "Puede devolver video, imágenes, audio, portadas y variantes de la CDN que estén disponibles para la publicación."
    },
    "proxy": {
      "en": "Use Referer: https://www.douyin.com/, a browser User-Agent, and forwarded Range headers from a backend proxy. Douyin media signatures are short lived and may require a region with public access.",
      "zh": "后端代理携带抖音 Referer、浏览器 User-Agent 并透传 Range。抖音媒体签名有效期较短，也可能要求可公开访问的服务器地区。",
      "ja": "Douyin Referer、ブラウザー User-Agent、Range を付けてバックエンド取得します。署名は短期間で、公開アクセス可能な地域が必要な場合があります。",
      "es": "Descarga desde el backend con Referer de Douyin, User-Agent y Range. Algunas URL dependen de la región, cookies o firmas temporales."
    },
    "limits": {
      "en": "Profiles without a work ID, search results, follow pages, collections, live pages, private content, deleted works, and region-unavailable media are unsupported.",
      "zh": "不支持不含作品 ID 的主页、搜索结果、关注页、合集、直播、私密内容、已删除作品和地区不可用媒体。",
      "ja": "作品 ID のないプロフィール、検索、フォロー、コレクション、ライブ、非公開・削除済み作品、地域制限メディアには対応しません。",
      "es": "No admite perfiles, búsquedas, colecciones, páginas de seguimiento, directos, publicaciones privadas ni enlaces compartidos caducados."
    },
    "troubleshooting": {
      "en": [
        "Resolve v.douyin.com share links before storing a canonical work URL.",
        "Forward Range for large video responses.",
        "Re-parse immediately after a signed URL returns 403 or 404."
      ],
      "zh": [
        "v.douyin.com 分享链接解析后再保存标准作品 URL。",
        "大视频响应需要透传 Range。",
        "签名 URL 返回 403 或 404 后立即重新解析。"
      ],
      "ja": [
        "v.douyin.com の共有 URL を解決してから標準作品 URL を保存します。",
        "大きな動画では Range を転送します。",
        "署名 URL が 403/404 の場合はすぐに再解析します。"
      ],
      "es": [
        "Resuelve el enlace compartido antes de guardar el aweme_id o la URL final.",
        "Comprueba videos[], images[] y audios[] porque el tipo de publicación cambia la respuesta.",
        "Vuelve a analizar si una URL firmada caduca o la región del backend no puede acceder al contenido."
      ]
    },
    "mediaKinds": [
      "images",
      "videos",
      "audios"
    ]
  },
  "kuaishou": {
    "h1": {
      "en": "Kuaishou / Kwai Video Downloader API",
      "zh": "快手 / Kwai 视频下载 API",
      "ja": "Kuaishou / Kwai 動画ダウンロード API",
      "es": "API de descarga de videos de Kuaishou / Kwai"
    },
    "secondaryKeywords": {
      "en": [
        "Kuaishou video download API",
        "Kwai download API"
      ],
      "zh": [
        "快手视频解析 API",
        "Kwai 视频下载 API"
      ],
      "ja": [
        "Kuaishou 動画取得 API",
        "Kwai ダウンロード API"
      ],
      "es": [
        "API para descargar videos de Kuaishou / Kwai",
        "descargador de Kuaishou / Kwai por API"
      ]
    },
    "intro": {
      "en": "Share links are resolved to a photo ID when possible, then normalized video, cover, dimension, and duration fields are returned without provider-specific response objects.",
      "zh": "分享链接会尽量解析为 photo ID，再返回统一的视频、封面、尺寸和时长字段，不暴露三方特有响应结构。",
      "ja": "共有 URL を可能な限り photo ID に解決し、プロバイダー固有形式を隠して動画、カバー、サイズ、再生時間を返します。",
      "es": "Envía una URL pública de foto o video de Kuaishou/Kwai, o un texto compartido que contenga un enlace compatible. La API selecciona la publicación solicitada."
    },
    "media": {
      "en": "Every available public video URL and content cover is returned, with dimensions and duration when the source exposes them.",
      "zh": "返回公开作品的全部可用视频 URL 和内容封面，并在源站提供时保留尺寸与时长。",
      "ja": "公開作品の動画 URL とコンテンツカバーをすべて返し、取得できる場合はサイズと再生時間も含めます。",
      "es": "Las publicaciones individuales accesibles devuelven el archivo de video y la información disponible de portada o calidad."
    },
    "proxy": {
      "en": "Use Referer: https://www.kuaishou.com/, a browser User-Agent, and forwarded Range headers. Proxy large video files as streams rather than loading them fully into server memory.",
      "zh": "后端携带快手 Referer、浏览器 User-Agent 并透传 Range；大视频应流式代理，不要完整载入服务器内存。",
      "ja": "Kuaishou Referer、ブラウザー User-Agent、Range を付け、大きな動画はメモリに全読み込みせずストリーミングします。",
      "es": "Descarga desde el backend con Referer de Kuaishou, User-Agent y Range. Conserva la consulta de las URL firmadas y vuelve a analizar después de su vencimiento."
    },
    "limits": {
      "en": "Profiles, live rooms, search pages, collections, private works, deleted works, expired share tokens, and region-unavailable videos are unsupported.",
      "zh": "不支持主页、直播间、搜索、合集、私密作品、已删除作品、过期分享 Token 和地区不可用视频。",
      "ja": "プロフィール、ライブ、検索、コレクション、非公開・削除済み作品、期限切れ共有 token、地域制限動画には対応しません。",
      "es": "No admite directos, perfiles, búsquedas, colecciones, videos privados o eliminados ni tokens compartidos caducados."
    },
    "troubleshooting": {
      "en": [
        "Submit the share text or full URL when a short token is used.",
        "Stream large videos and forward Range for resume support.",
        "Re-parse when a resolved photo URL expires."
      ],
      "zh": [
        "使用短 Token 时提交完整 URL 或分享文案。",
        "大视频使用流式传输并透传 Range，以支持续传。",
        "解析后的作品 URL 过期时重新解析。"
      ],
      "ja": [
        "短い token の場合は完全な URL または共有テキストを送信します。",
        "大きな動画は Range を転送してストリーミングします。",
        "解決済み作品 URL が期限切れなら再解析します。"
      ],
      "es": [
        "Resuelve el enlace corto antes de guardar photoId o la URL final en caché.",
        "Conserva todos los parámetros de la URL del video al transmitirla desde el backend.",
        "Los enlaces `/f/{id}` de reproducción de directos no están admitidos y no deben enviarse a la API."
      ]
    },
    "mediaKinds": [
      "videos"
    ]
  },
  "weibo": {
    "h1": {
      "en": "Weibo Video Downloader API",
      "zh": "微博视频与图片下载 API",
      "ja": "Weibo 動画・画像ダウンロード API",
      "es": "API de descarga de videos de Weibo"
    },
    "secondaryKeywords": {
      "en": [
        "Weibo video download API",
        "Weibo image API"
      ],
      "zh": [
        "微博视频解析 API",
        "微博图片下载 API"
      ],
      "ja": [
        "Weibo 動画取得 API",
        "Weibo 画像ダウンロード API"
      ],
      "es": [
        "API para descargar videos de Weibo",
        "descargador de Weibo por API"
      ]
    },
    "intro": {
      "en": "Desktop, mobile status/detail, visitor, and t.cn links use the post workflow. Weibo video-show links with a 1034 object ID first use the public component endpoint and only enter the existing post fallbacks when component media is unavailable.",
      "zh": "桌面正文、移动 status/detail、访客页和 t.cn 链接走正文流程；包含 1034 object ID 的微博视频页优先调用公开组件接口，仅在组件没有媒体时进入原有正文兜底。",
      "ja": "デスクトップ、mobile status/detail、visitor、t.cn は投稿フローを使い、1034 object ID を持つ動画ページは公開 component API を優先し、メディアがない場合だけ投稿フォールバックを使います。",
      "es": "Envía una URL de estado, detalle, visitante o t.cn de Weibo. La API conserva las calidades de video y todas las imágenes de la publicación solicitada."
    },
    "media": {
      "en": "Video posts and component video pages keep every available playback quality and cover. Image posts return every original image discovered in the target gallery.",
      "zh": "视频微博和组件视频页保留全部可用播放清晰度与封面；图片微博返回目标图集中的全部原图。",
      "ja": "動画投稿と component 動画ページは利用可能な画質とカバーを保持し、画像投稿は対象ギャラリーの元画像をすべて返します。",
      "es": "Puede devolver varias calidades de video, portadas, fotos individuales y todos los archivos de una galería."
    },
    "proxy": {
      "en": "The EasyDown website routes every Weibo media download through its proxy. REST clients should likewise use a backend proxy with a Weibo Referer, browser User-Agent, and forwarded Range header, then re-parse expired source URLs.",
      "zh": "EasyDown 网页端会让所有微博媒体下载统一走代理；REST 客户端也应通过后端代理携带微博 Referer、浏览器 User-Agent 并透传 Range，源 URL 过期后重新解析。",
      "ja": "EasyDown Web は全 Weibo メディアをプロキシします。REST クライアントも Weibo Referer、ブラウザー User-Agent、Range を付けたバックエンドプロキシを使い、期限切れ URL は再解析してください。",
      "es": "Descarga siempre desde el backend con Referer de Weibo, User-Agent y Range. Vuelve a analizar cuando caduque la firma de una imagen o un video."
    },
    "limits": {
      "en": "Profiles, personal video tabs, search pages, topics, super topics, articles, live pages, collections, private posts, and deleted posts are unsupported.",
      "zh": "不支持主页、个人全部视频页、搜索、话题、超话、文章、直播、合集、私密和已删除帖子。",
      "ja": "プロフィール、個人動画タブ、検索、トピック、超話、記事、ライブ、コレクション、非公開・削除済み投稿には対応しません。",
      "es": "No admite perfiles, temas, supertemas, directos, artículos, colecciones, publicaciones privadas o eliminadas ni enlaces caducados."
    },
    "troubleshooting": {
      "en": [
        "Normalize t.cn links before caching a post identifier.",
        "Choose a playback entry by quality metadata rather than relying on array order.",
        "Re-parse image or video URLs after the source signature expires."
      ],
      "zh": [
        "缓存帖子标识前先解析 t.cn 短链。",
        "按画质元数据选择播放项，不要依赖数组顺序。",
        "图片或视频源签名过期后重新解析。"
      ],
      "ja": [
        "t.cn URL を解決してから投稿 ID を保存します。",
        "配列順ではなく画質メタデータで再生候補を選びます。",
        "画像・動画 URL の署名期限切れ後は再解析します。"
      ],
      "es": [
        "Resuelve las URL t.cn antes de guardar el identificador de la publicación.",
        "Elige la reproducción por sus metadatos de calidad y no por el orden del array.",
        "Vuelve a analizar después de que caduque la firma de una imagen o un video."
      ]
    },
    "mediaKinds": [
      "images",
      "videos"
    ]
  },
  "toutiao": {
    "h1": {
      "en": "Toutiao Video Downloader API",
      "zh": "今日头条视频下载 API",
      "ja": "Toutiao 動画ダウンロード API",
      "es": "API de descarga de videos de Toutiao"
    },
    "secondaryKeywords": {
      "en": [
        "Toutiao download API",
        "Toutiao video parser API"
      ],
      "zh": [
        "今日头条视频解析 API",
        "头条视频下载接口"
      ],
      "ja": [
        "Toutiao 動画取得 API",
        "Toutiao 動画解析 API"
      ],
      "es": [
        "API para descargar videos de Toutiao",
        "descargador de Toutiao por API"
      ]
    },
    "intro": {
      "en": "The numeric-looking group ID stays a string through the REST workflow so large identifiers cannot lose precision before the Toutiao video lookup.",
      "zh": "看似数字的 group ID 在整个 REST 流程中始终保持字符串，避免调用头条视频查询前丢失大整数精度。",
      "ja": "数字に見える group ID を REST フロー全体で文字列として保持し、動画検索前の精度損失を防ぎます。",
      "es": "Envía una URL pública `/video/{id}` de Toutiao. La API mantiene el group ID como texto para evitar pérdida de precisión y devuelve flujos principales y alternativos."
    },
    "media": {
      "en": "Every video-list item can contribute both main and backup URLs. First frames, covers, and content thumbnails remain available in images[] for product previews.",
      "zh": "video_list 每一项都可能贡献主、备用 URL；首帧、封面和内容缩略图保留在 images[] 中供产品预览。",
      "ja": "video_list 各項目の main・backup URL を返し、first frame、カバー、コンテンツ画像はプレビュー用に images[] に保持します。",
      "es": "Puede devolver flujos de video principales y alternativos, primera imagen, portada y miniaturas del contenido."
    },
    "proxy": {
      "en": "Use Referer: https://www.toutiao.com/, a browser User-Agent, and forwarded Range headers. Stream the selected main or backup URL from your backend and re-parse after expiration.",
      "zh": "后端携带今日头条 Referer、浏览器 User-Agent 并透传 Range，流式代理所选主或备用 URL，过期后重新解析。",
      "ja": "Toutiao Referer、ブラウザー User-Agent、Range を付け、選択した main・backup URL をバックエンドでストリーミングし、期限切れ後は再解析します。",
      "es": "Descarga desde el backend con Referer de Toutiao, User-Agent y Range. Transmite la URL principal o alternativa y vuelve a analizar cuando caduque."
    },
    "limits": {
      "en": "Articles, group pages, profiles, search pages, channels, short links, live pages, private content, and URLs without one video ID are unsupported.",
      "zh": "不支持文章、group 页面、主页、搜索、频道、短链、直播、私密内容和不含单视频 ID 的链接。",
      "ja": "記事、group、プロフィール、検索、チャンネル、短縮 URL、ライブ、非公開、単一動画 ID のない URL には対応しません。",
      "es": "No admite artículos, páginas group, perfiles, búsquedas, canales, enlaces cortos, directos ni URLs sin un único ID de video."
    },
    "troubleshooting": {
      "en": [
        "Keep the group ID as a string in JavaScript and database columns.",
        "Try a backup URL when the selected main stream is unavailable.",
        "Submit a `/video/{id}` page rather than an article or group URL."
      ],
      "zh": [
        "在 JavaScript 和数据库字段中始终把 group ID 保存为字符串。",
        "所选主视频流不可用时尝试备用 URL。",
        "提交 `/video/{id}` 页面，不要提交文章或 group URL。"
      ],
      "ja": [
        "group ID は JavaScript とデータベースで文字列として保持します。",
        "main ストリームが利用できない場合は backup URL を試します。",
        "記事や group ではなく `/video/{id}` ページを送信します。"
      ],
      "es": [
        "Guarda el group ID como texto tanto en JavaScript como en la base de datos.",
        "Prueba una URL alternativa si el flujo principal seleccionado no está disponible.",
        "Envía una página `/video/{id}`, no una URL de artículo o de grupo."
      ]
    },
    "mediaKinds": [
      "images",
      "videos"
    ]
  }
};

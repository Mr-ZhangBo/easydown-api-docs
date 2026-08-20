import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName } from './shared';
import { localizedPath } from './i18n';
import { Braces, ExternalLink } from 'lucide-react';

export function baseOptions(lang = 'en'): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold">
          <span className="flex size-7 items-center justify-center rounded-md bg-emerald-700 text-white">
            <Braces className="size-4" aria-hidden="true" />
          </span>
          {appName}
        </span>
      ),
      url: localizedPath(lang),
    },
    links: [
      {
        type: 'main',
        text: 'EasyDown',
        url: 'https://easydown.org',
        external: true,
      },
      {
        type: 'icon',
        text: 'OpenAPI',
        label: 'OpenAPI 3.1 JSON',
        url: 'https://api.easydown.org/openapi.json',
        external: true,
        icon: <ExternalLink className="size-4" aria-hidden="true" />,
      },
    ],
  };
}

'use client';

import { useEffect, useRef } from 'react';
import openapi from '@/generated/openapi.json';
import { SafeTryIt } from './safe-try-it';
import { createOpenAPIPage } from 'fumadocs-openapi/ui';

const OpenAPIPage = createOpenAPIPage({
  showResponseSchema: true,
  schemaUI: { showExample: true },
  playground: {
    provider: ({ children }) => children,
    render: (props) => <SafeTryIt {...props} />,
  },
});

export function ApiReference({ path }: { path: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const labelIconButtons = () => {
      root.querySelectorAll<HTMLButtonElement>('button').forEach((button) => {
        if (button.getAttribute('aria-label') || button.textContent?.trim()) return;
        const fieldName = button.closest('tr')?.querySelector('code')?.textContent?.trim();
        button.setAttribute(
          'aria-label',
          fieldName ? `Copy link to ${fieldName} schema field` : 'Copy link to schema field',
        );
      });
    };

    labelIconButtons();
    const observer = new MutationObserver(labelIconButtons);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [path]);

  return (
    <div ref={rootRef}>
      <OpenAPIPage
        document="easydown"
        payload={{ bundled: openapi as never }}
        operations={[{ path, method: 'post' }]}
        showTitle={false}
        showDescription={false}
      />
    </div>
  );
}

'use client';

import { Copy } from 'lucide-react';
import type { ReactNode } from 'react';
import React, { useState } from 'react';

type CodeBlockProps = {
  children: ReactNode;
};

const CodeBlock = ({ children }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!children) return;
    const codeToCopy = children.toString();
    navigator.clipboard.writeText(codeToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="relative">
      <pre className="rounded-lg bg-gray-800 p-4 text-white">
        <code>{children}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded bg-gray-600 p-1 text-white hover:bg-gray-700"
        title="Copy to clipboard"
      >
        {copied ? 'Copied!' : <Copy />}
      </button>
    </div>
  );
};

export { CodeBlock };

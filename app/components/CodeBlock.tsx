"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function CodeBlock({ code }: { code: string }) {
    return (
        <div className="rounded-lg overflow-hidden border">
            <SyntaxHighlighter language="tsx" style={vscDarkPlus}>
                {code}
            </SyntaxHighlighter>
        </div>
    );
}

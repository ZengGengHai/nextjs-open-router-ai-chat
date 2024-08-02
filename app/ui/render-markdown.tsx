import remarkGfm from "remark-gfm"; // 划线、表、任务列表和直接url等的语法扩展
import rehypeRaw from "rehype-raw"; // 解析标签，支持html语法
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";

interface RenderMarkdownProps {
  markdown: string;
}

export const RenderMarkdown = (props: RenderMarkdownProps) => {
  const { markdown } = props;
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ className, children, ref, ...rest }) {
          const match = /language-(\w+)/.exec(className || "");
          const isWord = !(children as string).includes("\n");

          return !isWord ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              language={match?.[1] ?? ""}
              style={vscDarkPlus}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code {...rest} ref={ref} className={"font-bold"}>
              `{children}`
            </code>
          );
        },
      }}
    >
      {markdown}
    </Markdown>
  );
};

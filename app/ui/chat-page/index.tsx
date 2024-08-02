"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { postAi } from "@/app/api/ai/ai";
import { Role, ContentStatus } from "@/app/api/ai/types";
import { ChatInput } from "./chat-input";
import { ChatContent } from "./chat-content";
import { ChatAiKeyDialog } from "@/app/ui/dialog/chat-ai-key-dialog";
import { useAiKeyCheck } from "@/app/hooks/useAiKeyCheck";

interface ChatContentProps {
  id: string;
  role: Role;
  content: string;
  status: ContentStatus;
}

export default function ChatPage() {
  const { aiKey, open, setOpen } = useAiKeyCheck();
  const [inputValue, setInputValue] = useState<string>("");
  const [chatContents, setChatContents] = useState<ChatContentProps[]>([
    {
      id: "1",
      content:
        "我是来自 OpenRouter （https://openrouter.ai/） 中免费模型 “Mistral 7B Instruct” 实现 Ai 对话，欢迎体验，项目地址为 https://github.com/ZengGengHai/nextjs-open-router-ai-chat  ",
      status: "success",
      role: "assistant",
    },
  ]);

  const chatContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(localStorage, "dd");
    let aiKey = localStorage.getItem("aiKey");
    if (aiKey) {
    }
  }, []);

  const handleInputClick = useCallback(async () => {
    if (!aiKey) {
      setOpen(true);
      return;
    }
    setInputValue("");
    const userId = `${Date.now()}-user`;
    const assistantId = `${Date.now()}-assistant`;
    setChatContents((prev) => [
      ...prev,
      {
        id: userId,
        role: "user" as Role,
        content: inputValue,
        status: "success" as ContentStatus,
      },
      {
        id: assistantId,
        role: "assistant" as Role,
        content: "...",
        status: "loading" as ContentStatus,
      },
    ]);

    const scrollHeight = chatContentRef.current?.scrollHeight ?? 0;
    const clientHeight = chatContentRef.current?.clientHeight ?? 0;
    if (scrollHeight > clientHeight) {
      chatContentRef.current?.scrollTo({ top: scrollHeight + 500 });
    }
    await postAi({
      content: inputValue,
    }).then((data) => {
      setChatContents((prev) => {
        return prev.map((i) => {
          if (i.id === assistantId) {
            return {
              ...i,
              content: data?.data?.choices?.[0]?.message?.content ?? "",
              status: "success" as ContentStatus,
            };
          }
          return i;
        });
      });
    });
  }, [aiKey, inputValue, setOpen]);

  return (
    <div className="max-w-6xl mx-auto h-full bg-white">
      <div className="p-4 h-full flex flex-col gap-4">
        <div
          id="chat-contents"
          className="flex-1 overflow-y-scroll overflow-hidden scrollable-element"
          ref={chatContentRef}
        >
          {chatContents.map((i, index) => {
            return (
              <ChatContent
                role={i.role}
                content={i.content}
                key={index}
                id={i.id}
                status={i.status}
              />
            );
          })}
          <div className="h-[40%] opacity-0" />
        </div>
        <ChatInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          handleInputClick={handleInputClick}
        />
      </div>

      <ChatAiKeyDialog open={open} setOpen={setOpen} />
    </div>
  );
}

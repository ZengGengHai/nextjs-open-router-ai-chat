"use client";

import { useEffect, useState } from "react";

/** 检查用户是否填写 aiKey 以及唤起弹窗操作 */
export function useAiKeyCheck() {
  const [open, setOpen] = useState(false);

  const aiKey =
    typeof window !== "undefined" ? window.localStorage?.getItem("aiKey") : "";

  useEffect(() => {
    if (!aiKey) {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    aiKey,
    open,
    setOpen,
  };
}

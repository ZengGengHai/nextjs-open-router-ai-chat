import { useMemo } from "react";
import { ContentStatus, Role } from "@/app/api/ai/types";
import { SupportAgent, Person, Refresh } from "@mui/icons-material";
import cx from "classnames";
import { RenderMarkdown } from "@/app/ui/render-markdown";

interface ChatContentProps {
  role: Role;
  content: string;
  id: string;
  status: ContentStatus;
}

export const ChatContent = (props: ChatContentProps) => {
  const { role, content, id, status } = props;

  const isOwner = useMemo(() => {
    return role === "user";
  }, [role]);

  return (
    <div className="flex flex-row w-full gap-4 py-2" id={id}>
      <div id="role-icon">
        <div
          className={cx(
            "w-10 h-10 rounded-full flex justify-center items-center",
            isOwner ? "bg-yellow-400" : "bg-green-600"
          )}
        >
          {isOwner ? <Person /> : <SupportAgent />}
        </div>
      </div>
      <div id="role-content">
        <div id="role-name" className="font-extrabold text-lg">
          {isOwner ? "You" : "Assistant"}
        </div>
        <div id="content" className="text-ellipsis">
          {status === "loading" ? (
            <Refresh className="animate-spin" />
          ) : (
            <RenderMarkdown markdown={content} />
          )}
        </div>
      </div>
    </div>
  );
};

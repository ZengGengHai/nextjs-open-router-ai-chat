import { AxiosResponse } from "axios";
import { instance } from "../instance";
import { IOpenRouterAi } from "./types";

export async function postAi({
  content,
}: {
  content: string;
}): Promise<AxiosResponse<IOpenRouterAi>> {
  return instance.post(
    "/v1/chat/completions",
    {
      model: "mistralai/mistral-7b-instruct:free",
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("aiKey")}`,
        // Authorization: `Bearer ${process.env.NEXT_PUBLIC_AI_KEY}`,
        "X-Title": "chatbot-key",
      },
    }
  );
}

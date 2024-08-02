export type ContentStatus = "success" | "loading";

export type Role = "assistant" | "user";

interface IChoice {
  message: {
    role: Role;
    content: string;
  };
}

export interface IOpenRouterAi {
  choices: IChoice[];
  crated: number;
  id: string;
  model: string;
}

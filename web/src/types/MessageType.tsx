export type Message = {
  id: string;
  text: string;
  user_id: string;
  user: {
    id: string;
    github_id: string;
    name: string;
    avatar_url: string;
  };
};

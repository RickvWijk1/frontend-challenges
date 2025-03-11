export interface Notification {
    id: number;
    user_name: string;
    title: string;
    description: string;
    message: string;
    timestamp: string;
    quote: string;
    read: boolean;
    image: string;
    reactToImage: string | null;
  }
export interface Agent {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  mobile?: string;
  languages: string[];
  imageUrl: string;
  bio: string;
}

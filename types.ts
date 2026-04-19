
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  image: string;
  category: 'AI' | 'Business Analysis' | 'Engineering';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Technical' | 'Analytical' | 'Tools';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

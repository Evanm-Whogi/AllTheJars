declare module "*.md" {
    const content: string;
    export default content;
}

export interface jarType {
  id?: number;
  type: string;
  category: string;
  name: string;
  version: string;
  releaseTime?: Date | null;
  javaVersion: string;
  jar: string;
  downloads: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Event Register
declare global {
  interface Window {
    tianji?: {
      track: (event: string, data?: Record<string, any>) => void;
    };
  }
}


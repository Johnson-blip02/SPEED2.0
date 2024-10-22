// types/ModerationArticle.ts
export interface ModerationArticle {
  _id: string; // MongoDB generated ID
  title: string;
  author: string;
  date: string;
  content: string;
  tags: string[];
  isApproved: boolean;
  isAnalysis: boolean;
}

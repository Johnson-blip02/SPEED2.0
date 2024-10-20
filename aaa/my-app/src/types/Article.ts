// types/Article.ts
export interface Article {
  id: number; // Assuming id is a number
  title: string;
  author: string;
  date: Date; // Use Date type for date
  content: string;
  tags: string[]; // Array of strings for tags
  isApproved: boolean; // Boolean for approval status
  isAnalysis: Boolean;
  rating: number; // Assuming rating is a number
}

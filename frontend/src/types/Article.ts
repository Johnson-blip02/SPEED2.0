export interface Article {
  _id: string; // MongoDB ObjectId represented as a string
  id: number; // Assuming you also have a custom numeric ID
  title: string;
  author: string;
  date: Date; // Use Date type for date
  content: string;
  tags: string[]; // Array of strings for tags
  isApproved: boolean; // Boolean for approval status
  isAnalysis: boolean; // Fixed casing for boolean type
  rating: number; // Assuming rating is a number
}

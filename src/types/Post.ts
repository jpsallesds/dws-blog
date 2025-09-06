import type { Author } from "./Author";
import type { Category } from "./Category";

export type Post = {
  id: string;
  title: string;
  content: string;
  thumbnail_url: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
  author: Author;
}
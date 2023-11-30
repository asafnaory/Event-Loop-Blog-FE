export type BlogResponse  = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  content: string;
  categories: string[];
};

export enum Category {
  JAVASCRIPT,
  TYPESCRIPT,
  NESTJS,
  REACTJS,
  NODEJS,
}
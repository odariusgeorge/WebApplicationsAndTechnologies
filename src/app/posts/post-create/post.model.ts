export interface Post {
  id: string;
  title: string;
  content: string;
  imagePath: string;
  creator: string;
  university: string;
  course: string;
  author: string;
  messages: Array<string>;
  startingPrice: number;
  minimumAllowedPrice: number;
  winner: string;
  date: Date;
}

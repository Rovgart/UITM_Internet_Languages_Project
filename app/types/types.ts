export type Book = {
  _id: number;
  author: string;
  bookformat: string;
  desc: string;
  genre: string;
  img: string;
  link: string;
  pages: number;
  rating: number;
  reviews: number;
  title: string;
  totalratings: number;
};
export type BestsellersResponse = {
  id: number;
  title: string;
  description: string;
  img: string;
  genre: string[];
  author: string;
};
export type RegisterResponse = {
  email: string;
  password: string;
};

export type Token = {
  access_token: string;
  refresh_token: string;
};
export type TrendingAuthorsT = {
  totalReviews: number;
  authorName: string;
};
export type followingAuthorsT = {
  authorId: number;
  authorName: string;
  authorImage: string;
};

export type Presenter = {
  _id: string;
  name: string;
  department: string;
  isFeatured: boolean;
  image: string;
  bio: string;
};

export type Session = {
  _id: string;
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
  date: string;
  speakers: Presenter[];
  link: string;
  thumbnail: string;
  isPublished: boolean;
  sortOrder: number;
};

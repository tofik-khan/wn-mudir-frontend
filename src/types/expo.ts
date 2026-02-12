import { Dayjs } from "dayjs";

export type Presenter = {
  _id: string;
  name: string;
  department: string;
  isFeatured: boolean;
  isPublished: boolean;
  image: string;
  bio: string;
};

export type Session = {
  _id: string;
  title: string;
  description: string;
  location: string;
  startTime: Dayjs;
  endTime: Dayjs;
  date: string;
  presenters: { label: string; value: string }[];
  link: string;
  thumbnail: string;
  isPublished: boolean;
};

export type FAQ = {
  _id: string;
  title: string;
  content: string;
  isPublished: boolean;
};

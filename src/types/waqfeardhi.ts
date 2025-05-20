export type Project = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  audience: string;
  sponsor: {
    name: string;
    email: string;
    department: string;
  };
  slug: string;
  badge?: string;
  published: boolean;
  thumbnail: string;
  createdBy: string;
  createdAt: string;
  editedBy: string;
  editedAt: string;
};

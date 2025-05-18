export type Project = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  audience: string;
  sponsor: {
    name: string;
    email: string;
    department: string;
  };
  slug: string;
  badge?: string;
  published: boolean;
  createdBy: string;
  createdAt: string;
  editedBy: string;
  editedAt: string;
};

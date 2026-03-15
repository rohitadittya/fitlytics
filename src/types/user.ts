export enum UserRole {
  ROLE_USER = "ROLE_USER",
  ROLE_ADMIN = "ROLE_ADMIN"
};

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other"
};

export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: Gender;
  height: number;
  weight: number;
  image: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
};
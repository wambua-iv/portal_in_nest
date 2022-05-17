export enum AccountType {
  lecturer = 'Lecturer',
  student = 'Student',
  admin = 'Administrator',
}

export interface UserReturnType {
  name: { firstname: string; lastname: string };
  user_Id: string;
  email: string;
  role: string;
}

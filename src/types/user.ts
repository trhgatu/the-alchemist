export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  status: 'active' | 'inactive';
  gender: 'male' | 'female' | 'other';
  emailVerified: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  birthDate?: string;
  roleId: {
    _id: string;
    name: string;
  };
}

import { Types } from 'mongoose';

export type TManagerName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TManager = {
  user: Types.ObjectId;
  name: TManagerName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  address: string;
  profileImage?: string;
  managerOfBranch: Types.ObjectId;
  isDeleted: boolean;
};

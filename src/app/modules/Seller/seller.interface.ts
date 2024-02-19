import { Types } from 'mongoose';

export type TSellerName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TSeller = {
  user: Types.ObjectId;
  name: TSellerName;
  gender: 'male' | 'female' | 'other';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  location: {
    country: string;
    city: string;
    home: string;
  };
  profileImage?: string;
  isDeleted: boolean;
};

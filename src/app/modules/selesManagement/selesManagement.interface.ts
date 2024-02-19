import { Types } from 'mongoose';

export type TSelsManagement = {
  sellerId: Types.ObjectId;
  nameOfBuyer: string;
  productId: Types.ObjectId;
  selsDate: string;
  quantity: number;
};

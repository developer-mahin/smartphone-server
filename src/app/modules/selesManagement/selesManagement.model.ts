import { Schema, model } from 'mongoose';
import { TSelsManagement } from './selesManagement.interface';

const SelsManagementSchema = new Schema<TSelsManagement>(
  {
    nameOfBuyer: {
      type: String,
      required: [true, 'nameOfBuyer filed is required'],
    },
    productId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Product ID is required'],
      ref: 'Product',
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      required: [true, 'currentUserId is required'],
      ref: 'User',
    },
    selsDate: {
      type: String,
      required: [true, 'Sales date is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
  },
  { timestamps: true },
);

const SelsManagement = model<TSelsManagement>(
  'SelsManagement',
  SelsManagementSchema,
);

export default SelsManagement;

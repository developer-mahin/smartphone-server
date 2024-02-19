import { Schema, model } from 'mongoose';
import { TSeller, TSellerName } from './seller.interface';

const sellerNameSchema = new Schema<TSellerName>({
  firstName: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true,
  },
});

const sellerSchema = new Schema<TSeller>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required.'],
      ref: 'User',
    },
    name: {
      type: sellerNameSchema,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is required.'],
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required.'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required.'],
    },
    location: {
      country: {
        type: String,
        required: [true, 'Country is required.'],
      },
      city: {
        type: String,
        required: [true, 'City is required.'],
      },
      home: {
        type: String,
        required: [true, 'Home address is required.'],
      },
    },
    profileImage: { type: String, default: '' },
    isDeleted: {
      type: Boolean,
      required: [true, 'Deletion status is required.'],
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

sellerSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this?.name?.middleName ? this?.name?.middleName : ''} ${this.name.lastName}`;
});

sellerSchema.pre('find', async function (next) {
  this.find({
    isDeleted: { $ne: true },
  });
  next();
});

sellerSchema.pre('findOne', async function (next) {
  this.findOne({
    isDeleted: { $ne: true },
  });

  next();
});

const Seller = model<TSeller>('Seller', sellerSchema);
export default Seller;

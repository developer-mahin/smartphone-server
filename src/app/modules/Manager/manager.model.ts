import { Schema, model } from 'mongoose';
import { TManager, TManagerName } from './manager.interface';

const managerNameSchema = new Schema<TManagerName>({
  firstName: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
});

const managerSchema = new Schema<TManager>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required'],
      ref: 'User',
    },
    name: {
      type: managerNameSchema,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: {
      type: String,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },

    address: {
      type: String,
      required: [true, ' address is required'],
    },

    profileImage: { type: String, default: '' },
    managerOfBranch: {
      type: Schema.Types.ObjectId,
      required: [true, 'Branch is required'],
      ref: 'Branch',
    },

    isDeleted: { type: Boolean, default: false },
  },

  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

managerSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this?.name?.middleName ? this?.name?.middleName : ''} ${this.name.lastName}`;
});

managerSchema.pre('find', async function (next) {
  this.find({
    isDeleted: { $ne: true },
  });
  next();
});

managerSchema.pre('findOne', async function (next) {
  this.findOne({
    isDeleted: { $ne: true },
  });

  next();
});

const Manager = model<TManager>('Manager', managerSchema);
export default Manager;

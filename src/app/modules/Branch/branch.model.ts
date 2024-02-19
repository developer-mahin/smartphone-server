import { Schema, model } from 'mongoose';
import { TBranch } from './branch.interface';

const branchSchema = new Schema<TBranch>(
  {
    branchName: {
      type: String,
      required: [true, 'Branch  name is required'],
      unique: true,
    },
    branchLocation: {
      type: String,
      required: [true, 'branchLocation  is required'],
    },
    isDeleted: { type: Boolean, default: false },
  },

  {
    timestamps: true,
  },
);

branchSchema.pre('find', async function (next) {
  this.find({
    isDeleted: { $ne: true },
  });
  next();
});

branchSchema.pre('findOne', async function (next) {
  this.findOne({
    isDeleted: { $ne: true },
  });

  next();
});

const Branch = model<TBranch>('Branch', branchSchema);
export default Branch;

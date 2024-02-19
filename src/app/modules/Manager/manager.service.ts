import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../utils/AppError';
import QueryBuilder from '../../utils/QueryBuilder';
import User from '../user/user.model';
import { TManager } from './manager.interface';
import Manager from './manager.model';

const getAllManagers = async (query: Record<string, unknown>) => {
  const searchableField = ['email', 'name.firstName', 'presentAddress'];

  const faculTyQuery = new QueryBuilder(
    Manager.find({}).populate('user').populate('managerOfBranch'),
    query,
  )
    .search(searchableField)
    .filter();

  const result = await faculTyQuery.queryModel;
  const meta = await faculTyQuery.countTotal();

  return { meta, result };
};

const getSingleManager = async (id: string) => {
  const result = await Manager.findById(id).populate('user');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found with this id');
  }

  return result;
};

const updateManager = async (id: string, payload: Partial<TManager>) => {
  const isExist = await Manager.findById(id);
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid ID');
  }
  if (!payload) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found');
  }

  const { name, ...remainingData } = payload;
  const updatedData: Record<string, unknown> = {
    ...remainingData,
  };

  if (name && Object.values(name).length) {
    for (const [key, value] of Object.entries(name)) {
      updatedData[`name.${key}`] = value;
    }
  }

  const result = await Manager.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteManager = async (id: string) => {
  const isExist = await Manager.findById(id);

  const isExistUser = await User.exists({ email: isExist?.email });
  if (!isExist || !isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid ID');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const manager = await Manager.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );
    if (!manager) {
      throw new AppError(httpStatus.NOT_FOUND, 'Failed to delete student');
    }

    const user = await User.findOneAndUpdate(
      { email: isExist?.email },
      { isDeleted: true },
      { new: true, session },
    );
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const managerServices = {
  getAllManagers,
  getSingleManager,
  updateManager,
  deleteManager,
};

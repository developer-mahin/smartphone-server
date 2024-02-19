import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import QueryBuilder from '../../utils/QueryBuilder';
import { TBranch } from './branch.interface';
import Branch from './branch.model';

const createBranch = async (payload: TBranch) => {
  const checkAlreadyExist = await Branch.findOne({
    branchName: payload.branchName,
  });
  if (checkAlreadyExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This brunch is already exist');
  }

  const result = await Branch.create(payload);
  return result;
};

const getAllBranches = async (query: Record<string, unknown>) => {
  const searchableField = ['branchName'];

  const branchQuery = new QueryBuilder(Branch.find({}), query)
    .search(searchableField)
    .filter();

  const result = await branchQuery.queryModel;
  const meta = await branchQuery.countTotal();

  return { meta, result };
};

const getSingleBranch = async (id: string) => {
  const result = await Branch.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found with this id');
  }

  return result;
};

const updateBranch = async (id: string, payload: Partial<TBranch>) => {
  const isExist = await Branch.findById(id);
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid ID');
  }
  if (!payload) {
    throw new AppError(httpStatus.NOT_FOUND, 'Data not found');
  }

  const result = await Branch.findByIdAndUpdate(
    id,
    {
      $set: {
        payload,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

const deleteBranch = async (id: string) => {
  const isExist = await Branch.findById(id);
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid ID');
  }
  const result = await Branch.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

export const branchServices = {
  createBranch,
  getAllBranches,
  getSingleBranch,
  updateBranch,
  deleteBranch,
};

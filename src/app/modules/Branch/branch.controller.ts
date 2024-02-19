import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { branchServices } from './branch.service';

const createBranch = catchAsync(async (req, res) => {
  const result = await branchServices.createBranch(req.body);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'successfully create branch',
    data: result,
  });
});

const getAllBranch = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await branchServices.getAllBranches(query);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'successfully get all branches',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleBranch = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(httpStatus.NOT_FOUND, 'user id not founded');
  }

  const result = await branchServices.getSingleBranch(id);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'successfully get all branch',
    data: result,
  });
});

const updateBranch = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(httpStatus.NOT_FOUND, 'user id not founded');
  }

  const result = await branchServices.updateBranch(id, req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'successfully get all branch',
    data: result,
  });
});

const deleteBranch = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(httpStatus.NOT_FOUND, 'user id not founded');
  }

  await branchServices.deleteBranch(id);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'successfully delete faculty',
  });
});

export const branchController = {
  createBranch,
  getAllBranch,
  getSingleBranch,
  deleteBranch,
  updateBranch,
};

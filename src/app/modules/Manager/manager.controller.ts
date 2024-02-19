import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { managerServices } from './manager.service';

const getAllManager = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await managerServices.getAllManagers(query);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'successfully get all faculties',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleManager = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(httpStatus.NOT_FOUND, 'user id not founded');
  }

  const result = await managerServices.getSingleManager(id);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'successfully get all faculties',
    data: result,
  });
});

const updateManager = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(httpStatus.NOT_FOUND, 'user id not founded');
  }

  const result = await managerServices.updateManager(id, req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'successfully get all faculties',
    data: result,
  });
});

const deleteManager = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(httpStatus.NOT_FOUND, 'user id not founded');
  }

  await managerServices.deleteManager(id);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'successfully delete faculty',
  });
});

export const managerController = {
  getAllManager,
  getSingleManager,
  deleteManager,
  updateManager,
};

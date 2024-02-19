import httpStatus from 'http-status';
import AppError from '../../utils/AppError';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { sellerServices } from './seller.service';

const getAllSellers = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await sellerServices.getAllSellers(query);

  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'successfully get all faculties',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleSeller = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(httpStatus.NOT_FOUND, 'user id not founded');
  }

  const result = await sellerServices.getSingleSeller(id);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'successfully get all faculties',
    data: result,
  });
});

const updateSeller = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(httpStatus.NOT_FOUND, 'user id not founded');
  }

  const result = await sellerServices.updateSeller(id, req.body);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'successfully get all faculties',
    data: result,
  });
});

const deleteSeller = catchAsync(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError(httpStatus.NOT_FOUND, 'user id not founded');
  }

  await sellerServices.deleteSeller(id);
  sendResponse(res, {
    success: true,
    status: httpStatus.OK,
    message: 'successfully delete faculty',
  });
});

export const sellerController = {
  getAllSellers,
  getSingleSeller,
  deleteSeller,
  updateSeller,
};

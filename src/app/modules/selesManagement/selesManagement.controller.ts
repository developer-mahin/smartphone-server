import httpStatus from 'http-status';
import catchAsync from '../../utils/CatchAsync';
import sendResponse from '../../utils/sendResponse';
import { selesManagementServices } from './selesManagement.service';

const selesProduct = catchAsync(async (req, res) => {
  const result = await selesManagementServices.selesProduct(req.body);

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Product seles successful',
    data: result,
  });
});

const getProductsByHistory = catchAsync(async (req, res) => {
  const token = req.headers.authorization as string;
  const result = await selesManagementServices.getProductsBySelesHistory(
    req.query,
    token,
  );

  sendResponse(res, {
    status: httpStatus.CREATED,
    success: true,
    message: 'Product seles successful',
    data: result,
  });
});

export const selesManagementControllers = {
  selesProduct,
  getProductsByHistory,
};

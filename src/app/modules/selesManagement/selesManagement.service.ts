/* eslint-disable @typescript-eslint/no-explicit-any */
import { format, parse } from 'date-fns';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import AppError from '../../utils/AppError';
import { dateRange } from '../../utils/dateRange';
import Product from '../product/product.model';
import User from '../user/user.model';
import { TSelsManagement } from './selesManagement.interface';
import SelsManagement from './selesManagement.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const selesProduct = async (payload: TSelsManagement) => {
  // check product is available
  const { productId, quantity, sellerId, selsDate, nameOfBuyer } = payload;
  const product = await Product.findById(productId);
  const user = await User.findById(sellerId);

  // Parse the string into a Date object:
  const parsedDate = parse(selsDate, 'MMM dd yyyy', new Date(), {
    useAdditionalDayOfYearTokens: true,
  });
  const formattedDate = format(parsedDate, 'yyyy-MM-dd');

  const newData = {
    productId,
    sellerId,
    nameOfBuyer,
    quantity,
    selsDate: formattedDate,
  };

  if (!user) {
    throw new AppError(httpStatus.FORBIDDEN, 'seller not found');
  }
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Id! product not found');
  }

  if (product.isDelete || product.status === 'out-of-stock') {
    throw new AppError(httpStatus.BAD_REQUEST, 'product is not available');
  }

  if (product.quantity < 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You cant sold this quantity of product, Product not available with this quantity',
    );
  }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // remove product quantity from database
    const removeProductQuantity = (product.quantity -= quantity);
    await Product.findByIdAndUpdate(
      productId,
      {
        quantity: removeProductQuantity,
      },
      { runValidators: true, session },
    );

    // change status if product quantity is less then 1
    if (product.quantity <= 0) {
      await Product.findByIdAndUpdate(
        productId,
        {
          isDelete: true,
          status: 'out-of-stock',
        },
        { runValidators: true, session },
      );
    }
    // quantity
    await SelsManagement.create([newData], { session });

    await session.commitTransaction();
    await session.endSession();
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

const getProductsBySelesHistory = async (
  query: Record<string, unknown>,
  token: string,
) => {
  const { weekly, daily, monthly, yearly } = query;
  let queryDay;

  if (weekly) {
    queryDay = 7;
  } else if (daily) {
    queryDay = 1;
  } else if (monthly) {
    queryDay = 30;
  } else if (yearly) {
    queryDay = 365;
  } else {
    queryDay = null;
  }

  // Check if queryDay is null, if so, skip date range filtering
  const dateRangeOptions = queryDay ? dateRange(queryDay) : null;

  const verifiedUser = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const queryConditions: Array<Record<string, any>> = [
    { sellerId: verifiedUser.userId },
  ];

  if (dateRangeOptions) {
    queryConditions.push({
      selsDate: {
        $gte: dateRangeOptions.formattedStartDate,
        $lte: dateRangeOptions.formattedEndDate,
      },
    } as Record<string, any>);
  }

  const result = await SelsManagement.find({
    $and: queryConditions,
  })
    .sort({ createdAt: -1 })
    .populate('productId')
    .populate('sellerId');

  return result;
};

export const selesManagementServices = {
  selesProduct,
  getProductsBySelesHistory,
};

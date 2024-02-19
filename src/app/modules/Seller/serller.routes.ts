import { Router } from 'express';
import { sellerController } from './seller.controller';
import validateRequest from '../../middlewares/valdateRequest';
import { sellerValidationSchema } from './seller.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';

const router = Router();

router.get('/', auth(USER_ROLE.superAdmin), sellerController.getAllSellers);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin),
  sellerController.getSingleSeller,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),
  validateRequest(sellerValidationSchema.updateSellerSchema),
  sellerController.updateSeller,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin),
  sellerController.deleteSeller,
);

export const sellerRoutes = router;

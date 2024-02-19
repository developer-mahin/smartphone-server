import { Router } from 'express';
import { selesManagementControllers } from './selesManagement.controller';
import validateRequest from '../../middlewares/valdateRequest';
import { selesValidation } from './selesManagement.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.seller),
  validateRequest(selesValidation.createSelsManagementValidationSchema),
  selesManagementControllers.selesProduct,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.seller),
  selesManagementControllers.getProductsByHistory,
);

export const selesManagementRoutes = router;

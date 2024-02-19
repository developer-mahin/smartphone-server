import { Router } from 'express';
import { managerController } from './manager.controller';
import validateRequest from '../../middlewares/valdateRequest';
import { managerValidationSchema } from './manager.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../../constant';

const router = Router();

router.get('/', auth(USER_ROLE.superAdmin), managerController.getAllManager);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin),
  managerController.getSingleManager,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin),
  validateRequest(managerValidationSchema.updateManagerSchema),
  managerController.updateManager,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin),
  managerController.deleteManager,
);

export const managerRoutes = router;

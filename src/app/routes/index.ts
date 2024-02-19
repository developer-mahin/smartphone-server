import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { productRoutes } from '../modules/product/product.routes';
import { selesManagementRoutes } from '../modules/selesManagement/selesManagement.routes';
import { managerRoutes } from '../modules/Manager/manager.routes';
import { sellerRoutes } from '../modules/Seller/serller.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { branchRoutes } from '../modules/Branch/branch.routes';

const router = Router();

const userRouter = [
  {
    path: '/user',
    routes: userRoutes,
  },
  {
    path: '/auth',
    routes: authRoutes,
  },
  {
    path: '/manager',
    routes: managerRoutes,
  },
  {
    path: '/seller',
    routes: sellerRoutes,
  },
  {
    path: '/branch',
    routes: branchRoutes,
  },
  {
    path: '/product',
    routes: productRoutes,
  },
  {
    path: '/seles',
    routes: selesManagementRoutes,
  },
];

userRouter.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;

import express from 'express';
import userControllers from '../controllers/usersController';

const router = express.Router()

router
  .route('/')
  .get(userControllers.getAllUsers)
  .post(userControllers.createUser)

router
  .route('/:id')
  .get(userControllers.getUser)
  .patch(userControllers.updateUser)
  .delete(userControllers.deleteUser)

export default router;
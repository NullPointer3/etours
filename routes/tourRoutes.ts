import express from 'express';
import tourControllers from '../controllers/tourControllers';

const router = express.Router()

router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.createTour)

router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteTour)

export default router;
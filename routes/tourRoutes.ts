import express from 'express';
import tourControllers from '../controllers/tourControllers';

const router = express.Router()

router.param('id', (req, response, next, val) => {
  console.log(`Tour id is ${val}`)
  next()
})

router
  .route('/')
  .get(tourControllers.getAllTours)
  .post(tourControllers.checkBody, tourControllers.createTour)

router
  .route('/:id')
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteTour)

export default router;
import { NextFunction, Request, Response } from 'express'
//import { DATA_FILE } from '../helper'; we using a DB now
import { handleError, parseJson } from '../helper';
import Tour from '../models/tourModel';


interface Tour {
  id: number,
  name: string
  duration: number
  maxGroupSize: number
  difficulty: string
  ratingAverage: number
  ratingQuality: number
  price: number
  summary: string
  description: string
  imageCover: string
  images: string[]
  startDates: string[]
}


const getAllTours = (req: Request, res: Response) => {
  res.status(200).json({message: "Success"})
}

const getTour = (req: Request, res: Response) => {
  res.status(200).json({message: "Success"})
}

const createTour =  (req: Request, res: Response) => {
  return Tour.create(req.body)
    .then(newTour => {
    res.status(201).json({
      status: "Success",
      data: {
        tour: newTour
      }
    })
    })
    .catch(err => {
      res.status(400).json({
        status: "Fail",
        message: err
      })
    })
}
    

const updateTour = (req: Request, res: Response) => {
  res.status(200).json({message: "Success"})
}

const deleteTour =  (req: Request, res: Response) => {
  res.status(200).json({message: "Success"})
}

const tourControllers = {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  createTour,
}

export default tourControllers
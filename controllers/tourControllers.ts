import { NextFunction, Request, Response } from 'express'
import fs from "fs";
import { DATA_FILE } from '../helper';
import { handleError, parseJson } from '../helper';


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

const checkBody = (req: Request, res: Response, next: NextFunction) => {
  if(!req.body.name || !req.body.price){
    return res.status(400).json({
      status: "bad Request",
      message: "Missing name or price"
    })
  }
  next()
}

const getAllTours = (req: Request, res: Response) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if(err) {
      handleError(res, "failed to read File")
    }
    const tours: Tour[] = parseJson(data.toString(), res)
    if(!tours) return

    res.status(200).json({
      status: "success",
      result: tours.length,
      data: {
        tours
      }
    })
  })
}

const getTour = (req: Request, res: Response) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if(err) {
      handleError(res, "Failed to read file")
    }
    const id = parseInt(req.params.id)
    const tours: Tour[] = parseJson(data.toString(), res)
    const tour = tours.find(el => el.id === id)
    if(!tour){
      return res.status(404).json({
        status: 'Fail',
        message: "Invalid ID"
      })
    }
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    })
  })
}

const createTour =  (req: Request, res: Response) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if(err) {
      handleError(res, "Failed to read data")
    }
    const tours: Tour[] = parseJson(data.toString(), res)
    const newId = tours[tours.length - 1].id + 1
    const newTour: Tour = Object.assign({ id: newId}, req.body)
    tours.push(newTour)

    fs.writeFile(DATA_FILE, JSON.stringify(tours), () => {
      res.setHeader('Cache-control', 'no-cache')
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      })
    })    
  })
}

const updateTour = (req: Request, res: Response) => {
  const tourId = parseInt(req.params.id)
  const { updates } = req.body

  fs.readFile(DATA_FILE, (err, data) => {
    if(err) {
      handleError(res, "Failed to Read Data")
    }
    
    const tours: Tour[] = parseJson(data.toString(), res)
    if(!tours) return 

    const tourIndex = tours.findIndex(tour => tour.id === tourId)
    if(tourIndex === -1) {
      return res.status(404).json({
        status: "Fail",
        message: "Invalid ID"
      })
    }
    const updatedTour: Tour = {...tours[tourIndex], ...updates}
    tours[tourIndex] = updatedTour

    fs.writeFile(DATA_FILE, JSON.stringify(tours, null, 4), (writeErr) => {
      if(writeErr){
        handleError(res, "Failed writing to File")
      }
      res.status(200).json({
        status: "success",
        data: {
          tour: updatedTour
        }
      })
    })
  })
}

const deleteTour =  (req: Request, res: Response) => {
  const { id } = req.params
  fs.readFile(DATA_FILE, (err, data) => {
    if(err){
      handleError(res, "Internal Server Error")
    }

    let tours: Tour[] = parseJson(data.toString(), res)
    const originalLength = tours.length
    const tourId = parseInt(id)

    tours = tours.filter(tour => tour.id !== tourId)
    if(tours.length === originalLength){
      return res.status(404).json({
        status: "Fail",
        message: "ID Not Found!"
      })
    }
    fs.writeFile(DATA_FILE, JSON.stringify(tours, null, 4), (writeError) => {
      if(writeError){
        handleError(res, "Error writing to file")
      }
      res.status(200).json({
        status: "success",
        message: "Delete Completed!",
        data: null
      })
    })
  })
}

const tourControllers = {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  createTour,
  checkBody
}

export default tourControllers
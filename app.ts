import express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { handleError, parseJson } from './helper';
import { PassThrough } from 'stream';

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

const app = express();

app.use(express.json());

const DATA_FILE = path.join(__dirname, 'dev-data/data/tours-simple.json')
app.set('port', (process.env.PORT || 3000))

app.get('/api/tours', (req, res) => {
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
})

app.get('/api/tours/:id', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if(err) {
      handleError(res, "Failed to read file")
    }

    const tours: Tour[] = parseJson(data.toString(), res)
    const tour = tours.find(el => el.id === parseInt(req.params.id))
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
})

app.post('/api/tours', (req, res) => {
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
})

app.patch('/api/tours/')

app.listen(app.get('port'), () => {
  console.log(`Server is running on http://localhost:${app.get('port')}`);
});

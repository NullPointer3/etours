import express, { Request, response, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

interface Tours {
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
      console.error('Error Reading File')
      return res.status(500).json({err: "Internal Server Error"})
    }

    // Parse the data
    let tours: Tours[]
    try{
      tours = JSON.parse(data.toString())
    }catch(parseError){
      console.error("Failed to Parse data", parseError)
      return res.status(500).json({err: "Internal Server Error"})
    }
    res.status(200).json({
      status: 'success',
      result: tours.length,
      data: {
        tours
      }
    })
  })
})

app.post('/api/tours', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if(err) {
      console.error('Error Reading File')
      return res.status(500).json({err: "Internal Server Error"})
    }
    let tours: Tours[]
    try{
      tours = JSON.parse(data.toString())
      const newId = tours[tours.length - 1].id + 1
      const newTour = Object.assign({ id: newId}, req.body)
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
    }catch(parseError){
      console.error("Failed to Parse data", parseError)
      return res.status(500).json({err: "Internal Server Error"})
    }
  })
})

app.listen(app.get('port'), () => {
  console.log(`Server is running on http://localhost:${app.get('port')}`);
});

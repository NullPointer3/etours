import express from 'express';
import morgan from 'morgan';
import path from 'path'
import tourRouter  from './routes/tourRoutes'
import userRouter from './routes/userRoutes'

const app = express();

const html = path.join(__dirname, 'public')

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}
app.use(express.json());
app.use(express.static(html))

app.use('/api/tours', tourRouter)
app.use('/api/users', userRouter)

export default app;


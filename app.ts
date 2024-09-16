import express from 'express';
import morgan from 'morgan';
import tourRouter  from './routes/tourRoutes'
import userRouter from './routes/userRoutes'

const app = express();

app.use(morgan('dev'))
app.use(express.json());

app.use('/api/tours', tourRouter)
app.use('/api/users', userRouter)

export default app;


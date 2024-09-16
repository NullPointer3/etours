import express from 'express';
import * as path from 'path';
import morgan from 'morgan';
import tourRouter  from './routes/tourRoutes'
import userRouter from './routes/userRoutes'

const app = express();

app.use(morgan('dev'))
app.use(express.json());

export const DATA_FILE = path.join(__dirname, 'dev-data/data/tours-simple.json')
app.set('port', (process.env.PORT || 3000))

app.use('/api/tours', tourRouter)
app.use('/api/users', userRouter)

app.listen(app.get('port'), () => {
  console.log(`Server is running on http://localhost:${app.get('port')}`);
});

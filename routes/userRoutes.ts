import express , {Request, Response} from 'express';
import fs from 'fs'
import { handleError, parseJson } from '../helper';
import { DATA_FILE } from '../app';

const router = express.Router()


const getAllUsers = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "route under construction"
  })
}

const getUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "route under construction"
  })
}

const createUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "route under construction"
  })
}

const updateUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "route under construction"
  })
}

const deleteUser = (req: Request, res: Response) => {
  res.status(500).json({
    status: "error",
    message: "route under construction"
  })
}

router
  .route('/')
  .get(getAllUsers)
  .post(createUser)

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

export default router;
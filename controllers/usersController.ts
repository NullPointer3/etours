import { Request, Response } from 'express'

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

const userControllers = {
  getAllUsers,
  getUser, 
  createUser, 
  deleteUser, 
  updateUser
}

export default userControllers
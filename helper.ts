import { Request, Response} from 'express';
import * as path from 'path';

export const handleError = (
  res: Response, 
  message: string, 
  statusCode: number = 500
) => {
  console.error(message)
  return res.status(statusCode).json({error: message})
}

export const parseJson = (
  data: string, 
  res: Response
) => {
  try {
    return JSON.parse(data);
  } catch (parseError) {
    console.error("Failed to parse data", parseError);
    handleError(res, "Internal Server Error");
    return null;
  }
};

export const DATA_FILE = path.join(__dirname, 'dev-data/data/tours-simple.json')
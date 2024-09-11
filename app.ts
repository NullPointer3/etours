import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.post('/', (req, res) => {
  res.status(200).json({message: "You can Post here.."})
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

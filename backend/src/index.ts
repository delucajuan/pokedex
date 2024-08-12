import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express with TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

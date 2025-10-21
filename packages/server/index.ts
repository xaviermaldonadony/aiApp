import express, { response } from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const port = process.env.PORT || 300;

app.get('/', (req: Request, resp: Response) => {
  resp.send('Hello world from server');
});

app.get('/api/hello', (req: Request, resp: Response) => {
  resp.json({ message: 'Hello from server' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

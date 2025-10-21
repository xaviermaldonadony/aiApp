import express, { response } from 'express';
import type { Request, Response } from 'express';

const app = express();

const port = process.env.PORT || 300;

app.get('/', (req: Request, resp: Response) => {
  resp.send('hello world');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

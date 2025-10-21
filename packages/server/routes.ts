import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';

const router = express.Router();

router.get('/', (req: Request, resp: Response) => {
   resp.send('Hello world from server');
});

router.get('/api/hello', (req: Request, resp: Response) => {
   resp.json({ message: 'Hello from server' });
});

router.post('/api/chat', chatController.sendMessage);

export default router;

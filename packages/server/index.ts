import express, { response } from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import z from 'zod';
import { chatService } from './services/chat.service';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT || 300;

const chatSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt is required')
      .max(1000, 'Prompt must be less than 1000 characters'),
   conversationId: z.uuid(),
});

app.get('/', (req: Request, resp: Response) => {
   resp.send('Hello world from server');
});

app.get('/api/hello', (req: Request, resp: Response) => {
   resp.json({ message: 'Hello from server' });
});

app.post('/api/chat', async (req: Request, res: Response) => {
   const parseResult = chatSchema.safeParse(req.body);
   if (!parseResult.success) {
      res.status(400).json(parseResult.error.format());
      return;
   }

   try {
      const { prompt, conversationId } = req.body;
      const response = await chatService.sendMessage(prompt, conversationId);

      res.json({ message: response.message });
   } catch (error) {
      res.status(500).json({ error: 'Failed to generate a response' });
   }
});

app.listen(port, () => {
   console.log(`Server is running on http://localhost:${port}`);
});

// 34

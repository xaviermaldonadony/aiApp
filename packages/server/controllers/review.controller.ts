import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';

export const reviewController = {
   async getReviews(req: Request, resp: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         resp.status(400).json({ message: 'Invalid product id' });
         return;
      }

      const reviews = await reviewService.getReviews(productId);
      resp.json(reviews);
   },

   async summararizeRevies(req: Request, resp: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         resp.status(400).json({ message: 'Invalid product id' });
         return;
      }

      const summary = await reviewService.summarizeReviews(productId);

      resp.json({ summary });
   },
};

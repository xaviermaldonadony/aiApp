import type { Request, Response } from 'express';
import { reviewService } from '../services/review.service';
import { productRepository } from '../repositories/product.repository';
import { reviewRepository } from '../repositories/review.repository';

export const reviewController = {
   async getReviews(req: Request, resp: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         resp.status(400).json({ message: 'Invalid product id' });
         return;
      }

      const product = await productRepository.getProduct(productId);
      if (!product) {
         resp.status(400).json({ error: 'Invalid product' });
         return;
      }

      const reviews = await reviewRepository.getReviews(productId);
      const summary = await reviewRepository.getReviewSummary(productId);

      resp.json({
         summary,
         reviews,
      });
   },

   async summararizeRevies(req: Request, resp: Response) {
      const productId = Number(req.params.id);

      if (isNaN(productId)) {
         resp.status(400).json({ message: 'Invalid product id' });
         return;
      }

      const product = await productRepository.getProduct(productId);
      if (!product) {
         resp.status(400).json({ error: 'Invalid product' });
         return;
      }

      const reviews = await reviewRepository.getReviews(productId, 1);

      if (!reviews.length) {
         resp.status(400).json({ error: 'There are no reviews to summarize' });
         return;
      }

      const summary = await reviewService.summarizeReviews(productId);

      resp.json({ summary });
   },
};

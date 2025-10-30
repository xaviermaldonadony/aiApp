import axios from 'axios';
import { sleep } from '@/lib/sleep';

export type Review = {
   id: number;
   author: string;
   rating: number;
   content: string;
   createdAt: string;
};

export type GetReviewsResponse = {
   summary: string | null;
   reviews: Review[];
};

export type SummarizeResponse = {
   summary: string;
};

export type GetReviewsResponse = {
   summary: string | null;
   reviews: Review[];
};

export const reviewsAppi = {
   fetchReviews(productId: number) {
      sleep(500);
      return axios
         .get<GetReviewsResponse>(`/api/products/${productId}/reviews`)
         .then((res) => res.data);
   },

   summarizeReviews(productId: number) {
      return axios
         .post<SummarizeResponse>(
            `/api/products/${productId}/reviews/summarize`
         )
         .then((res) => res.data);
   },
};

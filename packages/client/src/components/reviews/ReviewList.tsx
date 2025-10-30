import axios from 'axios';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { sleep } from '@/lib/sleep';

import StarRating from './StarRating';

type Props = {
   productId: number;
};

type Review = {
   id: number;
   author: string;
   rating: number;
   content: string;
   createdAt: string;
};

type GetReviesResponse = {
   summary: string | null;
   reviews: Review[];
};

const ReviewList = ({ productId }: Props) => {
   const [reviewData, setReviewData] = useState<GetReviesResponse>();
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState('');

   const fetchReviews = async () => {
      setIsLoading(true);
      await sleep(500);
      try {
         const { data } = await axios.get<GetReviesResponse>(
            `/api/products/${productId}/reviews`
         );

         setReviewData(data);
      } catch (e) {
         console.error(e);
         setError('Could not fetch the review. Try again later.');
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      fetchReviews();
   }, [productId]);

   if (isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[...Array(3)].map((i) => (
               <div key={i}>
                  <Skeleton width={150} />
                  <Skeleton width={100} />
                  <Skeleton count={2} />
               </div>
            ))}
         </div>
      );
   }

   if (error) {
      return <div className="text-red-500">{error}</div>;
   }

   return (
      <div className="flex flex-col gap-5 text-left">
         {reviewData?.reviews.map((review) => (
            <div key={review.id}>
               <div className="font-semibold">{review.author}</div>
               <div>
                  <StarRating value={review.rating} />
               </div>
               <div className="py-2"> {review.content}</div>
            </div>
         ))}
      </div>
   );
};

export default ReviewList;

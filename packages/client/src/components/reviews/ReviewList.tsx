import axios from 'axios';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
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

   const fetchReviews = async () => {
      const { data } = await axios.get<GetReviesResponse>(
         `/api/products/${productId}/reviews`
      );

      setReviewData(data);
   };

   useEffect(() => {
      fetchReviews();
   }, [productId]);

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

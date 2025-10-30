import axios from 'axios';
import { HiSparkles } from 'react-icons/hi2';
import { sleep } from '@/lib/sleep';
import StarRating from './StarRating';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from '../ui/button';
import ReviewSkeleton from './ReviewSkeleton';

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

type SummarizeResponse = {
   summary: string;
};

const ReviewList = ({ productId }: Props) => {
   const {
      mutate: handleSummarize,
      isPending: isSummaryLoading,
      isError: isSummaryError,
      data: summarizeResponse,
   } = useMutation<SummarizeResponse>({
      mutationFn: () => summarizeReviews(),
   });

   const {
      data: reviewData,
      isLoading,
      error,
   } = useQuery<GetReviesResponse>({
      queryKey: ['reviews', productId],
      queryFn: () => fetchReviews(),
   });

   const summarizeReviews = async () => {
      const { data } = await axios.post<SummarizeResponse>(
         `/api/products/${productId}/reviews/summarize`
      );
      return data;
   };

   const fetchReviews = async () => {
      await sleep(500);
      const { data } = await axios.get<GetReviesResponse>(
         `/api/products/${productId}/reviews`
      );
      return data;
   };

   if (isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[...Array(3)].map((i) => (
               <ReviewSkeleton key={i} />
            ))}
         </div>
      );
   }

   if (error) {
      return (
         <div className="text-red-500">Could not fetch reviews. Try again!</div>
      );
   }

   if (!reviewData?.reviews.length) {
      return null;
   }

   const currentSummary = reviewData.summary || summarizeResponse?.summary;

   return (
      <div>
         <div className="mb-5 text-left">
            {currentSummary ? (
               <div>
                  <h1 className="font-semibold py-2">Summarized Review:</h1>
                  <p>{currentSummary}</p>
               </div>
            ) : (
               <div>
                  <Button
                     onClick={() => handleSummarize()}
                     className="cursor-pointer"
                     disabled={isSummaryLoading}
                  >
                     <HiSparkles /> Summarize
                  </Button>
                  {isSummaryLoading && (
                     <div className="py-3">
                        <ReviewSkeleton />
                     </div>
                  )}
                  {isSummaryError && (
                     <p className="text-red-500">
                        Could not summarize reviews. Try Again!
                     </p>
                  )}
               </div>
            )}
         </div>
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
      </div>
   );
};

export default ReviewList;

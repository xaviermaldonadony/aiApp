import { HiSparkles } from 'react-icons/hi2';
import StarRating from './StarRating';
import { useMutation, useQuery } from '@tanstack/react-query';
import ReviewSkeleton from './ReviewSkeleton';
import { Button } from '../ui/button';
import {
   reviewsAppi,
   type GetReviewsResponse,
   type SummarizeResponse,
} from './reviewsApi';

type Props = {
   productId: number;
};

const ReviewList = ({ productId }: Props) => {
   const summaryMutation = useMutation<SummarizeResponse>({
      mutationFn: () => reviewsAppi.summarizeReviews(productId),
   });

   const reviewsQuery = useQuery<GetReviewsResponse>({
      queryKey: ['reviews', productId],
      queryFn: () => reviewsAppi.fetchReviews(productId),
   });

   if (reviewsQuery.isLoading) {
      return (
         <div className="flex flex-col gap-5">
            {[...Array(3)].map((i) => (
               <ReviewSkeleton key={i} />
            ))}
         </div>
      );
   }

   if (reviewsQuery.isError) {
      return (
         <div className="text-red-500">Could not fetch reviews. Try again!</div>
      );
   }

   if (!reviewsQuery.data?.reviews.length) {
      return null;
   }

   const currentSummary =
      reviewsQuery.data?.summary || summaryMutation.data?.summary;

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
                     onClick={() => summaryMutation.mutate()}
                     className="cursor-pointer"
                     disabled={summaryMutation.isPending}
                  >
                     <HiSparkles /> Summarize
                  </Button>
                  {summaryMutation.isPending && (
                     <div className="py-3">
                        <ReviewSkeleton />
                     </div>
                  )}
                  {summaryMutation.isError && (
                     <p className="text-red-500">
                        Could not summarize reviews. Try Again!
                     </p>
                  )}
               </div>
            )}
         </div>
         <div className="flex flex-col gap-5 text-left">
            {reviewsQuery.data?.reviews.map((review) => (
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

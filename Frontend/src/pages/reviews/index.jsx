import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import api from '../../utils/api';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/reviews');
        setReviews(data.data);
      } catch (error) {
        enqueueSnackbar('Failed to fetch reviews', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">All Reviews</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full p-4">
          {reviews.length === 0 ? (
            <p>No reviews found</p>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div 
                  key={review._id} 
                  className="border-2 border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between">
                    <h3 className="font-bold">{review.user.name}</h3>
                    <div className="text-yellow-500">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                  <p className="mt-2">{review.review}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    For book: {review.book.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
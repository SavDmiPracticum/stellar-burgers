import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeed } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((store) => store.feed);

  useEffect(() => {
    dispatch(fetchFeed());
    console.log(data);
    if (error) {
      console.error(error);
    }
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <FeedUI
          orders={data.orders}
          handleGetFeeds={() => dispatch(fetchFeed())}
        />
      )}
    </>
  );
};

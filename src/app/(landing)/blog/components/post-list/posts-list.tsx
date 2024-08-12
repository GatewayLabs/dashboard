'use client';

import BlogCard from '@/app/(landing)/components/blog-card/blog-card';
import BlogCardLoading from '@/app/(landing)/components/blog-card/blog-card-loading';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PostsOrPages } from '@tryghost/content-api';
import { useQueryState } from 'nuqs';

import { Box, Button } from '@mui/material';

type Props = {
  initialPosts: PostsOrPages;
  initialMeta: PostsOrPages['meta'];
  ignoreId: string;
};

type Page = { posts: PostsOrPages; meta: PostsOrPages['meta'] };

const LoadingLine = () => (
  <>
    <BlogCardLoading />
    <BlogCardLoading />
    <BlogCardLoading />
  </>
);

export default function PostsList({
  initialPosts,
  initialMeta,
  ignoreId,
}: Props) {
  const [tag] = useQueryState('tag');

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery<Page>({
      queryKey: ['posts', tag, ignoreId],
      queryFn: async ({ queryKey, pageParam = 1 }) => {
        const searchParams = new URLSearchParams();

        if (typeof queryKey?.[1] === 'string') {
          searchParams.set('tag', queryKey[1]);
        }

        if (typeof pageParam === 'number') {
          searchParams.set('page', pageParam.toString());
        }
        searchParams.set('ignoreId', ignoreId);

        const url = `/api/blog?${searchParams.toString()}`;
        const res = await fetch(url);
        return res.json();
      },
      initialData: {
        pages: [{ posts: initialPosts, meta: initialMeta }],
        pageParams: [tag],
      },
      getNextPageParam: (lastPage) => {
        if (lastPage?.meta?.pagination.next) {
          return lastPage.meta.pagination.next;
        }
      },
    });

  const pages = data?.pages.flat();

  const isInitialLoading = isFetching && !isFetchingNextPage;

  return (
    <>
      <Box
        sx={{
          gap: 4,
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          },
        }}
      >
        {isInitialLoading ? (
          <LoadingLine />
        ) : (
          pages?.map((page) =>
            page.posts.map((post) => <BlogCard key={post.id} {...post} />)
          )
        )}
        {isFetchingNextPage && <LoadingLine />}
      </Box>
      {hasNextPage && !isFetchingNextPage && (
        <Button
          variant="outlined"
          onClick={() => fetchNextPage()}
          size="large"
          sx={{
            alignSelf: 'center',
          }}
        >
          Load More
        </Button>
      )}
    </>
  );
}

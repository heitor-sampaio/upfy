import { Button, Box, Spinner, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';
import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface ImagesQueryResponse {
  after?: {
    id: string;
  };
  data: {
    data: {
      title: string;
      description: string;
      url: string;
    };
    ts: number;
    ref: {
      id: string;
    };
  }[];
}

export default function Home(): JSX.Element {
  const getImages = async ({
    pageParam = null,
  }): Promise<ImagesQueryResponse> => {
    const response = await api.get('api/images', {
      params: { after: pageParam },
    });

    return response.data;
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', getImages, {
    getNextPageParam: response => response.after,
  });

  const formattedData = useMemo(
    () => data?.pages.flatMap(page => page.data),
    [data]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />

        {hasNextPage && (
          <Button
            onClick={() => {
              fetchNextPage();
            }}
            mt="10"
          >
            {isFetchingNextPage ? (
              <Text>Carregando</Text>
            ) : (
              <Text>Carregar mais</Text>
            )}
            {isFetchingNextPage && <Spinner size="sm" ml="4" />}
          </Button>
        )}
      </Box>

      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </>
  );
}

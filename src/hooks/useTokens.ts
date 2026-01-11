import { useQuery } from '@tanstack/react-query';
import { generateMockTokens } from '@/utils';
import { type Token, type TokenStatus } from '@/types';

const INITIAL_TOKENS_COUNT = 15;

const fetchTokens = async (status: TokenStatus): Promise<Token[]> => {

  await new Promise((resolve) => setTimeout(resolve, 500));
  return generateMockTokens(INITIAL_TOKENS_COUNT, status);
};

export const useTokens = (status: TokenStatus) => {
  return useQuery({
    queryKey: ['tokens', status],
    queryFn: () => fetchTokens(status),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};

import { OKR } from '@api/path';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteKeyResult } from '@api/keyResult';

const useDropKeyResult = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: drop } = useMutation(deleteKeyResult, {
    onSuccess: () => {
      const targetQueryKeys = queryClient
        .getQueryCache()
        .findAll('query')
        .map((cache) => cache.queryKey)
        .filter((queryKey) => {
          return !!queryKey.find((key) => key === OKR);
        });

      targetQueryKeys.forEach((queryKey) =>
        queryClient.refetchQueries({
          queryKey,
        }),
      );
    },
  });

  return drop;
};

export default useDropKeyResult;

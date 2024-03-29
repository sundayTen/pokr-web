import { updateInitiativeDone } from './../api/initiatives';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { OKR } from '@api/path';

const useUpdateInitiative = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: update } = useMutation(updateInitiativeDone, {
    onSuccess: (data, variable, context) => {
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
    onError: (error) => {},
  });
  return update;
};

export default useUpdateInitiative;

import { QueryClient, DefaultOptions } from 'react-query';

const queryConfig: DefaultOptions = {
    queries: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        useErrorBoundary: (error) => error?.response?.status >= 500,
        refetchOnWindowFocus: false,
        retry: false
    }
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 3,
			staleTime: 1000 * 60 * 5,
			gcTime: 1000 * 60 * 10,
			retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
		},
		mutations: {
			retry: false,
			throwOnError: false,
		},
	},
});
export default queryClient;
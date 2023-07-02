import aspida from '@aspida/axios';
import axios from 'axios';
import Constants from 'expo-constants';
import { useCallback, useMemo } from 'react';
import { setMockRequestsToAxios } from '../mocks/axiosMock';
import api from '@/apis/bin/openapi/$api';

const API_URL = Constants.expoConfig?.extra?.apiUrl as string;

if (__DEV__) {
    setMockRequestsToAxios(axios);
}

export const useApiClient = () => {
    const headers = useMemo(() => ({}), []);
    const apiClient = useCallback(() => {
        return api(aspida(axios, { baseURL: API_URL, headers }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return apiClient;
};

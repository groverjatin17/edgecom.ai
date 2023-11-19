import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const useApi = <T>() => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (url: string, options?: AxiosRequestConfig) => {
        setIsLoading(true);
        try {
            const response: AxiosResponse<T> = await axios(url, options);
            setData(response.data);
        } catch (error: any) {
            setError(error);
        }
        setIsLoading(false);
    };

    return { data, isLoading, error, fetchData };
};

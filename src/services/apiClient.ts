import {useJwtStore} from "../stores/JwtStore.ts";
import axios, {type AxiosRequestConfig, type AxiosResponse} from "axios";

export class ApiClient {
    private readonly axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_BACKEND_MAIN_URL,
        withCredentials: true,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    });

    constructor() {
        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.axiosInstance.interceptors.request.use((config) => {
            const jwtStore = useJwtStore();

            if (jwtStore.token) {
                config.headers.Authorization = `Bearer ${jwtStore.token}`;
            }

            return config;
        });
    }

    private async handleRequest<T>(
        method: 'get' | 'post' | 'put' | 'delete',
        url: string,
        dataOrParams?: any,
        config?: AxiosRequestConfig,
        isData?: boolean): Promise<AxiosResponse<T>> {
        try {
            const options = {...config};
            if (isData) {
                return await this.axiosInstance[method]<T>(url, dataOrParams, options);
            } else {
                return await this.axiosInstance[method]<T>(url, {...options, params: dataOrParams});
            }
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
        }
    }

    public get<T = any>(url: string, params: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.handleRequest<T>('get', url, params, config);
    }

    public post<T = any>(url: string, data?: any, queryParams?: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const fullUrl = this.buildUrlWithQueryParams(url, queryParams);
        return this.handleRequest<T>('post', fullUrl, data, config, true);
    }

    public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.handleRequest<T>('put', url, data, config, true);
    }

    public delete<T = any>(url: string, data?: any, queryParams?: Record<string, any>, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        const fullUrl = this.buildUrlWithQueryParams(url, queryParams);
        return this.handleRequest<T>('delete', fullUrl, data, config, true);
    }

    private buildUrlWithQueryParams(url: string, queryParams?: Record<string, any>): string {
        if (!queryParams) return url;
        const queryString = new URLSearchParams(queryParams).toString();
        return queryString ? `${url}?${queryString}` : url;
    }
}

export const apiClient = new ApiClient();

import axios, { type AxiosResponse } from 'axios';

interface ApiTodo {
    id: number;
    title: string;
    completed: boolean;
    priority: string;
}

export const getApiData = async (apiPath: string) : Promise<ApiTodo[]> => {
    try {
        const response : AxiosResponse<ApiTodo[]> = await axios.get<ApiTodo[]>(apiPath);
        return response.data;
        
    } catch (error) {
       console.error('Error fetching data:', error);
       throw error;
    }
}
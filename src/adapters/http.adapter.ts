import axios from "../config/axios.config";

export class Http {

    static async get<T>(path: string, params: object = {}) {
        try {
            const { data } = await axios.get<T>(path, { params })
            return data
        } catch (error) {
            throw error
        }
    }

    static async post<T>(path: string, body: unknown) {
        return await axios.post<T>(path, body)
    }

    static async put<T>(path: string, body: unknown) {
        return await axios.put<T>(path, body)
    }

    static async delete<T>(path: string, body: unknown) {
        return await axios.delete<T>(path, { data: body })
    }

}
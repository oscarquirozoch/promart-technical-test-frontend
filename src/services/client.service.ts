import { Http } from '../adapters/http.adapter';
import { IApiResponse } from '../interfaces/api_response.interface';
import { IClient } from '../interfaces/client/client.interface';
import { ICreateClient } from '../interfaces/client/create_client.interface';
import { IUpdateClient } from '../interfaces/client/update_client.interface';
import { IPaginateApiResponse } from '../interfaces/paginate_api_response.interface';

export class ClientService {

    static async show(id: string): Promise<IApiResponse<IClient>> {
        return await Http.get<IApiResponse<IClient>>('clients/' + id)
    }

    static async list(args: object): Promise<IApiResponse<IPaginateApiResponse<IClient[]>>> {
        return await Http.get<IApiResponse<IPaginateApiResponse<IClient[]>>>('clients/', args)
    }

    static async create(args: ICreateClient): Promise<any> {
        return await Http.post<IApiResponse>('clients/', args)
    }

    static async update(id: string, args: IUpdateClient): Promise<any> {
        return await Http.put<IApiResponse>('clients/' + id, args)
    }

    static async delete(id: string): Promise<any> {
        return await Http.delete<IApiResponse>('clients/' + id, {})
    }

}
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { ClientService } from '../services/client.service'
import { onLoadClientPagination, onLoadClients } from '../store/slices/client.slice'
import { IClientFilters } from '../interfaces/client/client_filters.interface'
import { IClient } from '../interfaces/client/client.interface'
import { IUpdateClient } from '../interfaces/client/update_client.interface'
import { ICreateClient } from '../interfaces/client/create_client.interface'

export const useClientStore = () => {

    const dispatch = useDispatch()
    const { clients, clientPagination } = useSelector((state: RootState) => state.client)
    const clientFilters: IClientFilters = {
        id: '',
        name: '',
        surname: '',
        page: 1,
        per_page: 3
    }


    const startShowClient = async (id: string): Promise<IClient> => {
        const response = await ClientService.show(id)
        return response.result
    }

    const startLoadingClients = async () => {
        const response = await ClientService.list(clientFilters)
        dispatch(onLoadClients(response.result.data))
        dispatch(onLoadClientPagination(response.result.meta))
    }

    const startSaveClient = async (data: ICreateClient): Promise<any> => {
        return await ClientService.create(data)
    }

    const startUpdateClient = async (id: string, data: IUpdateClient): Promise<any> => {
        return await ClientService.update(id, data)
    }

    const startDeleteClient = async (id: string) => {
        return await ClientService.delete(id)
    }

    return {
        clients,
        clientPagination,
        clientFilters,

        startShowClient,
        startLoadingClients,
        startSaveClient,
        startUpdateClient,
        startDeleteClient
    }
}
import { createSlice } from '@reduxjs/toolkit';
import { IPaginateMeta } from '../../interfaces/pagination_meta.interface';
import { IClient } from '../../interfaces/client/client.interface';

interface ClientState {
    clients: IClient[],
    clientPagination: IPaginateMeta
}

const initialState: ClientState = {
    clients: [],
    clientPagination: {
        total: 1,
        perPage: 1,
        currentPage: 1,
        lastPage: 1,
        firstPage: 1,
        firstPageUrl: '',
        lastPageUrl: '',
        nextPageUrl: '',
        previousPageUrl: ''
    }
};

export const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {
        onLoadClients: (state, { payload = [] }) => {
            state.clients = payload
        },
        onLoadClientPagination: (state, { payload }) => {
            state.clientPagination = payload
        }
    }
});

export const {
    onLoadClients,
    onLoadClientPagination
} = clientSlice.actions;
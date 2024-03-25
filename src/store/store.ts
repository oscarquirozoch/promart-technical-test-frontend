import { configureStore } from '@reduxjs/toolkit';
import { clientSlice } from './slices/client.slice';

export const store = configureStore({
    reducer: {
        client: clientSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>;

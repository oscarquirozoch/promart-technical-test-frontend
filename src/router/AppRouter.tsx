import { Navigate, Route, Routes } from 'react-router-dom';

import ClientsPage from '../modules/client/pages/ClientsPage';
import CreateClientPage from '../modules/client/pages/CreateClient';
import UpdateClientPage from '../modules/client/pages/UpdateClient';

const AppRouter = () => {

    return (
        <Routes>
            <>
                <Route path='/' element={<Navigate to='/clients' />} />

                // Clients
                <Route path='/clients' element={<ClientsPage />} />
                <Route path='/clients/create' element={<CreateClientPage />} />
                <Route path='/clients/update/:id' element={<UpdateClientPage />} />
                <Route path='/*' element={<Navigate to='/' />} />
            </>

        </Routes>
    )
}

export default AppRouter
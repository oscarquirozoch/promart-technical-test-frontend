import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react'
import { useClientStore } from '../../../hooks/useClientStore'

import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';


const ClientsList: React.FC = () => {

    // Data
    const toast = useRef(null);
    const [first, setFirst] = useState(0)
    const [searchValue, setSearchValue] = useState('')
    const { clients, clientPagination, clientFilters, startLoadingClients, startDeleteClient } = useClientStore()

    // Actions 
    useEffect(() => {
        startLoadingClients()
    }, [])

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first)
        clientFilters.page = event.page + 1
        startLoadingClients()
    };

    const onSearch = () => {
        clientFilters.name = searchValue
        startLoadingClients()
    }

    const onDeleteClient = (id: string) => {
        confirmDialog({
            message: 'El registro se eliminará',
            header: 'Confirmación!',
            icon: 'pi pi-check',
            defaultFocus: 'accept',
            acceptLabel: 'Aceptar',
            accept: async () => {
                const response = await startDeleteClient(id)
                if (response.data.code === 200) {
                    if (toast.current) {
                        (toast.current as Toast).show({ severity: 'success', summary: 'Correcto', detail: 'El cliente se ha eliminado' });
                    }
                    startLoadingClients()
                }
            }
        });
    }

    // Templates
    const fullNameTemplate = (rowData: any) => {
        return <span>{rowData.name} {rowData.surname} {rowData?.mothers_surname}</span>;
    };

    const actionsTemplate = (rowData: any) => {
        return <div>
            <Link to={'/clients/update/' + rowData.id}>
                <Button icon='pi pi-pencil' aria-label='Edit' size='small' severity='warning' />
            </Link>
            <Button className='ml-2' icon='pi pi-trash' aria-label='Delete' size='small' severity='danger'
                onClick={() => onDeleteClient(rowData.id)}
            />
        </div>
    }

    return (
        <>
            <Toast ref={toast} />
            <ConfirmDialog />

            <div className='mb-3'>
                <span className='p-input-icon-left'>
                    <i className='pi pi-search' />
                    <InputText
                        placeholder='Buscar'
                        className='p-inputtext-sm'
                        onChange={(e) => setSearchValue(e.target.value)} />
                </span>
                <Button icon='pi pi-search' className='ml-2' onClick={onSearch} />
            </div>

            <DataTable value={clients} tableStyle={{ minWidth: '50rem' }}>
                <Column header='Nombre' body={fullNameTemplate} ></Column>
                <Column header='Correo electrónico' field='email' ></Column>
                <Column header='Fecha de nacimiento' field='birthdate'></Column>
                <Column header='Acciones' body={actionsTemplate}></Column>
            </DataTable>

            <Paginator
                first={first}
                rows={clientPagination.perPage}
                totalRecords={clientPagination.total}
                onPageChange={onPageChange}
            />
        </>
    )
}

export default ClientsList
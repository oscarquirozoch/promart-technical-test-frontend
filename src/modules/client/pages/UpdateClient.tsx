import { useFormik } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method

import { formatDate, formatDateToCalendar, legalAgeValidation } from '../../../helpers/general.helper'
import Yup from '../../../helpers/yup.helper'
import { useEffect } from 'react'
import { useClientStore } from '../../../hooks/useClientStore'
import { IUpdateClient } from '../../../interfaces/client/update_client.interface'

const validationSchema = Yup.object().shape({
    name: Yup.string().max(40).required().label('Nombre'),
    surname: Yup.string().max(40).required().label('Apellido paterno'),
    mothers_surname: Yup.string().max(40).optional(),
    email: Yup.string().email().required().label('Correo electrónico'),
    birthdate: Yup.date().required().test('Edad', 'El cliente debe ser mayor de 18 años', legalAgeValidation).label('Fecha de nacimiento')
})

const UpdateClientPage: React.FC = () => {

    // Data
    const navigate = useNavigate();
    const { id } = useParams()
    const { startShowClient, startUpdateClient } = useClientStore()
    const { errors, values, handleSubmit, handleChange, setValues } = useFormik({
        initialValues: {
            name: '',
            surname: '',
            mothers_surname: '',
            email: '',
            birthdate: ''
        },
        onSubmit: (value) => handleSubmitForm(value),
        validationSchema: validationSchema
    })

    // Actions
    useEffect(() => {
        async function loadClient() {
            if (id) {
                const client = await startShowClient(id)
                setValues({
                    name: client.name,
                    surname: client.surname,
                    mothers_surname: client.mothers_surname ?? '',
                    email: client.email,
                    birthdate: formatDateToCalendar(client.birthdate)
                })
            }
        }
        loadClient()
    }, [])

    const handleSubmitForm = async (value: IUpdateClient) => {
        const response = await startUpdateClient(id ?? '', {
            ...value,
            birthdate: formatDate(value.birthdate)
        })

        if (response.data.code === 200) {
            confirmDialog({
                message: 'El registro se actualizó correctamente',
                header: 'Genial!',
                icon: 'pi pi-check',
                defaultFocus: 'accept',
                acceptLabel: 'Ir a inicio',
                rejectLabel: 'Seguir editando',
                accept: () => {
                    navigate('/clients', { replace: true }) // Aquí ponemos replace:true para reemplazar la ruta actual con la tuya, pues si usaramos el navigate por sí solo, pushearía la ruta por encima de la otra
                },
                reject: () => { }
            });
        }
    }

    return (
        <>
            <div className='container'>
                <ConfirmDialog />

                <div className='header'>
                    <Link to='/clients'>
                        <Button text icon='pi pi-arrow-left' className='mb-3' />
                    </Link>
                    <div className='title'>Editar Cliente</div>
                    <div className='subtitle'>Mantenimiento</div>
                </div>

                <Card className='mt-3'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <span className='flex flex-column gap-2'>
                                <label htmlFor='name'>Nombre:</label>
                                <InputText
                                    id='name'
                                    name='name'
                                    value={values.name}
                                    className={classNames({ 'p-invalid': errors.name, 'w-30rem': true })}
                                    onChange={handleChange}
                                />
                            </span>
                            {errors.name && <small className="p-error">{errors.name}</small>}
                        </div>

                        <div className='mb-3'>
                            <span className='flex flex-column gap-2'>
                                <label htmlFor='surname'>Apellido paterno:</label>
                                <InputText
                                    id='surname'
                                    name='surname'
                                    value={values.surname}
                                    className={classNames({ 'p-invalid': errors.surname, 'w-30rem': true })}
                                    onChange={handleChange}
                                />
                            </span>
                            {errors.surname && <small className="p-error">{errors.surname}</small>}
                        </div>

                        <div className="mb-3">
                            <span className='flex flex-column gap-2'>
                                <label htmlFor='mothers_surname'>Apellido materno</label>
                                <InputText
                                    id='mothers_surname'
                                    name='mothers_surname'
                                    value={values.mothers_surname}
                                    className='w-30rem'
                                    onChange={handleChange}
                                />
                            </span>
                        </div>

                        <div className="mb-3">
                            <span className='flex flex-column gap-2'>
                                <label htmlFor='email'>Correo electrónico</label>
                                <InputText
                                    id='email'
                                    name='email'
                                    value={values.email}
                                    className={classNames({ 'p-invalid': errors.email, 'w-30rem': true })}
                                    onChange={handleChange}
                                />
                            </span>
                            {errors.email && <small className="p-error">{errors.email}</small>}
                        </div>


                        <div className="mb-3">
                            <span className='flex flex-column gap-2'>
                                <label htmlFor='birthdate'>Fecha de nacimiento</label>
                                <Calendar
                                    id='birthdate'
                                    name='birthdate'
                                    dateFormat="dd-mm-yy"
                                    value={new Date(values.birthdate)}
                                    className={classNames({ 'p-invalid': errors.birthdate, 'w-30rem': true })}
                                    onChange={handleChange}
                                />
                            </span>
                            {errors.birthdate && <small className="p-error">{errors.birthdate}</small>}
                        </div>

                        <Button type='submit' label='Actualizar' iconPos='right' className='mb-3 pl-4 pr-4' />
                    </form>
                </Card>

            </div>
        </>
    )
}

export default UpdateClientPage
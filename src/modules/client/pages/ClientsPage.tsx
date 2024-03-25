import { Link } from 'react-router-dom';

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { Carousel } from 'primereact/carousel';

import ClientsList from '../components/ClientsList';
import React, { useState } from 'react';
import lagoImg from '../../../assets/lago.avif'

const ClientsPage: React.FC = () => {

    const [items] = useState([1, 2, 3]);
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const itemCarouslTemplate = () => {
        return (
            <div className="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div className="mb-3">
                    <img src={lagoImg} className="w-6 shadow-2" />
                </div>
            </div>
        );
    };

    return (
        <>
            <div className='container'>
                <Carousel value={items} numVisible={1} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={itemCarouslTemplate} autoplayInterval={3000} />

                <div className='header'>
                    <div className='title'>Clientes</div>
                    <div className='subtitle'>Mantenimiento</div>
                </div>

                <Link to='/clients/create'>
                    <Button label='Registrar' icon='pi pi-plus' className='mb-3' />
                </Link>


                <Card>
                    <ClientsList></ClientsList>
                </Card>

            </div>
        </>
    )
}

export default ClientsPage
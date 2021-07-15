import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';
import bookingDialogService from '../services/bookingDialogService';
import {Dialog, DialogContent} from '@material-ui/core';
import HomeBooking from './HomeBooking';

//https://run.mocky.io/v3/62de12a6-dce1-4b9c-a34c-c77e275df98a

const Home = () => {

    const [homesState, setHomesState] = useState([]);

    useEffect(() => {

        const homesDataPromise = apiClient.getHomes();

        homesDataPromise.then((homesData) => setHomesState(homesData));
        
        const subscription = bookingDialogService.events$.subscribe(state => setBookingDialogState(state));

        return () => subscription.unsubscribe();

    }, []);

    const [bookingDialogState, setBookingDialogState] = useState({ open:false });

    let homes;

    homes = homesState.map((home, index) => {
        return(
            <div data-testid="home" key={index} className="shadow-md rounded">
                <img src="https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607" alt="" data-testid="home-image"/>
                <div className="flex flex-col gap-2 p-1">
                    <div data-testid="home-title" className="font-semibold">{home.title}</div>
                    <p data-testid="home-location">{home.location}</p>
                    <p data-testid="home-price">${home.price}</p>
                    <button 
                         data-testid="home-booking-btn"
                         className="p-1 text-white bg-blue-500 rounded"
                         onClick={() => bookingDialogService.open(home)}>
                         Book
                    </button>
                </div>
            </div>
        )
    })


    return (
        <>
            <div className="container mx-auto my-4 flex justify-between items-center gap-3">
            {homes}
            </div>
            <Dialog
                maxWidth="xs"
                fullWidth={true} 
                open={bookingDialogState.open}
                onClose={() => bookingDialogService.close()}>
                <DialogContent>
                  <HomeBooking home={bookingDialogState.home}/>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Home;

import { act, getAllByTestId, getByTestId, getNodeText, render } from "@testing-library/react";
import React from 'react';
import apiClient from "../services/apiClient";
import bookingDialogService from "../services/bookingDialogService";
import Home from "./Home";

let container = null;

beforeEach(async () => {

    jest.spyOn(apiClient, 'getHomes').mockImplementation(() => { //It mocks the method given as argument 
        return  Promise.resolve([
            {
                title: 'Test home 1',
                image: 'listing.jpg',
                location: 'Test location 1',
                price: '1'
            },
            {
                title: 'Test home 2',
                image: 'listing.jpg',
                location: 'Test location 2',
                price: '2'
            },
            {
                title: 'Test home 3',
                image: 'listing.jpg',
                location: 'Test location 3',
                price: '3'
            },
        ]);
    })

    container = render(<Home/>).container;

    await act(async ()=> { })
});

it('should show homes', () => {
    const homes = getAllByTestId(container, 'home');

    expect(homes.length).toBeGreaterThan(0);
});

it('should show home title', ()=> {
    const homeTitles = getAllByTestId(container, 'home-title');
    
    expect(getNodeText(homeTitles[0])).toBe('Test home 1');
})

it('should display the image', ()=> {
    const homeImages = getAllByTestId(container, 'home-image');
    expect(homeImages[0]).toBeTruthy();
});

it('should display the home location', ()=> {
    const homeLocations = getAllByTestId(container, 'home-location');
    expect(getNodeText(homeLocations[0])).toBe('Test location 1');
});

it('should display the home price', ()=> {
    const homePrices = getAllByTestId(container, 'home-price');
    expect(getNodeText(homePrices[0])).toBe('$1');
});

it('show the home booking button', ()=> {
    const homeBookingButton = getAllByTestId(container, 'home-booking-btn');
    expect(homeBookingButton[0]).toBeTruthy();
});

it('should open home booking dialog when clicking the button', () => {

    jest.spyOn(bookingDialogService, 'open').mockImplementation(() => {});

    const homeBookingButton = getAllByTestId(container, 'home-booking-btn');

    homeBookingButton[0].click();

    expect(bookingDialogService.open).toHaveBeenCalledWith({
        title: 'Test home 1',
        image: 'listing.jpg',
        location: 'Test location 1',
        price: '1'
    });
    
})
import { fireEvent, getByTestId, render } from '@testing-library/react';
import React from 'react';
import apiClient from '../services/apiClient';
import HomeBooking from './HomeBooking';

let container = null;

const mockedHome = {
    title: "Test home 1",
    image: "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607",
    location: "Test location 1",
    price: "123"
}

beforeEach(() => {
  container = render(<HomeBooking home={mockedHome }/>).container;
});

it('should show title', () => {
    expect(getByTestId(container, 'title').textContent).toBe('Test home 1');
});

it('should show price', () => {
  expect(getByTestId(container, 'price').textContent).toBe('123')
});

it('should show check-in date field', () => {
  expect(getByTestId(container, 'check-in')).toBeTruthy();
});

it('should show check-out date field', () => {
  expect(getByTestId(container, 'check-out')).toBeTruthy();
});

it('should calculate total', () => {
  
    //enter check-in date: 2020-12-04

    fireEvent.change(
        getByTestId(container, 'check-in'),
        {target: {value: '2020-12-04'}}
    ) //Simulates a JS event

    //enter check-out date: 2020-12-07
    fireEvent.change(
        getByTestId(container, 'check-out'),
        {target: {value: '2020-12-07'}}
    )    

    //assert the total: 3*123 = 369

    expect(getByTestId(container, 'total').textContent).toBe('369');
});

it('should book a home after clicking the book button', () => {
  
    //spy on apiClient

    jest.spyOn(apiClient, 'bookHome').mockImplementation(() => { //It spies on the method given as argument: info like how many times it was called can be obtained
        return  Promise.resolve();
    })

    //select dates

    fireEvent.change(
        getByTestId(container, 'check-in'),
        {target: {value: '2020-12-04'}}
    ) //Simulates a JS event

    //enter check-out date: 2020-12-07
    fireEvent.change(
        getByTestId(container, 'check-out'),
        {target: {value: '2020-12-07'}}
    )    

    //click the button 

    getByTestId(container, 'book-btn').click();

    //assert that apiClient booked the home
    expect(apiClient.bookHome).toHaveBeenCalledWith(mockedHome, '2020-12-04', '2020-12-07')
});


//should calculate the total cost
//should book home after clicking the book button
//should close the dialog and show notification after booking home


it('should show empty when no home provided', () => {

  container = render(<HomeBooking home={null}/>).container;

  expect(getByTestId(container, 'empty')).toBeTruthy();
})
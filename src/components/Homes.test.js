import { act, getAllByTestId, getByTestId, render } from "@testing-library/react";
import React from 'react';
import Home from "./Home";

let container = null;

beforeEach(async () => {
    container = render(<Home/>).container;

    await act(async ()=> { })
});

it('should show homes', () => {
    const homes = getAllByTestId(container, 'home');

    expect(homes.length).toBeGreaterThan(0);
})
import React from 'react'

const Header = () => {
    return (
        <div>
            <nav className="w-full fixed top-0 flex justify-between items-center px-6 py-1 bg-white shadow-md text-xs">
            <div data-testid="logo" className="">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png" alt="" className="w-12" /> 
            </div>
            <form data-testid="search" className="p-1 rounded shadow-md">
                <input type="text" placeholder="search here"/>
                <i className="fas fa-search"></i>
            </form>
            <ul data-testid="menu" className="flex justify-between gap-4">
                <a href="#">Become a host</a>
                <a href="#">Help</a>
                <a href="#">Sign up</a>
                <a href="#">Login</a>
            </ul>
            </nav>
            <div className="flex justify-center gap-6 mt-14 text-xs">
                <button data-testid="home-type" className="p-1 rounded border-2 border-gray-400">Home Type</button>
                <button data-testid="dates" className="p-1 rounded border-2 border-gray-400">Dates</button>
                <button data-testid="guests" className="p-1 rounded border-2 border-gray-400">Guests</button>
                <button data-testid="price" className="p-1 rounded border-2 border-gray-400">Price</button>
                <button data-testid="rooms" className="p-1 rounded border-2 border-gray-400">Rooms</button>
                <button data-testid="amenities" className="p-1 rounded border-2 border-gray-400">Amenities</button>
            </div>
        </div>
    )
}

export default Header;

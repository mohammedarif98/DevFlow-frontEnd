import React, { useEffect, useRef, useState } from 'react';
import { CiBellOn } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa';
import { BsChatSquareTextFill } from 'react-icons/bs';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    // close the dropdown when click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return() => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    },[]);
    
    return (
        <div className='bg-slate-50 flex items-center justify-between py-2 px-4 md:px-8 border-b border-gray-200'>
            {/*--------- Logo Section -----------*/}
            <div className='flex items-center'>
                <span className='font-rubik-wet-paint text-lg md:text-2xl'>DevFlow</span>
            </div>

            {/*--------- Search Bar Section -----------*/}
            <div className='flex-grow mx-10 md:ml-12 md:mr-2 lg:ml-12 lg:mr-2'>
                <input 
                    type='text' 
                    placeholder='Search. . . . .' 
                    className='w-full md:w-56 lg:w-80 border-b-[1px] border-slate-600 py-1 px-2 focus:outline-none focus:ring-0'
                />
            </div>

            {/*--------- Hamburger Menu Icon ---------*/}
            <div className='md:hidden'>
                <button onClick={toggleMenu}>
                    {isMenuOpen ? (
                        <HiOutlineX className='text-2xl text-gray-700' />
                    ) : (
                        <HiOutlineMenu className='text-2xl text-gray-700' />
                    )}
                </button>
            </div>

            {/*--------- User Profile Section (Desktop) --------- */}
            <div className='hidden md:flex items-center space-x-4 md:space-x-6 lg:space-x-6'>
                <button className='rounded-full hover:bg-gray-200 p-2 transition-colors'>
                    <HiOutlinePencilSquare className='text-2xl text-gray-700 group-hover:text-red-800' />
                </button>
                <button className='rounded-full hover:bg-gray-200 p-2 transition-colors'>
                    <CiBellOn className='text-2xl text-gray-700 group-hover:text-red-800' />
                </button>
                <button className='rounded-full hover:bg-gray-200 p-2 transition-colors'>
                    <BsChatSquareTextFill className='text-xl text-gray-700 group-hover:text-red-800' />
                </button>
                {/*-------- dropdown menu button --------- */}
                <div className='relative' ref={ dropdownRef } >
                    <button onClick={ toggleDropdown } className='rounded-full p-2 bg-green-700 hover:bg-green-900 transition-colors'>
                        <FaRegUser className='text-xl text-white' />
                    </button>
                    {/*---------- Dropdown Menu ------------*/}
                    {isDropdownOpen && (
                        <div className='absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-20'>
                            <button className='block w-full text-sm text-left px-4 py-2 text-gray-700 hover:bg-gray-100'>
                                Profile
                            </button>
                            <button className='block w-full text-sm text-left px-4 py-2 text-gray-700 hover:bg-gray-100'>
                                Settings
                            </button>
                            <button className='block w-full text-sm text-left px-4 py-2 text-gray-700 hover:bg-gray-100'>
                                Apply for author verification
                            </button>
                            <button className='block w-full text-sm text-left px-4 py-2 text-gray-700 hover:bg-gray-100'>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/*--------- Mobile Menu --------- */}
            {isMenuOpen && (
                <div className='absolute top-16 left-0 w-full bg-slate-50 shadow-lg md:hidden'>
                    <div className='flex flex-col items-start space-y-1 px-2 py-6'>
                        <button className='flex items-left'>
                            <span className='text-sm text-black'>Write</span>
                        </button>
                        <button className='flex items-left'>
                            <span className='text-sm text-black'>Notification</span>
                        </button>
                        <button className='flex items-left'>
                            <span className='text-sm text-black'>Chat</span>
                        </button>
                        <button className='flex items-left'>
                            <span className='text-sm text-black'>Login</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;

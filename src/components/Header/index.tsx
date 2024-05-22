import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import Logo from "../../assets/images/Logo.png";
import SearchForm from "../SearchForm";
import { lsGet } from '../../utils/localStorage';
import ProfileDropdown from './DropDown';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate()

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    useEffect(() => {
        const userToken = lsGet('access_token');
        if (userToken) {
            setIsLoggedIn(true);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('access_token');
        setIsLoggedIn(false);
        navigate('/')
    };


    return (
        <header>
            <nav className="border-gray-200 px-4 lg:px-6 py-6 bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img src={Logo} className="ml-1 h-8 sm:h-9" alt="Cinema Logo" />
                        <span className="self-center text-2xl font-bold whitespace-nowrap text-white">سیـنما</span>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <button>
                            <GrLocation size="22" color="#ff8036" />
                        </button>
                        {isLoggedIn ?
                            <ProfileDropdown
                                logout={logout}
                                dropdownOpen={dropdownOpen}
                                toggleDropdown={toggleDropdown}
                                setDropdownOpen={setDropdownOpen}
                            />
                            :
                            <>
                                <Link to="/login" className="text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">ورود</Link>
                                <Link to="/register" className="text-white bg-[#FF8036] hover:bg-orange-500 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">ثبت نام</Link>
                            </>
                        }
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        {/* <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link to="" className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</Link>
                            </li>
                        </ul> */}
                        <SearchForm />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
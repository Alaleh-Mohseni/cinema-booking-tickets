import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import SearchForm from "../SearchForm";
import ProfileDropdown from './DropDown';

function Header() {
    const { isLoggedIn, logout } = useContext(AuthContext)
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
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
                        <SearchForm />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/Logo.png";
import SearchForm from "../SearchForm";
import { FaAngleDown } from "react-icons/fa";
import { PiUserFocus } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import Modal from '../Modal';

type AuthContextType = {
    isLoggedIn: boolean;
    setIsModalOpen: (open: boolean) => void;
}


function Header() {
    const { isLoggedIn, setIsModalOpen } = useContext(AuthContext) as AuthContextType;
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const navigate = useNavigate();
 
    const toggleDropdown = (): void => setDropdownOpen(prev => !prev);

    const handleDropDownRoutes = (route: string): void => {
        setDropdownOpen(false);
        navigate(`/dashboard/${route}`);
    };

    const handleShowModal = (): void => {
        setIsModalOpen(true);
        setDropdownOpen(false);
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
                        {isLoggedIn ? (
                            <div className="relative inline-block text-left">
                                <div>
                                    <button
                                        type="button"
                                        className="text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 flex gap-3 justify-center items-center"
                                        id="menu-button"
                                        aria-expanded="true"
                                        aria-haspopup="true"
                                        onClick={toggleDropdown}
                                    >
                                        پروفایل
                                        <FaAngleDown />
                                    </button>
                                </div>

                                {dropdownOpen && (
                                    <div
                                        className="origin-top-left absolute left-0 z-50 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none text-white"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="menu-button"
                                    >
                                        <div className="py-1 text-right" role="none">
                                            <button
                                                onClick={() => handleDropDownRoutes('complete-profile')}
                                                className="flex items-center gap-2 px-4 py-2 text-sm hover:text-[#ff8036] border-0"
                                                role="menuitem"
                                            >
                                                <RiShieldUserLine size='22' />
                                                اطلاعات کاربری
                                            </button>
                                            <button
                                                onClick={() => handleDropDownRoutes('authentication')}
                                                className="flex items-center gap-2 px-4 py-2 text-sm hover:text-[#ff8036] border-0"
                                                role="menuitem"
                                            >
                                                <PiUserFocus size='24' />
                                                احراز هویت
                                            </button>
                                            <button
                                                onClick={handleShowModal}
                                                className="flex justify-center items-center gap-2 px-4 py-2 text-sm hover:text-[#ff8036] border-0"
                                                role="menuitem"
                                            >
                                                <TbLogout2 size='22' />
                                                خروج از حساب کاربری
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div >
                        ) : (
                            <>
                                <Link to="/login" className="text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">ورود</Link>
                                <Link to="/register" className="text-white bg-[#FF8036] hover:bg-orange-500 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">ثبت نام</Link>
                            </>
                        )}
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                        <SearchForm />
                    </div>
                </div>
            </nav>
            <Modal />
        </header>
    );
};

export default Header;

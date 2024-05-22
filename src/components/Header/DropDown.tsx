import { Link } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa";
import { PiUserFocus } from "react-icons/pi";
import { RiShieldUserLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";

const ProfileDropdown = ({ logout, dropdownOpen, toggleDropdown, setDropdownOpen }) => {
    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:ring-gray-700 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 flex gap-3 justify-center items-center"
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
                        <Link
                            to="/complete-profile"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:text-[#ff8036]"
                            role="menuitem"
                        >
                            <RiShieldUserLine size='22' />
                            اطلاعات کاربری
                        </Link>
                        <Link
                            to="#settings"
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:text-[#ff8036]"
                            role="menuitem"
                        >
                            <PiUserFocus size='24' />
                            احراز هویت
                        </Link>
                        <button
                            onClick={logout}
                            className="flex justify-center items-center gap-2 px-4 py-2 text-sm hover:text-[#ff8036] border-0"
                            role="menuitem"
                        >
                            <TbLogout2 size='22' />
                            خروج از حساب کاربری
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
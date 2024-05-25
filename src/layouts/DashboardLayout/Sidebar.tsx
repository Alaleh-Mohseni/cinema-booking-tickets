import { useState } from 'react';
import { PiUserFocus } from "react-icons/pi";
import { RiShieldUserLine, RiLockPasswordLine } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { IoWalletOutline , IoTicketOutline } from "react-icons/io5";
import { MdLockReset } from "react-icons/md";
import { Link } from 'react-router-dom';


const navLinks = [
    {
        title: 'اطلاعات کاربری',
        path: '/dashboard/complete-profile',
        icon: PiUserFocus,
    },
    {
        title: 'احراز هویت',
        path: '#',
        icon: RiShieldUserLine,
    },
    {
        title: 'انتخاب رمز عبور',
        path: '/dashboard/set-password',
        icon: RiLockPasswordLine,
    },
    {
        title: 'تغییر رمز عبور',
        path: '/dashboard/change-password',
        icon: MdLockReset,
    },
    {
        title: 'کیف پول',
        path: '#',
        icon: IoWalletOutline,
    },
    {
        title: 'بلیت های من',
        path: '#',
        icon: IoTicketOutline,
    }
]



function Sidebar() {
    const [activeNavIndex, setActiveNavIndex] = useState(0)

    return (
        <div className='bg-gray-900 text-white flex flex-col border-t-2 border-gray-300 w-1/5 h-screen relative'>
            <div className='mt-9 flex flex-col space-y-8'>
                {navLinks.map((item, index) => (
                    <Link to={item?.path} key={item.title}>
                        <div
                            className={`flex items-center px-3 py-1 rounded gap-2
                            ${(activeNavIndex === index
                                    ? 'text-[#ff8036] font-semibold'
                                    : ''
                                )}`}
                            onClick={() => setActiveNavIndex(index)}
                        >
                            <item.icon size='24'/>
                            <span className='text-lg'>
                                {item?.title}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar
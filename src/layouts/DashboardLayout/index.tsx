import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import Sidebar from './Sidebar';

function DashboardLayout() {
    const { logout } = useContext(AuthContext)
    
    return (
        <div className='w-full flex'>
            <Sidebar logout={logout} />
            <main className='grow'>
                <div className="flex flex-col py-6 px-16 h-screen w-full text-white bg-gray-800">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default DashboardLayout
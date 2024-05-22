import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

function DashboardLayout() {
    return (
        <div className='w-full flex'>
            <Sidebar />
            <main className='grow'>
                <div className="flex flex-col py-6 px-16 h-screen w-full text-white bg-gray-800">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default DashboardLayout
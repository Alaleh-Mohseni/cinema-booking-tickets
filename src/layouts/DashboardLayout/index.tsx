import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import Sidebar from './Sidebar';
import Modal from '../../components/Modal';

type AuthContextType = {
    setIsModalOpen: (isOpen: boolean) => void;
};


function DashboardLayout() {
    const { setIsModalOpen } = useContext(AuthContext) as AuthContextType;
    
    return (
        <div className='w-full flex'>
            <Sidebar setIsModalOpen={setIsModalOpen} />
            <main className='grow'>
                <div className="flex flex-col py-6 px-16 h-screen w-full text-white bg-gray-800">
                    <Outlet />
                </div>
            </main>
            <Modal />
        </div>
    )
}

export default DashboardLayout
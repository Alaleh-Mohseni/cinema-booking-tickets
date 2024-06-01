import { useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';

type AuthContextType = {
    isModalOpen: boolean;
    handleLogout: () => void;
    setIsModalOpen: (isOpen: boolean) => void;
};

function Modal() {
    const { isModalOpen, handleLogout, setIsModalOpen } = useContext(AuthContext) as AuthContextType;

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-20 flex justify-center items-center z-50">
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full text-white flex flex-col justify-center items-center py-8 gap-6">
                <div className="pt-2">
                    <p>مطمئن هستید که میخواهید از حساب کاربری خود خارج شوید؟</p>
                </div>
                <div className="flex justify-center items-center gap-4 text-sm">
                    <button
                        className="bg-[#ff8036] text-white px-5 py-2.5 rounded-lg"
                        onClick={handleLogout}
                        type="button"
                    >
                        بله مطمئنم
                    </button>
                    <button
                        className="text-[#ff8036] border border-solid border-[#ff8036] bg-transparent px-5 py-2.5 rounded-lg"
                        onClick={() => setIsModalOpen(false)}
                        type="button"
                    >
                        خیر انصراف از خروج
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

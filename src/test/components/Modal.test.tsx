// Modal.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from "../../utils/test-utils";
import { AuthContext } from '../../contexts/authContext';
import Modal from '../../components/Modal';

const mockContextValue = {
    isModalOpen: true,
    handleLogout: vi.fn(),
    setIsModalOpen: vi.fn(),
};

describe('Modal component', () => {
    it('should not render when isModalOpen is false', () => {
        render(
            <AuthContext.Provider value={{ ...mockContextValue, isModalOpen: false }}>
                <Modal />
            </AuthContext.Provider>
        );

        const modal = screen.queryByText('مطمئن هستید که میخواهید از حساب کاربری خود خارج شوید؟');
        expect(modal).not.toBeInTheDocument();
    });

    it('should render when isModalOpen is true', () => {
        render(
            <AuthContext.Provider value={mockContextValue}>
                <Modal />
            </AuthContext.Provider>
        );

        const modal = screen.getByText('مطمئن هستید که میخواهید از حساب کاربری خود خارج شوید؟');
        expect(modal).toBeInTheDocument();
    });

    it('should call handleLogout when "بله مطمئنم" button is clicked', () => {
        render(
            <AuthContext.Provider value={mockContextValue}>
                <Modal />
            </AuthContext.Provider>
        );

        const logoutButton = screen.getByText('بله مطمئنم');
        fireEvent.click(logoutButton);

        expect(mockContextValue.handleLogout).toHaveBeenCalled();
    });

    it('should call setIsModalOpen with false when "خیر انصراف از خروج" button is clicked', () => {
        render(
            <AuthContext.Provider value={mockContextValue}>
                <Modal />
            </AuthContext.Provider>
        );

        const cancelButton = screen.getByText('خیر انصراف از خروج');
        fireEvent.click(cancelButton);

        expect(mockContextValue.setIsModalOpen).toHaveBeenCalledWith(false);
    });
});

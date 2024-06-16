import { render, screen, fireEvent } from "../../utils/test-utils";
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/authContext';


const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => ({
    ...await vi.importActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Header Component', () => {
    const mockSetIsModalOpen = vi.fn();

    const renderHeader = (isLoggedIn) => {
        render(
            <BrowserRouter>
                <AuthContext.Provider value={{ isLoggedIn, setIsModalOpen: mockSetIsModalOpen }}>
                    <Header />
                </AuthContext.Provider>
            </BrowserRouter>
        );
    };

    it('renders login and register links when user is not logged in', () => {
        renderHeader(false);

        expect(screen.getByText('ورود')).toBeInTheDocument();
        expect(screen.getByText('ثبت نام')).toBeInTheDocument();
    });

    it('renders profile dropdown button when user is logged in', () => {
        renderHeader(true);

        expect(screen.getByText('پروفایل')).toBeInTheDocument();
    });

    it('toggles dropdown menu when profile button is clicked', () => {
        renderHeader(true);

        const profileButton = screen.getByText('پروفایل');
        fireEvent.click(profileButton);

        expect(screen.getByRole('menu')).toBeInTheDocument();

        fireEvent.click(profileButton);
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });


    it('navigates to correct route when dropdown option is clicked', () => {
        renderHeader(true);

        const profileButton = screen.getByText('پروفایل');
        fireEvent.click(profileButton);

        const userInfoButton = screen.getByText('اطلاعات کاربری');
        fireEvent.click(userInfoButton);

        expect(mockNavigate).toHaveBeenCalledWith('/dashboard/complete-profile');
    });

    it('opens modal when logout button is clicked', () => {
        renderHeader(true);

        const profileButton = screen.getByText('پروفایل');
        fireEvent.click(profileButton);

        const logoutButton = screen.getByText('خروج از حساب کاربری');
        fireEvent.click(logoutButton);

        expect(mockSetIsModalOpen).toHaveBeenCalledWith(true);
    });
});

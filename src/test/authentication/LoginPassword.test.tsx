import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from "../../utils/test-utils"
import { AuthContext } from '../../contexts/authContext';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPassword from '../../pages/Authentication/LoginPassword';

describe('LoginPassword Component', () => {
    const mockOnSubmitLoginPassword = vi.fn();

    beforeEach(() => {
        mockOnSubmitLoginPassword.mockClear();
    });

    const renderComponent = () => {
        render(
            <AuthContext.Provider value={{ onSubmitLoginPassword: mockOnSubmitLoginPassword }}>
                <Router>
                    <LoginPassword />
                </Router>
            </AuthContext.Provider>
        );
    };

    it('should render LoginPassword component correctly', () => {
        renderComponent();

        expect(screen.getByText('ورود با رمز عبور')).toBeInTheDocument();
        expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByText('ادامه')).toBeInTheDocument();
        expect(screen.getByText('فراموشی رمز عبور')).toBeInTheDocument();
    });

    it('should display validation errors when form is submitted without input', async () => {
        renderComponent();

        fireEvent.click(screen.getByText('ادامه'));

        expect(await screen.findByText(/شماره موبایل الزامی است./i)).toBeInTheDocument();
        expect(await screen.findByText(/رمز عبور الزامی است./i)).toBeInTheDocument();

        expect(mockOnSubmitLoginPassword).not.toHaveBeenCalled();
    });

    it('should call onSubmitLoginPassword when form is submitted with valid input', async () => {
        renderComponent();

        fireEvent.input(screen.getByPlaceholderText('شماره موبایل'), {
            target: { value: '09123456789' }
        });

        fireEvent.input(screen.getByLabelText('Password'), { 
            target: { value: 'password123' } 
        });

        fireEvent.click(screen.getByText('ادامه'));

        await waitFor(() => {
            expect(mockOnSubmitLoginPassword).toHaveBeenCalledTimes(0);
        });
    });
});

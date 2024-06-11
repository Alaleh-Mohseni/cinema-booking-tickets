import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from "../../utils/test-utils"
import { AuthContext } from '../../contexts/authContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../../pages/Authentication/Login';

describe('Login Component', () => {
    const mockOnSubmitLogin = vi.fn();

    beforeEach(() => {
        mockOnSubmitLogin.mockClear();
    });

    const renderComponent = () => {
        render(
            <AuthContext.Provider value={{ onSubmitLogin: mockOnSubmitLogin }}>
                <Router>
                    <Login />
                </Router>
            </AuthContext.Provider>
        );
    };

    it('should render Login component correctly', () => {
        renderComponent();

        expect(screen.getByText('ورود')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('شماره موبایل')).toBeInTheDocument();
        expect(screen.getByText('ادامه')).toBeInTheDocument();
    });

    it('should display validation errors when form is submitted without input', async () => {
        renderComponent();

        fireEvent.click(screen.getByText('ادامه'));

        expect(await screen.findByText(/شماره موبایل الزامی است./i)).toBeInTheDocument();
        expect(mockOnSubmitLogin).not.toHaveBeenCalled();
    });

    it('should call onSubmitLogin when form is submitted with valid input', async () => {
        renderComponent();

        fireEvent.input(screen.getByPlaceholderText('شماره موبایل'), {
            target: { value: '09123456789' }
        });
        fireEvent.click(screen.getByText('ادامه'));

        await waitFor(() => {
            expect(mockOnSubmitLogin).toHaveBeenCalledTimes(1);
        });
    });
});

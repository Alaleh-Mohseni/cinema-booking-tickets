import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from "../../utils/test-utils"
import { AuthContext } from '../../contexts/authContext';
import { BrowserRouter as Router } from 'react-router-dom';
import ForgetPassword from '../../pages/Authentication/ForgetPassword';

describe('ForgetPassword Component', () => {
    const mockOnSubmitForgetPassword = vi.fn();

    beforeEach(() => {
        mockOnSubmitForgetPassword.mockClear();
    });

    const renderComponent = () => {
        render(
            <AuthContext.Provider value={{ onSubmitForgetPassword: mockOnSubmitForgetPassword }}>
                <Router>
                    <ForgetPassword />
                </Router>
            </AuthContext.Provider>
        );
    };

    it('should render ForgetPassword component correctly', () => {
        renderComponent();

        expect(screen.getByPlaceholderText('شماره موبایل')).toBeInTheDocument();
        expect(screen.getByText('ادامه')).toBeInTheDocument();
    });

    it('should display validation errors when form is submitted without input', async () => {
        renderComponent();

        fireEvent.click(screen.getByText('ادامه'));

        expect(await screen.findByText(/شماره موبایل الزامی است./i)).toBeInTheDocument();
        expect(mockOnSubmitForgetPassword).not.toHaveBeenCalled();
    });

    it('should call onSubmitForgerPassword when form is submitted with valid input', async () => {
        renderComponent();

        fireEvent.input(screen.getByPlaceholderText('شماره موبایل'), {
            target: { value: '09123456789' }
        });
        fireEvent.click(screen.getByText('ادامه'));

        await waitFor(() => {
            expect(mockOnSubmitForgetPassword).toHaveBeenCalledTimes(1);
        });
    });
});

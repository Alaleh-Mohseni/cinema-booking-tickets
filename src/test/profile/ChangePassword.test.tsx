import { render, screen, fireEvent } from "../../utils/test-utils";
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import ChangePassword from '../../pages/Profile/ChangePassword';
import { useChangePassword } from '../../hooks/useChangePassword';
import { useForm } from 'react-hook-form';

vi.mock('../../hooks/useChangePassword', () => ({
    useChangePassword: vi.fn(),
}));

vi.mock('react-hook-form', () => ({
    useForm: vi.fn(),
    Controller: ({ render }) => render({ field: {} }),
}));

describe('SetPassword Component', () => {
    beforeEach(() => {
        useChangePassword.mockReturnValue({
            onSubmitChangePassword: vi.fn(),
        });

        useForm.mockReturnValue({
            register: vi.fn(),
            handleSubmit: fn => fn,
            formState: { errors: {} },
        });
    });

    it('should render the component correctly', () => {
        render(
            <Router>
                <ChangePassword />
            </Router>
        );

        expect(screen.getByText(/لطفا رمز عبور جدیدی را انتخاب و آنرا وارد کنید\./)).toBeInTheDocument();
        expect(screen.getByPlaceholderText('رمز عبور قبلی')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('رمز عبور جدید')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('تکرار رمز عبور جدید')).toBeInTheDocument();
        expect(screen.getByText(/ذخیره تغییرات/)).toBeInTheDocument();
    });

    it('should call onSubmitSetPassword when the form is submitted', () => {
        const mockSubmit = vi.fn();
        useChangePassword.mockReturnValue({
            onSubmitChangePassword: mockSubmit,
        });

        render(
            <Router>
                <ChangePassword />
            </Router>
        );

        fireEvent.click(screen.getByText(/ذخیره تغییرات/));
        expect(mockSubmit).toHaveBeenCalled();
    });
});

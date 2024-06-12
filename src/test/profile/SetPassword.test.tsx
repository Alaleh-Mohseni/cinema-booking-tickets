import { render, screen, fireEvent } from "../../utils/test-utils";
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import SetPassword from '../../pages/Profile/SetPassword';
import { useSetPassword } from '../../hooks/useSetPassword';
import { useForm } from 'react-hook-form';

vi.mock('../../hooks/useSetPassword', () => ({
  useSetPassword: vi.fn(),
}));

vi.mock('react-hook-form', () => ({
  useForm: vi.fn(),
  Controller: ({ render }) => render({ field: {} }),
}));

describe('SetPassword Component', () => {
  beforeEach(() => {
    useSetPassword.mockReturnValue({
      onSubmitSetPassword: vi.fn(),
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
        <SetPassword />
      </Router>
    );

    expect(screen.getByText(/لطفا رمز عبور خود را انتخاب و آنرا وارد کنید\./)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('رمز عبور')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('تکرار رمز عبور')).toBeInTheDocument();
    expect(screen.getByText(/ذخیره تغییرات/)).toBeInTheDocument();
  });

  it('should call onSubmitSetPassword when the form is submitted', () => {
    const mockSubmit = vi.fn();
    useSetPassword.mockReturnValue({
      onSubmitSetPassword: mockSubmit,
    });

    render(
      <Router>
        <SetPassword />
      </Router>
    );

    fireEvent.click(screen.getByText(/ذخیره تغییرات/));
    expect(mockSubmit).toHaveBeenCalled();
  });
});
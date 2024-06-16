import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CompleteProfile from '../../pages/Profile/CompleteProfile';
import { useCompleteProfile } from '../../hooks/useCompleteProfile';
import { completeProfileSchema } from '../../schemas/schemas';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';

vi.mock('../../hooks/useCompleteProfile');
vi.mock('../../schemas/schemas');
vi.mock('@hookform/resolvers/yup');
vi.mock('react-hook-form', () => ({
  useForm: vi.fn(),
  Controller: vi.fn(),
}));

describe('CompleteProfile Component', () => {
  beforeEach(() => {
    useCompleteProfile.mockReturnValue({
      handleSubmitProfile: vi.fn(),
      photo: false,
      userPhoto: '',
      handlePhotoChange: vi.fn(),
      preview: '',
    });

    useForm.mockReturnValue({
      register: vi.fn(),
      handleSubmit: fn => fn,
      formState: { errors: {} },
    });

    yupResolver.mockImplementation(schema => schema);
  });

  it('should render the component', () => {
    render(
      <BrowserRouter>
        <CompleteProfile />
      </BrowserRouter>
    );

    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('ذخیره تغییرات')).toBeInTheDocument();
    expect(screen.getByText('انتخاب رمز عبور')).toBeInTheDocument();
  });

  it('should handle photo upload', () => {
    render(
      <BrowserRouter>
        <CompleteProfile />
      </BrowserRouter>
    );

    const inputFile = screen.getByPlaceholderText('photo').closest('input');
    expect(inputFile).toHaveAttribute('type', 'file');

    fireEvent.change(inputFile, {
      target: { files: [new File(['dummy content'], 'example.png', { type: 'image/png' })] },
    });

    expect(useCompleteProfile().handlePhotoChange).toHaveBeenCalled();
  });

  it('should submit the form', () => {
    const handleSubmitProfile = vi.fn();
    useCompleteProfile.mockReturnValue({
      handleSubmitProfile,
      photo: false,
      userPhoto: '',
      handlePhotoChange: vi.fn(),
      preview: '',
    });

    render(
      <BrowserRouter>
        <CompleteProfile />
      </BrowserRouter>
    );

    const button = screen.getByText('ذخیره تغییرات').closest('button');
    fireEvent.click(button);

    expect(handleSubmitProfile).toHaveBeenCalled();
  });

  it('should navigate to set password', () => {
    render(
      <BrowserRouter>
        <CompleteProfile />
      </BrowserRouter>
    );

    const link = screen.getByText('انتخاب رمز عبور').closest('a');
    expect(link).toHaveAttribute('href', '/dashboard/set-password');
  });
});

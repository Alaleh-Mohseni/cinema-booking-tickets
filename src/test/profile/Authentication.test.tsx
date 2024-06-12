import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from "../../utils/test-utils";
import Authentication from '../../pages/Profile/Authentication';


describe('Authentication Component', () => {
  beforeEach(() => {
    render(<Authentication />);
  });

  it('renders the form with three input fields', () => {
    expect(screen.getByPlaceholderText('شماره موبایل')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('کد ملی')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('شماره کارت')).toBeInTheDocument();
  });

  it('shows validation errors when form is submitted empty', async () => {
    fireEvent.click(screen.getByText('بررسی اطلاعات'));

    expect(await screen.findAllByText('شماره موبایل الزامی است.')).toHaveLength(1);
    expect(await screen.findAllByText('کد ملی الزامی است.')).toHaveLength(1);
    expect(await screen.findAllByText('شماره کارت بانکی الزامی است.')).toHaveLength(1);
  });

  it('submits the form with valid data', async () => {
    fireEvent.input(screen.getByPlaceholderText('شماره موبایل'), {
      target: { value: '09123456789' },
    });
    fireEvent.input(screen.getByPlaceholderText('کد ملی'), {
      target: { value: '1234567890' },
    });
    fireEvent.input(screen.getByPlaceholderText('شماره کارت'), {
      target: { value: '1234123412341234' },
    });

    fireEvent.click(screen.getByText('بررسی اطلاعات'));

    expect(await screen.queryByText('شماره موبایل الزامی است.')).not.toBeInTheDocument();
    expect(await screen.queryByText('کد ملی الزامی است.')).not.toBeInTheDocument();
    expect(await screen.queryByText('شماره کارت بانکی الزامی است.')).not.toBeInTheDocument();
  });
});

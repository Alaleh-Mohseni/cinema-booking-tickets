import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from "../../utils/test-utils";
import Wallet from '../../pages/Profile/Wallet';


describe('Authentication Component', () => {
  beforeEach(() => {
    render(<Wallet />);
  });

  it('renders the form with input field', () => {
    expect(screen.getByLabelText(/Payment/i)).toBeInTheDocument();
  });

  it('shows validation errors when form is submitted empty', async () => {
    fireEvent.click(screen.getByText('پرداخت مبلغ'));

    expect(await screen.findAllByText('لطفا مبلغ مورد نظر را وارد کنید.')).toHaveLength(1);
  });

  it('submits the form with valid data', async () => {
    fireEvent.change(screen.getByLabelText(/Payment/i), { target: { value: '1000' } });
    fireEvent.click(screen.getByText(/پرداخت مبلغ/i));

    expect(await screen.queryByText('لطفا مبلغ مورد نظر را وارد کنید.')).not.toBeInTheDocument();
  });
});

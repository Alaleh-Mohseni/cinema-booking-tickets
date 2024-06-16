import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useSetPassword } from '../../hooks/useSetPassword';
import { setPassword } from '../../services/auth';
import { lsSet, lsGet } from '../../utils/localStorage';
import { toast } from "react-hot-toast";

vi.mock('../../services/auth', () => ({
    setPassword: vi.fn(),
}));

vi.mock('../../utils/localStorage', () => ({
    lsSet: vi.fn(),
    lsGet: vi.fn(),
}));

vi.mock("react-hot-toast", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe('useSetPassword', () => {
    const mockUserToken = 'mocked_token';
    const mockData = {
        password: 'newPassword123',
        confirmPassword: 'newPassword123',
    };
    const mockResponse = {
        data: {
            message: 'Password set successfully',
        },
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (lsGet as vi.Mock).mockReturnValue(mockUserToken);
    });

    it('should call setPassword and lsSet on successful password set', async () => {
        (setPassword as vi.Mock).mockResolvedValue(mockResponse);
        const { onSubmitSetPassword } = useSetPassword();
        
        await onSubmitSetPassword(mockData);

        expect(lsGet).toHaveBeenCalledWith('access_token');
        expect(setPassword).toHaveBeenCalledWith(
            { password: mockData.password, re_password: mockData.confirmPassword },
            mockUserToken
        );
        expect(lsSet).toHaveBeenCalledWith('user', mockResponse.data, true);
        expect(toast.success).toHaveBeenCalledWith(mockResponse.data.message);
    });

    it('should handle errors and show toast error on failure', async () => {
        const mockError = {
            response: {
                data: {
                    detail: 'Some error occurred',
                },
            },
        };
        (setPassword as vi.Mock).mockRejectedValue(mockError);
        const { onSubmitSetPassword } = useSetPassword();
        
        await onSubmitSetPassword(mockData);

        expect(lsGet).toHaveBeenCalledWith('access_token');
        expect(setPassword).toHaveBeenCalledWith(
            { password: mockData.password, re_password: mockData.confirmPassword },
            mockUserToken
        );
        expect(toast.error).toHaveBeenCalledWith('Some error occurred');
    });

    it('should handle errors with a default message when error response is undefined', async () => {
        const mockError = new Error('Network error');
        (setPassword as vi.Mock).mockRejectedValue(mockError);
        const { onSubmitSetPassword } = useSetPassword();
        
        await onSubmitSetPassword(mockData);

        expect(lsGet).toHaveBeenCalledWith('access_token');
        expect(setPassword).toHaveBeenCalledWith(
            { password: mockData.password, re_password: mockData.confirmPassword },
            mockUserToken
        );
        expect(toast.error).toHaveBeenCalledWith('خطایی رخ داده است.');
    });
});

import { describe, it, expect, vi } from 'vitest';
import { useChangePassword } from '../../hooks/useChangePassword';
import { changePassword } from '../../services/auth';
import { lsSet, lsGet } from '../../utils/localStorage';
import { toast } from "react-hot-toast";

vi.mock('../../services/auth');
vi.mock('../../utils/localStorage');
vi.mock('react-hot-toast');

describe('useChangePassword', () => {
    it('should successfully change password', async () => {
        const mockData = {
            oldPassword: 'old_password',
            newPassword: 'new_password',
            confirmNewPassword: 'new_password',
        };
        const mockResponse = { data: { message: 'Password changed successfully' } };

        lsGet.mockReturnValue('mock_token');
        changePassword.mockResolvedValue(mockResponse);

        const { onSubmitChangePassword } = useChangePassword();
        
        await onSubmitChangePassword(mockData);

        expect(lsGet).toHaveBeenCalledWith('access_token');
        expect(changePassword).toHaveBeenCalledWith(
            {
                password: 'new_password',
                re_password: 'new_password',
                old_password: 'old_password'
            },
            'mock_token'
        );
        expect(lsSet).toHaveBeenCalledWith('user', mockResponse.data, true);
        expect(toast.success).toHaveBeenCalledWith('Password changed successfully');
    });

    it('should handle change password failure', async () => {
        const mockData = {
            oldPassword: 'old_password',
            newPassword: 'new_password',
            confirmNewPassword: 'new_password',
        };
        const mockError = { response: { data: { message: 'Error changing password' } } };

        lsGet.mockReturnValue('mock_token');
        changePassword.mockRejectedValue(mockError);

        const { onSubmitChangePassword } = useChangePassword();

        await onSubmitChangePassword(mockData);

        expect(lsGet).toHaveBeenCalledWith('access_token');
        expect(changePassword).toHaveBeenCalledWith(
            {
                password: 'new_password',
                re_password: 'new_password',
                old_password: 'old_password'
            },
            'mock_token'
        );
        expect(toast.error).toHaveBeenCalledWith('Error changing password');
    });
});

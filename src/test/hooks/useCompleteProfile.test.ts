import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useCompleteProfile } from '../../hooks/useCompleteProfile';
import { profile } from '../../services/auth';
import { lsSet, lsGet } from '../../utils/localStorage';
import { toast } from 'react-hot-toast';

// Mock dependencies
vi.mock('../../services/auth', () => ({
    profile: vi.fn(),
}));

vi.mock('../../utils/localStorage', () => ({
    lsSet: vi.fn(),
    lsGet: vi.fn(),
}));

vi.mock('react-hot-toast', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe('useCompleteProfile', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('handlePhotoChange updates photo state and preview', () => {
        const { result } = renderHook(() => useCompleteProfile());
        const file = new Blob(['photo'], { type: 'image/jpeg' });
        const event = {
            target: { files: [file] },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        const readerMock = {
            onloadend: vi.fn(),
            readAsDataURL: vi.fn(),
            result: 'data:image/jpeg;base64,somebase64data',
        };

        window.FileReader = vi.fn(() => readerMock as unknown as FileReader);

        act(() => {
            result.current.handlePhotoChange(event);
        });

        act(() => {
            readerMock.onloadend();
        });

        expect(result.current.photo).toBe(true);
        expect(result.current.preview).toBe('data:image/jpeg;base64,somebase64data');
    });

    it('handleSubmitProfile successfully submits profile', async () => {
        const { result } = renderHook(() => useCompleteProfile());

        const mockResponse = {
            data: {
                data: {
                    photo: 'http://example.com/photo.jpg',
                },
                message: 'Profile updated successfully',
            },
        };

        (profile as vi.Mock).mockResolvedValue(mockResponse);
        (lsGet as vi.Mock).mockReturnValue('test_token');

        const formData: ProfileFormInputs = {
            firstName: 'John',
            lastName: 'Doe',
            photo: {
                0: new File(['photo'], 'photo.jpg', { type: 'image/jpeg' }),
                length: 1,
                item: (index: number) => {
                    return index === 0 ? new File(['photo'], 'photo.jpg', { type: 'image/jpeg' }) : null;
                },
            },
        };

        await act(async () => {
            await result.current.handleSubmitProfile(formData);
        });

        expect(profile).toHaveBeenCalledWith(expect.any(FormData), 'test_token');
        expect(lsSet).toHaveBeenCalledWith('user', mockResponse.data, true);
        expect(result.current.userPhoto).toBe('http://example.com/photo.jpg');
        expect(result.current.photo).toBe(true);
        expect(toast.success).toHaveBeenCalledWith('Profile updated successfully');
    });

    it('handleSubmitProfile handles error', async () => {
        const { result } = renderHook(() => useCompleteProfile());

        const mockError = {
            response: {
                data: {
                    message: 'Error updating profile',
                },
            },
        };

        (profile as vi.Mock).mockRejectedValue(mockError);
        (lsGet as vi.Mock).mockReturnValue('test_token');

        const formData: ProfileFormInputs = {
            firstName: 'John',
            lastName: 'Doe',
            photo: {
                0: new File(['photo'], 'photo.jpg', { type: 'image/jpeg' }),
                length: 1,
                item: (index: number) => {
                    return index === 0 ? new File(['photo'], 'photo.jpg', { type: 'image/jpeg' }) : null;
                },
            },
        };

        await act(async () => {
            await result.current.handleSubmitProfile(formData);
        });

        expect(profile).toHaveBeenCalledWith(expect.any(FormData), 'test_token');
        expect(toast.error).toHaveBeenCalledWith('Error updating profile');
    });

    it('handleSubmitProfile handles generic error', async () => {
        const { result } = renderHook(() => useCompleteProfile());

        const mockError = new Error('Network error');

        (profile as vi.Mock).mockRejectedValue(mockError);
        (lsGet as vi.Mock).mockReturnValue('test_token');

        const formData: ProfileFormInputs = {
            firstName: 'John',
            lastName: 'Doe',
            photo: {
                0: new File(['photo'], 'photo.jpg', { type: 'image/jpeg' }),
                length: 1,
                item: (index: number) => {
                    return index === 0 ? new File(['photo'], 'photo.jpg', { type: 'image/jpeg' }) : null;
                },
            },
        };

        await act(async () => {
            await result.current.handleSubmitProfile(formData);
        });

        expect(profile).toHaveBeenCalledWith(expect.any(FormData), 'test_token');
        expect(toast.error).toHaveBeenCalledWith('خطایی رخ داده است.');
    });
});

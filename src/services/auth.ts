import { httpClient } from './http';
import type { AxiosRequestConfig } from 'axios';

interface RequestConfig extends AxiosRequestConfig {
  accessToken?: string;
  phone_number?: string;
}

export function signUp(data: any, params?: AxiosRequestConfig) {
  return httpClient({
    url: `/api/v1/accounts/auth/register/`,
    method: 'POST',
    data,
    params,
  }) ?? null;
}

export function login(data: any, params?: AxiosRequestConfig) {
  return httpClient({
    url: `/api/v1/accounts/auth/login/`,
    method: 'POST',
    data,
    params,
  }) ?? null;
}

export function verify(op: string, phone_number: string, data: any, params?: AxiosRequestConfig) {
  return httpClient({
    url: `/api/v1/accounts/auth/${op}/${phone_number}/`,
    method: 'POST',
    data,
    params,
  }) ?? null;
}

export function loginPassword(phone_number: string, data: any, params?: AxiosRequestConfig) {
  return httpClient({
    url: `/api/v1/accounts/auth/login/password/${phone_number}/`,
    method: 'POST',
    data,
    params,
  }) ?? null;
}

export function changePassword(data: any, accessToken: string) {
  return httpClient({
    url: `/api/v1/accounts/change_password/`,
    method: 'POST',
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }) ?? null;
}

export function profile(data: any, accessToken: string) {
  return httpClient({
    url: `/api/v1/accounts/complete_profile/`,
    method: 'POST',
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }) ?? null;
}

export function setPassword(data: any, accessToken: string) {
  return httpClient({
    url: `/api/v1/accounts/set_password/`,
    method: 'POST',
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }) ?? null;
}

export function forgetPassword(data: any, params?: AxiosRequestConfig) {
  return httpClient({
    url: `/api/v1/accounts/auth/forget_password/`,
    method: 'POST',
    data,
    params,
  }) ?? null;
}

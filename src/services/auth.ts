import { httpClient } from './http';
import type { AxiosRequestConfig } from 'axios';

export function signUp(data: AxiosRequestConfig = {}, params: AxiosRequestConfig = {}) {
  return (
    httpClient({
      url: `/api/v1/accounts/auth/register/`,
      method: 'POST',
      data,
      params,
    }) ?? null
  );
}


export function login(data: AxiosRequestConfig = {}, params: AxiosRequestConfig = {}) {
  return (
    httpClient({
      url: `/api/v1/accounts/auth/login/`,
      method: 'POST',
      data,
      params,
    }) ?? null
  );
}


export function verify(
  op: string,
  phone_number: string,
  data: AxiosRequestConfig = {},
  params: AxiosRequestConfig = {}
) {
  return httpClient({
    url: `/api/v1/accounts/auth/${op}/${phone_number}/`,
    method: 'POST',
    data,
    params,
  }) ?? null;
}


export function loginPassword(
  phone_number: string,
  data: AxiosRequestConfig = {},
  params: AxiosRequestConfig = {},
) {
  return httpClient({
    url: `/api/v1/accounts/auth/login/password/${phone_number}/`,
    method: 'POST',
    data,
    params,
  }) ?? null;
}


export function changePassword(
  data: AxiosRequestConfig = {}, 
  // params: AxiosRequestConfig = {},
  accessToken: string
) {
  return (
    httpClient({
      url: `/api/v1/accounts/change_password/`,
      method: 'POST',
      data,
      // params,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }) ?? null
  );
}


export function profile(
  data: AxiosRequestConfig = {}, 
  // params: AxiosRequestConfig = {},
  accessToken: string
) {
  return (
    httpClient({
      url: `/api/v1/accounts/complete_profile/`,
      method: 'POST',
      data,
      // params,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }) ?? null
  );
}


export function setPassword(
  data: AxiosRequestConfig = {}, 
  // params: AxiosRequestConfig = {}, 
  accessToken: string
) {
  return (
    httpClient({
      url: `/api/v1/accounts/set_password/`,
      method: 'POST',
      data,
      // params,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }) ?? null
  );
}


export function forgetPassword(
  data: AxiosRequestConfig = {}, 
  params: AxiosRequestConfig = {},
) {
  return (
    httpClient({
      url: `/api/v1/accounts/auth/forget_password/`,
      method: 'POST',
      data,
      params,
    }) ?? null
  );
}

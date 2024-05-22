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
<<<<<<< HEAD
  params: AxiosRequestConfig = {},
=======
  params: AxiosRequestConfig = {}
>>>>>>> 6368cb98c208b790fa372ae4458458c246af3f6a
) {
  return httpClient({
    url: `/api/v1/accounts/auth/login/password/${phone_number}/`,
    method: 'POST',
    data,
    params,
  }) ?? null;
}


<<<<<<< HEAD
export function changePassword(
  data: AxiosRequestConfig = {}, 
  // params: AxiosRequestConfig = {},
  accessToken: string
) {
=======
export function changePassword(data: AxiosRequestConfig = {}, params: AxiosRequestConfig = {}) {
>>>>>>> 6368cb98c208b790fa372ae4458458c246af3f6a
  return (
    httpClient({
      url: `/api/v1/accounts/change_password/`,
      method: 'POST',
      data,
<<<<<<< HEAD
      // params,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
=======
      params,
>>>>>>> 6368cb98c208b790fa372ae4458458c246af3f6a
    }) ?? null
  );
}


<<<<<<< HEAD
export function profile(
  data: AxiosRequestConfig = {}, 
  // params: AxiosRequestConfig = {},
  accessToken: string
) {
=======
export function profile(data: AxiosRequestConfig = {}, params: AxiosRequestConfig = {}) {
>>>>>>> 6368cb98c208b790fa372ae4458458c246af3f6a
  return (
    httpClient({
      url: `/api/v1/accounts/complete_profile/`,
      method: 'POST',
      data,
<<<<<<< HEAD
      // params,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
=======
      params,
>>>>>>> 6368cb98c208b790fa372ae4458458c246af3f6a
    }) ?? null
  );
}


<<<<<<< HEAD
export function setPassword(
  data: AxiosRequestConfig = {}, 
  // params: AxiosRequestConfig = {}, 
  accessToken: string
) {
=======
export function setPassword(data: AxiosRequestConfig = {}, params: AxiosRequestConfig = {}) {
>>>>>>> 6368cb98c208b790fa372ae4458458c246af3f6a
  return (
    httpClient({
      url: `/api/v1/accounts/set_password/`,
      method: 'POST',
      data,
<<<<<<< HEAD
      // params,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
=======
      params,
>>>>>>> 6368cb98c208b790fa372ae4458458c246af3f6a
    }) ?? null
  );
}


<<<<<<< HEAD
export function forgetPassword(
  data: AxiosRequestConfig = {}, 
  params: AxiosRequestConfig = {},
) {
=======
export function forgetPassword(data: AxiosRequestConfig = {}, params: AxiosRequestConfig = {}) {
>>>>>>> 6368cb98c208b790fa372ae4458458c246af3f6a
  return (
    httpClient({
      url: `/api/v1/accounts/auth/forget_password/`,
      method: 'POST',
      data,
      params,
    }) ?? null
  );
}

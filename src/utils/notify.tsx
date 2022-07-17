import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { ApiError } from '@supabase/gotrue-js';
import 'react-toastify/dist/ReactToastify.css';

const isApiError = (val: any): val is ApiError =>
  val && typeof val.message === 'string';

export const alertApiError = (error: any) => {
  if (isApiError(error)) {
    notifyError(error.message);
  } else {
    notifyError(`Error: error is not ApiError --- ${JSON.stringify(error)}`);
  }
};

export const notifyInfo = (message: string) =>
  toast.info(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const notifySuccess = (message: string) =>
  toast.success(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const notifyWarning = (message: string) =>
  toast.warn(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const notifyError = (message: string) =>
  toast.error(message, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

export const NotifyContainer = () => (
  <ToastContainer
    position='top-center'
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
  />
);

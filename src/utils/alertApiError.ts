import { ApiError } from '@supabase/gotrue-js';

const isApiError = (val: any): val is ApiError =>
  val && typeof val.message === 'string';

export const alertApiError = (error: any) => {
  if (isApiError(error)) {
    alert(error.message);
  } else {
    alert(`Error: error is not ApiError --- ${JSON.stringify(error)}`);
    console.error(error);
  }
};
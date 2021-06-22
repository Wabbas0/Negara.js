import { ThunkAction } from "redux-thunk";
import { AxiosError } from "axios";
import { Invoice } from "../../api/resources/invoices-resource";

import { ApplicationState } from "../application-state";

import { Api } from "../../api";

type Action = LoadInvoicesRequest | LoadInvoicesSuccess | LoadInvoicesError;

type Thunk<T = void> = ThunkAction<T, ApplicationState, Api, Action>;

/* ------------- Actions ------------- */
export const LOAD_INVOICES_REQUEST = "LOAD_INVOICES_REQUEST";
export const LOAD_INVOICES_SUCCESS = "LOAD_INVOICES_SUCCESS";
export const LOAD_INVOICES_ERROR = "LOAD_INVOICES_ERROR";

/* ------------- initial state ------------- */

export interface State {
  loading: boolean;
  error: boolean;
  data: Array<Invoice>;
}

export const initialState: State = {
  loading: false,
  error: false,
  data: [],
};

/* ------------- Reducer ------------- */
export default function reducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case LOAD_INVOICES_REQUEST:
      return { ...state, loading: true };

    case LOAD_INVOICES_ERROR:
      return { ...state, error: true, loading: false };

    case LOAD_INVOICES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };

    default:
      return state;
  }
}

/* ------------- Action Creators ------------- */

interface LoadInvoicesRequest {
  type: typeof LOAD_INVOICES_REQUEST;
}

export function loadInvoicesRequest(): LoadInvoicesRequest {
  return { type: LOAD_INVOICES_REQUEST };
}

interface LoadInvoicesSuccess {
  type: typeof LOAD_INVOICES_SUCCESS;
  payload: Array<Invoice>;
}

export function loadInvoicesSuccess(
  result: Array<Invoice>
): LoadInvoicesSuccess {
  return { type: LOAD_INVOICES_SUCCESS, payload: result };
}

interface LoadInvoicesError {
  type: typeof LOAD_INVOICES_ERROR;
  payload: { error: AxiosError };
}

export function loadInvoicesError(error: AxiosError): LoadInvoicesError {
  return { type: LOAD_INVOICES_ERROR, payload: { error } };
}

/* ------------- Thunks ------------- */
export function loadInvoices(): Thunk<void> {
  return async (dispatch, getState, api) => {
    try {
      dispatch(loadInvoicesRequest());
      const result = await api.invoices.getLatestInvoices();

      dispatch(loadInvoicesSuccess(result.data));
    } catch (err) {
      dispatch(loadInvoicesError(err));
    }
  };
}

/* ------------- Selectors ------------- */
export function invoicesSelector(state: ApplicationState): State {
  return state.invoices;
}

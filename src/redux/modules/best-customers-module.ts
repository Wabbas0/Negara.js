import { ThunkAction } from "redux-thunk";
import { AxiosError } from "axios";
import { Invoice } from "../../api/resources/invoices-resource";

import { ApplicationState } from "../application-state";

import { Api } from "../../api";

type Action = LoadCustomersRequest | LoadCustomersSuccess | LoadCustomersError;

type Thunk<T = void> = ThunkAction<T, ApplicationState, Api, Action>;

/* ------------- Actions ------------- */
export const LOAD_CUSTOMERS_REQUEST = "LOAD_CUSTOMERS_REQUEST";
export const LOAD_CUSTOMERS_SUCCESS = "LOAD_CUSTOMERS_SUCCESS";
export const LOAD_CUSTOMERS_ERROR = "LOAD_CUSTOMERS_ERROR";

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
    case LOAD_CUSTOMERS_REQUEST:
      return { ...state, loading: true };

    case LOAD_CUSTOMERS_ERROR:
      return { ...state, error: true, loading: false };

    case LOAD_CUSTOMERS_SUCCESS:
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

interface LoadCustomersRequest {
  type: typeof LOAD_CUSTOMERS_REQUEST;
}

export function loadCustomersRequest(): LoadCustomersRequest {
  return { type: LOAD_CUSTOMERS_REQUEST };
}

interface LoadCustomersSuccess {
  type: typeof LOAD_CUSTOMERS_SUCCESS;
  payload: Array<Invoice>;
}

export function loadCustomersSuccess(
  result: Array<Invoice>
): LoadCustomersSuccess {
  return { type: LOAD_CUSTOMERS_SUCCESS, payload: result };
}

interface LoadCustomersError {
  type: typeof LOAD_CUSTOMERS_ERROR;
  payload: { error: AxiosError };
}

export function loadCustomersError(error: AxiosError): LoadCustomersError {
  return { type: LOAD_CUSTOMERS_ERROR, payload: { error } };
}

/* ------------- Thunks ------------- */
export function loadCustomers(): Thunk<void> {
  return async (dispatch, getState, api) => {
    try {
      dispatch(loadCustomersRequest());
      const result = await api.customers.getBestCustomers();

      dispatch(loadCustomersSuccess(result.data));
    } catch (err) {
      dispatch(loadCustomersError(err));
    }
  };
}

/* ------------- Selectors ------------- */
export function customersSelector(state: ApplicationState): State {
  return state.customers;
}

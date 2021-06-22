import { ThunkAction } from "redux-thunk";
import { AxiosError } from "axios";
import { Revenue } from "../../api/resources/revenues-resource";

import { ApplicationState } from "../application-state";

import { Api } from "../../api";

type Action =
  | LoadMonthlyRevenuesRequest
  | LoadMonthlyRevenuesSuccess
  | LoadMonthlyRevenuesError;

type Thunk<T = void> = ThunkAction<T, ApplicationState, Api, Action>;

/* ------------- Actions ------------- */
export const LOAD_MONTHLY_REVENUES_REQUEST = "LOAD_MONTHLY_REVENUES_REQUEST";
export const LOAD_MONTHLY_REVENUES_SUCCESS = "LOAD_MONTHLY_REVENUES_SUCCESS";
export const LOAD_MONTHLY_REVENUES_ERROR = "LOAD_MONTHLY_REVENUES_ERROR";

/* ------------- initial state ------------- */

export interface State {
  loading: boolean;
  error: boolean;
  data: Array<Revenue>;
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
    case LOAD_MONTHLY_REVENUES_REQUEST:
      return { ...state, loading: true };

    case LOAD_MONTHLY_REVENUES_ERROR:
      return { ...state, error: true, loading: false };

    case LOAD_MONTHLY_REVENUES_SUCCESS:
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

interface LoadMonthlyRevenuesRequest {
  type: typeof LOAD_MONTHLY_REVENUES_REQUEST;
}

export function loadMonthlyRevenuesRequest(): LoadMonthlyRevenuesRequest {
  return { type: LOAD_MONTHLY_REVENUES_REQUEST };
}

interface LoadMonthlyRevenuesSuccess {
  type: typeof LOAD_MONTHLY_REVENUES_SUCCESS;
  payload: Array<Revenue>;
}

export function loadMonthlyRevenuesSuccess(
  result: Array<Revenue>
): LoadMonthlyRevenuesSuccess {
  return { type: LOAD_MONTHLY_REVENUES_SUCCESS, payload: result };
}

interface LoadMonthlyRevenuesError {
  type: typeof LOAD_MONTHLY_REVENUES_ERROR;
  payload: { error: AxiosError };
}

export function loadMonthlyRevenuesError(
  error: AxiosError
): LoadMonthlyRevenuesError {
  return { type: LOAD_MONTHLY_REVENUES_ERROR, payload: { error } };
}

/* ------------- Thunks ------------- */
export function loadMonthlyRevenues(): Thunk<void> {
  return async (dispatch, getState, api) => {
    try {
      dispatch(loadMonthlyRevenuesRequest());
      const result = await api.revenues.getRevenues("monthly");

      dispatch(loadMonthlyRevenuesSuccess(result));
    } catch (err) {
      dispatch(loadMonthlyRevenuesError(err));
    }
  };
}

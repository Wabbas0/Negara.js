import { ThunkAction } from "redux-thunk";
import { AxiosError } from "axios";
import { Revenue } from "../../api/resources/revenues-resource";

import { ApplicationState } from "../application-state";

import { Api } from "../../api";

type Action =
  | LoadWeeklyRevenuesRequest
  | LoadWeeklyRevenuesSuccess
  | LoadWeeklyRevenuesError;

type Thunk<T = void> = ThunkAction<T, ApplicationState, Api, Action>;

/* ------------- Actions ------------- */
export const LOAD_WEEKLY_REVENUES_REQUEST = "LOAD_WEEKLY_REVENUES_REQUEST";
export const LOAD_WEEKLY_REVENUES_SUCCESS = "LOAD_WEEKLY_REVENUES_SUCCESS";
export const LOAD_WEEKLY_REVENUES_ERROR = "LOAD_WEEKLY_REVENUES_ERROR";

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
    case LOAD_WEEKLY_REVENUES_REQUEST:
      return { ...state, loading: true };

    case LOAD_WEEKLY_REVENUES_ERROR:
      return { ...state, error: true, loading: false };

    case LOAD_WEEKLY_REVENUES_SUCCESS:
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

interface LoadWeeklyRevenuesRequest {
  type: typeof LOAD_WEEKLY_REVENUES_REQUEST;
}

export function loadWeeklyRevenuesRequest(): LoadWeeklyRevenuesRequest {
  return { type: LOAD_WEEKLY_REVENUES_REQUEST };
}

interface LoadWeeklyRevenuesSuccess {
  type: typeof LOAD_WEEKLY_REVENUES_SUCCESS;
  payload: Array<Revenue>;
}

export function loadWeeklyRevenuesSuccess(
  result: Array<Revenue>
): LoadWeeklyRevenuesSuccess {
  return { type: LOAD_WEEKLY_REVENUES_SUCCESS, payload: result };
}

interface LoadWeeklyRevenuesError {
  type: typeof LOAD_WEEKLY_REVENUES_ERROR;
  payload: { error: AxiosError };
}

export function loadWeeklyRevenuesError(
  error: AxiosError
): LoadWeeklyRevenuesError {
  return { type: LOAD_WEEKLY_REVENUES_ERROR, payload: { error } };
}

/* ------------- Thunks ------------- */
export function loadWeeklyRevenues(): Thunk<void> {
  return async (dispatch, getState, api) => {
    try {
      dispatch(loadWeeklyRevenuesRequest());
      const result = await api.revenues.getRevenues("weekly");

      dispatch(loadWeeklyRevenuesSuccess(result));
    } catch (err) {
      dispatch(loadWeeklyRevenuesError(err));
    }
  };
}

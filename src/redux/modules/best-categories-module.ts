import { ThunkAction } from "redux-thunk";
import { AxiosError } from "axios";
import { Category } from "../../api/resources/best-categories-resource";

import { ApplicationState } from "../application-state";

import { Api } from "../../api";

type Action =
  | LoadCategoriesRequest
  | LoadCategoriesSuccess
  | LoadCategoriesError;
type Thunk<T = void> = ThunkAction<T, ApplicationState, Api, Action>;

/* ------------- Actions ------------- */
export const LOAD_CATEGORRIES_REQUEST = "LOAD_CATEGORRIES_REQUEST";
export const LOAD_CATEGORRIES_SUCCESS = "LOAD_CATEGORRIES_SUCCESS";
export const LOAD_CATEGORRIES_ERROR = "LOAD_CATEGORRIES_ERROR";

/* ------------- initial state ------------- */

export interface State {
  loading: boolean;
  error: boolean;
  data: Array<Category>;
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
    case LOAD_CATEGORRIES_REQUEST:
      return { ...state, loading: true };

    case LOAD_CATEGORRIES_ERROR:
      return { ...state, error: true, loading: false };

    case LOAD_CATEGORRIES_SUCCESS:
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

interface LoadCategoriesRequest {
  type: typeof LOAD_CATEGORRIES_REQUEST;
}

export function loadCategoriesRequest(): LoadCategoriesRequest {
  return { type: LOAD_CATEGORRIES_REQUEST };
}

interface LoadCategoriesSuccess {
  type: typeof LOAD_CATEGORRIES_SUCCESS;
  payload: Array<Category>;
}

export function loadCategoriesSuccess(
  result: Array<Category>
): LoadCategoriesSuccess {
  return { type: LOAD_CATEGORRIES_SUCCESS, payload: result };
}

interface LoadCategoriesError {
  type: typeof LOAD_CATEGORRIES_ERROR;
  payload: { error: AxiosError };
}

export function loadCategoriesError(error: AxiosError): LoadCategoriesError {
  return { type: LOAD_CATEGORRIES_ERROR, payload: { error } };
}

/* ------------- Thunks ------------- */
export function loadCategories(): Thunk<void> {
  return async (dispatch, getState, api) => {
    try {
      dispatch(loadCategoriesRequest());
      const result = await api.categories.getBestCategories();

      dispatch(loadCategoriesSuccess(result));
    } catch (err) {
      dispatch(loadCategoriesError(err));
    }
  };
}

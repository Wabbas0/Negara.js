import { combineReducers, Reducer } from "redux";
import invoicesReducer from "./modules/invoices-module";
import customersReducer from "./modules/best-customers-module";
import categoriesReducer from "./modules/best-categories-module";
import monthlyRevenuesReducer from "./modules/monthly-revenues-module";
import weeklyRevenuesReducer from "./modules/weekly-revenues-module";

export default (): Reducer =>
  combineReducers({
    invoices: invoicesReducer,
    customers: customersReducer,
    categories: categoriesReducer,
    monthlyyRevenues: monthlyRevenuesReducer,
    weeklyRevenues: weeklyRevenuesReducer,
  });

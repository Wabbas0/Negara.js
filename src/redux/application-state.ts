export interface ApplicationState {
  invoices: import("./modules/invoices-module").State;
  customers: import("./modules/best-customers-module").State;
  categories: import("./modules/best-categories-module").State;
  monthlyyRevenues: import("./modules/monthly-revenues-module").State;
  weeklyRevenues: import("./modules/weekly-revenues-module").State;
}

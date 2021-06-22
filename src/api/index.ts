import * as invoices from "./resources/invoices-resource";
import * as customers from "./resources/best-customers-resource";
import * as categories from "./resources/best-categories-resource";
import * as revenues from "./resources/revenues-resource";

export type Api = {
  invoices: any;
  customers: any;
  categories: any;
  revenues: any;
};
export default { invoices, customers, categories, revenues };

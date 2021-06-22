import request from "../request";

export interface Invoice {
  id: number;
  customer_id: number;
  customer_name: string;
  date: string;
  total_invoice: number;
  total_margin: number;
  region: string;
}

export const getLatestInvoices = async () => {
  try {
    const result = await request({
      url: `/invoices?_sort=date&_limit=15&_order=desc,asc`,
    });
    if (result) {
      return result;
    }

    throw new Error("No result found");
  } catch (error) {
    throw error;
  }
};

export default getLatestInvoices;

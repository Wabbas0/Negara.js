import request from "../request";

export interface Customer {
  customer_id: number;
  customer_name: string;
  total_revenue: number;
  total_margin: number;
  invoices_count: number;
}

export const getBestCustomers = async () => {
  try {
    const result = await request({
      url: `/customers/revenues`,
    });
    if (result) {
      return result;
    }

    throw new Error("No result found");
  } catch (error) {
    throw error;
  }
};

export default getBestCustomers;

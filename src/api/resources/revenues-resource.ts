import request from "../request";

export interface Revenue {
  week: string;
  month: string;
  start_date: string;
  end_date: string;
  invoices_count: number;
  total_margin: number;
  total_revenue: number;
}

export const getRevenues = async (period: string) => {
  try {
    const result = await request({
      url: `/revenues/${period}`,
    });
    if (result) {
      return result;
    }

    throw new Error("No result found");
  } catch (error) {
    throw error;
  }
};

export default getRevenues;

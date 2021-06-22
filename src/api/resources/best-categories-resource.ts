import request from "../request";

export interface Category {
  category_name: string;
  total_revenue: number;
  total_margin: number;
}

export const getBestCategories = async () => {
  try {
    const result = await request({
      url: `/categories/revenues`,
    });
    if (result) {
      return result;
    }

    throw new Error("No result found");
  } catch (error) {
    throw error;
  }
};

export default getBestCategories;

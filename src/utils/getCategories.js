import { base_domain, api_key } from "./apiDetails";
import axios from "axios";

const fetchCategories = async () => {
  try {
    const resp = await axios.get(
      `${base_domain}/api/v1/ecommerce/clothes/categories`,
      {
        headers: {
          projectId: api_key,
        },
      }
    );
    return resp.data.data;
    console.log("resp.data.data", resp.data.data);
  } catch (error) {
    console.error("Error fetching category list", error);
  }
};

export default fetchCategories;

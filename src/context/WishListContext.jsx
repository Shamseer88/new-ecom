import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api_key } from "../utils/apiDetails";
import { useAuth } from "./AuthContext";

const WishListContext = createContext();

export const useWishList = () => {
  return useContext(WishListContext);
};

export const WishListProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const { token } = useAuth();

  const fetchWishlist = async () => {
    if (!token) {
      console.error("Token is missing. Unable to fetch wishlist.");
      toast.error("Please log in to view your wishlist.");
      return;
    }
    try {
      const response = await axios.get(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: api_key,
          },
        }
      );
      const items = response.data?.data?.items || [];
      setWishlist(items.map((item) => item.products));
    } catch (error) {
      console.error("Failed to fetch wishlist:", error.response || error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! Please log in again.");
      } else {
        toast.error("Failed to fetch wishlist items.");
      }
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await axios.patch(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist/",
        { productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: api_key,
          },
        }
      );
      toast.success("Added to wishlist!");
      fetchWishlist();
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      toast.error("Failed to add item to wishlist.");
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `https://academics.newtonschool.co/api/v1/ecommerce/wishlist/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: api_key,
          },
        }
      );
      toast.info("Removed from wishlist.");
      fetchWishlist();
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error("Unable to remove item from wishlist.");
    }
  };

  const clearWishlist = async () => {
    try {
      await axios.delete(
        "https://academics.newtonschool.co/api/v1/ecommerce/wishlist/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: api_key,
          },
        }
      );
      toast.info("Wishlist cleared.");
      fetchWishlist();
    } catch (error) {
      console.error("Failed to clear wishlist:", error);
      toast.error("Unable to clear wishlist.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchWishlist();
    }
  }, [token]);

  return (
    <WishListContext.Provider
      value={{
        wishlist,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

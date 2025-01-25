import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api_key, base_domain } from "../utils/apiDetails";
import { useAuth } from "./AuthContext";
import { useWishList } from "./WishListContext";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartLength, setCartLength] = useState(0);
  const { token } = useAuth();

  const fetchCart = async () => {
    if (!token) {
      console.error("Token is missing. Unable to fetch cart.");
      toast.error("Please log in to view your cart.");
      return;
    }
    try {
      const response = await axios.get(`${base_domain}/api/v1/ecommerce/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: api_key,
        },
      });
      const items = response.data?.data?.items || [];
      setCart(items);
      setCartLength(response?.data?.results);
    } catch (error) {
      console.error("Failed to fetch cart:", error.response || error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! Please log in again.");
      } else {
        toast.error("Failed to fetch cart items.");
      }
    }
  };

  const addToCart = async (productId, quantity = 1, size) => {
    try {
      await axios.patch(
        `${base_domain}/api/v1/ecommerce/cart/${productId}`,
        { quantity, size },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: api_key,
          },
        }
      );
      toast.success("Item added to cart successfully!");
      fetchCart();
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Please login to add item to cart.");
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      await axios.patch(
        `${base_domain}/api/v1/ecommerce/cart/${productId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: api_key,
          },
        }
      );
      toast.info("Cart item updated.");
      fetchCart();
    } catch (error) {
      console.error("Failed to update cart item:", error);
      toast.error("Unable to update cart item.");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`${base_domain}/api/v1/ecommerce/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: api_key,
        },
      });
      toast.info("Removed item from cart.");
      fetchCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error("Unable to remove item from cart.");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${base_domain}/api/v1/ecommerce/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          projectID: api_key,
        },
      });
      toast.info("Cart cleared.");
      fetchCart();
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast.error("Unable to clear cart.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartLength,
        fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

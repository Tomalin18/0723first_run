'use client';

import { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { CartItem, Product, CartContextType } from './types';

// Cart actions
type CartAction = 
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity?: number } }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

// Cart state
interface CartState {
  items: CartItem[];
}

// Initial state
const initialState: CartState = {
  items: [],
};

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  subtotal: (item.quantity + quantity) * item.price_in_cents,
                }
              : item
          ),
        };
      }

      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price_in_cents: product.price_in_cents,
        image_url: product.image_url,
        quantity,
        subtotal: product.price_in_cents * quantity,
      };

      return {
        ...state,
        items: [...state.items, newItem],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: id });
      }

      return {
        ...state,
        items: state.items.map(item =>
          item.id === id
            ? {
                ...item,
                quantity,
                subtotal: quantity * item.price_in_cents,
              }
            : item
        ),
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cardboard-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cardboard-cart', JSON.stringify(state.items));
  }, [state.items]);

  // Calculate totals
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = state.items.reduce((total, item) => total + item.subtotal, 0);

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const contextValue: CartContextType = {
    items: state.items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
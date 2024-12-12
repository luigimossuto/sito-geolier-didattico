import React, { createContext, useState, useContext } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [itemCount, setItemCount] = useState(0);

    const addToCart = (product, quantity = 1, size = null) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(item => item.id === product.id && item.size === size);
            if (existingItemIndex !== -1) {
                // Se il prodotto esiste già con la stessa taglia, aggiorna la quantità
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += quantity;
                return updatedCart;
            } else {
                // Se il prodotto non esiste o ha una taglia diversa, aggiungilo come nuovo item
                return [...prevCart, { ...product, quantity, size }];
            }
        });
        setItemCount(prevCount => prevCount + quantity);
    };

    const removeFromCart = (index) => {
        setCart(prevCart => {
            const removedItem = prevCart[index];
            setItemCount(prevCount => prevCount - removedItem.quantity);
            return prevCart.filter((_, i) => i !== index);
        });
    };

    const updateQuantity = (index, newQuantity) => {
        setCart(prevCart => {
            const updatedCart = [...prevCart];
            const oldQuantity = updatedCart[index].quantity;
            updatedCart[index].quantity = newQuantity;
            setItemCount(prevCount => prevCount - oldQuantity + newQuantity);
            return updatedCart;
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, itemCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
import React, { createContext, useContext, useState } from 'react';

// Holds the menu items and the functions that operate on them, so screens
// can read/update the list without passing functions through navigation
// params (which React Navigation warns about — params must be serializable).
const MenuContext = createContext(undefined);

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState([]);

  function addItem(newItem) {
    setMenuItems((currentItems) => [...currentItems, newItem]);
  }

  return (
    <MenuContext.Provider value={{ menuItems, addItem }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}

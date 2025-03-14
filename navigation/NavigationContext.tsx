import React, { createContext, useContext } from 'react';

type NavigationContextType = {
  navigateToTabs: () => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children, navigateToTabs }: { children: React.ReactNode, navigateToTabs: () => void }) => {
  return (
    <NavigationContext.Provider value={{ navigateToTabs }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

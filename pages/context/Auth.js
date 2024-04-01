import React, { createContext, useState, useContext } from 'react';

// Create context
const AlertsContext = createContext();

// Custom hook to use context
export const useAlerts = () => useContext(AlertsContext);

// Context provider component
export const AlertsProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  // Function to add alert
  const addAlert = (newAlert) => {
    setAlerts(prevAlerts => [...prevAlerts, newAlert]);
  };

  return (
    <AlertsContext.Provider value={{ alerts, addAlert }}>
      {children}
    </AlertsContext.Provider>
  );
};

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import React from "react";

  
  const AuthContext = createContext({
    token: null,
    setToken: () => {},
  });

const  AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState('');

  // Function to set the authentication token
  const setToken = (newToken ) => {
    setToken_(newToken);
  };

//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//       localStorage.setItem('token',token);
//     } else {
//       delete axios.defaults.headers.common["Authorization"];
//       localStorage.removeItem('token')
//     }
//   }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider

export const useAuth = () => {
  return useContext(AuthContext);
};
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const context = () => {
//   return (
//     <View>
//       <Text>context</Text>
//     </View>
//   )
// }

// export default context

// const styles = StyleSheet.create({})
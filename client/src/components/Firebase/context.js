import React, { useContext } from "react";

const FirebaseContext = React.createContext();

export const withFirebase = Component => props => {
  const fbObj = useContext(FirebaseContext);
  return (<Component {...props} firebase={fbObj} />);
};

export default FirebaseContext;
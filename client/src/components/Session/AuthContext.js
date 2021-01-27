import React, { useContext, useEffect, useState } from "react";
import { withFirebase } from "../Firebase/context";
import { gql, useMutation } from "@apollo/client";

const hasuraAddUser = gql`
  mutation MyMutation($username: String!, $dob: date!) {
    insert_users_one(object: { user_name: $username, dob: $dob }) {
      avatar_img_url
    }
  }
`;

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const withAuthentication = (Component) => {
  function AuthProvider({ props, firebase }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [addUser, { data }] = useMutation(hasuraAddUser);

    function signup(email, username, password, dob) {
      let obj = firebase.auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            console.log(dob);
            addUser({ variables: { username: username, dob: dob } });
        })
        .catch((error) => {
          console.log(error);
        });
      return obj;
    }

    function login(email, password) {
      return firebase.auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
      firebase.auth.signOut();
    }

    useEffect(() => {
      const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
        setLoading(false);
      });

      return unsubscribe;
    }, [firebase]);

    const value = {
      currentUser,
      signup,
      login,
      logout,
    };

    return (
      <AuthContext.Provider value={value}>
        {!loading && <Component {...props} />}
      </AuthContext.Provider>
    );
  }

  //Wraps AuthProvider with context where it consumes the props and firebase object from FirebaseContext
  return withFirebase(AuthProvider);
};

export default withAuthentication;

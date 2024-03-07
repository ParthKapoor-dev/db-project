import { createContext, useReducer, useEffect } from "react";


export const userContext = createContext();

export function handleReducerHook(prevState, action) {

  switch (action.type) {
    case "login": {
      console.log(`${action.payload.user.name} has logged In`);
      localStorage.setItem('user', JSON.stringify(action.payload))
      return { ...action.payload }
    }
    case "logout": {
      console.log('User Logged Out');
      localStorage.removeItem('user')
      return { user: null, token: null }
    }
    case "UpdateUser": {
      console.log("Updating User Info");
      const data = {
        ...prevState, user: action.payload
      }
      localStorage.setItem('user', JSON.stringify(data))
      return data
    }
  }
}


export function UserContextProvider({ children }) {

  const [state, dispatch] = useReducer(handleReducerHook, {
    user: null,
    token: null
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData) {
      dispatch({ type: 'login', payload: userData })
    }
  }, []);

  return (
    <userContext.Provider value={{ ...state, dispatch }}>
      {children}
    </userContext.Provider>
  )
}
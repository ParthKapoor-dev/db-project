import { createContext , useReducer , useEffect  } from "react";


export const userContext = createContext();

export function handleReducerHook(prevState, action) {

  switch (action.type) {
    case "login": {
      console.log(`${action.payload.user.name} has logged In`)
      return { ...action.payload }
    }
    case "logout": {
      console.log('User Logged Out');
      return { user: null, token: null }
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
      dispatch('login', userData)
    }
  }, []);

  return (
    <userContext.Provider value={{ ...state, dispatch }}>
      {children}
    </userContext.Provider>
  )
}
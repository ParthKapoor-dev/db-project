import { useRef } from "react";
import { CurrentMode } from "../../../currentMode";


export default function LoginPage() {

  const emailRef = useRef();
  const passwordRef = useRef();

  async function handleSubmit() {


    const body = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    const serverUrl = CurrentMode.url + '/auth/login'
    const response = await fetch(serverUrl, {
      headers: {
        'content-type': 'application/json'
      }
    });

    const json = await response.json();

    if (response.ok) {
      console.log('Successful Registraion , User : ')
      console.log(json);
      dispatch({ type : 'login' , payload : json})
    } else {

      console.error('Unsuccessful Registration')
      console.log(json);
    }

  }


  return (
    <div className="">
      <div className="loginPage-heading">
        Login Page
      </div>

      <form className="loginPage-form" onSubmit={handleSubmit}>
        <label htmlFor="loginPage-email">Email</label>
        <input type="text" id="loginPage-email" ref={emailRef} required="true"/>

        <label htmlFor="loginPage-password">Password</label>
        <input type="password" id="loginPage-password" ref={passwordRef} required="true" />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}
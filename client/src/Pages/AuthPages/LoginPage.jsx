import { CurrentMode } from "../../../currentMode";


export default function LoginPage() {

  async function handleSubmit() {

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
        <label htmlFor="loginPage-emial">Email</label>
        <input type="text" id="loginPage-emial" />

        <label htmlFor="loginPage-password">Password</label>
        <input type="password" id="loginPage-password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
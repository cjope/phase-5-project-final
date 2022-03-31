import {TextField } from "@material-ui/core";

function SignUpForm({setUsername, setEmail, setPassword, setPasswordConfirmation}) {

  function handleChange(e){
    const {name, value} = e.target
    if(name === "username") {setUsername(value)}
    else if(name === "email") {setEmail(value)}
    else if(name === "password") {setPassword(value)}
    else if(name === "password_confirmation") {setPasswordConfirmation(value)}
  }

  const userField = (label, type="text") => {
    let name = label.toLowerCase().replace(" ","_")
    return(
      <TextField 
        required
        variant="outlined"
        label={label}
        name={name}
        type={type}
        onChange={e=>handleChange(e)}
      ></TextField>
    )
  }

  return (
    <>
      {userField("Username")}
      {userField("Email")}
      {userField("Password", "password")}
      {userField("Password Confirmation", "password")}
    </>
  );
}
export default SignUpForm;
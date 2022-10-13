import React, { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState("")
    const [phone, setPhonenumber] = useState("")

    
  return (
    <>
    <div>Login</div>
    <form>
        <label>Username:
            <input type="text" />
        </label>
        <label>Phone Number:
            <input type="number" />
        </label>
    </form>
    </>
  )
}

export default Login
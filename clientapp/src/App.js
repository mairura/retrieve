import './App.css';
import React, { useRef, useState } from "react"

function App() {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [nationality, setNationality] = useState("")
  const [phoneNumber, setNumber] = useState("")
  const form =useRef();

  const handleUser = async (e) => {
    e.preventDefault(0);
    setName("")
    setAge("")
    setNationality("")
    setNumber("")

    const response = await fetch("http://localhost:4000/user", {
      method: "POST",
      headers: {
        'content-type':'application/json',
      },
      body: JSON.stringify({
        name, 
        age,
        nationality,
        phoneNumber
      })
    })
  }
  
  return (
    <>
    <h2>Hello User</h2>
    <form ref={form} onSubmit={handleUser}>
      <label>Name: 
      <input type="text" value={name}  onChange={(e) => setName(e.target.value)} />
      </label>
      <label>Age: 
        <input type="text" value={age}  onChange={(e) => setAge(e.target.value)}/>
      </label>
      <label>Nationality: 
        <input type="text" value={nationality} onChange={(e) => setNationality(e.target.value)}/>
      </label>
      <label>Phone Number: 
        <input type="number" value={phoneNumber}  onChange={(e) => setNumber(e.target.value)}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
    </>
  );
}

export default App;

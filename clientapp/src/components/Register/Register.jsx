import React from 'react'
import axios from "axios";
import { useEffect, useRef, useState } from "react"

const Register = () => {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [age, setAge] = useState("")
    const [nationality, setNationality] = useState("")
    const [phoneNumber, setNumber] = useState("")
    const form =useRef();
  
    const [products, setProducts] = useState("")
  
    const handleUser = async (e) => {
      e.preventDefault(0);
      setName("")
      setUsername("")
      setAge("")
      setNationality("")
      setNumber("")
  
      const response = await fetch("http://localhost:4000/user", {
        method: "GET",
        headers: {
          'content-type':'application/json',
        },
        body: JSON.stringify({
          name, 
          username,
          age,
          nationality,
          phoneNumber
        })
      })
   
  }
    
    useEffect(() => {
      const fetchData = async () => {
        const {data} = await axios.get("http://localhost:4000/register");
        setProducts(data)
        console.log(data);
      }
      fetchData()
    }, [])
  return (
    <>
    <h2>Hello {products.name}</h2>
    
    <form ref={form} onSubmit={handleUser}>
      <label>Name: 
      <input type="text" value={name}  onChange={(e) => setName(e.target.value)} />
      </label>
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
        <input type="number" value={phoneNumber} name="phoneNo" onChange={(e) => setNumber(e.target.value)}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
    </>
  )
}

export default Register
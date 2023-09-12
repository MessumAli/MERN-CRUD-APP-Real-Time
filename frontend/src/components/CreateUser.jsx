import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function CreateUser() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState(0)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleAge = (event) => {
    setAge(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const notify = () => {
      toast('Error')
    }

    const createUser = { name, email, age }

    const response = await fetch('http://localhost:4000/user', {
      method: "POST",
      body: JSON.stringify(createUser),
      headers: {
        'Content-type': 'application/json'
      }
    })
    const result = await response.json()

    if (!response.ok) {
      console.log(result.error)
      setError(result.error)
      { notify() }
    }
    if (response.ok) {
      console.log(result)
      setError("")
      setName("")
      setEmail("")
      setAge(0)
      navigate('/')
    }
  }

  return (
    <div className='container my-2'>
      <h2 className='text-center'>Enter User Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={handleName} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input type="email" className="form-control" value={email} onChange={handleEmail} />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input type="number" className="form-control" value={age} onChange={handleAge} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

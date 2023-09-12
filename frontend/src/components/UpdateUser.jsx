import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function UpdateUser() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState(0)
  const [error, setError] = useState("")


  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleAge = (event) => {
    setAge(event.target.value)
  }

  const navigate = useNavigate()

  const { id } = useParams()

  const getSingleUser = async () => {

    const response = await fetch(`http://localhost:4000/user/${id}`)

    const result = await response.json()
    if (!response.ok) {
      console.log(result.error)
      setError(result.error)
    }
    if (response.ok) {
      setName(result.name)
      setEmail(result.email)
      setAge(result.age)
    }
  }

  useEffect(() => {
    getSingleUser()
  }, [])

  const handleUpdate = async (event) => {
    event.preventDefault()
    const notify = () => {
      toast('Error')
    }

    const updatedUser = { name, email, age }

    const response = await fetch(`http://localhost:4000/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
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
      setError('')
      navigate('/')
    }
  }


  return (
    <div className='container my-2'>
      <h2 className='text-center'>Edit User Data</h2>
      <form onSubmit={handleUpdate}>
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

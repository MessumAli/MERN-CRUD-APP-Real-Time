import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { io } from "socket.io-client";

export default function AllUser() {

  const socket = io("http://localhost:4000");

  const [allUser, setAllUser] = useState()
  const [error, setError] = useState("")

  const getAllUser = async () => {

    const response = await fetch('http://localhost:4000/user')
    const result = await response.json()
    if (!response.ok) {
      console.log(result.error)
      setError(result.error)
    }
    if (response.ok) {
      setAllUser(result)
    }
  }

  useEffect(() => {
    getAllUser()

    socket.on("userUpdated", (data) => {
      setAllUser((prevUsers) => [...prevUsers, data]);
    });

    socket.on("userDataUpdated", (data) => {
      setAllUser((prevUsers) => prevUsers.map(user => user._id === data._id ? data : user));
    });

    socket.on("userDeleted", (id) => {
      getAllUser()

    });

    return () => {
      socket.off("userUpdated");
      socket.off("userDataUpdated");
      socket.off("userDeleted");
    };
  }, [])

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:4000/user/${id}`, {
      method: 'DELETE'
    })
    const result = await response.json()
    if (!response.ok) {
      console.log(result.error)
      setError(result.error)
    }
    if (response.ok) {
      getAllUser()
      socket.emit("deleteUser", id);
    }
  }

  return (
    <div className='container my-2'>
      <h2 className='text-center'>All User</h2>
      <div className="row">
        {allUser?.map((user) => {
          return <div key={user._id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                <p className="text-muted">{user.age}</p>
                <Link to={`updateuser/${user._id}`} className="card-link">Edit User</Link>
                <a href="#" className="card-link" onClick={() => handleDelete(user._id)}>Delete User</a>
              </div>
            </div>
          </div>
        })}

      </div>
    </div>
  )
}  

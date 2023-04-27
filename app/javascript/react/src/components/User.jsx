import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import axios from "axios";

const User = () => {

  const [id, setId] = useState('')

  const [isSuccess, setIsSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const genderOption = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ]

  const [formField, setFormField] = useState({
    name: '',
    email: '',
    gender: genderOption[0].value,
    preferred_os: 'macos',
    birthday: '',
    age: '',
    enable: false
  })

  const handleFormFields = (user) => {
    value = user.target.type === 'checkbox' ? user.target.checked : user.target.value
    console.log(value)
    setFormField({ ...formField, [user.target.name]: value})
  }

  const initialValueOfAlert = (event) => {
    setIsSuccess(false)
    setSuccessMessage('')
    setIsError(false)
    setErrorMessage('')
  }

  // Fetch Users
  const [users, setUsers] = useState([])

  const fetchUsers = () => {
    axios.get(`/api/v1/users`).then((response) => {
      console.log(response.data);
      setUsers(response.data)
    });
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  // End Fetch Users

  // Create User
  const prepareForNew = (event) => {
    initialValueOfAlert()
    setFormField({
      name: '',
      email: '',
      gender: genderOption[0].value,
      preferred_os: 'macos',
      birthday: '',
      age: '',
      enable: false
    })
  }

  const createUserSubmit = (event) => {
    event.preventDefault()
    console.log(formField)
    createUser(formField)
  }

  const createUser = (data) => {
    axios.post(`/api/v1/users`, { user: data }).then((response) => {
      console.log('Response:', response.data)
      if (response.data.status === "success") {
        setIsError(false)
        setErrorMessage('')
        setIsSuccess(true)
        setSuccessMessage(response.data.message)
        fetchUsers()
      }
    }).catch((error) => {
      if (error.response.data.status === "failure") {
        setIsSuccess(false)
        setSuccessMessage('')
        setIsError(true)
        setErrorMessage(error.response.data.message)
      } else {
        setIsSuccess(false)
        setSuccessMessage('')
        setIsError(true)
        setErrorMessage(error.message)
      }
    })
  }
  // End Create User

  // Edit User
  const prepareForEdit = (event, user) => {
    console.log(user)
    initialValueOfAlert()
    setId(user.id)
    setFormField({
      name: user.name || "",
      email: user.email || "",
      gender: user.gender || "",
      preferred_os: user.preferred_os || "",
      birthday: user.birthday || "",
      age: user.age || "",
      enable: user.enable
    })
  }

  const editUserSubmit = (event) => {
    event.preventDefault()
    console.log(formField)
    editUser(formField)
  }

  const editUser = (data) => {
    console.log(data)
    console.log(id)
    axios.put(`/api/v1/users/${id}`, { user: data }).then((response) => {
      console.log('Response:', response.data)
      if (response.data.status === "success") {
        setIsError(false)
        setErrorMessage('')
        setIsSuccess(true)
        setSuccessMessage(response.data.message)
        fetchUsers()
      }
    }).catch((error) => {
      if (error.response.data.status === "failure") {
        setIsSuccess(false)
        setSuccessMessage('')
        setIsError(true)
        setErrorMessage(error.response.data.message)
      } else {
        setIsSuccess(false)
        setSuccessMessage('')
        setIsError(true)
        setErrorMessage(error.message)
      }
    })
  }
  // End Edit User

  // Delete User
  const deleteUserSubmit = (event, id) => {
    console.log(id)
    event.preventDefault()
    if (confirm('Are you sure ?')) {
      deleteUser(id)
    }
  }

  const deleteUser = (id) => {
    console.log(id)
    axios.delete(`/api/v1/users/${id}`).then((response) => {
      console.log('Response:', response.data)
      if (response.data.status === "success") {
        setIsError(false)
        setErrorMessage('')
        setIsSuccess(true)
        setSuccessMessage(response.data.message)
        fetchUsers()
      }
    }).catch((error) => {
      if (error.response.data.status === "failure") {
        setIsSuccess(false)
        setSuccessMessage('')
        setIsError(true)
        setErrorMessage(error.response.data.message)
      } else {
        setIsSuccess(false)
        setSuccessMessage('')
        setIsError(true)
        setErrorMessage(error.message)
      }
    })
  }
  // End Delete User

  return(
    <div className="row">
      <div className="col-lg-10 mx-auto">
        <h1>Users</h1>
        <div className="float-end">

          <button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#createModal" onClick={event => prepareForNew(event)}>New</button>

          <div className="modal fade" id="createModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    New User
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={event => initialValueOfAlert(event)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={createUserSubmit}>

                    <div className="form-group mb-2">
                      <label className="form-label"> Name </label>
                      <input type="text" className="form-control rounded-0" name="name" placeholder="Ex. Mistry Viral" value={formField.name} onChange={event => handleFormFields(event)}/>
                    </div>

                    <div className="form-group mb-2">
                      <label className="form-label"> Email </label>
                      <input type="email" className="form-control rounded-0" name="email" placeholder="Ex. viralh.mistry@gmail.com" value={formField.email} onChange={event => handleFormFields(event)}/>
                    </div>

                    <div className="form-group mb-2">
                      <label className="form-label"> Gender </label>
                      <select className="form-select rounded-0" value={formField.gender} onChange={event => handleFormFields(event)} name="gender">
                        {
                          genderOption.map(gender => (
                            <option key={gender.value} value={gender.value}> {gender.label} </option>
                          ))
                        }
                      </select>
                    </div>

                    <div className="form-group mb-2">
                      <label className="form-label"> Preferred OS </label>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="preferred_os" value="macOS" checked={formField.preferred_os === "macOS"} onChange={event => handleFormFields(event)}/>
                        <label className="form-check-label"> macOS </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="preferred_os" value="Linux" checked={formField.preferred_os === "Linux"} onChange={event => handleFormFields(event)} />
                        <label className="form-check-label"> Linux </label>
                      </div>

                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="preferred_os" value="Windows" checked={formField.preferred_os === "Windows"} onChange={event => handleFormFields(event)} />
                        <label className="form-check-label"> Windows </label>
                      </div>
                    </div>

                    <div className="form-group mb-2">
                      <label className="form-label"> Birthday </label>
                      <input type="date" className="form-control rounded-0" name="birthday" value={formField.birthday} onChange={event => handleFormFields(event)}/>
                    </div>

                    <div className="form-group mb-2">
                      <label className="form-label"> Age </label>
                      <input type="number" className="form-control rounded-0" name="age" min="1" max="100" value={formField.age} onChange={event => handleFormFields(event)}/>
                    </div>

                    <div className="form-group mb-2">
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" name="enable" checked={formField.enable} onChange={event => handleFormFields(event)} />
                        <label className="form-check-label">Enable</label>
                      </div>
                    </div>

                    {
                      isError &&
                      <div className="alert alert-danger" role="alert">
                        {errorMessage}
                      </div>
                    }

                    {
                      isSuccess &&
                      <div className="alert alert-success" role="alert">
                        {successMessage}
                      </div>
                    }

                    <div className="form-group mb-2">
                      <button type="submit" className="btn btn-primary">Create User</button>
                    </div>

                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={event => initialValueOfAlert(event)}>Close</button>
                </div>
              </div>
            </div>
          </div>

        </div>

        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Gender</th>
              <th scope="col">Birthday</th>
              <th scope="col">Age</th>
              <th scope="col">Preferred OS</th>
              <th scope="col">Enable</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user) =>
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.display_birthday}</td>
                  <td>{user.age}</td>
                  <td>{user.preferred_os}</td>
                  <td>
                    {
                      user.enable ?
                        <span className="badge rounded-pill bg-success">Yes</span>
                        : <span className="badge rounded-pill bg-danger">No</span>
                    }
                  </td>
                  <td>
                    <button type="button" className="btn btn-outline-warning me-2" data-bs-toggle="modal" data-bs-target="#editModal" onClick={event => prepareForEdit(event, user)}>
                      Edit
                    </button>
                    <button type="button" className="btn btn-outline-danger" onClick={event => deleteUserSubmit(event, user.id)}>
                      Destroy
                    </button>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>

        <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit User
                </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={event => initialValueOfAlert(event)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={editUserSubmit}>

                  <div className="form-group mb-2">
                    <label className="form-label"> Name </label>
                    <input type="text" className="form-control rounded-0" name="name" placeholder="Ex. Mistry Viral" value={formField.name} onChange={event => handleFormFields(event)}/>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label"> Email </label>
                    <input type="email" className="form-control rounded-0" name="email" placeholder="Ex. viralh.mistry@gmail.com" value={formField.email} onChange={event => handleFormFields(event)}/>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label"> Gender </label>
                    <select className="form-select rounded-0" value={formField.gender} onChange={event => handleFormFields(event)} name="gender">
                      {
                        genderOption.map(gender => (
                          <option key={gender.value} value={gender.value}> {gender.label} </option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label"> Preferred OS </label>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="preferred_os" value="macOS" checked={formField.preferred_os === "macOS"} onChange={event => handleFormFields(event)}/>
                      <label className="form-check-label"> macOS </label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="preferred_os" value="Linux" checked={formField.preferred_os === "Linux"} onChange={event => handleFormFields(event)} />
                      <label className="form-check-label"> Linux </label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="preferred_os" value="Windows" checked={formField.preferred_os === "Windows"} onChange={event => handleFormFields(event)} />
                      <label className="form-check-label"> Windows </label>
                    </div>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label"> Birthday </label>
                    <input type="date" className="form-control rounded-0" name="birthday" value={formField.birthday} onChange={event => handleFormFields(event)}/>
                  </div>

                  <div className="form-group mb-2">
                    <label className="form-label"> Age </label>
                    <input type="number" className="form-control rounded-0" name="age" min="1" max="100" value={formField.age} onChange={event => handleFormFields(event)}/>
                  </div>

                  <div className="form-group mb-2">
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" name="enable" checked={formField.enable} onChange={event => handleFormFields(event)} />
                      <label className="form-check-label">Enable</label>
                    </div>
                  </div>

                  {
                    isError &&
                    <div className="alert alert-danger" role="alert">
                      {errorMessage}
                    </div>
                  }

                  {
                    isSuccess &&
                    <div className="alert alert-success" role="alert">
                      {successMessage}
                    </div>
                  }

                  <div className="form-group mb-2">
                    <button type="submit" className="btn btn-primary">Update User</button>
                  </div>

                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={event => initialValueOfAlert(event)}>Close</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default User;

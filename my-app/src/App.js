
import './App.css';
import {useEffect, useState} from 'react'
import './App.css'
import {Routes,Route, Link, useNavigate} from 'react-router-dom'







function App() {

  let [form,setForm] = useState({})  
  let [data, setdata] = useState({})
  let [users, setUsers] = useState([])
  let navigate = useNavigate()

  

  const handleForm = (e) => {
    setForm({
      ...form ,
      [e.target.name] : e.target.value
    })
  }

  // Post data to create user
  const handleSubmit = async (e) => {
    e.preventDefault()

   let res = await fetch('http://localhost:8080/user',{
    method : 'POST',
    body : JSON.stringify(form),
    headers : {
      'Content-Type':'application/json'
    }
   })
   let data = await res.json()
   setdata(data)
  }

  // Get Users
  let getUsers = async () => {
    let res = await fetch('http://localhost:8080/user', {
      method : 'GET'
    })
    let data = await res.json()
    setUsers(data)
  }
  useEffect( () => {
    getUsers()
  }, [data])

  // Delete user
  let Delete = async (_id) => {
    let res = await fetch(`http://localhost:8080/user/${_id}`,{
      method: "DELETE"
    }).then( () => getUsers())
    
  }




  return (
    <div className="App">
      {data.username && <p>user {data.username} is saved in database successfully</p>}

      {/* Post User */}
      <form onSubmit={handleSubmit}>
        <span>Username</span>
        <input type='text' name="username" onChange={handleForm}></input>

        <span>Password</span>
        <input type='text' name="password" onChange={handleForm}></input>
        
        <input type='submit'></input>
      </form>

      {/* Get users  */}
      <div className='showUsers'>
          <h2>Users : </h2>
          <ul>
            {users.map(user => <li key={user._id}>{user.username} <button className='deleteBtn' onClick={ () => Delete(user._id)}>Delete</button></li>)}
          </ul>
      </div>

      <Routes>
        <Route path="/taylor" element={<img src='https://i.guim.co.uk/img/media/29e9d1c242ea444f2287886ea1002b8f14d595b0/0_31_3180_1909/master/3180.jpg?width=620&dpr=2&s=none'/>}></Route>
      </Routes>

      <button onClick={() => navigate('/taylor')} className='linkBtn'>Taylor !!</button>

    </div>
  );
}




export default App;

import React, {useContext, useEffect} from 'react'
import noteContext from '../context/notes/noteContext';

const Profile = () => {

    const context = useContext(noteContext);
    const { user, getUser} = context;
    useEffect(() => {
      getUser()
    }
    // eslint-disable-next-line
    , [])
    
    return (
    <>
    <h2>User's Details</h2>
    <p>
    Name: {user.name}
    </p>
    <p>
    Email: {user.email}
    </p>
    <p>
    Account Created: {new Date(user.date).toLocaleString()}
    </p>
    </>
  )
}

export default Profile
function User({user}) {

    return (
      <div>
        {user ?
          <div>
            <div>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
            </div>
          </div>
          :
          <></>
        }
      </div>
    )
  }
  export default User
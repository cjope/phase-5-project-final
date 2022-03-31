function User({user}) {

    return (
      <div className="user">
        {user ?
          <div style={{display: "flex"}} >
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
  export default User;
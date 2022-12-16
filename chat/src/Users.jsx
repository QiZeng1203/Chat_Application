function Users({users}) {
    return (
        <div className="users">
            <ul className="userslist">
                { users.map( user => (
                    <li className="user" key={user}>
                        <p>{user}</p>
                     </li>
                ))}
            </ul>
        </div>
    )
}

export default Users;
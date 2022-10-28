import React, { useContext,useState } from "react";

const UsersContext = React.createContext();
const UsersContextDispatcher = React.createContext();

const UsersProvider = ({children}) => {
  const [users,setUsers] = useState([]);

  return (
    <UsersContext.Provider value={users}>
      <UsersContextDispatcher.Provider value={setUsers}>
        {children}
      </UsersContextDispatcher.Provider>
    </UsersContext.Provider>
  );
}

export default UsersProvider;

export const useUsers = () => useContext(UsersContext);

export const useUsersActions = () => useContext(UsersContextDispatcher);
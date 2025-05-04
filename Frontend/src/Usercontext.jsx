import React, { createContext, useState } from 'react'

export const UsercontextData = createContext()

const Usercontext = ({children}) => {
  const [user, setUser] =useState(null)
  return (
    <UsercontextData.Provider value={{user,setUser}}>
      {children}
      </UsercontextData.Provider>
  )
}

export default Usercontext
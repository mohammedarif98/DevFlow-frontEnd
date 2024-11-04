import React from 'react'
import { useSelector } from 'react-redux'


const Home: React.FC = () => {

  const { user } = useSelector((state: any) => state.user)

  return (
    <div className=''>
      {user ? user.username : null}
    </div>
  )
}


export default Home
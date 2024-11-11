import React from 'react'
import { useSelector } from 'react-redux'



const Dashboard:React.FC = () => {

  const { admin } = useSelector((state:any) => state.admin);

  return (
    <div className="p-1">
      <h1 className="text-2xl font-bold mb-3">Welcome To <span className='text-red-500'>{ admin.username}</span> Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Total Users</h2>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Active Users</h2>
          <p className="text-3xl font-bold">987</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">New Users (Last 30 Days)</h2>
          <p className="text-3xl font-bold">234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Revenue</h2>
          <p className="text-3xl font-bold">$56,789</p>
        </div>
      </div>
    </div>
  )
}


export default Dashboard
import React, { useEffect, useState } from 'react'
import { getUserProfile } from '../../../../services/axios.GetMethods';


interface UserProfile {
    id: string;
    username: string;
    email: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
  }

const Profile:React.FC = () => {

    const [data, setData] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const result = await getUserProfile();
                console.log("user data :",result);
                setData(result.data.user);
            }catch(error:any){
                console.error('Failed to fetch users:', error.message);
            }
        }
        fetchUserData();
    },[]);
  
    return (
        <div>
        {/* Display user profile data */}
        {data ? (
          <div>
            <h3>Profile Details</h3>
            <p><strong>Username:</strong> {data.username}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Verified:</strong> {data.isVerified ? 'Yes' : 'No'}</p>
            <p><strong>Created At:</strong> {new Date(data.createdAt).toLocaleDateString()}</p>
            <p><strong>Updated At:</strong> {new Date(data.updatedAt).toLocaleDateString()}</p>
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
  )
}

export default Profile
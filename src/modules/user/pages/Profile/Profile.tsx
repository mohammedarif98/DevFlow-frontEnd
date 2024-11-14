import React, { useEffect, useState } from 'react'
import { getUserProfile } from '../../../../services/axios.GetMethods';
import profile_image from '../../../../assets/images/SAVE_20241105_220105~2.jpg'

interface UserProfile {
    id: string;
    username: string;
    email: string;
    profilePhoto?: string;
    isVerified: boolean;
  }


const Profile:React.FC = () => {
    const [activeTab, setActiveTab] = useState(1);
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
      <div className='container mx-auto max-w-6xl mt-24 bg-white p-6 border border-gray-200'>
        <div className='bg-white p-2'>
          <div className='flex flex-col md:flex-row md:items-end md:justify-between space-y-4 md:space-y-0'>
            <div className='flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4'>
              {data?.profilePhoto ? (
                <img src={data.profilePhoto} alt="" className='h-36 w-36 md:h-48 md:w-48 rounded-full' />
              ) : (
                <img src={profile_image} alt="" className='h-36 w-36 md:h-48 md:w-48 rounded-full' />
              )}
              <p className='text-2xl md:text-4xl font-bold px-6'>{data?.username}</p>
            </div>
            <div className='flex justify-end md:justify-center'>
              <p className='text-black cursor-pointer'>Edit Profile</p>
            </div>
          </div>
        </div>

        <div className='bg-white p-1'>
          <div className="container mx-auto">
            {/* ---------- Tab navigation ------------ */}
            <ul className="flex border-b flex-wrap">
              <li className="mr-1">
                <button
                  onClick={() => setActiveTab(1)}
                  className={`py-2 px-4 font-normal transition-colors duration-300 ${
                    activeTab === 1 ? 'text-black border-b-[1px] border-black' : 'bg-white text-black'
                  }`}
                >
                  Home
                </button>
              </li>
              <li className="mr-1">
                <button
                  onClick={() => setActiveTab(2)}
                  className={`py-2 px-4 font-normal transition-colors duration-300 ${
                    activeTab === 2 ? 'text-black border-b-[1px] border-black' : 'bg-white text-black'
                  }`}
                >
                  About
                </button>
              </li>
            </ul>

            {/* ------------ -Tab content ------------- */}
            <div className="bg-white text-black p-6 rounded-b">
              {activeTab === 1 && (
                <div className='p-4 border border-gray-200'>
                  <h3 className="text-black">Standard tab panel created on bootstrap using nav-tabs</h3>
                </div>
              )}
              {activeTab === 2 && (
                <div className='p-4 border border-gray-200'>
                  <h3 className="text-black">Notice the gap between the content and tab after applying a background color</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
}



export default Profile
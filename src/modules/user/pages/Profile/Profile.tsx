import React, { useEffect, useState } from 'react'
import { getUserProfile } from '../../../../services/axios.GetMethods';
import profile_image from '../../../../assets/images/SAVE_20241105_220105~2.jpg'
import Modal from '../../../../common/Modal';


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
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    //--------- modal for edit profile --------------
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
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
              <p className='text-red-600 cursor-pointer' onClick={openModal}>Edit Profile</p>
            </div>
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              title="Profile Information"
              modalStyle="bg-gray-50"
              titleStyle="text-black"
              closeBtnStyle="text-black"
            >
              
              <div className='m-2 flex space-x-8'>
                <div className='flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4'>
                  {data?.profilePhoto ? (
                    <img src={data.profilePhoto} alt="" className='h-20 w-20 rounded-full' />
                  ) : (
                    <img src={profile_image} alt="" className='h-20 w-20 rounded-full' />
                  )}
                </div>
                <div className='flex items-center space-x-4'>
                  <p className='text-md text-green-600 cursor-pointer'>Update</p>
                  <p className='text-md text-red-700 cursor-pointer'>Remove</p>
                </div>
              </div>

              <div className='my-4 space-y-4'>
                <div>
                  <label htmlFor="username" className='block text-sm font-medium text-gray-700'>Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={data?.username}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm'
                    placeholder="Enter your username"
                  />
                </div>
                <div>
                  <label htmlFor="email" className='block text-sm font-medium text-gray-700'>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={data?.email}
                    className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm'
                    placeholder="Enter your email"
                    readOnly
                  />
                </div>
              </div>

              <div className='flex justify-end space-x-2'>
                <button
                  onClick={closeModal}
                  className="mt-3 bg-black text-white p-2 rounded-sm hover:bg-black"
                >
                  Cancel
                </button>
                <button
                  onClick={closeModal}
                  className="mt-3 bg-green-800 text-white rounded-sm p-2 hover:bg-green-700"
                >
                  Save
                </button>
              </div>

            </Modal>
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


export default Profile;
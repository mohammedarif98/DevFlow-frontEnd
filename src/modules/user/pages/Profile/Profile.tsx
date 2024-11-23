import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../../../services/axios.GetMethods";
import profile_image from "../../../../assets/images/SAVE_20241105_220105~2.jpg";
import Modal from "../../../../common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../../services/axios.PutMethods";
import { updateUserFail, updateUserStart, updateUserSuccess } from "../../../../redux/slices/userSlice/userSlice";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";



// interface UserProfile {
//   id: string;
//   username: string;
//   email: string;
//   profilePhoto?: string;
//   isVerified: boolean;
// }

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formState, setFormState] = useState({username: "", profilePhoto: null as File | null,});
  const { user, loading } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();


  //--------- modal for edit profile --------------
  const openModal = () => {
    setIsModalOpen(true);
    setFormState({
      username: user?.username || "",
      profilePhoto: null,
    });
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setFormState({
      username: "",
      profilePhoto: null,
    });
  };


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await getUserProfile();
        dispatch(updateUserSuccess(result.data.user));
      } catch (error: any) {
        console.error("Failed to fetch users:", error.message);
        dispatch(updateUserFail(error.message));
      }
    };
    fetchUserData();
  }, [dispatch]);

  //* ----------------- Handle Input Change  ---------------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  //* ---------------- Handle Form Submission ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (formState.profilePhoto) {
      formData.append("profilePhoto", formState.profilePhoto);
    }
    formData.append("username", formState.username);

    try {
      dispatch(updateUserStart());
      const result = await updateUserProfile(formData);
      console.log('API response:', result);
      toast.success(result.message);
      dispatch(updateUserSuccess(result.user));
      closeModal();
    } catch (error:any) {
      console.error('Error updating profile:', error);
      dispatch(updateUserFail(error.message));
    }
  };


  return (
    <div className="container mx-auto max-w-7xl mt-24 bg-white p-1 border border-gray-200">
      <div className="bg-slate-500 p-6 rounded-md">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between space-y-4 md:space-y-0 ">
          <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4 ">
            {user?.profilePhoto ? (
              <img
                src={user.profilePhoto}
                alt="profile"
                className="h-36 w-36 md:h-48 md:w-48 rounded-full"
              />
            ) : (
              <img
                src={profile_image}
                alt=""
                className="h-36 w-36 md:h-48 md:w-48 rounded-full"
              />
            )}
            <p className="text-2xl md:text-4xl font-bold px-6">
              {user?.username}
            </p>
          </div>
          <div className="flex justify-end md:justify-center">
            <p className="text-red-600 cursor-pointer" onClick={openModal}>
              Edit Profile
            </p>
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            title="Profile Information"
            modalStyle="bg-gray-50 max-w-[600px]"
            titleStyle="text-black"
            closeBtnStyle="text-black"
          >
            <form onSubmit={handleSubmit}>
              <div className="">
                <div className="m-2 flex space-x-8">
                  <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
                    {formState?.profilePhoto ? (
                      <img
                        src={URL.createObjectURL(formState.profilePhoto)}
                        alt=""
                        className="h-24 w-24 rounded-full"
                      />
                    ) : (
                      <img
                        src={user.profilePhoto}
                        alt=""
                        className="h-24 w-24 rounded-full"
                      />
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                  <label
                    htmlFor="profilePhoto"
                    className="text-md text-green-600 cursor-pointer hover:underline"
                  >
                    Update
                  </label>
                  <input
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                  </div>
                </div>

                <div className="my-4 space-y-4">
                  <div>
                    <label
                      htmlFor="dataname"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      defaultValue={ formState?.username }
                      onChange={ handleInputChange }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={user?.email || ""}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
                      placeholder="Enter your email"
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={closeModal}
                    className="mt-3 bg-black text-white py-1 px-4 rounded-md hover:bg-black"
                  >
                    Cancel
                  </button>
                  <button
                    className="mt-3 bg-green-800 text-white rounded-md py-1 px-4 hover:bg-green-700"
                  >
                   {loading ? <FaSpinner className="animate-spin mx-auto text-white" /> : "Save" }
                  </button>
                </div>
              </div>
            </form>
          </Modal>
        </div>
      </div>

      <div className="bg-white p-1">
        <div className="container mx-auto">
          {/* ---------- Tab navigation ------------ */}
          <ul className="flex border-b flex-wrap">
            <li className="mr-1">
              <button
                onClick={() => setActiveTab(1)}
                className={`py-2 px-4 font-normal transition-colors duration-300 ${
                  activeTab === 1
                    ? "text-black border-b-[1px] border-black"
                    : "bg-white text-black"
                }`}
              >
                Home
              </button>
            </li>
            <li className="mr-1">
              <button
                onClick={() => setActiveTab(2)}
                className={`py-2 px-4 font-normal transition-colors duration-300 ${
                  activeTab === 2
                    ? "text-black border-b-[1px] border-black"
                    : "bg-white text-black"
                }`}
              >
                About
              </button>
            </li>
          </ul>

          {/* ------------ -Tab content ------------- */}
          <div className="bg-white text-black rounded-b">
            {activeTab === 1 && (
              <div className="p-4 border border-gray-200">
                <h3 className="text-black">
                  Standard tab panel created on bootstrap using nav-tabs
                </h3>
              </div>
            )}
            {activeTab === 2 && (
              <div className="p-4 border border-gray-200">
                <h3 className="text-black">
                  Notice the gap between the content and tab after applying a
                  background color
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

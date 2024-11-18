import React, { useState } from "react";
import Modal from "../../../../common/Modal";

const Category: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //--------- modal for edit profile --------------
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="my-2 space-y-2">
      <div className="flex justify-between bg-white py-4 px-8 w-full">
        <div className="relative w-72">
          <input
            type="text"
            placeholder="Search by  category name..."
            className="py-1 px-2 border w-full pr-8 border-black rounded focus:outline-none"
          />
          <button
            className="absolute text-lg right-4 font-semibold top-4 transform -translate-y-1/2 text-black"
          >
            x
          </button>
        </div>
        <div>
          <button onClick={openModal} className="p-2 text-white rounded-md bg-green-700 hover:bg-green-600">
            Add Category
          </button>
        </div>
      </div>

      <div className="bg-white w-full p-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-10 xl:grid-cols-10 gap-4">
          <div className="flex flex-col justify-center items-center bg-green-400 p-4">
            <img src="" alt="" className="bg-slate-200 h-16 w-16" />
            <p className="text-lg font-semibold text-black">Tech</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-red-400 p-4">
            <img src="" alt="" className="bg-slate-200 h-16 w-16" />
            <p className="text-lg font-semibold text-black">Tech</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-emerald-600 p-4">
            <img src="" alt="" className="bg-slate-200 h-16 w-16" />
            <p className="text-lg font-semibold text-black">Tech</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-sky-600 p-4">
            <img src="" alt="" className="bg-slate-200 h-16 w-16" />
            <p className="text-lg font-semibold text-black">Tech</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-yellow-400 p-4">
            <img src="" alt="" className="bg-slate-200 h-16 w-16" />
            <p className="text-lg font-semibold text-black">Tech</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-purple-400 p-4">
            <img src="" alt="" className="bg-slate-200 h-16 w-16" />
            <p className="text-lg font-semibold text-black">Tech</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-blue-400 p-4">
            <img src="" alt="" className="bg-slate-200 h-16 w-16" />
            <p className="text-lg font-semibold text-black">Tech</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-pink-400 p-4">
            <img src="" alt="" className="bg-slate-200 h-16 w-16" />
            <p className="text-lg font-semibold text-black">Tech</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-gray-400 p-4">
            <img src="" alt="" className="bg-slate-200 h-16 w-16" />
            <p className="text-lg font-semibold text-black">Tech</p>
          </div>
          <div className="flex flex-col justify-center items-center bg-indigo-400 p-4">
            <img src="" alt="" className="bg-slate-200 h-16 w-16" />
            <p className="text-lg font-semibold text-black">Tech</p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Add Category"
        modalStyle="bg-gray-50"
        titleStyle="text-black"
        closeBtnStyle="text-black"
      >
        <div className='my-4 space-y-4'>
          <div>
            <label htmlFor="image" className='block text-sm font-medium text-gray-700'>Category Image</label>
            <input
              type="file"
              id="image"
              name="image"
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm'
            />
          </div>
          <div>
            <label htmlFor="category-name" className='block text-sm font-medium text-gray-700'>category Name</label>
            <input
              type="text"
              id="category-name"
              name="category-name"
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm'
              placeholder="Enter your Category Name"
              readOnly
            />
          </div>
        </div>

        <div className='flex justify-end space-x-2'>
          <button
            onClick={closeModal}
            className="mt-3 bg-black text-white py-1 px-4 rounded-md hover:bg-black"
          >
            Cancel
          </button>
          <button
            onClick={closeModal}
            className="mt-3 bg-green-800 text-white rounded-md py-1 px-4 hover:bg-green-700"
          >
            Add
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Category;

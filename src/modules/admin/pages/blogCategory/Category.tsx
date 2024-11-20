import React, { useEffect, useState } from "react";
import Modal from "../../../../common/Modal";
import { useCategoryForm } from "../../../../utils/validations/admin-validations/categoryValidation";
import { addCategory } from "../../../../services/axios.PostMethods";
import { toast } from "react-toastify";
import { CategoryFormType } from "../../../../utils/types/api-types";
import { getAllCategory } from "../../../../services/axios.GetMethods";
import { useLoading } from "../../../../contexts/LoadingContext";



const Category: React.FC = () => {
  const { setLoading } = useLoading();
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState<string | null>(null);
  const [ data, setData ] = useState<CategoryFormType[]>([]);
  const { register, handleSubmit, errors, reset } = useCategoryForm();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };


  //*-------------- fetch all category -----------------
  useEffect(()=>{
    const fetchCategory = async()=>{
      try{
        setLoading(true);
        const result = await getAllCategory();
        setData(result?.data?.category)
      }catch(error){
        console.error("Error fetching categories:",error);
      }finally{
        setLoading(false);
      }
    }
    fetchCategory();
  },[]);


  //*--------- modal for edit profile --------------
  const handleAddCategory = async (data: CategoryFormType) => {
    try {
      const formData = new FormData();
      formData.append('categoryName', data.categoryName);
      formData.append('description', data.description);
      if (data.categoryImage && data.categoryImage.length > 0) {
        formData.append('categoryImage', data.categoryImage[0]);
      } else {
        throw new Error('Category image is required');
      }; 
  
      const response = await addCategory(formData);
      toast.success(response?.message);
      console.log(response);
      closeModal();
    } catch (error) {
      console.error(error);
      const message = (error as Error).message.replace('Error: ', '');
      setErrorMessage(message);
    }
  };


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
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 xl:grid-cols-8 gap-4">
          { data.length > 0 ? (
            data.map((category, index) => (
              <div key={ index } className="flex flex-col justify-center items-center bg-gray-300 p-4">
                <div className="">
                  <img src={category.categoryImage} alt="" className="bg-slate-200 h-32 w-36" />
                </div>
                <div className="">
                  <p className="text-lg font-semibold text-black">{category.categoryName}</p>
                  <p className="text-sm font-normal text-black">{category.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">No categories available</p>
          ) }
            
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="ADD CATEGORY"
        modalStyle="bg-gray-50 min-w-[600px]"
        titleStyle="text-black"
        closeBtnStyle="text-black"
      >
        <form onSubmit={handleSubmit(handleAddCategory)} className='my-4 space-y-4'>
          <div>
            <label htmlFor="category-name" className='block text-sm font-medium text-gray-700'>Category Name</label>
            <input
              type="text"
              id="category-name"
              {...register('categoryName')}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm'
              placeholder="Enter your Category Name"
            />
            {errors.categoryName && <p className="text-red-700 text-sm my-1">{errors.categoryName.message}</p>}
          </div>
          <div>
            <label htmlFor="description" className='block text-sm font-medium text-gray-700'>Description</label>
            <textarea 
              id="description"
              {...register('description')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"></textarea>
            {errors.description && <p className="text-red-700 text-sm my-1">{errors.description.message}</p>}
          </div>
          <div>
            <label htmlFor="image" className='block text-sm font-medium text-gray-700'>Category Image</label>
            <input type="file"
              accept="image/*" 
              {...register("categoryImage")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm" />
            {errors.categoryImage && <p className="text-red-700 text-sm my-1">{errors.categoryImage.message}</p>}
          </div>

          {errorMessage && (
              <span className="text-sm font-normal text-rose-600 flex justify-center ">{errorMessage}</span>
          )}

          <div className='flex justify-end space-x-2'>
            <button
              onClick={closeModal}
              type="button"
              className="mt-3 bg-black text-white py-1 px-4 rounded-md hover:bg-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="mt-3 bg-green-800 text-white rounded-md py-1 px-4 hover:bg-green-700"
            >
              Add
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Category;

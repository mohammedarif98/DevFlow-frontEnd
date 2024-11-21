import React, { useEffect, useState } from "react";
import Modal from "../../../../common/Modal";
import { useCategoryForm } from "../../../../utils/validations/admin-validations/categoryValidation";
import { addCategory } from "../../../../services/axios.PostMethods";
import { toast } from "react-toastify";
import { CategoryFormType } from "../../../../utils/types/api-types";
import { getAllCategory } from "../../../../services/axios.GetMethods";
import { useLoading } from "../../../../contexts/LoadingContext";
import { FaRegEdit, FaSpinner } from "react-icons/fa";
import { editCategory } from "../../../../services/axios.PutMethods";


const Category: React.FC = () => {
  const { setLoading } = useLoading();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFormType | null>(null);
  const [data, setData] = useState<CategoryFormType[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { register, handleSubmit, errors, reset } = useCategoryForm();

  const categoryBGColors = [
    "bg-red-200",
    "bg-green-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-teal-200",
    "bg-emerald-200",
    "bg-sky-200",
    "bg-violet-200",
    "bg-fuchsia-200",
  ];


  //*-------- modal setting for adding category ---------
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    reset();
    setErrorMessage(null);
  };
  //*-------- modal setting for edit category ---------
  const openEditModal = () => {
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    reset();
    setErrorMessage(null);
  };

  //*-------------- fetch all category -----------------
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const result = await getAllCategory();
        setData(result?.data?.category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  //*--------- handle add the category --------------
  const handleAddCategory = async (data: CategoryFormType) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("categoryName", data.categoryName);
      formData.append("description", data.description);
      if (data.categoryImage && data.categoryImage.length > 0) {
        formData.append("categoryImage", data.categoryImage[0]);
      } else {
        throw new Error("Category image is required");
      }

      const response = await addCategory(formData);
      toast.success(response?.message);
      closeModal();
      // ----- Fetch and update categories ------
      const result = await getAllCategory();
      setData(result.data.category);
    } catch (error) {
      console.error(error);
      const message = (error as Error).message.replace("Error: ", "");
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  //* -------- handle updating the category ---------
  const handleUpdateCategory = async (updatedData: CategoryFormType) => {
    setIsLoading(true);
    try {
      if (!selectedCategory) {
        throw new Error("No category selected for update");
      }
      const formData = new FormData();
      formData.append("categoryName", updatedData.categoryName);
      formData.append("description", updatedData.description);
      if (updatedData.categoryImage && updatedData.categoryImage.length > 0) {
        formData.append("categoryImage", updatedData.categoryImage[0]);
      }

      const response = await editCategory(formData, selectedCategory._id);
      toast.success(response?.message);
      closeEditModal();
      // ----- Fetch and update categories ------
      const result = await getAllCategory();
      setData(result.data.category);
    } catch (error) {
      console.log("handle updating error: ", error);
      const message = (error as Error).message.replace("Error: ", "");
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  //*-------------- Handle Search Input Change --------------
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  //* ----------- Filter data based search -------------
  const searchQueryLower = searchQuery.toLowerCase().trim();
  const filteredData = data.filter((category) =>
    category.categoryName && category.categoryName.toLowerCase().includes(searchQueryLower)
  );

  return (
    <div className="my-2 space-y-2">
      <div className="flex justify-between bg-white py-3 px-8 w-full">
        <div className="relative w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by  category name..."
            className="py-1 px-2 border w-full pr-8 border-black rounded focus:outline-none"
          />
          <button onClick={() => setSearchQuery('')} className="absolute text-lg right-4 font-semibold top-4 transform -translate-y-1/2 text-black">
            x
          </button>
        </div>
        <div>
          <button
            onClick={openModal}
            className="p-2 text-white text-sm rounded-md bg-green-700 hover:bg-green-600"
          >
            Add Category
          </button>
        </div>
      </div>

      <div className="bg-white w-full p-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredData.length > 0 ? (
            filteredData.map((category, index) => (
              <div key={index} className={`p-4 space-y-2 rounded-md ${categoryBGColors[Math.floor(Math.random() * categoryBGColors.length)]}`}>
                <div className="flex justify-between">
                  <div className="p-2 bg-gray-100 h-16 w-16 rounded-md">
                    <img src={category.categoryImage} alt="" />
                  </div>
                  <div className="flex self-start justify-end">
                    <div className="p-2 rounded-full bg-slate-200 hover:bg-slate-100 cursor-pointer">
                      <span
                        onClick={() => {
                          setSelectedCategory(category), openEditModal();
                        }}
                      >
                        <FaRegEdit />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="">
                  <p className="text-md font-semibold text-black">
                    {category.categoryName}
                  </p>
                  <p className="text-sm font-normal text-black flow-root">
                    {category.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 w-full">
              No categories available
            </p>
          )}
        </div>
      </div>
      {/* ------ add category modal ----- */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="ADD CATEGORY"
        modalStyle="bg-gray-50 min-w-[600px]"
        titleStyle="text-black"
        closeBtnStyle="text-black"
      >
        <form
          onSubmit={handleSubmit(handleAddCategory)}
          className="my-4 space-y-4"
        >
          <div>
            <label
              htmlFor="category-name"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              type="text"
              id="category-name"
              {...register("categoryName")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              placeholder="Enter your Category Name"
            />
            {errors.categoryName && (
              <p className="text-red-700 text-sm my-1">
                {errors.categoryName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
            ></textarea>
            {errors.description && (
              <p className="text-red-700 text-sm my-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Category Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("categoryImage")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
            />
            {errors.categoryImage && (
              <p className="text-red-700 text-sm my-1">
                {errors.categoryImage.message}
              </p>
            )}
          </div>

          {errorMessage && (
            <span className="text-sm font-normal text-rose-600 flex justify-center ">
              {errorMessage}
            </span>
          )}

          <div className="flex justify-end space-x-2">
            <button
              onClick={closeModal}
              type="button"
              className="mt-3 bg-black text-white py-1 px-4 rounded-md hover:bg-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-3 bg-green-800 text-white rounded-md py-1 px-4 hover:bg-green-700"
            >
              {isLoading ? <FaSpinner className="animate-spin mx-auto text-white" /> : "Add"}
            </button>
          </div>
        </form>
      </Modal>
      {/* ----- edit category modal------ */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="EDIT CATEGORY"
        modalStyle="bg-gray-50 min-w-[600px]"
        titleStyle="text-black"
        closeBtnStyle="text-black"
      >
        <form
          onSubmit={handleSubmit(handleUpdateCategory)}
          className="my-4 space-y-4"
        >
          <div>
            <label
              htmlFor="category-name"
              className="block text-sm font-medium text-gray-700"
            >
              Category Name
            </label>
            <input
              type="text"
              id="category-name"
              defaultValue={selectedCategory?.categoryName || ""}
              {...register("categoryName")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
              placeholder="Enter your Category Name"
            />
            {errors.categoryName && (
              <p className="text-red-700 text-sm my-1">
                {errors.categoryName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              defaultValue={selectedCategory?.description}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
            ></textarea>
            {errors.description && (
              <p className="text-red-700 text-sm my-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Category Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("categoryImage")}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm"
            />
            {errors.categoryImage && (
              <p className="text-red-700 text-sm my-1">
                {errors.categoryImage.message}
              </p>
            )}
          </div>
          {errorMessage && (
            <span className="text-sm font-normal text-rose-600 flex justify-center ">
              {errorMessage}
            </span>
          )}
          <div className="flex justify-end space-x-2">
            <button
              onClick={closeEditModal}
              type="button"
              className="mt-3 bg-black text-white py-1 px-4 rounded-md hover:bg-black"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-3 bg-green-800 text-white rounded-md py-1 px-4 hover:bg-green-700"
            >
              {isLoading ? <FaSpinner className="animate-spin mx-auto text-white" /> : "Update"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};


export default Category;

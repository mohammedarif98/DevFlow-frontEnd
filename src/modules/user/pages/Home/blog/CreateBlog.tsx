import React, { useEffect, useRef, useState } from "react";
import { createBlog } from "../../../../../services/axios.PostMethods";
import { getAllCategory } from "../../../../../services/axios.GetMethods";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";


type Category = {
    _id: string,
    categoryName: string
};

const CreateBlog = () => {
  const [formState, setFormState] = useState({
    title: "",
    tags: "",
    content: "",
    coverImage: "" as string | File,
    category: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  //* ----------------- category data fetching  ---------------
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const result = await getAllCategory();
        console.log("fetched category", result);
        setCategories(result.data.category);
        setLoading(false);
      } catch (error: any) {
        console.error("Failed to fetch category:", error.message);
        setLoading(false);
      }
    };
    fetchCategory();
  }, []);

  //* ----------------- Handle Input Change  ---------------
  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setFormState((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  //*---------------- form validation -------------------
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formState.title.trim()) errors.title = "Title is required.";
    if (!formState.tags.trim()) errors.tags = "Tags are required.";
    if (!formState.category) errors.category = "Please select a category.";
    if (!formState.content.trim()) errors.content = "Content is required.";
    if (!formState.coverImage) {
      errors.coverImage = "Cover image is required.";
    } else if (formState.coverImage instanceof File) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(formState.coverImage.type)) {
        errors.coverImage = "Only PNG, JPEG, or JPG images are allowed.";
      }
    }

    return errors;
  };

  //* ---------------- Handle Form Submission ----------------
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const formObj = new FormData();
    formObj.append("title", formState.title);
    formObj.append("tags", formState.tags);
    formObj.append("content", formState.content);
    if (formState.coverImage instanceof File){
        formObj.append("coverImage", formState.coverImage);
    }
    formObj.append("category", formState.category);

    try {
      setLoading(true);
      const result = await createBlog(formObj);
      setLoading(false);
      console.log(result);
      toast.success(result.data.message);
      if (formRef.current) {
        formRef.current.reset();
      }
      setFormState({
        title: "",
        tags: "",
        content: "",
        coverImage: "" as string | File,
        category: "",
      });
    } catch (error) {
      console.log("Error creating blog:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-6 bg-slate-100">
      <div className="p-10 w-[1200px]  bg-[#fffafa] rounded shadow-md">
        <form className="" ref={formRef} onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-6 uppercase text-center">
            Create a New Blog
          </h2>

          <div className="flex gap-6">
            <div className="mb-4 w-full">
              <label htmlFor="title" className="block text-gray-700">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={formState.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-black"
              />
               {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="tags" className="block text-gray-700">
                Tags (comma separated):
              </label>
              <input
                type="text"
                name="tags"
                value={formState.tags}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-black"
              />
               {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
            </div>
          </div>

          <div className="flex gap-6">
            <div className="mb-4 w-full">
              <label htmlFor="category" className="block text-gray-700">
                Category:
              </label>
              <select
                name="category"
                value={formState.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-black"
              >
                <option value="">Select a category</option>
                {loading ? (
                        <option value="" disabled>Loading categories...</option>
                    ) : categories && Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.categoryName}
                        </option>
                        ))
                    ) : (
                        <option value="" disabled>No categories available</option>
                )}
              </select>
              {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
            </div>
            <div className="mb-4 w-full">
              <label htmlFor="coverImage" className="block text-gray-700">
                Cover Image:
              </label>
              <input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-black"
              />
               {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700">
              Content:
            </label>
            <textarea
              name="content"
              value={formState.content}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:border-black"
            />
             {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 px-4 py-2 text-white bg-black rounded hover:bg-gray-800"
          >
             {loading ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin mx-auto text-white" /> 
              </div>
            ) : (
              "Create Blog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

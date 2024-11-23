import React, { useEffect, useRef, useState } from "react";
import { createBlog } from "../../../../../services/axios.PostMethods";
import { getAllCategory } from "../../../../../services/axios.GetMethods";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  //* ----------------- category data fetching  ---------------
  useEffect(() => {
    const fetchCategory = async () => {
      try {
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

  //* ---------------- Handle Form Submission ----------------
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formObj = new FormData();
    formObj.append("title", formState.title);
    formObj.append("tags", formState.tags);
    formObj.append("content", formState.content);
    if (formState.coverImage instanceof File){
        formObj.append("coverImage", formState.coverImage);
    }
    formObj.append("category", formState.category);

    try {
      const result = await createBlog(formObj);
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
          </div>

          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 text-white bg-black rounded hover:bg-gray-800"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;

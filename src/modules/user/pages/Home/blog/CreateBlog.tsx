import React, { useEffect, useRef, useState } from "react";
import { createBlog } from "../../../../../services/axios.PostMethods";
import { getAllCategories } from "../../../../../services/axios.GetMethods";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";


type Category = {
    _id: string,
    categoryName: string
};

const CreateBlog: React.FC = () => {
  const [formState, setFormState] = useState({
    title: "",
    tags: [] as string[],
    content: "",
    coverImage: "" as string | File,
    category: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string }>({});
  const [loading, setLoading] = useState(false);                         // For category fetchin loading
  const [creatingBlog, setCreatingBlog] = useState(false);               // For blog creation loading
  const [categories, setCategories] = useState<Category[]>([]);
  const formRef = useRef<HTMLFormElement>(null);


  //* ----------------- category data fetching  ---------------
  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const result = await getAllCategories();
        setCategories(result.data);
        // setLoading(false);
      } catch (error: any) {
        console.error("Failed to fetch category:", error.message);
      }finally {
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

  //* ----------------- Handle Tag Input ---------------
  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const addTag = () => {
      if (tagInput.trim() && !formState.tags.includes(tagInput.trim())) {
          setFormState((prevState) => ({
              ...prevState,
              tags: [...prevState.tags, tagInput.trim()],
          }));
          setTagInput("");
      }
  };

  const removeTag = (tag: string) => {
    setFormState((prevState) => ({
        ...prevState,
        tags: prevState.tags.filter((t) => t !== tag),
    }));
  };

  //*---------------- form validation -------------------
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formState.title.trim()) errors.title = "Title is required.";
    if (!formState.tags.length) errors.tags = "At least one tag is required.";
    if (!formState.category) errors.category = "Please select a category.";
    if (!formState.content.trim()) errors.content = "Content is required.";
    if (!formState.coverImage) {
      errors.coverImage = "Cover image is required.";
    } else if (formState.coverImage instanceof File) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
      if (!allowedTypes.includes(formState.coverImage.type)) {
        errors.coverImage = "Only PNG, JPEG, or JPG images are allowed.";
      }
    }
    return errors;
  };

  //* ---------------- Handle Form Submission ----------------
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const formObj = new FormData();
    formObj.append("title", formState.title);
    formObj.append("tags", JSON.stringify(formState.tags));  
    formObj.append("content", formState.content);
    if (formState.coverImage instanceof File){
        formObj.append("coverImage", formState.coverImage);
    }
    formObj.append("category", formState.category);

    try {
      setCreatingBlog(true);
      const result = await createBlog(formObj);
      setCreatingBlog(false);
      toast.success(result.data.message);
      formRef.current?.reset();
      setFormState({
        title: "",
        tags: [],
        content: "",
        coverImage: "" as string | File,
        category: "",
      });
    } catch (error) {
      console.log("Error creating blog:", error);
      setCreatingBlog(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-6 bg-slate-100">
      <div className="p-10 w-[1500px]  bg-[#fffafa] rounded shadow-md">
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
                className="w-full bg-gray-200 px-3 py-2 border rounded focus:outline-none focus:border-black"
              />
               {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>
            {/* ----------- add tags --------------*/}
            <div className="mb-4 w-full">
              <label htmlFor="tags" className="block text-gray-700">Tags:</label>
              <div className="flex gap-2 items-center">
                <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInput}
                    placeholder="Add a tag"
                    className="w-full bg-gray-200 px-3 py-2 border rounded focus:outline-none focus:border-black"
                />
                <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2 bg-black text-white rounded"
                >
                    Add
                </button>
              </div>
              {formState.tags.length > 0 && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                      {formState.tags.map((tag) => (
                          <span
                              key={tag}
                              className="px-2 py-1 bg-zinc-700 rounded-md text-white flex items-center gap-2"
                          >
                              {tag}
                              <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className="text-white text-lg"
                              >
                                  <IoMdCloseCircleOutline />
                              </button>
                          </span>
                      ))}
                  </div>
              )}
              {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
            </div>
            {/* ----------- end tags --------------*/}
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
                className="w-full bg-gray-200 px-3 py-2 border rounded focus:outline-none focus:border-black"
              >
                <option value="">Select a category</option>
                {loading ? (
                      <option value="" disabled>Loading categories...</option>
                  ) : categories && categories.length > 0 ? (
                      categories.map((category) => (
                      <option key={category._id} value={category._id}>
                          {category.categoryName}
                      </option>
                      ))
                  ) : (
                      <option value="" disabled>No categories</option>
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
                className="w-full bg-gray-200 px-3 py-2 border rounded focus:outline-none focus:border-black"
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
              rows={10}
              required
              className="w-full bg-gray-200 px-3 py-2 border rounded focus:outline-none focus:border-black"
            />
             {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
          </div>

          <button
            type="submit"
            disabled={creatingBlog}
            className="w-full mt-2 px-4 py-2 text-white bg-black rounded hover:bg-gray-800"
          >
             {creatingBlog ? (
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

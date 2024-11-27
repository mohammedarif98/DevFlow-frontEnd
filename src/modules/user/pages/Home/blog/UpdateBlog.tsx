import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategory, getBlogDetail } from "../../../../../services/axios.GetMethods";
// import { FaSpinner } from 'react-icons/fa';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { editBlogPost } from "../../../../../services/axios.PutMethods";
import { toast } from "react-toastify";


type BlogData = {
  title: string;
  tags: string[];
  content: string;
  coverImage: string | File;
  category: string; 
};

type Category = {
  _id: string;
  categoryName: string;
};

const UpdateBlog: React.FC = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    tags: [] as string[],
    content: "",
    coverImage: "" as string | File,
    category: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [errors, setErrors] = useState<any>(null);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(true);
  const navigate = useNavigate();


  //*------------------------ fetch the blog data ----------------------
  useEffect(() => {
    const blogDetail = async () => {
      try {
        if (!blogId) return;
        setLoading(true);
        const result = await getBlogDetail(blogId);
        setBlogData({
          ...result.data,
          category: result.data.category._id,
        });
        setLoading(false);
      } catch (error: any) {
        console.error("Failed to fetch blog details:", error.message);
        setErrors(error.message);
        setLoading(false);
      }
    };
    blogDetail();
  }, [blogId]);

  //*------------------------ fetch categories ----------------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getAllCategory();
        setCategories(result.data.category);
        setCategoryLoading(false);
      } catch (error: any) {
        console.error("Failed to fetch categories:", error.message);
        setCategoryLoading(false);
      }
    };
    fetchCategories();
  }, []);

  //* ----------------- Handle Input Change  ---------------
  const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    setBlogData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  //*------------------------ update the blog ----------------------
  const updateBlog = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('tags', JSON.stringify(blogData.tags));
      formData.append('content', blogData.content);
      formData.append('category', blogData.category);
      if (blogData.coverImage instanceof File) {
        formData.append('coverImage', blogData.coverImage as File);
      }
      const response = await editBlogPost(formData,blogId as string );
      toast.success(response.message);
      navigate('/profile');
    } catch (error: any) {
      toast.error("Blog Updation Failed")
      console.error("Failed to update blog:", error.message);
    }
  };

  //* ----------------- Handle Tag Input ---------------
  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTagInput(e.target.value);
  };

  const addTag = () => {
      if (tagInput.trim() && !blogData.tags.includes(tagInput.trim())) {
          setBlogData((prevState) => ({
              ...prevState,
              tags: [...prevState.tags, tagInput.trim()],
          }));
          setTagInput("");
      }
  };

  const removeTag = (tag: string) => {
      setBlogData((prevState) => ({
          ...prevState,
          tags: prevState.tags.filter((t) => t !== tag),
      }));
  };


  return (
    <div className="flex justify-center items-center h-screen p-6 bg-slate-100">
      <div className="p-10 w-[1500px] bg-[#fffafa] rounded shadow-md">
        <form className="" onSubmit={updateBlog}>
          <h2 className="text-2xl font-bold mb-6 uppercase text-center">
            Update Blog
          </h2>

          <div className="flex gap-6">
            <div className="mb-4 w-full">
              <label htmlFor="title" className="block text-gray-700">
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                required
                className="w-full bg-gray-200 px-3 py-2 border rounded focus:outline-none focus:border-black"
              />
              {/* {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>} */}
            </div>
            {/* ----------- add tags --------------*/}
            <div className="mb-4 w-full">
              <label htmlFor="tags" className="block text-gray-700">
                Tags:
              </label>
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
                  Update
                </button>
              </div>
              {blogData.tags.length > 0 && (
                <div className="mt-2 flex gap-2 flex-wrap">
                  {blogData.tags.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => removeTag(tag)}
                      className="px-2 py-1 bg-zinc-700 rounded-md text-white flex items-center gap-2"
                    >
                      {tag}
                      <button type="button" className="text-white text-lg">
                        <IoMdCloseCircleOutline />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {/* {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>} */}
            </div>
            {/* ----------- end tags --------------*/}
          </div>

          <div className="flex gap-6">
          <div className="mb-4 w-full">
            <label htmlFor="category" className="block text-gray-700">Category:</label>
            <select
              name="category"
              value={blogData.category} // Ensure the blogData.category contains the correct category ID
              onChange={handleChange}
              className="w-full bg-gray-200 px-3 py-2 border rounded focus:outline-none focus:border-black"
              required
            >
              {/* Add a default placeholder option */}
              <option value="" disabled>
                {categoryLoading ? "Loading categories..." : "Select a category"}
              </option>
              {categories && categories.length > 0 ? (
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No categories available
                </option>
              )}
            </select>
            {/* {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>} */}
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
              {/* {errors.coverImage && <p className="text-red-500 text-sm">{errors.coverImage}</p>} */}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700">
              Content:
            </label>
            <textarea
              name="content"
              value={blogData.content}
              onChange={handleChange}
              rows={10}
              required
              className="w-full px-3 py-2 bg-gray-200 border rounded focus:outline-none focus:border-black"
            />
            {/* {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>} */}
          </div>

          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 text-white bg-black rounded hover:bg-gray-800"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBlog;
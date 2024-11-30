import React, { useEffect, useState } from "react";
import { getUserBlog } from "../../../../services/axios.GetMethods";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Blog {
  _id: string;
  coverImage: string;
  title: string;
  description: string;
}

const BlogCards: React.FC = () => {
  const [data, setData] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getUserBlog();
        setData(response.data); 
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchBlogs();
  }, []);

  //*-------------- Handle Search Input Change --------------
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  //* ---------------- Filter data based search ------------------
  const filteredBlogs = data.filter((blog) => {
    return blog.title && blog.title.toLowerCase().includes(searchQuery.toLowerCase().trim());
  });
  
  //* ---------------- navigate to update blog ------------------
  const handleUpdateBlog = (blogId: string) => {
    navigate(`/update-blog/${blogId}`);
  };

  return (
    <>
      <div className="w-full p-2">
        <form className="flex justify-end">
          <input
            type="search"
            onChange={handleSearchChange}
            value={searchQuery}
            placeholder="Search by blog . . ."
            className="py-1 px-2 border w-[300px] pr-3 border-black rounded focus:outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute text-lg right-4 font-semibold top-4 transform -translate-y-1/2 text-black">
              x
            </button>
          )}
        </form>
      </div>
      <div className="mt-1 bg-slate-50 p-4 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredBlogs.length > 0 ? ( filteredBlogs.map((blog: Blog) => (
            <div
              className="p-2 rounded-md bg-slate-200 flex flex-col relative"
              key={blog._id}
            >
              <div className="flex justify-between">
                <div className="">
                  <img src={blog.coverImage} alt="" className="h-44 w-screen" />
                </div>
              </div>
              <div className="my-1">
                <p className="text-sm text-center font-semibold text-black">
                  {blog.title}
                </p>
              </div>
              <div className="flex absolute top-4 right-4">
                <span
                  onClick={() => handleUpdateBlog(blog._id)}
                  className="cursor-pointer p-2 rounded-full shadow-2xl bg-white text-black"
                >
                  <FaRegEdit />
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No blogs found.</p>
        )}
      </div>
    </>
  );
};

export default BlogCards;

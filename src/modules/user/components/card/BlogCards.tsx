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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getUserBlog();
        setData(response.data);
        console.log(response.data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchBlogs();
  }, []);


  //* ---------------- navigate to update blog ------------------
  const handleUpdateBlog = (blogId: string) => {
    navigate(`/update-blog/${blogId}`);
  };


  return (
    <div className="mt-1 bg-slate-50 p-4 w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((blog: Blog, index: number) => (
        <div
          className="p-2 rounded-md bg-slate-200 flex flex-col relative"
          key={index}
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
      ))}
    </div>
  );
};



export default BlogCards;

import React, { useEffect, useState } from "react";
import { getBlogsList } from "../../../../services/axios.GetMethods";
import { useLoading } from "../../../../contexts/LoadingContext";
import { blockBlog, unblockBlog } from "../../../../services/axios.PutMethods";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Blog {
  _id: string;
  title: string;
  author: { username: string };
  isPublished: boolean;
  coverImage?: string;
}

const ListBlogs: React.FC = () => {
  const { setLoading } = useLoading();
  const [blogData, setBlogData] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getBlogsList();
        setBlogData(response.data);
      } catch (error: any) {
        const message = (error as Error).message.replace("Error: ", "");
        console.log(message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  //*-------------- Handle Search Input Change --------------
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  //* ---------------- Filter data based search ------------------
  const filteredBlogs = blogData.filter(
    (blog) =>blog.title && blog.title.toLowerCase().includes(search.toLowerCase().trim())
  );

  //* ---------------- block/unblock blog -----------------------
  const blockUnblockBlog = async (blogId: string, isPublished: boolean) => {
    try {
      if (isPublished) {
        const response = await unblockBlog(blogId);
        toast.success(response.data.message)
      } else {
        const response = await blockBlog(blogId);
        toast.success(response.data.message)
      }
      // ---------------- Refresh the blog list or update the specific blog's state ---------------
      setBlogData((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === blogId ? { ...blog, isPublished } : blog
        )
      );
    } catch (error: any) {
      console.error("Failed to block/unblock blogs:", error.message);
    }
  };

  //*-------------- navigate blog detail page -----------------
  const handleBlogDetail = (blogId: string) => {
    navigate(`/admin/blog-detailPage/${blogId}`)
  }

  return (
    <div className=" w-full my-2 space-y-2">
      {/* ----------- blog list ------------- */}
      <div className="bg-white p-4">
        <form className="flex justify-end mb-3">
          <div className="w-72">
            <input
              type="search"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search Blog ..."
              className="py-1 px-2 border w-full pr-8 border-black rounded focus:outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute font-semibold text-lg right-2 top-4 transform -translate-y-1/2 text-black"
              >
                x
              </button>
            )}
          </div>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-gray-50 cursor-pointer rounded-sm p-2 space-y-1 border-gray-400 border-[0.2px] shadow-lg flex flex-col justify-around h-full"
              >
                <div className="flex rounded-sm"  onClick={() => handleBlogDetail(blog._id)}>
                  <img
                    src={blog.coverImage}
                    alt="blog-img"
                    className="h-56 w-96"
                  />
                </div>
                <div className="space-x-2">
                  <p className="text-md font-bold text-center text-black">
                    {blog.title}
                  </p>
                </div>
                <div className="flex justify-between px-2 ">
                  <p className="text-sm font-semibold">
                    Published by :{" "}
                    <span className="font-normal">{blog.author.username}</span>
                  </p>
                  <label className="inline-flex cursor-pointer">
                    <input
                      type="checkbox"
                      checked={blog.isPublished}
                      onChange={(event) => { 
                        event.stopPropagation();
                        blockUnblockBlog(blog._id, event.target.checked) 
                      }}
                      className="sr-only peer"
                    />
                    <div className="relative w-9 h-5 bg-red-600 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No blogs found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListBlogs;






//*--------------------- alternative method for block.unblock ----------------------------

// const handleBlockUnblock = async (blogId: string, isPublished: boolean) => {
//   try {
//     setLoading(true);
//     if (isPublished) {
//       // Block the blog
//       await blockBlog(blogId);
//       setBlogData((prev) =>
//         prev.map((blog) =>
//           blog._id === blogId ? { ...blog, isPublished: false } : blog
//         )
//       );
//     } else {
//       // Unblock the blog
//       await unblockBlog(blogId);
//       setBlogData((prev) =>
//         prev.map((blog) =>
//           blog._id === blogId ? { ...blog, isPublished: true } : blog
//         )
//       );
//     }
//   } catch (error: any) {
//     console.error("Failed to block/unblock blogs:", error.message);
//     setError(error.message);
//   } finally {
//     setLoading(false);
//   }
// };


{/* <label className="inline-flex cursor-pointer">
  <input
    type="checkbox"
    checked={!blog.isPublished}
    onChange={() =>
      handleBlockUnblock(blog._id, blog.isPublished)
    } // Pass the blog ID and current state
    className="sr-only peer"
  />
  <div className="relative w-9 h-5 bg-green-600 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-black after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-700"></div>
</label> */}
import React, { useEffect, useState } from "react";
import { getBlogDetail } from "../../../../services/axios.GetMethods";
import { useParams } from "react-router-dom";
import { BsBookmarkPlus, BsChat } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import { UnLikeBlog } from "../../../../services/axios.DeleteMethods";
import { likeBlog } from "../../../../services/axios.PostMethods";
import { useLoading } from "../../../../contexts/LoadingContext";


type User = {
  _id: string;
  username: string;
  email: string;
  profilePhoto?: string;
};

type BlogList = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  likes: string[];
  category: string;
  coverImage: string;
  author: User;
  publishedAt: string;
};


const BlogDetail: React.FC = () => {

  const user = useSelector((state: any) => state.user.user);
  const { blogId } = useParams<{ blogId: string }>();
  const [blogData, setBlogData] = useState<BlogList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading();
  const [showChat, setShowChat] = useState(false);


  //* ----------------- chat offcanves toggleling --------------------
  const toggleChat = () => setShowChat(!showChat);

  //* ----------------- fetching the blog data --------------------
  useEffect(() => {
    const blogDetail = async () => {
      try {
        if (!blogId) return;
        setLoading(true);
        const result = await getBlogDetail(blogId);
        setBlogData(result.data);
        setLoading(false);
      } catch (error: any) {
        console.error("Failed to fetch blogs:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    blogDetail();
  }, [blogId]);


  //*-------------------- give like/unlike to blog --------------------
  const handleLike = async () => {
    if (!blogData || !user._id) return;
    if (blogData.likes.includes(user._id)) {
      // Unlike the blog
      await UnLikeBlog(blogData._id);
      setBlogData({
        ...blogData,
        likes: blogData.likes.filter((l) => l !== user._id)
      });
    } else {
      // Like the blog
      await likeBlog(blogData._id);
      setBlogData({
        ...blogData,
        likes: [...blogData.likes, user._id]
      });
    }
  };


  return (
    <div className="flex justify-center">
      {blogData && (
        <div className="border-x-[1px] p-8 mt-16 max-w-5xl space-y-4">
          <div className="flex justify-center">
            <h1 className="text-1xl md:text-2xl lg:text-3xl font-bold">
              {blogData.title}
            </h1>
          </div>
          <div className="">
            <ul className="flex gap-1 lg:gap-1 lg:px-14 xl:px-14">
              {blogData.tags.map((tag: string, index: number) => (
                <li
                  key={index}
                  className="bg-slate-400 p-1 font-semibold text-xs lg:text-sm lg:py-1 lg:px-3 rounded-sm"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src={blogData.coverImage}
              alt="cover-img"
              className="h-[200px] w-[450px] md:h-[400px] md:w-[850px]"
            />
          </div>

          <div className="px-6 py-2 space-y-4 border-y-[1px]">
            <div className="flex gap-4 items-center">
              <img
                src={blogData.author.profilePhoto}
                className="h-10 w-10 md:h-14 md:w-14 rounded-full"
                alt="pro-img"
              />
              <div className="">
                <p className="font-semibold text-sm md:text-md">
                  {blogData.author.username}
                </p>
                <p className="text-xs md:text-sm font-normal">
                  Published on : {blogData.publishedAt}
                </p>
              </div>
            </div>
            <div className="flex justify-between p-2 border-y-[1px]">
              <div className="flex gap-x-4">
                <button onClick={toggleChat}>
                  <BsChat className="hover:border border-white text-sm md:text-lg" />
                </button>
                <span className="flex items-center gap-x-1">
                  <AiFillLike
                    onClick={handleLike}
                    className={
                      blogData.likes.includes(user?._id)
                        ? "text-red-600 hover:border border-white"
                        : "text-black  hover:border border-white"
                    }
                  />
                  <p className="text-sm">{blogData.likes.length ? blogData.likes.length : ""}</p>
                </span>
              </div>
              <div className="flex gap-x-4">
                <span>
                  <BsBookmarkPlus className="hover:border border-white text-sm md:text-lg" />
                </span>
              </div>
            </div>
          </div>

          <div className="">
            <p className="my-4 md:my-8 first-letter:text-3xl">
              {blogData.content}
            </p>
          </div>
          {/* Offcanvas Component */}
          {showChat && (
            <div className="fixed inset-0 flex justify-end z-50">
              {/* Background overlay */}
              <div
                className="bg-gray-900 bg-opacity-20 fixed inset-0"
                onClick={toggleChat}
              ></div>

              {/* Chat off-canvas section */}
              <div className="w-96 bg-white max-h-full overflow-y-auto shadow-2xl p-4 relative z-10">
                <div className="flex justify-end">
                  <button
                    onClick={toggleChat}
                    className="text-black hover:text-gray-900"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div className="mt-4 bg-white">
                  {/* Chat content goes here */}
                  <p>This is the chat section.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


export default BlogDetail;

import React, { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BsBookmarkCheckFill, BsFillBookmarkPlusFill } from "react-icons/bs";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import {
  unbookmarkBlog,
  UnLikeBlog,
} from "../../../../services/axios.DeleteMethods";
import { bookmarkBlog, likeBlog } from "../../../../services/axios.PostMethods";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBookmarkandBlog } from "../../../../services/axios.GetMethods";

type User = {
  _id: string;
  username: string;
  email: string;
  profilePhoto?: string;
  bookmarks?: string[];
  role: string;
  followers: string[];
  followedCategory: string[];
  category: Category;
  categoryName: string;
};

type BlogList = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  likes: string[];
  category: Category;
  coverImage: string;
  author: User;
  publishedAt: string;
  isBookmarked: boolean;
};

type Category = {
  _id: string;
  categoryName: string;
};

const Bookmarks: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogList[]>([]);
  const user = useSelector((state: any) => state.user.user);
  const navigate = useNavigate();

  //*-------------------- like/unlike to blog --------------------
  const handleLike = async (blogId: string) => {
    const selectedBlog = blogs.find((blog) => blog._id === blogId);
    if (!selectedBlog || !user) return;

    try {
      if (selectedBlog.likes.includes(user._id)) {
        await UnLikeBlog(blogId);
        setBlogs((prevData) =>
          prevData.map((blog) =>
            blog._id === blogId
              ? {
                  ...blog,
                  likes: blog.likes.filter((userId) => userId !== user._id),
                }
              : blog
          )
        );
      } else {
        await likeBlog(blogId);
        setBlogs((prevData) =>
          prevData.map((blog) =>
            blog._id === blogId
              ? { ...blog, likes: [...blog.likes, user._id] }
              : blog
          )
        );
      }
    } catch (error: any) {
      console.error("Error toggling like for the blog:", error.message);
    }
  };

  //*----------------- handle unbookmark -----------------
  const handleUnbookmark = async (blogId: string) => {
    if (!user) return;

    try {
      await unbookmarkBlog(blogId);
      setBlogs((prevData) => prevData.filter((blog) => blog._id !== blogId));
    } catch (error: any) {
      console.error("Error unbookmarking the blog:", error.message);
    }
  };

  //*------------------- get bookmarked blogs  -----------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookmarkandBlog();
        setBlogs(data.data.bookmarkedBlogs)
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  //* ------------- get the blog detail page  ------------------
  const handleBlogClick = (blogId: string) => {
    navigate(`/blog-detail/${blogId}`);
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-7xl mt-24 md:flex-row mx-2 md:mx-4 lg:mx-4">
        {/* --------------- Left side content ---------------- */}

        <div className="md:w-[900px] lg:w-[750px] xl:w-[900px] p-4 space-y-4">
          <div className="flex gap-x-2"></div>
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                onClick={() => handleBlogClick(blog._id)}
                className="bg-white px-3 py-2 flex justify-between gap-4 border-b-[1px] cursor-pointer"
              >
                <div className="w-full space-y-2">
                  <div className="p-1">
                    <div className="flex items-center gap-2">
                      <img
                        src={blog.author.profilePhoto}
                        alt="pro-img"
                        className="h-8 w-8 rounded-full"
                      />
                      <p className="text-sm font-semibold">
                        Published by
                        <span className="text-sm font-normal mx-1 text-blac">
                          {blog.author.username}
                        </span>
                      </p>
                    </div>
                    <p className="font-bold text-xl mt-3">{blog.title}</p>
                    <p className="text-md">{blog.content.slice(0, 100)}...</p>
                  </div>
                  <div className="flex justify-between px-3 py-1">
                    <div className="flex items-center gap-x-4">
                      <span className="text-xs">{blog.publishedAt}</span>
                      <span>
                        <IoChatbubbleEllipsesSharp className="hover:border border-white" />
                      </span>
                      <span className="flex gap-x-1">
                        <AiFillLike
                          onClick={(event) => {
                            event.stopPropagation();
                            handleLike(blog._id);
                          }}
                          className={
                            blog.likes.includes(user?._id)
                              ? "text-red-600 hover:border border-white"
                              : "text-black hover:border border-white"
                          }
                        />
                        <p className="text-sm">
                          {blog.likes.length ? blog.likes.length : ""}
                        </p>
                      </span>
                    </div>
                    <div className="flex gap-x-4">
                        <BsBookmarkCheckFill
                            onClick={(event) => {
                            event.stopPropagation();
                            handleUnbookmark(blog._id);
                            }}
                            className="text-red-600 cursor-pointer"
                        />
                    </div>
                  </div>
                </div>
                <div className="md:flex items-center hidden sm:block">
                  <img
                    src={blog.coverImage}
                    alt="cover-img"
                    className="h-32 w-64"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No blogs available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
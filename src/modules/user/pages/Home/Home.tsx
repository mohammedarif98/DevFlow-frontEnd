import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import landing_Image from "../../../../assets/images/SAVE_20241105_220105~2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { getAllBlogs, getAllCategories, getUsers } from "../../../../services/axios.GetMethods";
import { bookmarkBlog, followCategory, followUser, likeBlog } from "../../../../services/axios.PostMethods";
import { unbookmarkBlog, unfollowCategory, unfollowUser, UnLikeBlog } from "../../../../services/axios.DeleteMethods";
import { AiFillLike } from "react-icons/ai";
import { useLoading } from "../../../../contexts/LoadingContext";

type User = {
  _id: string;
  username: string;
  email: string;
  profilePhoto?: string;
  bookmarks?: string[];
  role: string;
  followers: string[];
  followedCategory: string[];
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
  isBookmarked: boolean;
};

type Category = {
  _id: string;
  categoryName: string;
};


const Home: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
  const [isUserFollowing, setIsUserFollowing] = useState<{ [key: string]: boolean }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [data, setData] = useState<BlogList[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { setLoading } = useLoading();


  //*-------------------- like/unlike to blog --------------------
  const handleLike = async (blogId: string) => {
    const selectedBlog = data.find((blog) => blog._id === blogId);
    if (!selectedBlog || !user) return;

    try {
      if (selectedBlog.likes.includes(user._id)) {
        await UnLikeBlog(blogId);
        setData((prevData) =>
          prevData.map((blog) =>
            blog._id === blogId
              ? { ...blog, likes: blog.likes.filter((userId) => userId !== user._id) }
              : blog
          )
        );
      } else {
        await likeBlog(blogId);
        setData((prevData) =>
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

  //* ----------------- category data fetching  ---------------
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const result = await getAllCategories();
        setCategories(result.data);
      } catch (error: any) {
        console.error("Failed to fetch categories:", error.message);
      }
    };
    fetchCategory();
  }, [user]);

  //* ----------------- fetching users data ---------------
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);

        // Initialize isUserFollowing based on whether the current user is in userItem.followers
        const initialIsFollowing: { [key: string]: boolean } = {};
        response.data.forEach((userItem: User) => {
          initialIsFollowing[userItem._id] = userItem.followers.includes(user._id);
        });
        setIsUserFollowing(initialIsFollowing);
      } catch (error: any) {
        console.error("Failed to fetch users:", error.message);
      }
    };
    fetchUsers();
  }, [user]);

  //*-------------------- fetch data of blog --------------------
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const result = await getAllBlogs();
        setData(result.data.blogs);
        setLoading(false);
      } catch (error) {
        console.log("error to fetch blogs");
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [user]);

  //* ------------- get the blog detail page  ------------------
  const handleBlogClick = (blogId: string) => {
    navigate(`/blog-detail/${blogId}`);
  };

  //* ----------------- get users detail page -----------------------
  const handleUserDetailclick = (usersId: string) => {
    navigate(`/users-datails/${usersId}`)
  };

  //* ----------------- get users detail page -----------------------
  const handleCategoryDetailclick = () => {
    navigate(`/category-detail`)
  };

  //* ------------- follow/unfollow users by logged-in user --------------
  const handleFollowUnfollowUser = async (userId: string) => {
    try {
      if (isUserFollowing[userId]) {
        const response = await unfollowUser(userId);
        setIsUserFollowing((prev) => ({ ...prev, [userId]: false }));
        console.log(response);
      } else {
        const response = await followUser(userId);
        setIsUserFollowing((prev) => ({ ...prev, [userId]: true }));
        console.log(response);
      }
    } catch (error: any) {
      console.error('Error following/unfollowing user:', error.message);
    }
  };

  //*----------------- follow/unfollow the category by logged-in user -------------
  // const handleFollowUnfollowCategory = async (categoryId: string) => {
  // };

  return (
    <div className="flex justify-center">
      {!isAuthenticated ? (
        <div className="relative w-full h-screen bg-cover bg-center">
          <img
            src={landing_Image}
            alt="landing-image"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-y-6">
            <div>
              <p className="text-slate-100 font-dancing-script font-bold text-5xl">
                Platform to learn and share your Knowledge
              </p>
            </div>
            <div className="flex items-center justify-center gap-6">
              <p className="text-slate-100 font-semibold text-2xl">
                Welcome to DevFlow
              </p>
              <button className="bg-white px-4 font-medium h-8 rounded-lg hover:opacity-80">
                <Link to="/login">Get Start</Link>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col max-w-7xl mt-24 md:flex-row mx-2 md:mx-4 lg:mx-4">
          {/* --------------- Left side content ---------------- */}
          <div className="md:w-[900px] lg:w-[750px] xl:w-[900px] p-4 space-y-4">
            <div
              className="flex gap-5 cursor-pointer p-3 overflow-x-auto whitespace-nowrap scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <p className="text-xl inline-flex items-center p-1 bg-slate-200 hover:bg-slate-300 rounded-full">
                <GoPlus />
              </p>
              <p className="inline-flex items-center">coding</p>
              <p className="inline-flex items-center">games</p>
            </div>

            {data.length > 0 ? (
              data.map((blog) => (
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
                        <p className="text-sm">{blog.author.username}</p>
                      </div>
                      <p className="font-bold text-xl mt-3">{blog.title}</p>
                      <p className="text-md">
                        {blog.content.length > 140
                          ? `${blog.content.slice(0, 140)}...`
                          : blog.content}
                      </p>
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
                          <p className="text-sm">{blog.likes.length ? blog.likes.length : ""}</p>
                        </span>
                      </div>
                      <div className="flex gap-x-4">
                        <BsFillBookmarkPlusFill />
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

          {/* ----------------- Right side content ------------------ */}
          <div className="lg:w-[300px] xl:w-[400px] px-2 py-6 border-l-[1px] border-slate-200 hidden lg:block">
            <div className="m-2 p-3">
              <p className="font-semibold underline underline-offset-4">Recommended Categories</p>
              <div className="flex my-3 gap-2 flex-wrap">
                {categories.slice(0, 10).map((category) => (
                  <button
                    key={category._id}
                    onClick={handleCategoryDetailclick}
                    className="bg-gray-200 hover:bg-gray-800 text-black hover:text-white cursor-pointer text-sm py-1 px-3 rounded-2xl">
                    {category.categoryName}
                  </button>
                ))}
                <button className="bg-gray-600 text-white text-sm px-3 py-1 rounded-2xl">
                  + more
                </button>
              </div>
            </div>

            <div className="border-b-[1px]"></div>

            <div className="m-2 p-3">
              <div className="flex justify-between">
                <p className="font-semibold underline underline-offset-4">Who To Follow</p>
                <p className="text-black font-normal text-md cursor-pointer"> + more</p>
              </div>
              <div className="my-3">
                {users.slice(0, 8).map((userItem) => (
                  <div key={userItem._id} className="flex justify-between items-center my-1">
                    <div 
                      onClick={() => handleUserDetailclick(userItem._id)} 
                      className="flex items-center gap-2 cursor-pointer"
                          >
                      <img
                        src={userItem.profilePhoto}
                        alt="pro-img"
                        className="h-10 w-10 rounded-full"
                      />
                      <p className="font-semibold">
                        {userItem.username} <span className="ms-2 text-sm text-red-800">{userItem.role}</span>
                      </p>
                    </div>
                    <div className="">
                      <button
                        onClick={() => handleFollowUnfollowUser(userItem._id)}
                        className={`hover:bg-black hover:text-white text-sm border-[1px] border-black px-3 py-1 rounded-2xl 
                          ${isUserFollowing[userItem._id] ? 'bg-black text-white' : 'bg-white text-black'
                        }`}
                      >
                        {isUserFollowing[userItem._id] ? 'Following' : 'Follow'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import landing_Image from "../../../../assets/images/SAVE_20241105_220105~2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { getAllBlogs } from "../../../../services/axios.GetMethods";
import { likeBlog } from "../../../../services/axios.PostMethods";
import { UnLikeBlog } from "../../../../services/axios.DeleteMethods";
import { AiFillLike } from "react-icons/ai";
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

const Home: React.FC = () => {
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
  const [data, setData] = useState<BlogList[]>([]);
  const user = useSelector((state: any) => state.user.user);
  const navigate = useNavigate();
  const { setLoading } = useLoading();


  //*-------------------- give like/unlike to blog --------------------
  const handleLike = async (blogId: string) => {

    const blog = data.find(b => b._id === blogId);
    if (blog && blog.likes.includes(user._id)) {
      // Unlike the blog
      await UnLikeBlog(blogId);
      setData(data.map(b => b._id === blogId ? { ...b, likes: b.likes.filter(l => l !== user._id) } : b));
    } else {
      // Like the blog
      await likeBlog(blogId);
      setData(data.map(b => b._id === blogId ? { ...b, likes: [...b.likes, user._id] } : b));
    }
  };

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
  }, []);


  //* ------------- get the blog detail page  ------------------
  const handleBlogClick = (blogId: string) => {
    navigate(`/blog-detail/${blogId}`);
  };


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

            {data.map((blog) => (
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
                          onClick={(event) =>{ 
                            event.stopPropagation();
                            handleLike(blog._id)}
                          }
                          className={
                            blog.likes.includes(user?._id)
                              ? "text-red-600 hover:border border-white"
                              : "text-black  hover:border border-white"
                          }
                        />
                      <p className="text-sm">{blog.likes.length ? blog.likes.length : "" }</p>
                      </span>
                    </div>
                    <div className="flex gap-x-4">
                      <span>
                        <BsFillBookmarkPlusFill className="hover:border border-white" />
                      </span>
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
            ))}
          </div>

          {/* ----------------- Right side content ------------------ */}
          <div className="lg:w-[300px] xl:w-[400px] px-6 py-6 border-l-[1px] border-slate-200 hidden lg:block">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error
              illum quis libero assumenda optio ipsa. Facere suscipit amet
              voluptas mollitia quaerat dignissimos, repudiandae omnis quis
              veritatis laborum, quod, consequuntur excepturi?
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

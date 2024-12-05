import React, { useEffect, useState } from 'react'
import { AiFillLike } from 'react-icons/ai';
import { BsFillBookmarkPlusFill } from 'react-icons/bs';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoading } from '../../../../contexts/LoadingContext';
import { likeBlog } from '../../../../services/axios.PostMethods';
import { UnLikeBlog } from '../../../../services/axios.DeleteMethods';
import { getUsersDetails } from '../../../../services/axios.GetMethods';
import { useSelector } from 'react-redux';


type User = {
  _id: string;
  username: string;
  email: string;
  profilePhoto?: string;
  bookmarks?: string[];
  role: string;
  followers: string[];
  following: User[];
  followedCategory: string[];
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


const UsersDetailPage:React.FC = () => {

  const user = useSelector((state: any) => state.user.user);
  const [blogData, setBlogData] = useState<BlogList[]>([]);
  const [author, setAuthor] = useState<User | null>(null);
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { usersId } = useParams<{ usersId: string }>();

  //*-------------------- like/unlike to blog --------------------
  const handleLike = async (blogId: string) => {
    const selectedBlog = blogData.find((blog) => blog._id === blogId);
    if (!selectedBlog || !user) return;

    try {
      if (selectedBlog.likes.includes(user._id)) {
        await UnLikeBlog(blogId);
        setBlogData((prevData) =>
          prevData.map((blog) =>
            blog._id === blogId
              ? { ...blog, likes: blog.likes.filter((userId) => userId !== user._id) }
              : blog
          )
        );
      } else {
        await likeBlog(blogId);
        setBlogData((prevData) =>
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

  //* ----------------- get the blogs details of users ---------------------
  useEffect(() => {
    const getUserDetail = async() => {
      try{
        if (!usersId) return;
        setLoading(true);
        const response = await getUsersDetails(usersId);
        console.log(response.data);
        setBlogData(response.data || []);
        if (response.data.length > 0) {
          setAuthor(response.data[0]?.author || null);
        }
        setLoading(false);
      }catch(error: any){
        setLoading(false);
        console.log("failed to fetch the users blog details: ", error.message);
      }
    }
    getUserDetail();
  },[usersId])


  //* ------------- get the blog detail page  ------------------
  const handleBlogClick = (blogId: string) => {
    navigate(`/blog-detail/${blogId}`);
  };

  return (
    <div className='flex justify-center'>
        <div className="flex flex-col max-w-7xl mt-24 md:flex-row mx-2 md:mx-4 lg:mx-4">
          {/* --------------- Left side content ---------------- */}

          <div className="md:w-[900px] lg:w-[750px] xl:w-[900px] p-4 space-y-4">
          <div className='text-4xl font-bold'>{author?.username}</div>
            {blogData.length > 0 ? (
              blogData.map((blog) => (
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
                        <p className="text-sm font-semibold">Published in 
                          <span className='text-sm font-normal mx-1 text-red-700'>
                            {blog.category.categoryName}
                          </span>
                        </p>
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
              {author ? (
                <div className="flex flex-col items-center gap-2 mt-3">
                  <img
                    src={author.profilePhoto || '/placeholder.png'}
                    alt="author-img"
                    className="h-28 w-28 rounded-full"
                  />
                  <p className="text-lg font-semibold">{author.username}</p>
                  <p className="text-sm">{author.email}</p>
                  <p className="text-sm">{author.followers.length} Followers</p>
                </div>
              ) : (
                <p>No author details available.</p>
              )}
            </div>

            <div className="border-b-[1px]"></div>

            <div className="m-2 p-3 ">
              <div className="flex ">
                <p className="font-semibold underline underline-offset-4">Following</p>
              </div>
              <div className="my-3 flex flex-col">
                {author?.following?.length? (
                  author.following.map((followedUser, index) => (
                    <div
                      key={index}
                      className="flex items-center my-2 gap-2"
                    >
                      <img
                        src={followedUser.profilePhoto || '/placeholder.png'}
                        alt="pro-img"
                        className="h-10 w-10 rounded-full"
                      />
                      <div><p className="text-sm font-semibold">{followedUser.username}</p></div>
                    </div>
                  ))
                ) : (
                  <p>No following details available.</p>
                )}

              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default UsersDetailPage

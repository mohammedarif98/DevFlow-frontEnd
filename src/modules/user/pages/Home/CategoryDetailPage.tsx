import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoading } from '../../../../contexts/LoadingContext';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';
import { AiFillLike } from 'react-icons/ai';
import { unfollowCategory, UnLikeBlog } from '../../../../services/axios.DeleteMethods';
import { followCategory, likeBlog } from '../../../../services/axios.PostMethods';
import { getCategoryMatchBlogs } from '../../../../services/axios.GetMethods';
import { BsFillBookmarkPlusFill } from 'react-icons/bs';

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

const CategoryDetailPage: React.FC = () => {

  const user = useSelector((state: any) => state.user.user);
  const [blogData, setBlogData] = useState<BlogList[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const { setLoading } = useLoading();


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


  //* ---------------- get the blog details of category ---------------------
  useEffect(() => {
    const getBlogDetail = async () => {
      try {
        if (!categoryId) return;
        setLoading(true);
        const response = await getCategoryMatchBlogs(categoryId);
        setBlogData(response.data || []);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.log("failed to fetch the category matched blog details: ", error.message);
      }
    };
    getBlogDetail();
  }, [categoryId]);


  //* ---------------- get the blog detail page ---------------------
  const handleBlogClick = (blogId: string) => {
    navigate(`/blog-detail/${blogId}`);
  };


  //*----------------- follow/unfollow the category by logged-in user -------------
  const handleFollowUnfollowCategory = async () => {
    if (!categoryId || !user) return;

    try {
      if (isFollowing) {
        await unfollowCategory(categoryId);
        setIsFollowing(false);
      } else {
        await followCategory(categoryId); 
        setIsFollowing(true);
      }
    } catch (error: any) {
      console.log("Error occurred while toggling category follow/unfollow:", error.message);
    }
  };

  //* ---------------- get author name of the blog ---------------------
  const categoryName = blogData.length > 0 ? blogData[0].category.categoryName : "";

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      {categoryName ? (
        <div className="flex flex-col items-center mt-24 mb-8 justify-center gap-y-4">
          <p className="text-2xl lg:text-4xl font-bold text-center">{categoryName}</p>
          <button
            className={`px-4 py-2 text-white rounded-full ${
              isFollowing ? 'bg-black' : 'bg-black'
            }`}
            onClick={handleFollowUnfollowCategory}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500"></p>
      )}
      <div className="w-full max-w-[1500px] px-6 pb-4 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blogData.length > 0 ? (
            blogData.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-col border-[1px] border-gray-400 cursor-pointer"
                onClick={() => handleBlogClick(blog._id)}
              >
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className='h-[200px] cursor-pointer'
                />
                <div className="flex flex-col justify-between flex-grow p-2 bg-white">
                  <div>
                    <div className="flex items-center gap-2">
                      <img
                        src={blog.author.profilePhoto}
                        className="h-7 w-7 rounded-full"
                        alt={blog.author.username}
                      />
                      <p className="text-sm font-semibold">{blog.author.username}</p>
                    </div>
                    <p className="font-bold my-1 text-center">{blog.title}</p>
                    <p className="text-black mt-1 text-sm">
                      {blog.content.length > 70
                        ? `${blog.content.slice(0, 90)}...`
                        : blog.content}
                    </p>
                  </div>
                  <div className="bg-slate-50 mt-2">
                    <div className="flex justify-between px-3 py-2">
                      <div className="flex items-center gap-x-2">
                        <span className="text-xs text-black">{blog.publishedAt}</span>
                        <IoChatbubbleEllipsesSharp className="cursor-pointer" />
                        <span className="flex items-center gap-x-1">
                          <AiFillLike
                            onClick={(event) => {
                              event.stopPropagation();
                              handleLike(blog._id);
                            }}
                            className={`cursor-pointer ${
                              blog.likes.includes(user?._id)
                                ? 'text-red-600'
                                : 'text-gray-600'
                            }`}
                          />
                          <p className="text-sm">{blog.likes.length || ''}</p>
                        </span>
                      </div>
                      <BsFillBookmarkPlusFill className="cursor-pointer text-gray-600" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='flex justify-center mt-56 items-center w-[1500px] h-full'>
              <p className="text-lg text-black">Sorry, No blogs available related to this category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailPage;
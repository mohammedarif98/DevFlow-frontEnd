import React, { useEffect, useState } from "react";
import { getBlogComments, getBlogDetail } from "../../../../services/axios.GetMethods";
import { useParams } from "react-router-dom";
import { BsChat, BsFillBookmarkPlusFill } from "react-icons/bs";
import { AiFillLike, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { UnLikeBlog } from "../../../../services/axios.DeleteMethods";
import { addComment, likeBlog } from "../../../../services/axios.PostMethods";
import { useLoading } from "../../../../contexts/LoadingContext";
import img from '../../../../assets/images/pngtree-man-avatar-image-for-profile-png-image_13001882.png'
import { GrMoreVertical } from "react-icons/gr";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";


type User = {
  _id: string;
  username: string;
  email: string;
  profilePhoto?: string;
  bookmark: string[];
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

type Comment = {
  content: string;
  user: User;
  _id: number;
}


const BlogDetail: React.FC = () => {

  const user = useSelector((state: any) => state.user.user);
  const { blogId } = useParams<{ blogId: string }>();
  const [blogData, setBlogData] = useState<BlogList | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading();
  const [showChat, setShowChat] = useState(false);


  //* ------------------ Toggle chat offcanvas --------------------------
  const toggleChat = () => setShowChat(!showChat);


  //* ------------------- Fetching the blog data ---------------------
  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        if (!blogId) return;
        setLoading(true);
        const result = await getBlogDetail(blogId);
        setBlogData(result.data);
        setLoading(false);
      } catch (error: any) {
        console.error("Failed to fetch blog details:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchBlogDetail();
  }, [blogId]);


  //* ------------------ Handle liking and unliking the blog ---------------------
  const handleLike = async () => {
    if (!blogData || !user._id) return;
    if (blogData.likes.includes(user._id)) {
      await UnLikeBlog(blogData._id);
      setBlogData((prevData) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          likes: prevData.likes.filter((userId) => userId !== user._id),
        };
      });
    } else {
      await likeBlog(blogData._id);
      setBlogData((prevData) => {
        if (!prevData) return prevData;
        return {
          ...prevData,
          likes: [...prevData.likes, user._id],
        };
      });
    }
  };


  //* --------------- Handle addComment on blog ------------------
  const handleAddComment= async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!blogId || !content) return;

    try{
      const response = await addComment(blogId, content);
      setComments([...comments, response.data]);
      setContent('');                                        // Clear the textarea
      console.log(response.data);
    }catch(error: any){
      console.log("failed to add Comment on blog",error.message);
    }
  }
  

  //* --------------- fetch the Comments of blog ------------------
  
  useEffect(() => {
    const fetchComments = async() => {
      try{
        if (!blogId) return;
        const response = await getBlogComments(blogId);
        setComments(response.data.comments);
      }catch(error: any){
        console.error("Failed to fetch blog details:", error.message);
        setError(error.message);
      }
    }
    fetchComments();
  },[blogId])



  return (
    <div className="flex justify-center">
      {blogData && (
        <div className="border-x-[1px] p-8 mt-16 max-w-5xl space-y-4">
          <div className="flex justify-center">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
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
                src={blogData.author.profilePhoto || ""}
                className="h-10 w-10 md:h-14 md:w-14 rounded-full"
                alt="profile-img"
              />
              <div className="">
                <p className="font-semibold text-sm md:text-md">
                  {blogData.author.username}
                </p>
                <p className="text-xs md:text-sm font-normal">
                  Published on: {blogData.publishedAt}
                </p>
              </div>
            </div>
            <div className="flex justify-between p-2 border-y-[1px]">
              <div className="flex gap-x-4">
                <button onClick={toggleChat}>
                  <IoChatbubbleEllipsesSharp className="hover:border border-white text-sm md:text-lg" />
                </button>
                <span className="flex items-center gap-x-1">
                  <AiFillLike
                    onClick={handleLike}
                    className={
                      blogData.likes.includes(user?._id)
                        ? "text-red-600 hover:border border-white"
                        : "text-black hover:border border-white"
                    }
                  />
                  <p className="text-sm">{blogData.likes.length}</p>
                </span>
              </div>
              <div className="flex gap-x-4">
                <BsFillBookmarkPlusFill />
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
              <div className="w-[435px] bg-gray-50 max-h-full overflow-y-auto shadow-2xl p-4 relative z-10">
                <div className="flex justify-end">
                  <button
                    onClick={toggleChat}
                    className="text-black hover:text-gray-900"
                  >
                    <AiOutlineClose />
                  </button>
                </div>
                {/* -----------------Chat content goes here -------------------- */}
                <div className="mt-4 p-2 bg-white rounded-md shadow-md">
                  <form onSubmit={handleAddComment}>
                    <textarea
                      name="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="w-full p-1 bg-slate-50 border rounded focus:outline-none h-28"
                      rows={10}
                      placeholder="What are your thoughts?"
                    ></textarea>
                    <div className="flex gap-x-2  justify-end">
                      <button 
                        type="button" 
                        onClick={() => setContent('')} 
                        className={`px-3 py-1 bg-black text-sm rounded-xl text-white ${
                          content.trim() === "" ? "opacity-40 cursor-not-allowed" : ""
                        }`}
                        disabled={content.trim() === ""}
                      >
                        Clear
                      </button>
                      <button
                        type="submit"
                        className={`px-2 py-1 bg-green-600 text-sm rounded-xl text-white ${
                          content.trim() === "" ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={content.trim() === ""}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>

                <hr className="my-5"/>

                {comments && comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <React.Fragment key={comment._id}>
                      <div className="p-1 bg-slate-100">
                        <div className="flex items-center justify-between px-2">
                          <div className="flex gap-x-1 items-center">
                            {/* Provide default image if profilePhoto is undefined */}
                            <img
                              src={comment.user.profilePhoto || img}
                              alt={comment.user.username || 'User'}
                              className="h-8 w-8 rounded-full"
                            />
                            <p className="text-xs">{comment.user.username}</p>
                          </div>
                          <div className=""><GrMoreVertical /></div>
                        </div>
                        <div className="py-2 px-4">
                          <p className="break-words whitespace-normal text-sm">{comment.content}</p>
                        </div>
                        <div className="flex justify-between text-sm px-3 mt-2">
                          <p className="flex items-center gap-x-1">
                            <BsChat /> replies
                          </p>
                          <p>Reply</p>
                        </div>
                      </div>
                      {index !== comments.length - 1 && <hr className="my-3" />}
                    </React.Fragment>
                  ))
                ) : (
                  <p>No comments yet.</p>
                )}

              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogDetail;

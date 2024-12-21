import React, { useEffect, useState } from "react";
import { getBlogComments, getBlogDetail } from "../../../../services/axios.GetMethods";
import { useParams } from "react-router-dom";
import { BsBookmarkCheckFill, BsChat, BsFillBookmarkPlusFill } from "react-icons/bs";
import { AiFillLike, AiOutlineClose } from "react-icons/ai";
import { useSelector } from "react-redux";
import { deleteComment, unbookmarkBlog, UnLikeBlog } from "../../../../services/axios.DeleteMethods";
import { addComment, bookmarkBlog, likeBlog, replyToComment } from "../../../../services/axios.PostMethods";
import { useLoading } from "../../../../contexts/LoadingContext";
import img from '../../../../assets/images/pngtree-man-avatar-image-for-profile-png-image_13001882.png';
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
  _id: string;
  replies: ReplyComment[];
};

type ReplyComment = {
  _id: string;
  replyContent: string;
  createdAt: Date;
  user: string;            // User ID
  isReplyDeleted: boolean
};

const BlogDetail: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);
  const { blogId } = useParams<{ blogId: string }>();
  const [blogData, setBlogData] = useState<BlogList | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading();
  const [showChat, setShowChat] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState<string>('');
  const [replyContent, setReplyContent] = useState<{ [key: string]: string }>({});
  const [replyOpen, setReplyOpen] = useState<{ [key: string]: boolean }>({});
  const [deleteDropDownOpen, setDeleteDropDownOpen] = useState<{ [key: string]: boolean }>({});
  const [bookmarkStatus, setBookmarkStatus] = useState<{[key: string]: boolean}>({})



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
    if (!blogData || !user?._id) return;
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
  const handleAddComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!blogId || !content) return;

    try {
      const response = await addComment(blogId, content);
      setComments([...comments, response.data]);
      setContent(''); // Clear the textarea
      setReplyContent((prev) => ({
        ...prev,
        [response.data._id]: '',
      }));
      console.log(response.data);
    } catch (error: any) {
      console.log("Failed to add comment on blog", error.message);
    }
  };


  //* --------------- fetch the Comments of blog ------------------  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (!blogId) return;
        const response = await getBlogComments(blogId);
        console.log(response.data);
        setComments(response.data.comments);
      } catch (error: any) {
        console.error("Failed to fetch blog comments:", error.message);
        setError(error.message);
      }
    };
    fetchComments();
  }, [blogId]);


  //* ------------------ show/hide the add reply form box --------------------
  const toggleReply = (commentId: string) => {
    setReplyOpen((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
    setReplyContent((prev) => ({
      ...prev,
      [commentId]: prev[commentId] || '',
    }));
  };


  //* --------------- handle reply to comment on blog --------------------
  const handleReplyComments = async (commentId: string, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!blogId || !commentId || !replyContent[commentId]) return;
    try {
      const response = await replyToComment(blogId, commentId, replyContent[commentId]);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId
            ? { ...comment, replies: [...(comment.replies || []), response.data.comment] }
            // ? { ...comment, replies: [...comment.replies, response.data.reply] }
            : comment
          )
      );
      setReplyContent((prev) => ({ ...prev, [commentId]: '' }));
      setReplyOpen((prev) => ({ ...prev, [commentId]: false }));
    } catch (error: any) {
      console.log("Failed to add reply to comment", error.message);
    }
  };

  //* ------------------ Toggle dropdown for comment options --------------------
  const toggleDropdown = (commentId: string) => {
    setDeleteDropDownOpen((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  //* --------------- Handle delete comment --------------------
  const handleDeleteComment = async (commentId: string) => {
    if (!blogId || !user?._id) return;
    // Find the comment to delete
    const commentToDelete = comments.find(comment => comment._id === commentId);
    if (!commentToDelete || commentToDelete.user._id !== user._id) {
      console.error("You don't have permission to delete this comment.");
      return;
    }

    try {
      await deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error: any) {
      console.log("Failed to delete comment", error.message);
    }
  };

  //*----------------- handle bookmark/unbookmark -------------
  const handleBookmark = async (blogId: string) => {
    if (!user) return;

    try {
      if (bookmarkStatus[blogId]) {
        await unbookmarkBlog(blogId);
        setBookmarkStatus((prev) => ({ ...prev, [blogId]: false }));
      } else {
        await bookmarkBlog(blogId);
        setBookmarkStatus((prev) => ({ ...prev, [blogId]: true }));
      }
    } catch (error: any) {
      console.error("Error toggling bookmark for the blog:", error.message);
    }
  };
  


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
                src={blogData.author.profilePhoto}
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
                <div className="flex gap-x-1">
                  <button onClick={toggleChat} className="flex items-center">
                    <IoChatbubbleEllipsesSharp className="hover:border border-white text-sm md:text-lg" />
                  </button>
                  <p className="text-sm">{comments.length}</p>
                </div>
                <span className="flex items-center text-sm md:text-lg gap-x-1">
                  <AiFillLike
                    onClick={handleLike}
                    className={
                      blogData.likes.includes(user?._id || "")
                        ? "text-red-600 hover:border border-white"
                        : "text-black hover:border border-white"
                    }
                  />
                  <p className="text-sm">{blogData.likes.length}</p>
                </span>
              </div>
              <div className="flex gap-x-4 text-sm md:text-lg">
                {bookmarkStatus[blogData._id] ? (
                  <BsBookmarkCheckFill
                    onClick={(event) => {
                      event.stopPropagation();
                      handleBookmark(blogData._id);
                    }}
                    className="text-red-600 cursor-pointer"
                  />
                ) : (
                  <BsFillBookmarkPlusFill
                    onClick={(event) => {
                      event.stopPropagation();
                      handleBookmark(blogData._id);
                    }}
                    className="text-black cursor-pointer"
                  />
                )}
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

                {/* ----------------- blog comment form box -------------------- */}
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
                    <div className="flex gap-x-2 justify-end">
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

                <hr className="my-5" />

                {comments && comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <React.Fragment key={comment._id}>
                      <div className="p-1 bg-slate-100 border-l-2 border-l-gray-400 ">
                        {/* ------------- list of comment ---------------- */}
                        <div className="flex items-center justify-between px-2">
                          <div className="flex gap-x-1 items-center">
                            <img
                              src={comment.user.profilePhoto || img }
                              alt="pro-img"
                              className="h-8 w-8 rounded-full"
                            />
                            <p className="text-xs">{comment.user.username}</p>
                          </div>
                          {/* ------------ derop down delte comment ------------------ */}
                          <div className="relative">
                            <button onClick={() => toggleDropdown(comment._id)}>
                              <GrMoreVertical />
                            </button>
                            {deleteDropDownOpen[comment._id] && (
                              <div className="absolute top-0 right-4 w-16 bg-white border border-gray-200 rounded shadow-lg z-10">
                                <button
                                  onClick={() => handleDeleteComment(comment._id)}
                                  disabled={comment.user._id !== user?._id}
                                  className={`flex w-full text-left px-2 py-1 text-sm ${
                                    comment.user._id === user?._id ? 'text-black hover:bg-red-100' : 'text-gray-100 cursor-not-allowed'
                                  }`}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="py-2 px-4">
                          <p className="break-words whitespace-normal text-sm">{comment.content}</p>
                        </div>
                        <div className="flex justify-between text-sm px-3 mt-2">
                          <p className="flex items-center gap-x-1 cursor-pointer">
                            { comment.replies.length } replies
                          </p>
                          <p onClick={() => toggleReply(comment._id)}>Reply</p>
                        </div>
                        {/* ------------- hide/show the reply to comment form box ---------------- */}
                        {replyOpen[comment._id] && (
                          <div className="p-2 mt-2 ms-4">
                            <form onSubmit={(event) => handleReplyComments(comment._id, event)}>
                              <textarea
                                name="replyContent"
                                value={replyContent[comment._id] || ''}
                                onChange={(e) =>
                                  setReplyContent((prev) => ({
                                    ...prev,
                                    [comment._id]: e.target.value,
                                  }))
                                }
                                className="w-full p-1 bg-slate-200 border rounded focus:outline-none"
                                rows={3}
                                placeholder="Write your reply..."
                              ></textarea>
                              <div className="flex justify-end">
                                <button
                                  type="submit"
                                  className={`px-4 py-1 bg-green-700 text-sm rounded-xl text-white ${
                                    replyContent[comment._id]?.trim() === ""
                                      ? "opacity-40 cursor-not-allowed"
                                      : ""
                                  }`}
                                  disabled={replyContent[comment._id]?.trim() === ""}
                                >
                                  Reply
                                </button>
                              </div>
                            </form>
                          </div>
                        )}
                        {/* ---------------- list the replies of associated comment -------------- */}
                        
                      </div>
                      {index !== comments.length - 1 && <hr className="my-3" />}
                    </React.Fragment>
                  ))
                ) : (
                  <p className="text-center text-sm">No comments yet.</p>
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
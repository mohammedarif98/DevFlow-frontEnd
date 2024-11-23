import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import landing_Image from "../../../../assets/images/SAVE_20241105_220105~2.jpg";
// import img from '../../../../assets/images/SAVE_20241105_220105~2.jpg'
import { Link } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { BiSolidLike } from "react-icons/bi";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { getAllBlogs } from "../../../../services/axios.GetMethods";


type User = {
  _id: string;
  username: string;
  email: string;
  profilePhoto?: string ; 
};

type BlogList = {
  _id: string,
  title: string,
  content: string,
  tags: string[],
  category: string,
  coverImage: string,
  author: User,
  publishedAt: string
}


const Home: React.FC = () => {
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
  const [data, setData] = useState<BlogList[]>([]);

  useEffect(() => {
    const fetchBlogs = async()=>{
      try{
        const result = await getAllBlogs();
        setData(result.data.blogs)
      }catch(error){
        console.log("error to fetch blogs");
      }
    }
    fetchBlogs();
  },[]);

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
              <p className="text-slate-100 font-semibold text-2xl">Welcome to DevFlow</p>
              <button className="bg-white px-4 font-medium h-8 rounded-lg hover:opacity-80">
                <Link to="/login">Get Start</Link>
              </button>
            </div>
          </div>
        </div>
      ) : (
      <div className="flex flex-col max-w-7xl mt-24 md:flex-row border mx-2 md:mx-4 lg:mx-4">
        {/* --------------- Left side content ---------------- */}
        <div className="md:w-[900px] lg:w-[750px] xl:w-[900px] p-4 space-y-4 border">
          <div className="flex gap-5 border cursor-pointer p-3 overflow-x-auto whitespace-nowrap scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            <p className="text-xl inline-flex items-center p-1 bg-slate-200 hover:bg-slate-300 rounded-full"><GoPlus /></p>
            <p className="inline-flex items-center">coding</p>
            <p className="inline-flex items-center">games</p>
          </div>

          {data.map((blog) => (
            <div key={blog._id} className="bg-slate-300 px-3 py-2 flex justify-between gap-4">   
              <div className="w-full space-y-2">
                <div className="p-1">
                  <div className="flex items-center gap-2">
                    <img src={blog.author.profilePhoto} alt="pro-img" className="h-8 w-8 rounded-full"  />
                    <p className="text-sm">{blog.author.username}</p>
                  </div>
                  <p className="font-bold text-xl">{blog.title}</p>
                  <p className="">{blog.content.length > 140 ? `${blog.content.slice(0, 140)}...` : blog.content}</p>
                </div>
                <div className="flex justify-between px-3 py-1 border">
                  <div className="flex gap-x-4">
                    <span className="text-xs">{blog.publishedAt}</span>
                    <span><IoChatbubbleEllipsesSharp className="text-orange-500" /></span>
                    <span><BiSolidLike /></span>
                  </div>
                  <div className="flex gap-x-4">
                    <span><BsFillBookmarkPlusFill /></span>
                  </div>
                </div>
              </div>
              <div className="md:flex items-center hidden sm:block">
                <img src={blog.coverImage} alt="cover-img" className="h-36 w-64" />
              </div>
            </div>
          ))}

        </div>

        {/* ----------------- Right side content ------------------ */}
        <div className="lg:w-[300px] xl:w-[400px] px-6 py-6 border border-slate-200 hidden lg:block">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error illum quis libero assumenda optio ipsa. Facere suscipit amet voluptas mollitia quaerat dignissimos, repudiandae omnis quis veritatis laborum, quod, consequuntur excepturi?</p>
        </div>
      </div>
      )}
    </div>
  );
};


export default Home;
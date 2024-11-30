import React, { useEffect, useState } from "react";
import { getBlogDetails } from "../../../../services/axios.GetMethods";
import { useLoading } from "../../../../contexts/LoadingContext";
import { useParams } from "react-router-dom";

interface Blog {
    title: string;
    coverImage: string;
    content :string;
    publishedAt: string;
    tags: string[];
    author: {
        username: string;
        profilePhoto: string
    }
    category: {
        categoryName: string
    }
}


const BlogDetailPage: React.FC = () => {

  const { blogId } = useParams<{ blogId: string }>();
  const [blogData, setBlogData] = useState<Blog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchBlog = async()=>{
        try {
            if (!blogId){
                setError('Blog ID is missing.'); 
                return;
            }
            setLoading(true);
            const response = await getBlogDetails(blogId);
            console.log(response);
            setBlogData(response.data);
        } catch (error: any) {
            console.log(error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    fetchBlog();
  },[blogId]);

  return (
    <div className="bg-white p-5">
        {blogData && (
            <div className="space-y-2">
                <div className="flex justify-center mb-6">
                    <p className="text-2xl font-bold">{blogData.title}</p>
                </div>

                <div className="flex gap-x-3">
                    <img src={blogData.coverImage} className="h-[200px] w-[450px] md:h-[400px] md:w-[900px]" alt="blog-img"  />
                    <div className="flex flex-col space-y-3 justify-between w-full p-3">

                        <div className="flex gap-4 w-full">                    
                            <div className="w-full">
                                <div className="flex justify-between">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={blogData.author.profilePhoto}
                                            className="h-10 w-10 md:h-14 md:w-14 rounded-full"
                                            alt="pro-img"
                                        />
                                        <p className="font-bold text-sm md:text-lg">
                                            {blogData.author.username}
                                        </p>
                                    </div>
                                    <div className="flex items-center">
                                        <p className="text-sm md:text-md font-semibold">
                                            Published on : {blogData.publishedAt}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex">
                            <ul className="flex gap-1 ">
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

                        <div className="flex flex-col flex-1">
                            <p className="font-semibold text-md">Category: {blogData.category.categoryName}</p>
                            <p className="font-semibold text-md">Likes: 24354</p>
                        </div>
                    </div>
                </div>

                <div className="p-2">
                    <p className="first-letter:text-3xl">{blogData.content.length > 2500 ? `${blogData.content.slice(0, 2600)}` : blogData.content}</p>
                </div>
            </div>
        )}
    </div>
  );
};

export default BlogDetailPage;

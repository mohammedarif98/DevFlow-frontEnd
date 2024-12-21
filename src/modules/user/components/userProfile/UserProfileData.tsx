import React, { useRef, useEffect, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { getBookmarkandBlog } from '../../../../services/axios.GetMethods';
import { useNavigate } from 'react-router-dom';
Chart.register(...registerables);


const UserProfileData: React.FC = () => {

  const lineChartRef = useRef<HTMLCanvasElement | null>(null);
  const [userData, setUserData] = useState<{createdBlogs: any[], bookmarkedBlogs: any[]} | null>(null);
  const navigate = useNavigate()


  //*-------------------- handle bookmark page ----------------------
  const handleBookmarkPage = () => {
    navigate('/bookmarked')
  } 

  //*------------------- get bookmarked blogs  -----------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookmarkandBlog();
        setUserData(data.data); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  //*------------------- bookmarked chart data -----------------------
  useEffect(() => {
    if (lineChartRef.current && userData) {
      const ctx = lineChartRef.current.getContext("2d");

      if (ctx) {
        const monthlyBlogCreations = Array(12).fill(0); 

        userData.createdBlogs.forEach((blog) => {
          const month = new Date(blog.createdAt).getMonth(); 
          monthlyBlogCreations[month] += 1;
        });

        new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: "Blogs Created",
                data: monthlyBlogCreations,
                backgroundColor: "rgba(40, 180, 99, 0.2)",
                borderColor: "rgba(40, 180, 99, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }, [userData]);


  return (
    <div className='flex flex-col lg:flex-row gap-4 p-2'>
      {/* Left Sidebar */}
      <div className='w-full lg:w-1/3 bg-slate-200 rounded-sm'>
      <div className='flex justify-center '><p className='font-semibold m-2'>Bookmarked Blogs</p></div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-2'>
          {userData?.bookmarkedBlogs.map((blog) => (
            <div key={blog._id} className='bg-white w-full h-32 rounded-md cursor-pointer' onClick={handleBookmarkPage}>
              <img src={blog.coverImage} alt="blog-img" className='h-36 object-cover' />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='w-full lg:w-2/3 bg-slate-200 rounded-sm'>
        <div className='h-[500px] p-2'>
        <canvas ref={lineChartRef} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default UserProfileData;
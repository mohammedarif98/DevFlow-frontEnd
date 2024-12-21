import React, { useEffect, useRef, useState } from 'react'
import { BiSolidCategory } from 'react-icons/bi';
import { FaUserCheck, FaUsers } from 'react-icons/fa';
import { SiBloglovin } from 'react-icons/si';
import { useSelector } from 'react-redux'
import { getDashboard } from '../../../../services/axios.GetMethods';
import { Chart, registerables } from 'chart.js';
import { useLoading } from '../../../../contexts/LoadingContext';
Chart.register(...registerables);


const Dashboard:React.FC = () => {

  // const isAuthenticated = useSelector((state:any) => state.admin.isAuthenticated);
  const admin = useSelector((state: any) => state.admin.admin);
  const [userData, setUserData] = useState<any>();
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const doughnutChartRef = useRef<HTMLCanvasElement>(null);
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const { setLoading } = useLoading()


  //*----------- get the data of users -----------------
  useEffect(() => {
    const dashboardData = async() => {
      try{
        setLoading(true);
        const response =  await getDashboard();
        setUserData(response.data);
        setLoading(false);
      }catch(error: any){
        console.log("error in fetching the data in dashboard",error.message);
        setLoading(false);
      }
    } 
    dashboardData()
  },[]);


  //* ----------------------- chart for users account created  ------------------------
  useEffect(() => {
    if (userData && barChartRef.current && doughnutChartRef.current && lineChartRef.current) {
      const barCtx = barChartRef.current.getContext('2d');
      const doughnutCtx = doughnutChartRef.current.getContext('2d');
      const lineCtx = lineChartRef.current.getContext('2d');
  
      // Bar Chart
      if (barCtx) {
        new Chart(barCtx, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Monthly Account Creations',
                data: userData.monthlyAccountCreations,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
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
  
      // Doughnut Chart
      if (doughnutCtx) {
        const categories = userData.categoryBlogCount.map((item: any) => item.categoryName);
        const counts = userData.categoryBlogCount.map((item: any) => item.count);
  
        new Chart(doughnutCtx, {
          type: 'doughnut',
          data: {
            labels: categories,
            datasets: [
              {
                label: 'Category Usage in Blogs',
                data: counts,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 206, 86, 0.5)',
                  'rgba(75, 192, 192, 0.5)',
                  'rgba(153, 102, 255, 0.5)',
                  'rgba(255, 159, 64, 0.5)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: {
                  font: {
                    size: 10,
                  },
                },
              },
            },
          },
        });
      }
  
      // Line Chart
      if (lineCtx) {
        const counts = userData.monthlyBlogCreations;
  
        new Chart(lineCtx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [
              {
                label: 'Blogs Created by Month',
                data: counts,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
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
    <div className="w-full space-y-4">
        <p className="text-2xl font-semibold font-arsenal-sc-regular">Welcome Back, {admin?.username}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="py-2 px-4 flex justify-between items-center rounded-sm shadow-sm h-20 bg-emerald-700">
            <div className='flex flex-col items-center'>
              <span className='text-white text-2xl'><FaUsers /></span>
              <h2 className="text-white font-arsenal-sc-regular tracking-wider font-bold">Total Users</h2>
            </div>
            <p className="text-xl text-white font-bold">{userData?.usersCount}</p>
          </div>

          <div className="py-2 px-4 flex justify-between items-center rounded-sm shadow-sm h-20 bg-cyan-800">
            <div className='flex flex-col items-center'>
              <span className='text-white text-2xl'><FaUserCheck /></span>
              <h2 className="text-white font-arsenal-sc-regular tracking-wider font-bold">Active Users</h2>
            </div>
            <p className="text-xl text-white font-bold">{userData?.activeUserCount}</p>
          </div>

          <div className="py-2 px-4 flex justify-between items-center rounded-sm shadow-sm h-20 bg-fuchsia-900">
            <div className='flex flex-col items-center'>
              <span className='text-white text-2xl'><BiSolidCategory /></span>
              <h2 className="text-white font-arsenal-sc-regular tracking-wider font-bold">Total Category</h2>
            </div>
            <p className="text-xl text-white font-bold">{userData?.categoriesCount}</p>
          </div>

          <div className="py-2 px-4 flex justify-between items-center rounded-sm shadow-sm h-20 bg-purple-800">
            <div className='flex flex-col items-center'>
              <span className='text-white text-2xl'><SiBloglovin /></span>
              <h2 className="text-white font-arsenal-sc-regular tracking-wider font-bold">Total Blogs</h2>
            </div>
            <p className="text-xl text-white font-bold">{userData?.blogsCount}</p>
          </div>
        </div>

      {/* ----------------- chart sections ------------------ */}
      <div className="flex flex-col">
        <div className="flex sm:flex-row gap-2">
          {/*---------- Line chart ----------- */}
          <div className="w-full sm:w-1/2 ">
            <div className="bg-white p-2 shadow-sm">
              <canvas ref={lineChartRef} className="w-full" />
            </div>
          </div>
          {/* ----------- Doughnut chart ------------*/}
          <div className="w-full sm:w-1/2 ">
            <div className="bg-white p-2 shadow-sm">
              <canvas ref={barChartRef} className="w-full" />
            </div>
          </div>
        </div>
        {/* ----------- Bar chart below the top row ------------ */}
        <div className="w-full sm:w-1/2  py-2">
          <div className="bg-white shadow-sm p-2">
              <canvas ref={doughnutChartRef} className="h-[400px] " />
          </div>
        </div>
      </div>
            
    </div>
  )
}


export default Dashboard;
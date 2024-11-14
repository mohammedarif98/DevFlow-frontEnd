import React from "react";
import { useSelector } from "react-redux";
import landing_Image from "../../../../assets/images/SAVE_20241105_220105~2.jpg";
import { Link } from "react-router-dom";



const Home: React.FC = () => {
  const { user } = useSelector((state: any) => state.user);

  return (
    <>
      {!user ? (
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
        <div className="container mx-auto max-w-7xl mt-24">
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0">
            {/* --------------- Left side content ---------------- */}
            <div className="w-full md:w-5/6 p-4 space-y-4">
              <div className="bg-slate-300 px-12 py-6">
                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
              </div>
              <div className="bg-lime-300 px-12 py-6">
                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
              </div>
              <div className="bg-red-300 px-12 py-6">
                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
              </div>
              <div className="bg-emerald-300 px-12 py-6">
                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
                <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
              </div>
            </div>

            {/* ----------------- Right side content ------------------ */}
            <div className="w-full md:w-1/3 px-8 py-6 border-l-[0.5px] border-slate-200">
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error illum quis libero assumenda optio ipsa. Facere suscipit amet voluptas mollitia quaerat dignissimos, repudiandae omnis quis veritatis laborum, quod, consequuntur excepturi?</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
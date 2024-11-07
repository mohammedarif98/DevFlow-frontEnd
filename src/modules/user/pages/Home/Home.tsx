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
        <div className="text-2xl mt-14 font-semibold text-center">
          {user?.username}
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
          <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error fugit distinctio corporis minima quibusdam,<br /> laboriosam odit consequatur, ducimus non hic fuga quis illum ab. Non quam delectus eius ab esse?</p>
        </div>
      )}
    </>
  );
};

export default Home;
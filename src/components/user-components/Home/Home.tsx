import React from "react";
import { useSelector } from "react-redux";
import landing_Image from "../../../assets/images/devbg1.jpeg";

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
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAction } from "../store/auth";

const Login = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSubmit=async (e) => {
        const email=e.get("email");
        const password=e.get("password");

        try {
          const reponse=await fetch("http://localhost:5000/login",{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{
              "Content-Type":"application/json"
            }
          })

          if(reponse.ok)
            navigate("/inbox");
          else{
           const message=await reponse.json()
           console.log(message.message);
           
            throw new Error(message.message)
          }

          const {token}=await reponse.json();
         await dispatch(authAction.login(token))
         navigate("/inbox")
          
        } catch (error) {
          alert(error)
        }
        
        
    }



  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#1A1A40] via-[#3A2E50] to-[#4E3F72] flex items-center justify-center">
      <div className=" bg-[#242038] p-10 rounded-2xl shadow-xl w-96 border border-[#3E2C70] transform transition-all  hover:scale-105">
        <h2 className="text-3xl font-bold text-white text-center mb-6 ">
          Welcome Back
        </h2>

        <form action={handleSubmit} className="flex flex-col space-y-6">
          <div>
            <label htmlFor="email" className=" text-white text-lg font-medium block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-[#5A3A95] bg-[#302B4E] text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-[#8F5AE2] outline-none transition-all duration-300"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-white text-lg font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 border border-[#5A3A95] bg-[#302B4E] text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-[#8F5AE2] outline-none transition-all duration-300"
              placeholder="Enter your password"
            />
          </div>

          <button className="w-full bg-gradient-to-r from-[#8F5AE2] to-[#E13EBA] text-white py-3 rounded-xl text-lg font-semibold shadow-md hover:opacity-90 transition-all duration-300 hover:scale-105">
            Login
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4 hover:underline cursor-pointer" onClick={()=>navigate("/signup")} >
          Don't have an account?{" "}
          <a href="/signup" className="text-[#E13EBA] font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

import React from "react";

const Signup = () => {

  const handleSubmit=async(e)=>{
    const email=e.get("email");
    const password =e.get("password");
    const confirmPassword=e.get("confirmPassword")

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
  }

  try {
    const response=await fetch("http://localhost:5000/signup",{
      method:"POST",
      body:JSON.stringify({
        email,password
      }),
      headers:{
          "Content-Type": "application/json"
      }
    })
    if(!response.ok)
      {
        
        throw new Error("Something went wrong")
      }
      const result=await response.json()
          console.log(result);
          
  } catch (error) {
    alert(error)
  }


}


  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#1A1A40] via-[#3A2E50] to-[#4E3F72] flex items-center justify-center">
      {/* Signup Card */}
      <div className="relative bg-[#242038] p-10 rounded-2xl shadow-xl w-96 border border-[#3E2C70] transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl font-bold text-white text-center mb-6 tracking-wide">
          Create an Account
        </h2>

        <form action={handleSubmit} className="flex flex-col space-y-6">
          <div>
            <label htmlFor="email" className="block text-white text-lg font-medium mb-2">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
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

          <div>
            <label htmlFor="confirmPassword" className="block text-white text-lg font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full p-3 border border-[#5A3A95] bg-[#302B4E] text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-[#8F5AE2] outline-none transition-all duration-300"
              placeholder="Confirm your password"
            />
          </div>

          <button className="w-full bg-gradient-to-r from-[#8F5AE2] to-[#E13EBA] text-white py-3 rounded-xl text-lg font-semibold shadow-md hover:opacity-90 transition-all duration-300 hover:scale-105">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

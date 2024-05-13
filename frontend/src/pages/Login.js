import React,{ useContext, useState } from "react";
import loginicon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import {toast} from 'react-toastify'
import Context from "../context"

const Login = () => {
  const [showPassowrd, setShowPassowrd] = useState(true);
  const [data, setData] = useState({ email: "", password: ""});

  const navigate = useNavigate()
  const {fetchUserDetails} = useContext(Context)


  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async(e)=>
    {
      e.preventDefault()
      const dataResponse = await fetch(SummaryApi.signIN.url,{
        method: SummaryApi.signIN.method,
        credentials: "include",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const dataapi = await dataResponse.json()

      if(dataapi.success)
        {
          toast.success(dataapi.message)
          fetchUserDetails()
          navigate("/")
        }
      if(dataapi.error)
        {
          toast.error(dataapi.message)
        }

    }
  return (
    <>
      <section id="login">
        <div className="container mx-auto p-4">
          <div className="bg-white p-5 w-full max-w-sm mx-auto ">
            <div className="w-20 h-20 mx-auto">
              <img src={loginicon} alt="Login Icon" className="rounded-full" />
            </div>

            <form action="" className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="">Email: </label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleOnChange}
                    value={data.email}
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="">Password: </label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showPassowrd ? "text" : "password"}
                    placeholder="Enter Password"
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowPassowrd((prev) => !prev)}
                  >
                    <span>{showPassowrd ? <FaEyeSlash /> : <FaEye />}</span>
                  </div>
                </div>
                <Link
                  to={"/forgot-password"}
                  className="block w-fit ml-auto hover:underline hover:text-red-600"
                >
                  Forgot Passsword?
                </Link>
              </div>

              <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Login
              </button>
            </form>
            <p className="my-5 ">
              Don't have account?{" "}
              <Link
                to={"/signup"}
                className="hover:underline hover:text-red-400 cursor-pointer"
              >
                SignUp
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

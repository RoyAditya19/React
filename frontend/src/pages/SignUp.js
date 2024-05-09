import React,{ useState } from "react";
import loginicon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageTobase64 from "../helper/imageTobase64";

const SignUp = () => {
    const [showPassowrd, setShowPassowrd] = useState(true);
    const [showConfirmPassowrd, setShowConfirmPassowrd] = useState(true);
    const [checkpassword, setCheckpassword] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword:"",
    profilepic: ""
  });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
    
        setData((preve) => {
          return {
            ...preve,
            [name]: value,
          };
        });
      };

    const handleOnChange2 = (e) => {
        const { name, value } = e.target;
    
        setData((preve) => {
          return {
            ...preve,
            [name]: value,
          };
        });

        if (data.password === data.confirmpassword) {
            setCheckpassword("");
        }
        else
        {
            setCheckpassword("Password Mismatch");
        }
      };

      const handleUploadPic =async(e)=>
        {
            const file = e.target.files[0]

            const imagePic = await imageTobase64(file)

            setData((preve)=>
            {
                return{
                    ...preve,
                    profilepic: imagePic
                }
            })
        }
    
      const handleSubmit = (e)=>
        {
          e.preventDefault()
        }
  return (
    <>
        <section id="signup">
        <div className="container mx-auto p-4">
          <div className="bg-white p-5 w-full max-w-sm mx-auto ">
            <div className="w-20 h-20 mx-auto relative rounded-full overflow-hidden">
                <div>
                <img src={data.profilepic || loginicon} alt="Login Icon" className="rounded-full" />
                </div>

                <form>
                <label>
                <div className="text-xs cursor-pointer bg-opacity-85 pb-4 pt-2 bg-slate-200  text-center absolute bottom-0 w-full">
                    Upload Photo
                </div>
                <input type="file" name="" className="hidden" onChange={handleUploadPic}/>
                </label>
                </form>
            </div>

            <form action="" className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>

            <div className="grid">
                <label htmlFor="">Username: </label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleOnChange}
                    value={data.name}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="grid">
                <label htmlFor="">Email: </label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleOnChange}
                    value={data.email}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="grid">
                <label htmlFor="">Password: </label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showPassowrd ? "text" : "password"}
                    placeholder="Enter Password"
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowPassowrd((prev) => !prev)}
                  >
                    <span>{showPassowrd ? <FaEyeSlash /> : <FaEye />}</span>
                  </div>
                </div>
              </div>

              <div className="grid">
                <label htmlFor="">Confirm Password: </label>
                <div className="bg-slate-100 p-2 flex">
                  <input
                    type={showConfirmPassowrd ? "text" : "password"}
                    placeholder="Enter Password Again"
                    name="confirmpassword"
                    value={data.confirmpassword}
                    onChange={handleOnChange2}
                    required
                    className="w-full h-full outline-none bg-transparent"
                  />
                  <div
                    className="cursor-pointer text-xl"
                    onClick={() => setShowConfirmPassowrd((prev) => !prev)}
                  >
                    <span>{showConfirmPassowrd ? <FaEyeSlash /> : <FaEye />}</span>
                  </div>
                </div>
                {checkpassword && <p>{checkpassword}</p>}
              </div>

              <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                SignUp
              </button>
            </form>
            <p className="my-5 ">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="hover:underline hover:text-red-400 cursor-pointer"
              >
                Login
              </Link>{" "}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUp

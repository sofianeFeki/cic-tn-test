import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logo, logoLight } from "../../assets/images";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../service/firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setError, setUser } from "../../redux/orebiSlice";

const SignIn = () => {
  const error = useSelector((state) => state.orebi.error);
  const user = useSelector((state) => state.orebi.userInfo);
  const clearUser = useSelector((state) => state.orebi.clearUser);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // ============= Initial State Start here =============
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errEmail, setErrEmail] = useState("");
  const [errPassword, setErrPassword] = useState("");

  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrPassword("");
  };
  // ============= Event Handler End here ===============
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous error

    if (!email) {
      setErrEmail("Enter your email");
      return;
    }

    if (!password) {
      setErrPassword("Create a password");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid, email: userEmail } = userCredential.user;

      dispatch(setUser({ uid, email: userEmail }));
      console.log("User signed in:", userCredential.user);
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message)); // Dispatch the error to Redux
      console.error("Error during sign-in:", error);
    }
  };
  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await signOut(auth);
      dispatch(clearUser());
      navigate("/login");
      navigate("/");
    } catch (error) {
      dispatch(setError(error.message)); // Dispatch the error to Redux
      console.error("Error during sign-in:", error);
    }
  };
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <div className='w-1/2 hidden lgl:inline-flex h-full text-gray-600'>
        <div className='w-[450px] h-full bg-[#F5F5F3] px-10 flex flex-col gap-6 justify-center'>
          <Link to='/'>
            <img src={logo} alt='logoImg' className='w-28' />
          </Link>
          <div className='flex flex-col gap-1 -mt-1'>
            <h1 className='font-titleFont text-xl font-medium'>
              Stay sign in for more
            </h1>
            <p className='text-base'>When you sign in, you are with us!</p>
          </div>
          <div className='w-[300px] flex items-start gap-3'>
            <span className='text-green-500 mt-1'>
              <BsCheckCircleFill />
            </span>
            <p className='text-base text-gray-600'>
              <span className='text-gray-600 font-semibold font-titleFont'>
                Get started fast with OREBI
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className='w-[300px] flex items-start gap-3'>
            <span className='text-green-500 mt-1'>
              <BsCheckCircleFill />
            </span>
            <p className='text-base text-gray-600'>
              <span className='text-gray-600 font-semibold font-titleFont'>
                Access all OREBI services
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className='w-[300px] flex items-start gap-3'>
            <span className='text-green-500 mt-1'>
              <BsCheckCircleFill />
            </span>
            <p className='text-base text-gray-600'>
              <span className='text-gray-600 font-semibold font-titleFont'>
                Trusted by online Shoppers
              </span>
              <br />
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
              nisi dolor recusandae consectetur!
            </p>
          </div>
          <div className='flex items-center justify-between mt-10'>
            <Link to='/'>
              <p className='text-sm font-titleFont font-semibold text-gray-600 hover:text-gray-400 cursor-pointer duration-300'>
                © OREBI
              </p>
            </Link>
            <p className='text-sm font-titleFont font-semibold text-gray-600 hover:text-gray-400 cursor-pointer duration-300'>
              Terms
            </p>
            <p className='text-sm font-titleFont font-semibold text-gray-600 hover:text-gray-400 cursor-pointer duration-300'>
              Privacy
            </p>
            <p className='text-sm font-titleFont font-semibold text-gray-600 hover:text-gray-400 cursor-pointer duration-300'>
              Security
            </p>
          </div>
        </div>
      </div>
      <div className='w-full lgl:w-1/2 h-full'>
        {successMsg ? (
          <div className='w-full lgl:w-[500px] h-full flex flex-col justify-center'>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {user && <p>Welcome, {user.email}</p>}
            <Link to='/signup'>
              <button
                className='w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300'
              >
                Sign Up
              </button>
            </Link>
          </div>
        ) : (
          <form className='w-full lgl:w-[450px] h-screen flex items-center justify-center'>
            <div className='px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor'>
              <h1 className='font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4'>
                Sign in
              </h1>
              <div className='flex flex-col gap-3'>
                {/* Email */}
                <div className='flex flex-col gap-.5'>
                  <p className='font-titleFont text-base font-semibold text-gray-600'>
                    Work Email
                  </p>
                  <input
                    onChange={handleEmail}
                    value={email}
                    className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                    type='email'
                    placeholder='john@workemail.com'
                  />
                  {errEmail && (
                    <p className='text-sm text-red-500 font-titleFont font-semibold px-4'>
                      <span className='font-bold italic mr-1'>!</span>
                      {errEmail}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className='flex flex-col gap-.5'>
                  <p className='font-titleFont text-base font-semibold text-gray-600'>
                    Password
                  </p>
                  <input
                    onChange={handlePassword}
                    value={password}
                    className='w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none'
                    type='password'
                    placeholder='Create password'
                  />
                  {errPassword && (
                    <p className='text-sm text-red-500 font-titleFont font-semibold px-4'>
                      <span className='font-bold italic mr-1'>!</span>
                      {errPassword}
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSignUp}
                  className='bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300'
                >
                  Sign In
                </button>
                <p className='text-sm text-center font-titleFont font-medium'>
                  Don't have an Account?{" "}
                  <Link to='/signup'>
                    <span className='hover:text-blue-600 duration-300'>
                      Sign up
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignIn;

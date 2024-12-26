import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authUser';

const SignUpPage = () => {
  const { searchParams } = new URL(document.location);
	const emailValue = searchParams.get("email");

  const { signup,  } = useAuthStore();

const [email,setEmail]=useState(emailValue || "");
const [username,setUsername]=useState("");
const [password,setPassword]=useState("");

const handleSignUp =(e)=>{
  e.preventDefault();
  signup({ email, username, password });
}

  return (
    <div className='h-screen w-full hero-bg'>
     <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
  <Link to={"/"}>
    <svg
      width="400"
      height="150"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* <!-- Define the path with a slight dip in the center --> */}
      <path
        id="arcWithDip"
        d="M50,90 Q200,80 350,90"
        fill="transparent"
      />

      {/* <!-- Add text along the path --> */}
      <text
        fill="#E50914"
        fontSize="50"
        fontWeight="bold"
        fontFamily="'Bebas Neue', sans-serif"
      >
        <textPath
          href="#arcWithDip"
          startOffset="50%"
          textAnchor="middle"
        >
          NEPAFLIX
        </textPath>
      </text>
    </svg>
  </Link>
</header>


      <div className='flex justify-center items-center mt-20 mx-3'>
        <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
          <h1 className='text-center text-white text-2xl font-bold mb-4'>Sign Up</h1>
          <form className='space-y-4' onSubmit={handleSignUp}>
            <div>
              <label htmlFor='email' className='text-sm font-medium text-gray-300 block'>Email</label>
              <input placeholder='you@example.com' type="email" id="email" className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' value={email} onChange={(e)=> setEmail(e.target.value)} />
            </div>

            <div>
              <label htmlFor='username' className='text-sm font-medium text-gray-300 block'>Username</label>
              <input placeholder='Rajesh Hamal' type="text" id="username" className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' value={username} onChange={(e)=> setUsername(e.target.value)}/>
            </div>

            <div>
              <label htmlFor='password' className='text-sm font-medium text-gray-300 block'>Password</label>
              <input placeholder='******' type="password" id="password" className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' value={password} onChange={(e)=> setPassword(e.target.value)}/>
            </div>

            <button className='w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700'>Sign Up</button>
          </form>
          <div className='text-center text-gray-400'>
            Already a member?
            <Link to={"/login"} className='text-red-500 hover:underline'>  Sign in</Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
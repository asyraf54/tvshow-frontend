import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault()
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "username": username, "password": password })
    })
      .then(res => res.json())
      .then(res => localStorage.setItem("user_id", res.user_id))
      .then(() => {
        // Delay execution of router.push by 1 second
        setTimeout(() => {
          router.push("/");
        }, 800);
      });
  }


  return (

    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">Login</h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <div className="px-5 py-7">
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Username</label>
              <input type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
              <input type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
              <button type="button" onClick={handleSubmit} className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span class="inline-block mr-2">Login</span>

              </button>
            </div>
          </div>
        </div>
      </div>
    
    </div>
  )
}
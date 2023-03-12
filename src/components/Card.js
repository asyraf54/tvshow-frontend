import { useRouter } from 'next/router'
import React from 'react'


const truncateString = (str, length) => {
  if (str.length > length) {
    return str.substring(0, length) + "..."
  }
  return str
}

const Result = ({ id, title, genre, imageUrl }) => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center space-y-1 group" onClick={() => router.push(`/result?id=${id}`)}>
      <div className="overflow-hidden rounded-xl hover:cursor-pointer max-w-[225px] max-h-[318px]">
        <img
          className="w-full h-full object-cover transform transition-all scale-100 group-hover:scale-[1.10] duration-[400ms] saturate-50 group-hover:saturate-100"
          src={imageUrl}
        />
      </div>
      <h2 className="text-lg transition-all duration-[400ms] group-hover:text-blue-700 hover:cursor-pointer text-center">{truncateString(title, 18)}</h2>
      <p className="text-xs transition-all duration-[400ms] text-center group-hover:text-blue-700 hover:cursor-pointer">Genre: {genre}</p>
    </div>
  )
}

export default Result
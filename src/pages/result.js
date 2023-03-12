import { useRouter } from "next/router"
import { useEffect, useState } from 'react'
import dynamic from "next/dynamic"


const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false
})

export default function Result() {
  const router = useRouter()

  const { id } = router.query
  const [data, setData] = useState({})

  useEffect(() => {
    if (!id) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}show/${id}`)
      .then((res) => res.json())
      .then((res) => setData(res))
  }, [id])

  const handleAdd = async (event) => {
    event.preventDefault()
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}watchlist/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "user":localStorage.getItem("user_id"),"show":id })
      })
      .then(router.push("/watchlist"))
  } 
  

  return (
    <div className="w-full min-h-screen h-full flex justify-center py-20">
      <div className="w-full h-full grid grid-cols-12 gap-12 max-w-7xl mx-16">
      <div className="w-full col-span-9">
          <div className="text-center">
            <h1 className="text-3xl ">{data?.title}</h1>
          </div>

          <hr className="my-4" />

          {data?.synopsis && (
            <>
              <h3 className="text-2xl mb-2 font-semibold">Synopsis</h3>
              <p className="text-lg">
                {data?.synopsis}
              </p>
              <hr className="my-4" />
            </>
          )}

          {data?.trailer_url && (
            <>
              <h3 className="text-2xl mb-2 font-semibold">Trailer</h3>
              <div >
                <ReactPlayer url={data?.trailer_url} />
              </div>
              <hr className="my-4" />
            </>
          )}
          <button type="submit" onClick={handleAdd}>Add to watch list</button>

        </div>
        <div className="h-full w-full space-y-4 col-span-3">
          <div className="rounded-lg w-full aspect-[75/106] overflow-hidden">
            <img className="w-full h-full object-cover" src={data?.poster_url} />
          </div>
    
          <div>
            <h1 className="font-bold">
              Information
            </h1>
            <hr className="my-1" />
            <div>
                
              <p>
                <span className="font-bold">Title: </span>
                <span>{data?.title}</span>
              </p>
              
             
              <p>
                <span className="font-bold">Date Publish: </span>
                <span>{data?.time_publish} </span>
              </p>
              
              <p>
                <span className="font-bold">Genre: </span>
                <span>{data?.genre}</span>
              </p>
             
            </div>
          </div>
        
        </div>
        
      </div>
    </div>
  )
}
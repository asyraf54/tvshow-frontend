import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Result from '../components/Card'
import Link from "next/link";

export default function WatchList() {
    const router = useRouter()
    const [data, setData] = useState([])
 
    useEffect(() => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}watchlist/`, {
          method: 'POST',
          body: JSON.stringify({ "user":localStorage.getItem("user_id")})
      })
        .then(res => res.json())
        .then(res => setData(res.watch_lists))
    }, [])

    const handleDelete = async (id) => {
        event.preventDefault()
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}watchlist/delete/`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "user":localStorage.getItem("user_id"),"show":id })
          })
          .then(router.push("/"))
    } 
  
    return (
      <>
        <Head>
          <title>MY WATCH LIST</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Link href="/" className="transition-all duration-250 hover:text-red-500">
          <p>Home</p>
        </Link>
        <Link href="/watchlist" className="transition-all duration-250 hover:text-red-500">
          <p>Watch List</p>
        </Link>
        <div className="w-full min-h-screen h-full flex flex-col items-center py-4">
          <h1 className="text-2xl font-bold">MY WATCH LIST</h1>
          <div className="h-full w-full px-16 my-8 space-y-4">
            <div className="flex justify-between items-center w-full">
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-8">
              {data.map((item, index) => {
                return (
                    <>
                    <div className="flex flex-col items-center justify-center space-y-1 group">
                        <Result id={item?.id} key={index} imageUrl={item?.poster_url} title={item?.title} genre={item?.genre} />
                        <button type="submit" onClick={() => handleDelete(item?.id)}>Delete from watch list</button>
                    </div>
                    </>
                )
              })}
            </div>
          </div>
        </div>
      </>
    )
  }
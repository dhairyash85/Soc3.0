import React, { useContext, useEffect, useState } from 'react'
import addressContext from '../Context/AddressContext'
import Post from './Post'

const Explore = () => {
  const context=useContext(addressContext)
  const{soc, isConnected }=context
  const[posts, setPosts]=useState([])
  useEffect(()=>{
    if(isConnected){
      async function loadNFT(){
        const nfts=await soc.returnPosts();
        setPosts(nfts)
        console.log(nfts)
      }
      loadNFT()
    }
  }, [isConnected, soc])
  return (
    <div className='h-dvh text-white'>
      {
        posts && (
          <div className='px-10 grid sm:grid-cols-1 sm:place-content-center md:grid-cols-2 lg:grid-cols-3 sm:grid-y-3 gap-y-5 gap-x-5'>

          {
            posts.map((post)=><Post post={post} />)
          }
          </div>)
      }
    </div>
  )
}

export default Explore
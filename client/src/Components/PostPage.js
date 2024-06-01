import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import addressContext from "../Context/AddressContext";
const ethers =require('ethers')
const PostPage = () => {
  const postId = useParams();
  const context = useContext(addressContext);
  const { soc, nft, account } = context;
  const [comment, setComment]=useState(false)
  const [post, setPost] = useState(null);
  const [img, setImg] = useState("");
  useEffect(() => {
    async function getPost() {
      const res = await soc.allPosts(postId.postId);
      console.log("res", res);
      setPost(res);
      const uri = await nft.tokenURI(res.tokenId);
      console.log(account);
      setImg(`https://gateway.pinata.cloud/ipfs/${uri}`);
    }
    getPost();
  }, [account, nft, soc, postId.postId]);
  function showComment(){
    setComment(!comment)
    console.log("COMMENT")
    console.log(comment)
  }
  async function likePost(){
    try{
        console.log("LIKING")
        await (await soc.likePost(postId.postId)).wait()
        console.log("LIKED")
    }catch(error) {
        console.log(error.message)
    }
  }
  console.log(postId.postId);
  return (
<div className="flex flex-col xl:flex-row justify-stretch px-5 items-stretch pt-12">
  {post && (
    <div className="sm:max-w-lg md:max-w-xl xl:max-w-2xl 2xl:max-w-4xl container bg-black rounded-l-2xl shadow-lg">
      <img className="w-full h-auto cursor-pointer rounded-tl-2xl " src={img} alt="" />
      <div className="flex flex-col sm:flex-row md:flex-row lg:flex-row p-4 justify-between">
        <div className="flex items-center space-x-2">
          <h2 className="text-white font-extrabold">{post.creator}: <span className=" font-normal text-white">{post.description}</span></h2>
        </div>
        <div className="flex space-x-2 mt-4 sm:mt-0 md:mt-0 lg:mt-0"> 
          <div className="flex space-x-1 items-center">
            <button onClick={showComment}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-600 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
            </button>
          </div>
          <div className="flex space-x-1 items-center">
            <button onClick={likePost}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white hover:text-red-400 transition duration-100 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
                </svg>
              </span>
            </button>
            <span className="text-white">{(ethers.utils.formatEther(post.likes)*1000000000000000000)}</span>
          </div>
        </div>
      </div>
    </div>
  )}
  
    <div className=" w-full min-h-full flex-col justify-stretch">
      <div className=" bg-black min-h-full overflow-y-auto rounded-r-xl "></div>
      <div className="ml-2 relative bottom-14 flex gap-2 px-3 bg-black border-t-2 pt-4">
        <textarea className="rounded-lg px-2" name='comment' rows='1' cols='90' placeholder='Add a comment...' />
        <button className="bg-white rounded-md text-black hover:text-white px-2 hover:bg-black">Comment</button>
      </div>
    </div>
</div>


  );
};

export default PostPage;

import React, { useContext, useEffect, useState } from "react";
import addressContext from "../Context/AddressContext";
import { Link } from "react-router-dom";

const Post = (props) => {
  const [url, setUrl] = useState("");
  const context = useContext(addressContext);
  const { nft } = context;
  useEffect(() => {
    const returnImg = async () => {
        console.log("Exploring");
        const uri = await nft.tokenURI(props.post.tokenId);
        console.log(uri);
        setUrl(`https://gateway.pinata.cloud/ipfs/${uri}`);
      };
    returnImg();
  }, [nft, props.post.tokenId]);
  return (
    <Link to={`/post/${props.post.postId}`}>
      {url && (
        <div className="flex flex-col justify-center ">
          <img src={url} alt="" className="h-[300px]  " />
        </div>
      )}
    </Link>
  );
};

export default Post;

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
        <div className="group relative block ">
          <img
            alt=""
            src={url}
            className="absolute inset-0 h-full w-full rounded-2xl object-cover  transition-opacity group-hover:opacity-50"
          />

          <div className="relative p-4 sm:p-6 lg:p-8">
            <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
              {props.post.creator}
            </p>

            <div className="mt-32 sm:mt-48 lg:mt-64">
              <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-sm text-white">{props.post.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
};

export default Post;

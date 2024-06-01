import React, { useContext, useEffect, useState } from "react";
import addressContext from "../Context/AddressContext";
import Post from "./Post";

const Explore = () => {
  const context = useContext(addressContext);
  const { soc, isConnected } = context;
  const [posts, setPosts] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [searchedAccounts, setSearchedAccounts] = useState([]);
  const handleChange = (e) => {
    setSearchItem(e.target.value);
  };
  const followAccount= async ()=>{
    await soc.followUser(searchItem)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await soc.returnUser(searchItem);
    console.log(accounts)
    if (accounts.length == 0) {
      alert("No user found");
    } else {
      setSearchedAccounts(accounts);
      console.log(accounts)
    }
  };

  useEffect(() => {
    if (isConnected) {
      async function loadNFT() {
        const nfts = await soc.returnPosts();
        setPosts(nfts);
        console.log(nfts);
      }
      loadNFT();
    }
  }, [isConnected, soc]);
  return (
    <div className="h-dvh text-white">
      <div className="flex gap-4 justify-center">
        <div className="flex w-100% rounded bg-white" x-data="{ search: '' }">
          <input
            type="search"
            className="w-full border-none bg-transparent px-4 py-1 text-gray-900 focus:outline-none"
            placeholder="Search"
            onChange={handleChange}
          />
          <button className="m-2 rounded px-4 py-2 bg-black font-semibold text-white hover:text-black hover:bg-white" onClick={handleSubmit}>
            Search
          </button>
        </div>
      </div>
      {searchedAccounts.length!=0 ? (
          <div className="max-w-sm p-6 mx-5 mt-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-black dark:border-gray-700">
            
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {searchedAccounts}
              </h5>
            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-white rounded-lg hover:bg-black hover:text-white focus:ring-4  " onClick={followAccount}
            >
              Follow
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        )
       : (
        <div>
          {posts && (
            <div className="px-10 grid sm:grid-cols-1 sm:place-content-center md:grid-cols-2 lg:grid-cols-3 sm:grid-y-3 gap-y-5 gap-x-5">
              {posts.map((post) => (
                <Post post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;

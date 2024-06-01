import React, { useContext } from "react";
import addressContext from "../Context/AddressContext";
import {
  NFTAddress,
  NFTABI,
  SocialMediaABI,
  SocialMediaAddress,
} from "../Constants/Constants";
import { Link } from "react-router-dom";
const ethers = require("ethers");
const Home = () => {
  const context = useContext(addressContext);
  const {
    isConnected,
    account,
    setAccount,
    setIsConnected,
    setProvider,
    setNFT,
    setSoc,
    setIsUser,
  } = context;
  const connectToWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setIsConnected(true);
        const soc = new ethers.Contract(
          SocialMediaAddress,
          SocialMediaABI,
          signer
        );
        const nft = new ethers.Contract(NFTAddress, NFTABI, signer);
        setNFT(nft);
        setSoc(soc);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Metamask not detected");
    }
  };
  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setIsConnected(false);
    setIsUser(false);
  };
  return (
    <div>
      {isConnected ? (
        <div className="flex justify-between gap-5 py-5">
          <div className=" px-5 flex gap-7">

          <Link to='/'><p className="text-white">Home</p></Link>
          <Link to='/upload'><p className="text-white">Upload</p></Link>
          <Link to='/explore'><p className="text-white">Explore</p></Link>
          <Link to='/profile'><p className="text-white">Profile</p></Link>
          </div>

          <button
            className=" w-28 truncate bg-white hover:ring-white text-black hover:bg-transparent hover:text-white rounded-md text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 border border-input h-10 px-2 py-2 mt-3 mr-5 sm:mt-0 "
            onClick={disconnectWallet}
          >
            {/* <p className="flex justify-start text-start "></p> */}
            {account}
          </button>
        </div>
      ) : (
        <div>

        <div className="flex justify-center gap-5">
          <div className=" h-screen font-sans flex flex-col items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-12 lg:gap-8 pt-12 lg:pt-0">
                <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
                  <div className="">
                    <div className="flex flex-col items-center justify-center">
                      
                      <h1 className="mt-4 text-4xl tracking-tight text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                        <p className="sm:block">Welcome to Soc3.0
                        The  Social Network for the Future! Connect with friends.
                        </p>
                      </h1>
                    </div>
                    <div className="mt-10 sm:flex sm:justify-center lg:justify-start">

                      <button onClick={connectToWallet} className="inline-flex bg-white text-black hover:ring-white hover:bg-transparent hover:text-white  items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto">
                        Connect To Wallet
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center mt-16 ml-6 sm:mt-24 lg:mt-0 lg:col-span-5">
                  <p className="text-base ml-12 text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                    Soc3.0 is a new service, built on top of the polygon network and it's designed to bring people from all over the world together
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Home;
import React, { useContext, useState } from "react";
import addressContext from "../Context/AddressContext";
const Home = () => {
  const context = useContext(addressContext);
  const [newUser,setNewUser]=useState('')
  const { isConnected, soc, isUser, username } = context;
  const createUser = async (e) => {
    try {
      e.preventDefault();
      await soc.createUser(newUser);
    } catch (err) {
      console.log("ERROR", err);
    }
  };
  const handleChange=(e)=>{
    setNewUser(e.target.value)
  }
//   console.log(isUser)
  return (
    <>
    {
        isConnected && (<div>
            {isUser ? (
              <div>
                <h1 className="text-center text-white mt-5">Welcome to SOC3.0, {username}!</h1>
              </div>
            ) : (
              <div className=" flex justify-center">
                <form>
                  <input onChange={handleChange} type="text" placeholder="Enter username" />
                  <button type="submit" value={newUser} className="inline-flex bg-white hover:ring-white hover:bg-transparent hover:text-white  items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto" onClick={createUser}>
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>)
    }
    
    </>
  );
};

export default Home;
import React, { useContext } from "react";
import addressContext from "../Context/AddressContext";
const Home = () => {
  const context = useContext(addressContext);
  const { isConnected, soc, isUser, username } = context;
  const createUser = async (e) => {
    try {
      e.preventDefault();
      await soc.createUser("dheerizz");
    } catch (err) {
      console.log("ERROR", err);
    }
  };
  return (
    <>
    {
        isConnected && (<div>
            {isUser ? (
              <div>
                <h1 className="text-center mt-5">Welcome to SOC3.0, {username}!</h1>
              </div>
            ) : (
              <div>
                <form>
                  <input type="text" placeholder="Enter username" />
                  <button type="submit" onClick={createUser}>
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

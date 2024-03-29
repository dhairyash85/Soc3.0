import React, { useContext, useState } from "react";
import axios from "axios";
import addressContext from "../Context/AddressContext";
const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState('');
  const context=useContext(addressContext)
  const {nft, soc}=context
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Uploading")
    try {
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: {
          file: selectedFile,
          name: "File",
          description: description,
        },
        headers: {
          pinata_api_key: `e9cb5ff37a536ac99e8c`,
          pinata_secret_api_key: `bb66f3e5da9b335ff4d3bf828bce38ad18118e0eb0273957aa67b656a4ebee33`,
          "Content-Type": "multipart/form-data",
        },
      });
      const uri = resFile.data.IpfsHash;
      console.log(uri);
      await upoadToBlockchain(uri);
      console.log("YAY BABY")
    } catch (e) {
      console.log(e);
    }
  };
  const upoadToBlockchain=async (IpfsHash)=>{
    try{

      await(await nft.mint(IpfsHash)).wait()
      const tokenid=await nft.tokenCount();
      await(await soc.createPost(nft.address, tokenid, "Photo", "File", description)).wait()
      console.log("SUUUUUUCCCCC")
    }catch(e){
      console.log("EERRROOOORRRR: ", e)
    }
  }
  return (
    <div className="text-center text-white  h-dvh">
      <form>
        <input type="file" onChange={(e)=>setSelectedFile(e.target.files[0])} name="file" />
        <br />
        <input
          type="text"
          name="url"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          className="text-black"
        />
        <br></br>
        <button type="submit" onClick={onSubmit}>
          Upload to IPFS!
        </button>
      </form>
    </div>
  );
};

export default Upload;

import React, {useState, useEffect} from 'react'
import { NFTAddress, NFTABI, SocialMediaABI, SocialMediaAddress } from '../Constants/Constants'
import addressContext from './AddressContext'
const ethers = require('ethers')
const CurrentContract = (props) => {
    const [isConnected, setIsConnected]=useState(false)
    const [provider, setProvider]=useState(null);
    const [account, setAccount]=useState(null);
    const [nft, setNFT]=useState(null);
    const [soc, setSoc]=useState(null);
    useEffect(() => {
        async function checkLoggedIn() {
          if (window.ethereum) {
            try {
              const provider = new ethers.providers.Web3Provider(window.ethereum);
              setProvider(provider);
              const accounts = await provider.listAccounts();
              if (accounts.length > 0) {
                const address = accounts[0];
                setAccount(address);
                console.log("personal address",address)
                setIsConnected(true);
              }

            } catch (err) {
              console.log(err);
            }
          }else{console.log("No metamask")}
        }
        checkLoggedIn();
      }, []);
      useEffect(()=>{
        if(isConnected){
            async function setContracts(){
                const signer = await provider.getSigner();
                console.log("signer",signer)
                const marketplace = await new ethers.Contract(SocialMediaAddress, SocialMediaABI, signer);
                const nft = await new ethers.Contract(NFTAddress, NFTABI, signer);
                setNFT(nft)
                setSoc(marketplace)
            }
            setContracts().then(()=>console.log("Contracts Set")).catch(e=>console.log(e));
            console.log("nft",nft)
            console.log("soc",soc) 
        }
      }, [isConnected])
  return (
    <addressContext.Provider value={{isConnected, account, nft, soc}}>{props.children}</addressContext.Provider>
  )
}

export default CurrentContract
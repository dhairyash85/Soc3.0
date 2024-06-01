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
    const [isUser, setIsUser] = useState(false);
    const [username, setUsername]=useState('');
    const [user, setUser]=useState([]);
    
      useEffect(()=>{
        if(isConnected){
            async function setContracts(){
                const signer = await provider.getSigner();
                const soc = await new ethers.Contract(SocialMediaAddress, SocialMediaABI, signer);
                const nft = await new ethers.Contract(NFTAddress, NFTABI, signer);
                setNFT(nft)
                setSoc(soc)
            }
            setContracts().catch(e=>console.log(e));
        }
      }, [isConnected, provider])
      useEffect(()=>{
        if(isConnected){
        const checkWallet=async()=>{
            console.log("YAYAYAY")
            const res=await soc.walletExists(account);
            setIsUser(res)
            console.log(res)
            if(res){
                soc.usernames(account).then((name)=>{setUsername(name)})
                const us=await soc.returnUser(account)
                console.log(us)
                setUser(us)
            }
        }
            checkWallet().catch(e=>console.log(e))
            
        }
      },[isConnected, account, isUser, soc])
  return (
    <addressContext.Provider value={{isConnected, account, nft, soc, provider, isUser, username, user, setUser, setUsername, setIsUser, setAccount, setIsConnected, setProvider, setNFT, setSoc}}>{props.children}</addressContext.Provider>
  )
}

export default CurrentContract;
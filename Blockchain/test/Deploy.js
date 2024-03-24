
const main=async()=>{

  const Nft = await ethers.getContractFactory("NFT");
  const nft = await Nft.deploy();
  console.log(nft.address);
  console.log(nft);
  console.log( await nft.getAddress());
  const Soc=await ethers.getContractFactory('SocialMedia');
  const sm=await Soc.deploy()
  console.log(sm.address)
  console.log(sm)
  console.log(await sm.getAddress())
}

main().then(()=>process.exit(0)).catch((error)=>{
  console.log("Error",error)
  process.exit(1)
})
    

 
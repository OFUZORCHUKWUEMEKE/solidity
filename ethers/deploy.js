const ethers = require('ethers')
const fs = require('fs-extra')

async function main(){
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:7545")
    const wallet = new ethers.Wallet("a898006046e546379caf7752b9e4985a7030102b95a25a9e0e2d14ed9e0cfbe1",provider);
    const abi = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.abi','utf-8');
    const binary = fs.readFileSync('./SimpleStorage_sol_SimpleStorage.bin','utf-8');
    const contractFactory = new ethers.ContractFactory(abi,binary,wallet)
    console.log("Deploying , please wait ...")
    const contract = await contractFactory.deploy();
    await contract.deployTransaction.wait(1);
    const currentFavourite = await contract.retrieve()
    console.log(`Current favourite Number : ${currentFavourite.toString()}`)
    const transactionResponse = await contract.store("7")
    const transactionReciept = await transactionResponse.wait(1)
    const updatedNumber = await contract.retrieve()
    console.log(`Updated favourite Number is : ${updatedNumber}`)
}

main().then(()=>{
    console.log('deployed successfully')
})
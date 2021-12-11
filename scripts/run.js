
const main = async () => {
    // uses hardhat to get the wallet address of the user 
    const [owner, randomPerson] = await hre.ethers.getSigners();
    // compiles the contract and generates the necessary files in the #artifacts directory
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal'); 
    const waveContract = await waveContractFactory.deploy();
    // creates a local ethereum network 
    await waveContract.deployed();
    //once contract is deployed, the constructor will run
    console.log("Contract deployed to:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();

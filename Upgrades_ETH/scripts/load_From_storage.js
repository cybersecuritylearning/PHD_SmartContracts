


// slot is the 32-byte hex you found

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

const proxyAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const implSlot = "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc";
const value = await provider.getStorage(proxyAddress, implSlot);
console.log("implementation (raw):", value);

const implAddress = ethers.getAddress("0x" + value.slice(26));
console.log("Implementation address:", implAddress);
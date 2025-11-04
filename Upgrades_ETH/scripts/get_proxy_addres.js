const addr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const proxy_addres = await ethers.provider.getCode(addr);
console.log(proxy_addres);
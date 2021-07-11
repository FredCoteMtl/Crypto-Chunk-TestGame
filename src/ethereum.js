import detectEthereumProvider from '@metamask/detect-provider';
import { ethers, Contract } from 'ethers';
import ABI from './contracts/SimpleStorage.json'; 	

const getBlockchain = () =>
    new Promise( async (resolve, reject) => {
        let provider = await detectEthereumProvider();
        if(provider) {
            await provider.request({ method: 'eth_requestAccounts' });
            const networkId = await provider.request({ method: 'net_version' })
            provider = new ethers.providers.Web3Provider(provider);
            const signer = provider.getSigner();
            const SimpleStorage = new Contract(
                ABI.networks[networkId].address, 	
                ABI.abi,										
                signer
            );
            resolve({SimpleStorage});									
            return;
        }
        reject('Install Metamask');
    });

export default getBlockchain;
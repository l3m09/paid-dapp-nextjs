// import detectEthereumProvider from '@metamask/detect-provider';

export const isMetamask = async () => {
    if (window.BinanceChain != undefined) {
        console.log('Binance Smart Chain Installed');
        return true;
    } else {
        console.log('Binance Smart Chain Not Installed');
        return false;
    }
}

// export const isUnlock = async ():Promise<boolean> => {
//     return await window.BinanceChain._metamask.isUnlocked();
// }
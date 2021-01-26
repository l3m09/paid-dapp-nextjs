// import detectEthereumProvider from '@metamask/detect-provider';

export const isMetamask = async () => {
    if (window.ethereum != undefined) {
        console.log('Metamask Installed');
        return true;
    } else {
        console.log('Metamask Not Installed');
        return false;
    }
}

export const isUnlock = async ():Promise<boolean> => {
    return await window.ethereum._metamask.isUnlocked();
}
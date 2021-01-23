import detectEthereumProvider from '@metamask/detect-provider';

const Metamask = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
        console.log('Metamask Installed');
        return true;
    } else {
        console.log('Metamask Not Installed');
        return false;
    }
}

export const isMetamask = async () => {
    return await Metamask();
}
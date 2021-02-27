import { IonItemGroup } from '@ionic/react';
import React from 'react';
import WalletItem from './WalletItem';
interface WalletListProps {
	wallets: any[];
	onSelectItem: (wallet: any) => void;
}

const WalletList: React.FC<WalletListProps> = ({ wallets, onSelectItem }) => {
	return (
		<IonItemGroup class="wallets-container">
			{wallets.map((wallet: any, index: any) => {
				return (
					<WalletItem
						key={index}
						wallet={wallet}
						didTapOnSelect={onSelectItem}
					/>
				);
			})}
		</IonItemGroup>
	);
};

export default WalletList;

import React from 'react';
import {
	IonButton,
	IonModal,
	IonTitle,
	IonContent,
	IonHeader,
	IonButtons,
	IonToolbar
} from '@ionic/react';
import WalletList from '../../components/WalletList';
import { useSelector } from 'react-redux';

interface WalletListModalProps {
	show: boolean;
	dismiss: () => void;
	onSelectItem: (wallet: any) => void;
}

const WalletListModal: React.FC<WalletListModalProps> = ({
	show,
	dismiss,
	onSelectItem
}) => {
	const wallet = useSelector((state: any) => state.wallet);
	const { wallets } = wallet;

	return (
		<IonModal
			isOpen={show}
			cssClass="create-wallet-modal"
			onDidDismiss={() => dismiss()}
		>
			<IonHeader translucent={false} mode="md">
				<IonToolbar>
					<IonTitle>Wallets</IonTitle>
					<IonButtons slot="end">
						<IonButton color="secondary" shape="round" onClick={() => dismiss()}>
							Cancel
						</IonButton>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<WalletList wallets={wallets} onSelectItem={onSelectItem} />
			</IonContent>
		</IonModal>
	);
};

export default WalletListModal;

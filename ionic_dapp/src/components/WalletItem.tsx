import { IonItem } from '@ionic/react';
import React from 'react';

interface WalletItemProps {
	wallet: any;
	didTapOnSelect?: (wallet: any) => void;
	didTapOnTransfer?: (wallet: any) => void;
	didTapOnExport?: (wallet: any) => void;
}

const WalletItem: React.FC<WalletItemProps> = ({ wallet }) => {
	return (
		<IonItem
			class="wallet-wrapper"
			routerLink={'/documents/' + wallet.id}
			// onClick={() => setShowPopover(true)}
		>
			<div className="wallet-container">
				<span className="amount">$ {wallet.amount}</span>
				<span className="label">{wallet.label}</span>
				<span className="type">{wallet.type}</span>
				<span className="address">{wallet.address}</span>
			</div>
			{/*<IonPopover*/}
			{/*    isOpen={showPopover}*/}
			{/*    cssClass='my-custom-class'*/}
			{/*    onDidDismiss={e => setShowPopover(false)}*/}
			{/*>*/}
			{/*    <IonList>*/}
			{/*        <IonItem button onClick={() => {doSomething(wallet)}}>Send</IonItem>*/}
			{/*        <IonItem button onClick={() => {doSomething(wallet)}}>Transfer</IonItem>*/}
			{/*        <IonItem button onClick={() => {doSomething(wallet)}}>Export</IonItem>*/}
			{/*        <IonItemDivider/>*/}
			{/*        <IonItem button onClick={() => {doSomething(wallet)}}>Edit</IonItem>*/}
			{/*    </IonList>*/}
			{/*</IonPopover>*/}
		</IonItem>
	);
};

export default WalletItem;

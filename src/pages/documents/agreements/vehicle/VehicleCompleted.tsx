import {
	IonTitle,
	IonItem,
	IonButton,
	IonText,
	IonModal
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doSetAgreementFormInfo } from '../../../../redux/actions/documents';
import Button from './button';

interface VehicleCompletedProps {
	current: any;
}

const VehicleCompleted: React.FC<VehicleCompletedProps> = ({ current }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const documentsState = useSelector((state: any) => state.documents);
	const { agreementFormInfo } = documentsState;
	async function toDocuments() {
		dispatch(doSetAgreementFormInfo({
			name: '',
			address: '',
			phone: '',
			counterpartyWallet: '',
			counterpartyName: '',
			counterpartyAddress: '',
			counterpartyPhone: '',
			createdAt: null
		}));

		await current.lockSwipeToPrev(false);
		await current.lockSwipeToNext(false);
		await current.slideTo(0).then(() => {
			history.push('/documents');
		});
	}

	return (
		<div className="agreement-content agreement-completed">
			<IonItem>
				<IonTitle class="agreement-content-title agreement-completed-title">
					You, <span className="text-primary">{agreementFormInfo.name}</span>
				</IonTitle>
			</IonItem>
			<IonItem>
				<IonText class="phrase-content-sub-text phrase-completed-sub-text">
					Have agreed with the conclusion of this transaction on <span className="text-primary">{agreementFormInfo.createdAt}</span>.
				</IonText>
			</IonItem>
			<IonItem>
				<IonText class="phrase-content-sub-text phrase-completed-sub-text">
					And accepted transference of the currency to <span className="text-primary">{agreementFormInfo.counterpartyName}</span> wallet address: <span className="text-primary"> {agreementFormInfo.counterpartyWallet}</span>.
				</IonText>
			</IonItem>
			<IonItem>
				<IonText class="phrase-content-sub-text phrase-completed-sub-text">
					This offer to purchase is valid for Nine Days from date of offer and
					will not be valid if there are any changes to the value of the vehicle
					due to physical or mechanical issues upon delivery to <span className="text-primary">{agreementFormInfo.counterpartyName}</span>.
				</IonText>
			</IonItem>

			<IonItem class="form-options">
			<Button
					config={{
					params: {
						title: 'Share Agreement',
						text: 'Share this agreement',
						url: 'http://localhost:3000',
					},
					/* tslint:disable-next-line:no-console */
					onShareSuccess: () => console.log('Success'),
					/* tslint:disable-next-line:no-console */
					onShareError: (error: Error) => console.log('error', error),
					}}
				/>
			</IonItem>
			<IonItem class="form-options">
				<IonButton
					onClick={() => {
						toDocuments();
					}}
					color="gradient"
					shape="round"
				>
					Done
				</IonButton>
			</IonItem>
			<IonModal isOpen={showModal} cssClass="terms-modal">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
					impedit minima nesciunt nihil quos sapiente sequi temporibus.
					Expedita, maiores, minus! Eaque eius harum laudantium odit quisquam?
					Aperiam explicabo facere, ipsam ipsum libero odio quia! Adipisci
					architecto atque cupiditate, expedita officia quis tempore. Adipisci
					commodi eligendi enim illo quibusdam temporibus unde voluptate
					voluptatibus. Ab animi dicta et iusto magni perspiciatis ratione sed.
					Ab accusantium architecto at cumque distinctio dolorem eos, eum
					exercitationem, explicabo facere fugiat impedit incidunt itaque iure
					libero, nobis odit officiis quam quis quisquam ratione repellendus
					saepe sit tempora voluptatem. Consequuntur, dicta distinctio dolorum
					eveniet incidunt itaque nisi recusandae.
				</p>
				<IonButton onClick={() => setShowModal(false)}>Close</IonButton>
			</IonModal>
		</div>
	);
};

export default VehicleCompleted;

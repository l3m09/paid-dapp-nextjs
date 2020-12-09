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
import MobileShare from './button';

interface NdaCompletedProps {
	current: any;
}
export interface OwnProps {
	style: object;
  }

const NdaCompleted: React.FC<NdaCompletedProps> = ({ current }) => {
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
					And accepted with the signature of these agreement to <span className="text-primary">{agreementFormInfo.counterpartyName}</span> wallet address: <span className="text-primary"> {agreementFormInfo.counterpartyWallet}</span>.
				</IonText>
			</IonItem>
			<IonItem>
				<IonText class="phrase-content-sub-text phrase-completed-sub-text">
				The agreement is pending for approval for nine days from the date of the
				offer and will not be valid if there is any change in the conditions
				of the confidentiality agreement. <span className="text-primary">{agreementFormInfo.counterpartyName}</span>.
				</IonText>
			</IonItem>
			<IonItem class="form-options">
			<MobileShare/>
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

export default NdaCompleted;

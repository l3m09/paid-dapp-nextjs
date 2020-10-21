import {
	IonIcon,
	IonTitle,
	IonItem,
	IonButton,
	IonRouterLink,
	IonText,
	IonModal,
	IonContent
} from '@ionic/react';
import React, { useState } from 'react';
import { lockClosedOutline, warning } from 'ionicons/icons';


interface DescriptionProps {
	current: any
}

const RentalDescription: React.FC<DescriptionProps> = ({current}) => {
	const [showModal, setShowModal] = useState(false);

	async function slideNext() {
		console.log('RentalDescription', await current.getActiveIndex())
		await current.lockSwipeToNext(false);
		current.slideNext()
		await current.lockSwipeToNext(true);

	}

	return (
		<IonContent fullscreen class="agreement-content vehicle-agreement-instructions">
			<IonItem>
				<div className="instructions">
					<IonTitle class="instructions-title first">Rental</IonTitle>
					<IonText class="instructions-sub-text first">
						This document will serve as an official document for (SELLER)
						to agree to purchase sellers vehicle subject to the following terms and conditions:
					</IonText>
					<ul className="instructions-list first">
						<li>
							That the rental is free and clear of all liens and encumbrances and that the title is clean and not
							salvage.
						</li>
						<li>
							That all parties listed on the title are of majority age and have executed the signatures needed to
							validate the sale.
						</li>
						<li>
							That the rental is in the same condition as it was when the offer to purchase was executed.
						</li>
						<li>
							The rental was delivered to (SELLER) during normal
							business hours and that the seller has all necessary documents, proceeds check will be executed within
							one hour of the delivery.
						</li>
					</ul>
					<IonTitle class="instructions-title third">Other terms and conditions:</IonTitle>
					<ul className="instructions-list first">
						<li>
							If there are liens or encumbrances, (SELLER) has the right to
							validate the amount, correct information for making the lien payoff, as well as adjusting the amount
							offered if in fact there will be an additional time commitment to receive a free and clear title.
						</li>
						<li>
							If the lien amount exceeds the amount offered, the customer will be responsible for the difference
							and will be expected to submit those proceeds to (SELLER)
							within 72 hours of the commitment to purchase.
						</li>
						<li>
							(SELLER) reserves the right to complete a title check prior to
							release of funds to validate that there are no "hidden" liens.
						</li>
						<li>
							Salvage titles, unknown miles, and child support liens will automatically disqualify the rental from
							purchase
						</li>
					</ul>
					<IonButton
						onClick={() => {slideNext()}}
						class="purple-button start-button"
						color="8500FF"
					>
						I Agree
					</IonButton>
				</div>
			</IonItem>
			<IonModal isOpen={showModal} cssClass="instructions-info-modal">
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
		</IonContent>
	);
};

export default RentalDescription;

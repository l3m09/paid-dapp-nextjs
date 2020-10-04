import React, {useState} from 'react';
import './ExploreContainer.css';
import {IonButton, IonModal, IonRouterLink} from "@ionic/react";

const Terms: React.FC = () => {
	const [showModal, setShowModal] = useState(false);
	return (
		<div className="terms">
			By continuing you agree to our <IonRouterLink onClick={() => setShowModal(true)}>T&Cs.</IonRouterLink>
			We use your data to offer you a personalized experience.
			<IonRouterLink onClick={() => setShowModal(true)}>Find out more.</IonRouterLink>

			<IonModal isOpen={showModal} cssClass='terms-modal'>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt impedit minima nesciunt nihil quos sapiente sequi temporibus. Expedita, maiores, minus! Eaque eius harum laudantium odit quisquam? Aperiam explicabo facere, ipsam ipsum libero odio quia! Adipisci architecto atque cupiditate, expedita officia quis tempore. Adipisci commodi eligendi enim illo quibusdam temporibus unde voluptate voluptatibus. Ab animi dicta et iusto magni perspiciatis ratione sed. Ab accusantium architecto at cumque distinctio dolorem eos, eum exercitationem, explicabo facere fugiat impedit incidunt itaque iure libero, nobis odit officiis quam quis quisquam ratione repellendus saepe sit tempora voluptatem. Consequuntur,
					dicta distinctio dolorum eveniet incidunt itaque nisi recusandae.
				</p>
				<IonButton onClick={() => setShowModal(false)}>Close</IonButton>
			</IonModal>
		</div>
	);
};

export default Terms;

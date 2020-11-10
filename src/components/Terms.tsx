import React, {useState} from 'react';
import {IonButton, IonModal} from "@ionic/react";

interface TermsModalProps {
	show: boolean;
	dismiss: () => void;
	title?: string;
}

const Terms: React.FC<TermsModalProps> = ({show, dismiss, title}) => {
	return (
			<IonModal isOpen={show} onDidDismiss={() => dismiss} cssClass='terms-modal'>
				<div>
					<h1>{title || 'Terms'}</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt impedit minima nesciunt nihil quos sapiente sequi temporibus. Expedita, maiores, minus! Eaque eius harum laudantium odit quisquam? Aperiam explicabo facere, ipsam ipsum libero odio quia! Adipisci architecto atque cupiditate, expedita officia quis tempore. Adipisci commodi eligendi enim illo quibusdam temporibus unde voluptate voluptatibus. Ab animi dicta et iusto magni perspiciatis ratione sed. Ab accusantium architecto at cumque distinctio dolorem eos, eum exercitationem, explicabo facere fugiat impedit incidunt itaque iure libero, nobis odit officiis quam quis quisquam ratione repellendus saepe sit tempora voluptatem. Consequuntur,
						dicta distinctio dolorum eveniet incidunt itaque nisi recusandae.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt impedit minima nesciunt nihil quos sapiente sequi temporibus. Expedita, maiores, minus! Eaque eius harum laudantium odit quisquam? Aperiam explicabo facere, ipsam ipsum libero odio quia! Adipisci architecto atque cupiditate, expedita officia quis tempore. Adipisci commodi eligendi enim illo quibusdam temporibus unde voluptate voluptatibus. Ab animi dicta et iusto magni perspiciatis ratione sed. Ab accusantium architecto at cumque distinctio dolorem eos, eum exercitationem, explicabo facere fugiat impedit incidunt itaque iure libero, nobis odit officiis quam quis quisquam ratione repellendus saepe sit tempora voluptatem. Consequuntur,
						dicta distinctio dolorum eveniet incidunt itaque nisi recusandae.
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt impedit minima nesciunt nihil quos sapiente sequi temporibus. Expedita, maiores, minus! Eaque eius harum laudantium odit quisquam? Aperiam explicabo facere, ipsam ipsum libero odio quia! Adipisci architecto atque cupiditate, expedita officia quis tempore. Adipisci commodi eligendi enim illo quibusdam temporibus unde voluptate voluptatibus. Ab animi dicta et iusto magni perspiciatis ratione sed. Ab accusantium architecto at cumque distinctio dolorem eos, eum exercitationem, explicabo facere fugiat impedit incidunt itaque iure libero, nobis odit officiis quam quis quisquam ratione repellendus saepe sit tempora voluptatem. Consequuntur,
						dicta distinctio dolorum eveniet incidunt itaque nisi recusandae.
					</p>
				</div>
				<IonButton shape="round" color="secondary" onClick={dismiss}>Close</IonButton>
			</IonModal>
	);
};

export default Terms;

import React, { useState } from 'react';
import { IonModal } from '@ionic/react';

interface CreateWalletProps {
  router: HTMLIonRouterOutletElement | null;
}

const CreateWallet: React.FC<CreateWalletProps> = ({ router }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <IonModal
      isOpen={showModal}
      cssClass='my-custom-class'
      swipeToClose={true}
      presentingElement={router || undefined}
      onDidDismiss={() => setShowModal(false)}>
      <p>This is modal content</p>
    </IonModal>
  );
};

export default CreateWallet;
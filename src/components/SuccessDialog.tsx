import React, { FC } from 'react';
import { IonButton, IonContent, IonItem, IonModal} from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { doCloseSuccessDialog } from '../redux/actions/dialogs';

const SuccessDialog: FC = () => {
    const dispatch = useDispatch();

    const dialogState = useSelector(
        (state: { dialogs: { openSuccessDialog: boolean, successText: string, clickText: string, clickLink: string} }) => state.dialogs
    );

    const close = () => {
        dispatch(doCloseSuccessDialog());
    };

    return (
        <IonModal 
            isOpen={dialogState.openSuccessDialog}
            cssClass="success-dialog-modal"
            onDidDismiss={() => close()}
        >
            <IonContent>
                <div className="item-text-wrap ion-text-center">
                    <p className="ion-align-self-center">{dialogState.successText}</p>
                    {((dialogState.clickText !== '') && (dialogState.clickText !== undefined) && (dialogState.clickLink !== '') && (dialogState.clickLink !== undefined)) ? <a href={dialogState.clickLink} target="_blank">{dialogState.clickText}</a> : null}
                </div>
            </IonContent>
            <IonItem className="ion-justify-content-center">
                <IonButton 
                    color="gradient"
                    shape="round"
                    onClick={() => close()}
                >
                    <span>OK</span>
                </IonButton>
            </IonItem>
        </IonModal>
    );
}

export default SuccessDialog;
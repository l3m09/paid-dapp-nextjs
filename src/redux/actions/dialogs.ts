import { DialogsActionTypes } from "../actionTypes/dialogs"

const closeSuccessDialog = () => {
    return {
        type: DialogsActionTypes.CLOSE_SUCCESS_DIALOG
    };
}

export const doCloseSuccessDialog = () => (dispatch: any) => {
    dispatch(closeSuccessDialog());
};

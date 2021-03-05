import MenuActionTypes from '../actionTypes/menu';

const setOpenMenu = (isOpen: boolean) => (dispatch: any) => {
  dispatch({ type: MenuActionTypes.SET_OPEN_MENU, payload: { isOpen } });
};

export default setOpenMenu;

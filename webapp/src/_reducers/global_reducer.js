import { CATCH_ERR, CLOSE_MODAL, OPEN_MODAL, RESET_ERR } from '_types/globalTypes';

const initState = {
  isOpen: false,
  errorContent: '',
  modalContent: null,
};

const globalReducer = (state = initState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isOpen: true, modalContent: action.payload };
    case CLOSE_MODAL:
      return { isOpen: false, errorContent: '', modalContent: null };
    case CATCH_ERR:
      return { isOpen: true, errorContent: action.payload, modalContent: null };
    case RESET_ERR:
      return { isOpen: false, errorContent: '', modalContent: null };
    default:
      return state;
  }
};

export default globalReducer;

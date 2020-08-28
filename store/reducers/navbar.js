const initialState = {
  showSideDrawer: false,
  showLoginTab: false
};

export default function navbar(state = initialState, action) {
  switch (action.type) {
    case 'CLOSE_SIDE_DRAWER':
      return {
        ...state,
        showSideDrawer: false
      };
    case 'OPEN_SIDE_DRAWER':
      return {
        ...state,
        showSideDrawer: true
      };
    case 'OPEN_LOGIN_TAB':
      return {
        ...state,
        showLoginTab: true
      };
    case 'CLOSE_LOGIN_TAB':
      return {
        ...state,
        showLoginTab: false
      };
    default:
      return state;
  }
}

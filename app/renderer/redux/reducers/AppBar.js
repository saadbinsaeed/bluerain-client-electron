/**
 * Created by Haris on 3/31/17.
 */

const initialState = {
  show: null,
};

const AppBarReduceres = (state = initialState, action) => {
  switch (action.type) {

    case 'SHOW_APP_BAR':
      return {
        ...state,
        show: action.show
      };

    default:
      return state;
  }
};

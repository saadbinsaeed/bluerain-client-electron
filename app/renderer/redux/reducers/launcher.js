const initialState = {
  filter: null,
  searchQuery: '',
  view: {
    viewAsGrid: true,
    viewAsList: false,
  }
};

const launcherReducers = (state = initialState, action) => {
  switch (action.type) {

    case 'SET_VIEW_AS':
      return {
        ...state,
        view: {
          viewAsGrid: action.viewAsGrid,
          viewAsList: action.viewAsList,
        }
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.filter
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.searchQuery
      };

    default:
      return state;
  }
};

export default launcherReducers;

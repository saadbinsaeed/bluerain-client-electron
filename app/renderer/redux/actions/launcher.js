export const setViewAs = (viewAsGrid, viewAsList) => {
  return {
    type: 'SET_VIEW_AS',
    viewAsGrid,
    viewAsList
  };
};

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter
  };
};

export const setSearch = (searchQuery) => {
  return {
    type: 'SET_SEARCH_QUERY',
    searchQuery
  };
};

export const saveToLocalStorage = (state) => {
  try {
    const localState = JSON.stringify({
      categories: state.categories,
      items: state.items,
      accessToken: state.accessToken,
      user: state.user,
      error: [],
    });
    localStorage.setItem('state', localState);
  } catch (error) {
    return undefined;
  }
};

export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState == null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

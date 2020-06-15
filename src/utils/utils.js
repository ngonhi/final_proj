export const saveToLocalStorage = (state) => {
  try {
      // Only saves access_token
      const localState = JSON.stringify({categories: {}, access_token: state['access_token'], error: []})
      localStorage.setItem('state', localState);
  } catch (error) {
      console.log(error);
  }
};

export const loadFromLocalStorage = (state) => {
  try {
      const serializedState = localStorage.getItem('state');
      if (serializedState == null) return undefined;
      return JSON.parse(serializedState);
  } catch (error) {
      return undefined;
  }
};
export const fetchRequestObj = (type, url, option = {}, item_id = 0) => ({
  type,
  promise: fetch(url, option),
  item_id,
});

export const modifyState = (type, payload, item_id) => {
  let newAction;
  if (type.includes('_SUCCEEDED')) {
    newAction = { type, payload, item_id };
  } else {
    const type = 'ERROR';
    newAction = { type, payload };
  }
  delete newAction.promise;
  return newAction;
};


export function userLogout() {
  return {
    type: 'USER_LOGOUT',
  };
}

export function clearError() {
  return {
    type: 'CLEAR_ERROR',
  };
}

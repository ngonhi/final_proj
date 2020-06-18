export const fetchRequestObj = (type, url, option = {}, index = 0) => ({
  type,
  promise: fetch(url, option),
  index,
});

export const modifyState = (type, payload, index) => {
  let newAction;
  if (type.includes('_SUCCEEDED')) {
    newAction = { type, payload, index };
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



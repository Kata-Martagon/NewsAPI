// Function takes one arg and returns a function which takes two args
const addXhrOnLoadListener = (xhr) => (resolve, reject) => {
  const noop = () => null;
  resolve = resolve || noop;
  reject = reject || noop;

  xhr.addEventListener('load', () => {
    if (xhr.status === 200) resolve(JSON.parse(xhr.responseText));
    else reject(new Error(xhr.status));
  });
};

function fetchAPI(url, method = 'GET', onDone) {
  const xhr = new XMLHttpRequest();

  let promise;

  if (onDone) addXhrOnLoadListener(xhr)(onDone);
  else promise = new Promise(addXhrOnLoadListener(xhr));

  xhr.open(method, url);
  xhr.send();

  return promise;
}

window.fetchAPI = fetchAPI;

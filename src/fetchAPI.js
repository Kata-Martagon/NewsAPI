function fetchAPI (url, method='GET', onDone) {
  const xhr = new XMLHttpRequest()

  let promise

  if (onDone) _addXhrOnLoadListener(xhr)(onDone)
  else promise = new Promise(_addXhrOnLoadListener(xhr))

  xhr.open(method, url)
  xhr.send()

  return promise
}

// Function takes one arg and returns a function which takes two args
const _addXhrOnLoadListener = (xhr) => (resolve, reject) => {
  const noop = function () {}
  resolve = resolve || noop
  reject = reject || noop

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      resolve(JSON.parse(xhr.responseText))
    } else {
      reject(new Error(xhr.status))
    }
  })
}

//

function urlBuilder ()
  // to be done - returns a string
}

function domManipulator (obj) {
  // format data (map)
  // to be done - manipulates dom
}

var url = urlBuilder(args)

fetchAPI(url, 'GET', domManipulator)

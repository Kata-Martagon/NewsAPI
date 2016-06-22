(function () {
  'use strict'
  /* ------------------------------------------------------------
  * DOM Elements
  * Store references to the elements that will be referred to by the app
  * ---------------------------------------------------------- */
  const DOM = {
    results: {
      summary: document.getElementById('results-summary'),
      body: document.getElementById('results-body')
    },
    forms: {
      unanswered: document.getElementById('unanswered-getter'),
      inspiration: document.getElementById('inspiration-getter'),
    }
  }

  /* ------------------------------------------------------------
  * DOM Updates
  * Helper functions to update the DOM with new results
  * ---------------------------------------------------------- */
  function updateResultsBody (elements) {
    DOM.results.body.innerHTML = elements.join('')
  }

  function updateResultsSummary (summary) {
    DOM.results.summary.innerHTML = summary
  }

  /* ------------------------------------------------------------
  * Element templates
  * Helper functions to generate the HTML for each search result
  * ---------------------------------------------------------- */
  // function getResultsSummaryMarkup (query, numResults) {
  //   return numResults + ' results for <strong>' + query + '</strong>'
  // }

  function getQuestionMarkup (answer) {
    /**
    * @param {Object} question: Question object from SO API response
    * @returns {String} HTML markup to be added to the page for given question
    */
    // docs.headline.main, web_url (the link), snippet, image
    return (
      '<div>Question Title: ' + answer.headline.main + '</div>' +
      '<div>Link: <a href="' + answer.docs.web_url + '">Click here</a></div>' +
      '<div>Owner: ' + answer.docs.snippet + '</div>' +
      '<div>Avatar: <img src="' + answer.docs.multimedia.url + '" /></div>' +
      '</br>'
    )
  }


  /* ------------------------------------------------------------
  * API Requests
  * Helper functions to perform the API requests and process the results
  * ---------------------------------------------------------- */
  function getBrexitArticles () {
    /**
    * Makes AJAX request to get unanswered questions for tag and updates results
    * @param {String} tags: Comma separated string of SO tags for search
    * @returns {void}
    */

    var query = {
      q: 'referendum',
      fq: 'europe and britain',
      api-key: key //'8310a722a1af4fe39644eee195781143'
    }

    var baseUrlAndPath = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'
    var queryString = Object.keys(query).map(function (key) {
      return key + '=' + query[key]
    }).join('&')

    var xhr = new XMLHttpRequest()

    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState === 4 && xhr.status === 200)
    //   console.log(xhr.response)
    // }

    xhr.addEventListener('load', function() {
      if(xhr.status === 200) {
        var response = JSON.parse(xhr.response)
        // var summary = getResultsSummaryMarkup(response.items.length)
        var questions = response.items.map(getQuestionMarkup)

        updateResultsSummary(summary)
        updateResultsBody(questions)
      }
    })
    xhr.open('GET', baseUrlAndPath + '?' + queryString)
    xhr.send()
  }

  /* ------------------------------------------------------------
  * Event listeners
  * Attach the appropriate callbacks to the forms submit event
  * ---------------------------------------------------------- */
  // DOM.forms.unanswered.addEventListener('submit', (e) => {
  //   e.preventDefault()
  //   const tags = e.target.firstElementChild.value

    getBrexitArticles();
  })

})()

// This is executed when the client first loads the website
const columns = document.querySelectorAll('#row .col')
const search = document.getElementById('search')
const searchInput = document.getElementById('searchInput')

let columnCount = 0

// Functions:
function createCard() {
    let card = document.createElement('div')
    let img = document.createElement('img')
    let cardBody = document.createElement('div')
    let title = document.createElement('h5')
    let description = document.createElement('p')
    let date = document.createElement('p')
    let anchorTag = document.createElement('a')

    // Classes:
    card.classList.add('card')
    img.classList.add('card-img-top')
    cardBody.classList.add('card-body')
    title.classList.add('card-title')
    description.classList.add('card-text')
    date.classList.add('card-text')
    anchorTag.classList.add('btn')
    anchorTag.classList.add('btn-primary')

    // Style & Customization
    anchorTag.innerHTML = 'Read more...'
    anchorTag.target = '_blank'
    card.style.width = '18rem'
    card.style.marginBottom = '20px'
    img.alt = 'Image could not be loaded'

    // Appending:
    cardBody.appendChild(title)
    cardBody.appendChild(description)
    cardBody.appendChild(date)
    cardBody.appendChild(anchorTag)

    card.appendChild(img)
    card.appendChild(cardBody)

    return [card, img, title, description, anchorTag, date]
}

function handleSearch(event) {
    event.preventDefault();
    if (searchInput.value == '') return;
    // Just set the location
    let a = document.createElement('a')
    a.href = `?q=${searchInput.value}`
    a.target = '_blank'
    a.click();
}

// Fetch current news
async function fetchNews() {
    // send a request to our server
    //console.log(window.location)
    let query = window.location.href.split('?')[1]; // The query.
    let split = query && (query.split('&') || query.split('='))
    let keywordSplit = split && (split[0].split('='))
    let keyword = (keywordSplit && keywordSplit[1]) || 'world'

    let response = await fetch(`/fetch?q=${decodeURI(keyword)}`);
    let response_json = await response.json();
    let articles = response_json.articles

    // Loop through
    for (let index = 0; index<(articles.length-1); index++) {
        let article = articles[index]
        let title = article.title;
        let description = article.description;
        let urlToImg = article.urlToImage;
        let url = article.url;
        let publishedAt = article.publishedAt

        let newDate = new Date(publishedAt).toLocaleString()

        // Create a card with the information
        let cardDetails = createCard();
        cardDetails[1].src = urlToImg
        columns[columnCount].appendChild(cardDetails[0])
        
        cardDetails[2].innerHTML = title;
        cardDetails[3].innerHTML = description;
        cardDetails[5].innerHTML = newDate

        cardDetails[4].href = url; // Set the href!

        columnCount++;
        if (columnCount > 2) {
            columnCount = 0;
        }
    }
}

fetchNews() // Fetches news
search.addEventListener('click', handleSearch)
const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById('fortuneButton')

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
    .then(res => {
        const data = res.data;
        alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
    .then(res => {
        const data = res.data
        alert(data)
    })
}

complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)

// Quotes

const quotesContainer = document.querySelector('#quotes-container')
const form = document.querySelector('form')

const baseURL = "http://localhost:4000/api"

const quotesCallback = ({ data: quotes }) => displayQuotes (quotes)
const errCallback = err => console.log(err.response.data)

const getAllQuotes = () => axios.get(baseURL).then(quotesCallback).catch(errCallback)
const createQuote = body => axios.post(baseURL, body).then(quotesCallback).catch(errCallback)
const editQuote = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(quotesCallback).catch(errCallback)
const deleteQuote = id => axios.delete(`${baseURL}/${id}`).then(quotesCallback).catch(errCallback)


function submitHandler(element) {
    element.preventDefault()

    let quote = document.querySelector('#quote')
    let author = document.querySelector('#author')
    let inspoLvl = document.querySelector('input[name="inspoLvl"]:checked')

    let quoteObj = {
        quote: quote.value,
        author: author.value,
        inspoLvl: inspoLvl.value,
    }

    createQuote(quoteObj)

    quote.value = ''
    author.value = ''
    inspoLvl.checked = false
}

function createQuoteCard(quoteText) {
    const quoteHolder = document.createElement('div')
    quoteHolder.classList.add('quote-holder')

    quoteHolder.innerHTML = 
    `<p id= "quote-author"> ${quoteText.quote} - ${quoteText.author}</p>
    <div class="btns-container">
    <p class="quote-inspoLvl">Inspiration Level: ${quoteText.inspoLvl} </p>
    <button onclick="editQuote(${quoteText.id}, 'decrease')"> Decrease Inpso lvl </button>
    <button onclick="editQuote(${quoteText.id}, 'increase')"> Increase Inspo lvl </button>
</div>
    <button onclick="deleteQuote(${quoteText.id})">delete</button>
    `

    quotesContainer.appendChild(quoteHolder)
}

function displayQuotes(arr) {
    quotesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createQuoteCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)


getAllQuotes()

console.log(quote)
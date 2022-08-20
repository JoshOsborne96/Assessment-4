let quoteList = [
{
    id: 1,
    quote: `"The greatest glory in living lies not in never falling, but in rising every time we fall"`,
    author: 'Nelson Mandela',
    inspoLvl: 5
},
{
    id: 2,
    quote: `"Just do it!"`,
    author: 'Shia Labeouf',
    inspoLvl: 3
}, 
{
    id: 3,
    quote: `"Never give up, never surrender!"`,
    author:  'Captain Jason Nesmith',
    inspoLvl: 2
}
]

let globalId = 4

module.exports = {
    
    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
        
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
        
        res.status(200).send(randomCompliment);
    },
    
    getFortune: (req, res) => {
        const fortunes = ['Today will be full of oppurtunities', 'An old friend will be happy to see you again', 'You will find happiness in the small things', 'Your positivity will pay off soon', 'Brighter days are ahead' ]
        
        // choose random fortune
        let randomIndex = Math.floor(Math.random() * fortunes.length)
        let randomFortune = fortunes[randomIndex]
        
        res.status(200).send(randomFortune)
    },

/// Quote Functions

    getQuotes: (req,res) => res.status(200).send(quoteList),
    
    postQuote : (req, res) => { 
        let { quote, author, inspoLvl } = req.body
        let newQuote = {
            id: globalId,
            quote,
            author,
            inspoLvl
        }

        quoteList.push(newQuote)
        res.status(200).send(quoteList)
        globalId++
    


    },
     
    editQuote: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = quoteList.findIndex(elem => +elem.id === +id)

        if (quoteList[index].inspoLvl === 5 && type === 'increase') {
            res.status(400).send('cannot go above 5')
        } else if (quoteList[index].inspoLvl=== 0 && type === 'decrease') {
            res.status(400).send('cannot go below 0')
        } else if (type === 'increase') {
            quoteList[index].inspoLvl++
            res.status(200).send(quoteList)
        } else if (type === 'decrease') {
            quoteList[index].inspoLvl--
            res.status(200).send(quoteList)
        } else {
            res.sendStatus(400)
        }


    },

    deleteQuote : (req, res) => {
        let index = quoteList.findIndex(elem => elem.id === +req.params.id)
        quoteList.splice(index, 1)
        res.status(200).send(quoteList)


    }
}
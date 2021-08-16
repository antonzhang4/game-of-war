const newDeck = document.getElementById("new-deck")
const computerScore = document.getElementById("computer-score")
const playerScore = document.getElementById("player-score")
const message = document.getElementById("message")
const remaining = document.getElementById('remaining-cards')

let deckId = 0
let computer = 0
let player = 0

function handleClick() {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id
        console.log(deckId)
        document.getElementById('draw-cards').classList.remove('draw-cards')
    })
}

function compareCards(card1, card2) {
    const cardValues = ['2','3','4','5','6','7','8','9','10','JACK','QUEEN','KING','ACE']

    if(cardValues.indexOf(card2) < cardValues.indexOf(card1)) {
        computer++
        computerScore.textContent = "Computer Score: " + computer
        message.textContent = 'Computer Wins!'
    }
    else if(cardValues.indexOf(card2) > cardValues.indexOf(card1)) {
        player++
        playerScore.textContent = "My Score: " + player
        message.textContent = 'Player Wins!'
    }
    else {
        message.textContent = 'War!'
    }
}

function winner() {
    if(computer < player) {
        message.textContent = 'Computer Wins Game of War!'
    }
    else if(player < computer) {
        message.textContent = 'Computer Wins Game of War!'
    }

    else message.textContent = 'Game of War Ends In A Draw!'
}

document.getElementById("draw-cards").addEventListener('click', function() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`) 
        .then(res => res.json())
        .then(data => {
            console.log(data)

            remaining.textContent = `Remaining Cards: ${data.remaining}`

            document.getElementById('image1').innerHTML = `
                <img src = ${data.cards[0].image}>
            `
            document.getElementById('image2').innerHTML = `
                <img src = ${data.cards[1].image}>
            `
            compareCards(data.cards[0].value, data.cards[1].value)
            if(data.remaining === 0) {
                document.getElementById('draw-cards').classList.add('draw-cards')
                winner()
            }
        })
})

newDeck.addEventListener('click', handleClick)
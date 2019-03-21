class Deck {
	constructor() {
		this.cards = []
	}

	shuffle() {
		for(let i=0; i < 52; i++) {		
			let card = new Card()	
			this.cards.push(card.drawCard())
		}
		console.log(this)
		return this
	}

	resetDeck() {
		this.cards = []
	}

	deal() {
		let card = this.cards[Math.floor(Math.random() * this.cards.length)]
		let index = this.cards.indexOf(card)
		this.cards.splice(index,1)
		return card 
	}
}

deck = new Deck()
deck.shuffle()
console.log(deck.deal())

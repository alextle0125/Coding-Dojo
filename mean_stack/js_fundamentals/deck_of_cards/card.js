class Card {
	constructor() {	
		this.suits = ["Hearts", "Clubs", "Diamonds", "Spade"]
		this.names = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"]
		this.values = this.range(13,1)
		this.obj = []

		for(let i = 0; i < this.names.length; i++) {
			this.obj.push({ "name": this.names[i], "value": this.values[i]});
		}
	} 

	range(size, startAt = 0) {
		return [...Array(size).keys()].map(i => i + startAt)
	}

	drawCard() {
		let pickSuit = Math.floor(Math.random() * this.suits.length)
		let suit = this.suits[pickSuit]

		let pickFaceValue = Math.floor(Math.random() * this.names.length)
		let name = this.names[pickFaceValue]
		let value = this.values[pickFaceValue]

		this.suits.splice(pickSuit,1)
		this.names.splice(pickFaceValue,1)
		this.values.splice(pickFaceValue,1)

		return { "name": name, "suit": suit, "value": value }
		// console.log(name, suit, value)
	}
}
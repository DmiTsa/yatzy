//#region CLASSES

class diceSet {
    constructor(attempt) {
        this.attempt = attempt
        this.state = [0, 0, 0, 0, 0]
        this.blocked = [false, false, false, false, false]
        this.max = 6
    }

    togglBblock(n) {
        if (this.state[n] !== 0) {
            this.blocked[n] = !this.blocked[n]
        }
    }

    setRandom() {
        if (this.attempt) {
            this.blocked.forEach((el, i) => {
                if (!el) { this.state[i] = Math.floor(Math.random() * this.max + 1) }
            })
        }
        this.attempt--
    }

    getSet() {
        return this.state
    }
}

//#endregion

function diceRender(n, node) {
    const pathDiceImgSrc = './assets/diceImg/'
    const diceImgSrc = ['d1.png', 'd2.png', 'd3.png', 'd4.png', 'd5.png', 'd6.png']
}

console.log(random(6))
console.log(random(6))
console.log(random(6))
console.log(random(6))
console.log(random(6))
console.log(random(6))

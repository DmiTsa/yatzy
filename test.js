class userTable {
    constructor() {
        this.state = {
            one: 0,
            isOne: true,
            two: 0,
            isTwo: true,
            // three: 0,
            // isThree: true,
            // four: 0,
            // isFour: true,
            // five: 0,
            // isFive: true,
            // six: 0,
            // isSix: true,
            // kindThree: 0,
            // isKindThree: true,
            // kindFour: 0,
            // isKindFour: true,
            // house: 0,
            // isHouse: true,
            // small: 0,
            // isSmall: true,
            // large: 0,
            // isLarge: true,
            // yat: 0,
            // isYat: true,
            chance: 0,
            isChance: true
        }
    }

    setOne(arr) {
        const num = 1
        if (this.state.isOne) {
            this.state.one = arr.filter(el => el === num).length * num
        }
        this.state.isOne = false
    }

    setTwo(arr) {
        const num = 2
        if (this.state.isTwo) {
            this.state.two = arr.filter(el => el === num).length * num
        }
        this.state.isTwo = false
    }

    //000

    setChance(arr) {
        if (this.state.isChance) {
            this.state.chance = arr.reduce((acc, el) => {
                return acc + el
            }, 0)
        }
        this.state.isChance = false
    }

    //totalScore
}

const a = new userTable()

a.setChance([2, 3, 4])
console.log(a.state);

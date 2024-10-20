// console.log('connect js');


//#region VARIABELS

const leaderboardNode = document.querySelector('.leaderboard')
const gameWrapperNode = document.querySelector('.game-wrapper')
const newGameNode = document.querySelector('.new_game')
const newGameStartNode = document.querySelector('#new-game-start')
const aboutNode = document.querySelector('.about')
const menu = document.querySelector('#menu')
const fieldsetNode = document.querySelector('.fieldset')

const tablesNode = document.querySelector('.tables')
const rowsNode = document.querySelector('.rows')
const fieldSetNode = document.querySelector('.fieldset')

const attemptButton = document.querySelector('#attempt')
const stopButton = document.querySelector('#stop')

let userTables = []
let currentDiceSet
// let currentAttempt

//#endregion




//#region FUNCTIONS

function renderUserTable(userTable, destNode) {
    // const [userName, one, two, three, four, five, six, kindThree, kindFour, house, small, large, yat, chance, total] = userTable.state

    const table = document.createElement('div')
    table.classList.add('table')

    const player = document.createElement('div')
    player.classList.add('player')
    player.innerText = userTable.userName

    const rows = document.createElement('div')
    rows.classList.add('rows')

    rows.innerHTML = `
                        <div class="row">
                            <img class="tileImg" src="./assets/field/one.png" alt="yatzy kind">
                            <div class="kind_points">${userTable.state.one}</div>
                        </div>

                        <div class="row">
                            <img class="tileImg" src="./assets/field/kind_three.png" alt="yatzy kind">
                            <div class="kind_points">${userTable.state.kindThree}</div>
                        </div>

                        <div class="row">
                            <img class="tileImg" src="./assets/field/two.png" alt="yatzy kind">
                            <div class="kind_points">${userTable.state.two}</div>
                        </div>

                        <div class="row">
                            <img class="tileImg" src="./assets/field/kind_four.png" alt="yatzy kind">
                            <div class="kind_points">${userTable.state.kindFour}</div>
                        </div>

                        <div class="row">
                            <img class="tileImg" src="./assets/field/three.png" alt="yatzy kind">
                            <div class="kind_points">${userTable.state.three}</div>
                        </div>

                        <div class="row">
                            <img class="tileImg" src="./assets/field/house.png" alt="yatzy kind">
                            <div class="kind_points">${userTable.state.house}</div>
                        </div>

                        <div class="row">
                            <img class="tileImg" src="./assets/field/four.png" alt="yatzy kind">
                            <div class="kind_points">${userTable.state.four}</div>
                        </div>

                        <div class="row">
                            <img class="tileImg" src="./assets/field/small.png" alt="yatzy kind">
                            <div class="kind_points">${userTable.state.small}</div>
                        </div>

                        <div class="row">
                            <img class="tileImg" src="./assets/field/five.png" alt="yatzy kind">
                            <div class="kind_points">${userTable.state.five}</div>
                        </div>

                        <div class="row">
                            <img class="tileImg" src="./assets/field/large.png" alt="yatzy kind">
                            <div class="kind_points">${userTable.state.large}</div>
                        </div>

                        <div class="row">
                            <img class="tileImg" src="./assets/field/six.png" alt="yatzy kind">
                            <div class="kind_points">${userTable.state.six}</div>
                        </div>

                        <div class="row">
                            <img class="tileImg" src="./assets/field/yat.png" alt="yatzy kind">
                            <div class="kind_points">${userTable.state.yat}</div>
                        </div>

                        <div class="row">
                            <img class="tileImg" src="./assets/field/chance.png" alt="yatzy kind">
                            <div class="kind_points">${userTable.state.chance}</div>
                        </div>

                        <div class="row total">
                            <img class="tileImg" src="./assets/score.png" alt="yatzy kind">
                            <div class="kind_points points_score">${userTable.total}</div>
                        </div>
    `
    table.appendChild(player)
    table.appendChild(rows)

    destNode.appendChild(table)
}

function renderDiceField(diceSet, destNode) {
    const diceImgPathDefault = './assets/diceDefault.png'
    const diceImgPaths = [
        './assets/diceImg/d1.png',
        './assets/diceImg/d2.png',
        './assets/diceImg/d3.png',
        './assets/diceImg/d4.png',
        './assets/diceImg/d5.png',
        './assets/diceImg/d6.png',
    ]

    destNode.innerHTML = ''
    diceSet.state.forEach((el, i) => {
        const node = document.createElement('img')
        node.classList.add('dice')

        if (el === 0) {
            node.src = diceImgPathDefault
        } else {
            node.src = diceImgPaths[el - 1]
            node.id = `dice${i}`
            if (currentDiceSet.blocked[i]) {
                node.classList.add('dice_block')
            }
        }

        destNode.appendChild(node)
    })
}

// [leaderboard game about]
function pageRouter(pageName) {
    if (pageName === 'leaderboard') {
        leaderboardNode.classList.remove('hidden')
        gameWrapperNode.classList.add('hidden')
        aboutNode.classList.add('hidden')
    } else if (pageName === 'game') {
        gameWrapperNode.classList.remove('hidden')
        aboutNode.classList.add('hidden')
        leaderboardNode.classList.add('hidden')
    } else if (pageName === 'about') {
        aboutNode.classList.remove('hidden')
        gameWrapperNode.classList.add('hidden')
        leaderboardNode.classList.add('hidden')
    }
}

function diceLocked(n) { //dice0 dice1
    const node = document.querySelector(`#${n}`)
    node.classList.toggle('dice_block')

    const num = Number(parseInt(n.match(/\d+/)))
    currentDiceSet.blocked[num] = !currentDiceSet.blocked[num]
}

//#endregion


//#region LISTENERS

//в будущем дописать запуск через диалоговое окно с настройками
const playerNames = ['dima', 'gleb']
// const playersQty = playerNames.length

newGameStartNode.addEventListener('click', () => {
    playerNames.forEach((el) => {
        userTables.push(new userTable(el))
    })

    userTables.forEach((el) => {
        renderUserTable(el, tablesNode)
    })

    currentDiceSet = new diceSet(3)
    currentAttempt = currentDiceSet.attempt
    renderDiceField(currentDiceSet, fieldSetNode)

    newGameNode.classList.add('hidden')
    pageRouter('game')
})

attemptButton.addEventListener('click', () => {
    if (currentDiceSet.attempt) {
        // console.log('att');
        // console.log(currentDiceSet.attempt);

        currentDiceSet.setRandom()
        renderDiceField(currentDiceSet, fieldSetNode)
    }
})

fieldSetNode.addEventListener('click', (e) => {
    const tg = e.target.id
    if (['dice0', 'dice1', 'dice2', 'dice3', 'dice4'].includes(tg)) {
        diceLocked(tg)
    }

    //tableChecker
})

menu.addEventListener('click', (e) => {
    pageRouter(e.target.id)
})

//#endregion
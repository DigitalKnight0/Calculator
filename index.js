const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operate')
const display = document.querySelector('.main-display')
const sideDisplay = document.querySelector('.side-display')
const evalButton = document.querySelector('.result')
const clrButton = document.querySelector('.clear')
const delButton = document.querySelector('.delete')
const cache = []
const numberStore = []
let currentOperator = ''
let operatorPressed = false

document.addEventListener('keydown', handleKey)

function handleKey(e){
    let currentKey = e.key
    if(!Number.isNaN(Number(currentKey))){
        handleNumbers(e)
    } else if(['+', '-', '*', '/', '%', '^'].includes(currentKey)){
        handleOperators(e)
    } else if(currentKey === 'Enter' || currentKey === '='){
        handleEval()
    } else if(currentKey === 'Escape'){
        handleClr()
    } else if(currentKey === 'Backspace' || currentKey === 'Delete'){
        handleDel()
    }
}

numbers.forEach(number => {
    number.addEventListener('click', handleNumbers)
})

operators.forEach(operator => {
    operator.addEventListener('click', handleOperators)
})

evalButton.addEventListener('click', handleEval)

clrButton.addEventListener('click', handleClr)

function handleClr(){
    currentOperator = ''
    operatorPressed = false
    cache.length = 0
    numberStore.length = 0
    updateDisplay('', true)
    sideDisplay.textContent = ''
}

delButton.addEventListener('click', handleDel)

function handleDel(){
    let currentDisplay = display.textContent.split('')
    currentDisplay.pop()
    display.textContent = currentDisplay.join('')
    numberStore.pop()
}

function handleEval(){
    if(!cache.length || !numberStore.length) return
    let result = evaluate()
    if(Number.isInteger(result)){
        result = Number(result.toFixed(2))
    }
    updateCache(result)
    updateDisplay(result, true)
    updateSideDisplay()
    operatorPressed = true
}

function handleNumbers(e){
    let currentNumber = e.type === "keydown" ? e.key : e.target.textContent
    if(currentNumber === '.' && numberStore.includes('.')){
        return
    }
    updateDisplay(currentNumber, false)
    numberStore.push(currentNumber)
}

function handleOperators(e){
    let operator = e.type === "keydown" ? e.key : e.target.textContent
    if(!cache.length && !numberStore.length){
        return
    } else if(!cache.length && numberStore.length){
        updateCache(false)
        currentOperator = operator
        operatorPressed = true
    } else if(cache.length && !numberStore.length){
        currentOperator = operator
        updateSideDisplay()
    } else {
        let result = evaluate()
        if(Number.isInteger(result)) result = Number(result.toFixed(2))
        updateCache(result)
        updateDisplay(result, true)
        operatorPressed = true
        currentOperator = operator
        updateSideDisplay()
    }
}

function updateDisplay(currentNumber, clrscr){
    if(clrscr || operatorPressed){
        display.textContent = ''
        operatorPressed = false
    }
    display.textContent += currentNumber
}

function updateSideDisplay(){
    let content = cache + "   " + currentOperator
    sideDisplay.textContent = content
}

function updateCache(option){
    if(option === false){
        cache.push(Number(numberStore.join('')))
        numberStore.length = 0
        return
    }
    cache[0] = option
    numberStore.length = 0
}

function evaluate(){
    let firstNumber = cache[0]
    let secondNumber = Number(numberStore.join(''))
    switch(currentOperator){
        case '+':
            return firstNumber + secondNumber
            break
        case '-':
            return firstNumber - secondNumber
            break
        case '*':
            return firstNumber * secondNumber
            break
        case '/':
            if(secondNumber === 0) return 'Nice try lol'
            return firstNumber / secondNumber
            break
        case '%':
            return firstNumber % secondNumber
            break
        case '^':
            return Math.pow(firstNumber, secondNumber)
            break
    }
}
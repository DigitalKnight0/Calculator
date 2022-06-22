const numbers = document.querySelectorAll('.number')
const operators = document.querySelectorAll('.operate')
const display = document.querySelector('.display-bar')
const evalButton = document.querySelector('.result')
const cache = []
const numberStore = []
let currentOperator = ''
let operatorPressed = false

numbers.forEach(number => {
    number.addEventListener('click', handleNumbers)
})

operators.forEach(operator => {
    operator.addEventListener('click', handleOperators)
})

function handleNumbers(e){
    let currentNumber = e.target.textContent
    updateDisplay(currentNumber, false)
    numberStore.push(currentNumber)
}

function handleOperators(e){
    if(!cache.length && !numberStore.length){
        return
    } else if(!cache.length && numberStore.length){
        updateCache(false)
        currentOperator = e.target.textContent
        operatorPressed = true
    } else if(cache.length && !numberStore.length){
        currentOperator = e.target.textContent
    } else {
        let result = evaluate()
        updateCache(result)
        updateDisplay(result, true)
        operatorPressed = true
        currentOperator = e.target.textContent
    }
}

function updateDisplay(currentNumber, clrscr){
    if(clrscr || operatorPressed){
        display.textContent = ''
        operatorPressed = false
    }
    display.textContent += currentNumber
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
            return firstNumber / secondNumber
            break
        case '%':
            return firstNumber % secondNumber
            break
    }
}
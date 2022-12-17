class Calculator{
    constructor(previousValueElement, currentValueElement){
        this.previousValueElement = previousValueElement;
        this.currentValueElement = currentValueElement;
        this.clear();
    }

    clear(){
        this.currentValue = '';
        this.previousValue = '';
    }

    delete(){
        this.currentValue = this.currentValue.toString().slice(0, -1)
    }

    appendNumber(number){
        if (number  === '.' && this.currentValue.includes('.')) return
        this.currentValue = this.currentValue.toString() + number.toString()
    }

    chooseOperation(operation){
        if (this.currentValue === '') return
        if (this.previousValue !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousValue = this.currentValue
        this.currentValue = '';
        
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousValue)
        const current = parseFloat(this.currentValue)
        if(isNaN(prev) || isNaN(current)) return

        switch (this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
            
        }
        this.currentValue = computation
        this.operation = undefined
        this.previousValue = ''
    }

    updateDisplay(){
        this.currentValueElement.innerText = this.currentValue
        if (this.operation != null){
            this.previousValueElement.innerText = `${this.previousValue} ${this.operation}`
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-all-clear]')
const previousValueElement = document.querySelector('[data-previous]')
const currentValueElement = document.querySelector('[data-current]')

const calculator = new Calculator(previousValueElement, currentValueElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
      calculator.updateDisplay()
    })
})


equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})


clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})


deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
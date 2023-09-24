
function Evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)

  if (isNaN(prev) || isNaN(current)) return ''
  let math = ''
  
  switch (operation) {
    case '+':
      math = prev + current
      break
    case '-':
      math = prev - current
      break
    case '*':
      math = prev * current
      break
    case '/':
      math = prev / current
      break
  }
  return math.toString()
}

export default Evaluate
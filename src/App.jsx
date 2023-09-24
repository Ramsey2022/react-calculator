import { useReducer, useState } from 'react'
import './App.css'
import DigitButton from './components/DigitButton'
import OperationButton from './components/OperationButton'
import Actions from './components/Actions'
import Evaluate from './components/Evaluate'

function reducer(state, { type, payload }) {
  switch(type) {
    case Actions.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit === '0' && state.currentOperand === '0') return state
      if (payload.digit === '.' && state.currentOperand == null) return {
        ...state, currentOperand: payload.digit
      }
      if (payload.digit === '.' && state.currentOperand.includes('.')) return state
    return {
      ...state, currentOperand: `${state.currentOperand || ''}${payload.digit}`
    }
    case Actions.CLEAR:
      return {}
    case Actions.CHOOSE_OPERATION:
      if (state.currentOperand.endsWith('.')) return state
      if (state.currentOperand == null) return state

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.previousOperand == null) {
        return {
          ...state, 
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return {
        ...state,
        previousOperand: Evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }

      case Actions.EVALUATE:
        if (
          state.operation == null ||
          state.currentOperand == null ||
          state.previousOperand == null
        ) {
          return state
        }

        return {
          ...state,
          overwrite: true,
          previousOperand: null,
          operation: null,
          currentOperand: Evaluate(state)
        }
  }
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {})

  return (
    <div className='calc-grid'>
      <div className='output'>
        <div className='previous-operand'>{previousOperand} {operation}</div>
        <div className='current-operand'>{currentOperand}</div>
      </div>
      <button className='span-two' onClick={() => dispatch({ type: Actions.CLEAR })}>AC</button>
      <button>DEL</button>
      <OperationButton operation='/' dispatch={dispatch} />
      <DigitButton digit='1' dispatch={dispatch} />
      <DigitButton digit='2' dispatch={dispatch} />
      <DigitButton digit='3' dispatch={dispatch} />
      <OperationButton operation='*' dispatch={dispatch} />
      <DigitButton digit='4' dispatch={dispatch} />
      <DigitButton digit='5' dispatch={dispatch} />
      <DigitButton digit='6' dispatch={dispatch} />
      <OperationButton operation='+' dispatch={dispatch} />
      <DigitButton digit='7' dispatch={dispatch} />
      <DigitButton digit='8' dispatch={dispatch} />
      <DigitButton digit='9' dispatch={dispatch} />
      <OperationButton operation='-' dispatch={dispatch} />
      <DigitButton digit='.' dispatch={dispatch} />
      <DigitButton digit='0' dispatch={dispatch} />
      <button className='span-two' onClick={() => dispatch({ type: Actions.EVALUATE })}>=</button>
    </div>
  )
}

export default App

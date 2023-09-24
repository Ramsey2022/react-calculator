import Actions from './Actions'
import Evaluate from './Evaluate'

function Reducer(state, { type, payload }) {
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
    case Actions.REMOVE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    case Actions.CHOOSE_OPERATION:
      if (state.currentOperand == null) return state
      if (state.currentOperand.endsWith('.')) return state

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

export default Reducer
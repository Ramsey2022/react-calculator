import Actions from './Actions'

function OperationButton({ dispatch, operation }) {
  return(
    <button onClick={() => dispatch({
      type: Actions.CHOOSE_OPERATION, payload: { operation }
    })}>
      {operation}
    </button>
  )
}

export default OperationButton
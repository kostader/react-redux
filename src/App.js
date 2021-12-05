import './App.css';
import { useDispatch, useSelector } from 'react-redux'
import { addCustomerAction, removeCustomerAction } from './store/customerReducer';
import { fetchCustomers } from './asyncActions/Customers';

function App() {

  const dispatch = useDispatch()
  const cash = useSelector(state => state.cash.cash)
  const customers = useSelector(state => state.customers.customers)
  console.log(cash)

  const addCash = (cash) => {
    dispatch({ type: "ADD_CASH", payload: cash })
  }

  const getCash = (cash) => {
    dispatch({ type: "GET_CASH", payload: cash })
  }

  const addNewCustomer = (name) => {
    const customer = {
      name,
      id: Date.now()
    }
    dispatch(addCustomerAction(customer))
  }

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id))
  }

  return (
    <div className="App">
      <div style={{ fontSize: '3rem' }}>{cash}</div>
      <div style={{ display: "flex" }}>
        <button onClick={() => addCash(Number(prompt()))}>Increase</button>
        <button onClick={() => getCash(Number(prompt()))}>Decrease</button>
        <button onClick={() => addNewCustomer(prompt())}>Add new customer</button>
        <button onClick={() => removeCustomer(Number(prompt()))}>Remove customer</button>
        <button onClick={() => dispatch(fetchCustomers())}>Get List of customers</button>

      </div>
      {customers.length > 0 ?
        <div className="div">
          {customers.map(customer =>
            <div onClick={() => removeCustomer(customer)} style={{ PfontSize: "2rem", border: '1px solid black', padding: '10px', margin: '10px' }}>{customer.name}</div>
          )}
        </div>
        :
        <div className="">
          "No customers!"
        </div>
      }
    </div>
  );
}

export default App;

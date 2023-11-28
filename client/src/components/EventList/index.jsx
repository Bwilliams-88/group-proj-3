import {
  ADD_EVENT,
  REMOVE_EVENT,
  ADD_TO_CART,
  CLEAR_CART
} from '../utils/actions';

import { useGlobalState } from '../utils/GlobalState';

export default function EventList() {
  const [state, dispatch] = useGlobalState;

  return (
    <div>
      {state.events ? (
          <>
          <section eventName="event-list">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Categories</th>
                  <th>Remove</th>
                </tr>
              </thead>

              <tbody>
                {/* Access events from our state object returned from useReducer */}
                {state.events.map((events) => (
                  <tr key={events.id}>
                    <td>{events.id}</td>
                    <td>{events.name}</td>
                    <td>{events.categories}</td>
                    <td>
                      {/* We replace our removeEvent method with our dispatch function passing the type and payload */}
                      <button
                        type="button"
                        onClick={() => {
                          console.log('EventList.js: Dispatched remove!');
                          return dispatch({
                            type: REMOVE_EVENT,
                            payload: events.id,
                          });
                        }}
                      > 
           
        }
                      </select>

                      <button
                        type="button"
                        onClick={() => {
                          console.log('EventList.js: Dispatched add event! ');
                          return dispatch({
                            type: ADD_EVENT,
                            payload: {
                              name: state.eventName,
                              category: state.eventCategory,
                            },
                          });
                        }}
                      >
                        Add <Event></Event>
                      </button>
                    </div>
                  </section>
        </>
            </div>

            <div className="add-event">
              <input
                value={state.eventCategory}
                onChange={(e) =>
                  dispatch({ type: ADD_TO_CART, payload: e.target.value })
                }
                placeholder="New cart..."
                type="text"
              />
                <select>
                onChange={(e) =>
                  dispatch({ type: CLEAR_CART, payload: e.target.value })
                }
                value={state.eventCategory}
              >
                <option>Remove Cart Items...</option>
          
    

  

}












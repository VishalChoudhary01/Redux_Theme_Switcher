## 1. Redux Store
The Redux store is the central place where your entire application's state is kept. In Redux, you can have only one store per application. This store is responsible for holding the state and providing methods for updating that state.
```jsx
const Store = configureStore({
    reducer: {
        themeChanger: themeReducer,
    }
})

```
### configureStore is a function from Redux Toolkit that creates the store.
### The reducer property defines the state slices (like themeChanger) that will be managed by the store. These slices represent different parts of your application's state.

## 2. Slice
A slice is a collection of Redux reducer logic and actions for a specific part of your state. Redux Toolkit's createSlice function is used to automatically generate actions and reducers for a given feature.

```JSX
const themeSlice = createSlice({
    name: "themeColor",
    initialState: {
        defaultTheme: "dark"
    },
    reducers: {
        toggleTheme(state) {
            state.defaultTheme = state.defaultTheme === "light" ? "dark" : "light";
        }
    }
})

```
### name: The name of the slice, which is used as a prefix for the action types.
### initialState: The default state for this slice of the store. Here, it's set to { defaultTheme: "dark" }.
### reducers: These are functions that define how the state should change in response to actions. The       toggleTheme reducer toggles the theme between "light" and "dark".

## 3. Actions
Actions are plain JavaScript objects that represent an intention to change the state. They are created by Redux using the reducers defined in the slice. In Redux Toolkit, createSlice automatically generates action creators.

```JSX
export const { toggleTheme } = themeSlice.actions;
```
### toggleTheme is an action creator. When called, it returns an action object that looks like this: { type: 'themeColor/toggleTheme' }.
The type in the action object is a string, not an object.
'themeColor/toggleTheme' is a string that follows a naming convention, but it is just a single, flat string value.
themeColor/toggleTheme: A Structured Naming Convention
The string 'themeColor/toggleTheme' is constructed to include both the slice name and the action name, but they are not separate objects within the action object.

themeColor: This part of the string typically represents the name of the slice, which is a grouping of related state and reducers in Redux.

toggleTheme: This part of the string represents the specific action defined within the themeColor slice. It is the action that describes what should be done (in this case, toggling the theme).


type is a string property in an action object, not a nested object.
themeColor/toggleTheme is a string that follows the convention of including both the slice name (themeColor) and the action name (toggleTheme) for clarity and organization in Redux applications.
### This action is then dispatched to the store to update the state.

## 4. Reducers
Reducers are pure functions that take the current state and an action as arguments and return a new state. They describe how the state should change in response to the dispatched actions.

```JSX
reducers: {
    toggleTheme(state) {
        state.defaultTheme = state.defaultTheme === "light" ? "dark" : "light";
    }
}

```
The toggleTheme reducer function checks the current theme (light or dark) and switches it.

## 5. useDispatch
useDispatch is a hook provided by React-Redux that gives you access to the dispatch function. This function is used to dispatch actions to the store, triggering the appropriate reducers to update the state.

```JSX
const dispatch = useDispatch();
const handleThemeToggle = () => dispatch(toggleTheme());

```

dispatch(toggleTheme()) sends the toggleTheme action to the Redux store. This action is handled by the reducer, which updates the defaultTheme in the state.


## 6. useSelector
useSelector is a hook provided by React-Redux that allows you to extract data from the Redux store state. It takes a selector function as an argument, which receives the entire store state and returns the part of the state you need.

```JSX
const themeMode = useSelector((state) => {
    console.log(state);
    return state.themeChanger.defaultTheme;
});

```
## useSelector retrieves the defaultTheme from the themeChanger slice of the store's state.
## This allows the Navbar component to reactively update based on the current theme.


## How They Work Together
### The store holds the entire application state and makes it accessible to all components through the Provider.
### The slice manages a portion of the state, including defining the initial state and the reducers that handle state changes.
### Actions are dispatched using useDispatch, triggering the corresponding reducer to update the state.
### Components can access specific parts of the state using useSelector, allowing them to re-render when that state changes.

## Example Flow
### User Interaction: The user clicks the theme toggle button in the Navbar.
### Action Dispatch: handleThemeToggle is called, dispatching the toggleTheme action.
### Reducer Execution: The toggleTheme reducer in themeSlice is triggered, updating the defaultTheme in the state.
### State Update: The store's state is updated, and components that use useSelector to read the themeChanger.defaultTheme will re-render with the new theme.

# Advance in Redux

## 1. Redux Store (Deep Dive)
The Redux store is the heart of your application. It not only holds the state but also provides methods to interact with it. The main functions provided by the store are:

### getState: Returns the current state of the application. This is useful when you need to access the state directly without using useSelector.

### dispatch: Dispatches an action to the store. This is how you trigger state changes. The action is processed by the reducers.

### subscribe: Registers a callback function that will be called whenever the state changes. This is mainly used for advanced scenarios, such as integrating with external libraries.

### replaceReducer: Allows you to dynamically replace the current reducer with a new one. This can be useful in applications with dynamically loaded features or when implementing advanced state management patterns.

## 2. Slice 
A slice is a modular way of organizing your Redux logic, typically containing:

### Initial State: The initial values for the slice's state. This is the starting point for the slice's data.

### Reducers: Functions that describe how to update the slice's state in response to actions. Each reducer corresponds to a specific type of action.

### Actions: Automatically generated action creators based on the reducers you define. Each reducer function name becomes an action type.

```JSX

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;

```

### increment and decrement are simple reducers that adjust the value up or down.
### incrementByAmount is a more complex reducer that takes a payload (passed with the action) to determine how much to increment.

## 3. Actions 
An action in Redux is a plain JavaScript object that describes an event that happened in the application. It usually has two parts:

### type: A string that defines the action's type. This is used by the reducers to determine how to handle the action.
### payload (optional): The data that the action carries. For example, if you're updating a user's profile, the payload might be the new profile data.

```JSX
const action = {
  type: 'counter/incrementByAmount',
  payload: 5
};

```

## 4. Reducers
Reducers are pure functions that must not have side effects. This means they should only use the arguments passed to them (current state and action) and return the new state without modifying the existing one.

In advanced cases, reducers can:

Handle multiple actions: A single reducer can manage several action types using a switch-case structure or by using multiple case statements.
Combine reducers: You can combine multiple reducers into a single one using combineReducers, which is useful for managing complex state structures.

```jsx
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  counter: counterReducer,
  theme: themeReducer
});

export default rootReducer;

```

## 5. useDispatch
useDispatch is critical for triggering state changes. In more complex applications, you might use dispatch to:

Call async operations: You can dispatch actions that start an API call, followed by actions that handle the success or failure of that call. For this, Redux Thunk or Redux Saga can be integrated.

Chain multiple actions: You might dispatch several actions in sequence. For example, after a successful login, you might dispatch actions to load user data, navigate to the dashboard, and set authentication tokens.

## 6. useSelector 
useSelector is a powerful tool for reading state. In more advanced scenarios:

Selector Functions: You can define selector functions that encapsulate complex logic for retrieving specific parts of the state. This improves code readability and reusability.

Memoized Selectors: You can use libraries like Reselect to create memoized selectors, which optimize performance by recalculating values only when the relevant state changes.

```jsx
import { createSelector } from 'reselect';

const selectCounter = (state) => state.counter.value;

const selectEvenOrOdd = createSelector(
  [selectCounter],
  (counter) => (counter % 2 === 0 ? 'Even' : 'Odd')
);

```
## 7. Asynchronous Actions 
To handle asynchronous actions (like API calls), Redux Toolkit offers thunks. Thunks are functions that return another function, allowing you to write logic that interacts with the store asynchronously.

```jsx
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserData = createAsyncThunk(
  'user/fetchData',
  async (userId, thunkAPI) => {
    const response = await fetch(`/api/user/${userId}`);
    return response.json();
  }
);

```

## 8. Middleware (Bonus)
Redux allows you to add middleware to the store, which can intercept dispatched actions before they reach the reducer. This is useful for logging, handling async actions, or implementing custom logic.

```jsx
const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log('Dispatching:', action);
  let result = next(action);
  console.log('Next State:', storeAPI.getState());
  return result;
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});
```
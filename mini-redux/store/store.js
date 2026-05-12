function createStore(reducer, preloadedState) {
    let state = preloadedState;

    let listeners = [];

    function getState() {
        return state;
    }

    function dispatch(action){
        if(typeof action !== "object" || action.type === undefined)  {
            throw new Error("Action must be an object with a type");
        }
        state = reducer(state, action);

        listeners.forEach((listener)=> listener());
        return action;
    }

    function subscribe(listener) {
        listeners.push(listener);

        return function unsubscribe() {
            listeners = ""
        }
    }
}
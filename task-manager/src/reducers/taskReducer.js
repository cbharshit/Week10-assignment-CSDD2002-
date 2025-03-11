export const taskReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, action.payload];

        case "DELETE_TASK":
            return state.filter(task => task.id !== action.payload);

        case "TOGGLE_TASK":
            return state.map(task =>
                task.id === action.payload
                    ? { ...task, completed: !task.completed }
                    : task
            );

        default:
            return state;
    }
};

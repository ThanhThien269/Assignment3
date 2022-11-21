import { GETALL_COURSES, CREATE_FOOD, UPDATE_FOOD, DELETE_FOOD, SEARCH_FOOD } from "../Actions/coursesAction";

const initialState = {

    foods: [],
}
export const coursesReduce = (state = initialState, action) => {
    switch (action.type) {
        case GETALL_COURSES:
            return {
                ...state,
                foods: [...action.payload]
            }
        case SEARCH_FOOD:
            return {
                ...state,
                foods: [...action.payload],

            };
        case CREATE_FOOD:
            return {
                ...state,
                foods: [...state.foods, action.payload]
            }
        case UPDATE_FOOD:
            return {
                ...state,
                foods: state.foods.map((x) => {
                    if (x.docId === action.payload.docId) {
                        return {
                            ...x,
                            ...action.payload
                        }
                    } else {
                        return x
                    }
                })
            }
        case DELETE_FOOD:
            return {
                ...state,
                foods: state.foods.filter(x => x.docId !== action.payload.docId),
            }
        default:
            return { ...state }
    }
}
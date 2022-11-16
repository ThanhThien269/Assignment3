import { GETALL_COURSES,CREATE_FOOD} from "../Actions/coursesAction";

const initialState={
   
    foods:[]
}
export const coursesReduce =(state=initialState,action)=>{
    switch(action.type)
    {
        case GETALL_COURSES:
            return{
                ...state,
               foods:[...action.payload] 
            }
        case CREATE_FOOD:
            return{
                ...state,
                foods:[...state.foods,action.payload]
            }
        default:
            return{...state}
    }
}
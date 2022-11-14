import { GETALL_COURSES } from "../Actions/coursesAction";

const initialState={
   
    courses:[]
}
export const coursesReduce =(state=initialState,action)=>{
    switch(action.type)
    {
        case GETALL_COURSES:
            return{
                ...state,
               courses:[...action.payload] 
            }
        default:
            return{...state}
    }
}
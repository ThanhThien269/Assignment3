export const GETALL_COURSES ='GETALL_COURSES'

export const getAllCourses=(courses)=>{
    return{
        type:GETALL_COURSES,
        payload:courses
    }
}
//action-thunk
export const fetchAllCourses =()=>
{
    return(dispatch)=>{
        const getData =async()=>{
            try{
                const response = await fetch('http://localhost:9001/api/courses');
                const courses = await response.json();
                console.log('here',courses)
                dispatch(getAllCourses(courses));
            }catch(err){
                console.log(err)
            }
        };
        getData();

     }
}
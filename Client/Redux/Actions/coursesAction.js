export const GETALL_COURSES ='GETALL_COURSES'
export const CREATE_FOOD ='CREATE_FOOD'
export const UPDATE_FOOD ='UPDATE_FOOD'
export const DELETE_FOOD ='DELETE_FOOD'


export const getAllCourses=(courses)=>{
    return{
        type:GETALL_COURSES,
        payload:courses
    }
}
export const creeateFood=(food)=>{
    return{
        type:CREATE_FOOD,
        payload:food,
    }
}
export const updateFood=(food)=>{
    return{
        type:UPDATE_FOOD,
        payload:food
    }
}
export const deleteFood=(docId)=>{
    return{
    type:DELETE_FOOD,
    payload:{docId}
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
export const postFood=(food)=>{
    return (dispatch)=>{
        const postData=async()=>{
            try{
                await fetch('http://localhost:9001/item',{
                    method:"POST",
                    headers:{
                        Accept:"application/json","Content-Type":"application/json",
                    },
                    body:JSON.stringify(food)
                });

            }catch(err){
                console.log(err)

            }
        }
        postData();
        dispatch(creeateFood(food))
    }
}
export const update=(docId,food)=>{
    return(dispatch)=>{
        const updateData=async()=>{
        try{
            await fetch(`http://localhost:9001/update/${docId}`,{
                method:"PUT",
                headers:{
                    Accept:"application/json","Content-Type":"application/json",
                },
                body:JSON.stringify(food)

            });
        }catch(err){
            console.log(err)

            }
        }
        updateData();
        dispatch(updateFood(food))
    }
}
export const deleteF=(docId)=>{
    return(dispatch)=>{
        const deleteData=async()=>{
            try{
                await fetch(`http://localhost:9001/del/${docId}`,{
                    
                    method:"DELETE",
                    
                })
            }catch(err){
                console.log(err)
    
                }
        }
        deleteData();
        dispatch(deleteFood(docId))
    }
}
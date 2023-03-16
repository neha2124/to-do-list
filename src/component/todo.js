import React, { useEffect, useState } from 'react'
import './todo.css'
// get the data from localStorage
 const getData = () =>{
    const Lists = localStorage.getItem("mylist")
    if(Lists){
    return JSON.parse(Lists)
    }else{
        return []
    }
    
}

const Todo = () => {
   
    const [inputData, setInputData] = useState("");
    const [inputList, setInputList] = useState(getData())
    const [editItem , setEditItem] = useState("");
    const [isToggle , setIsToggle] = useState(false);

    // console.log(inputList)
    const addItem = () => {
        if(!inputData){
            alert("please fill input")
        }else if(inputData && isToggle){
            setInputList(inputList.map((curElem)=>{
                if(curElem.id === editItem){
                    return {...curElem,name:inputData}
                }
                return curElem
            })
            )
            setEditItem("")
            setInputData("")
            setIsToggle(false)
        }
        else{
            const item = {
                id:new Date().getTime().toString(),
                name:inputData
            }
            setInputList([...inputList,item])
            setInputData("")
        }
        
    }
    const deleteItem = (index) =>{
       const remaing= inputList.filter((item)=>{
            return item.id !== index
         })
         setInputList(remaing)
    }
    const edit = (index) =>{
        const edited = inputList.find((item)=>{
            return index === item.id
        })
        setEditItem(index)
        setInputData(edited.name)
        setIsToggle(true)

    }
    useEffect(() =>{
        localStorage.setItem("mylist",JSON.stringify(inputList))
    },[inputList])
    return (
        <div className='container'>
            <h1>📑 Your To do List</h1>
            <div className='todo-list'>
                <input type="text" placeholder='✍ Add item' className='todo-input' value={inputData} onChange={(e) => { setInputData(e.target.value) }} />
               {isToggle ? <i className='fa-sharp fa-regular fa-pen-to-square  add-btn' onClick={()=> addItem()}></i> : <i className='fa-thin fa-plus add-btn' onClick={()=> addItem()}></i>}
                
            </div>
            <div>
                {inputList.map((item,index) =>{
                    return(
                        <div className='list' key={index} >
                    <input type="text" className='todo-input-list' disabled value={item.name} />
                    <div className='btn-group'>
                        <i className='fa-solid fa-trash-can trash-btn' onClick={() =>deleteItem(item.id)}></i>
                        <i className='fa-sharp fa-regular fa-pen-to-square edit-btn'onClick={ ()=>edit(item.id)}></i>
                    </div>
                </div>
                    )
                })}
                
            </div>

        </div>

    )
}

export default Todo
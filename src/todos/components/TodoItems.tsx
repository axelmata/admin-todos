'use client'
import { Todo } from "@prisma/client"

import styles from './TodoItems.module.css'
import { IoCheckboxOutline,  IoSquareOutline } from "react-icons/io5";

interface Props {
    todos: Todo;
    //TODO: acciones que quiero hacer llegar
    toggleTodo: (id:string, complete:boolean) => Promise<Todo|void>
}


export const TodoItems = ({ todos, toggleTodo }: Props ) => {
  return (
    <div className={todos.complete ? styles.todoDone : styles.todoPending}>
        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
            
            <div onClick={() => toggleTodo(todos.id, !todos.complete)} className={`flex p-2 hover:bg-opacity-60 ${ todos.complete ? 'bg-blue-100' : 'bg-red-100' }`}>
                {
                    todos.complete ? <IoCheckboxOutline size={30}/> : <IoSquareOutline size={30}/>
                }
                
            </div>

            <div className="text-center sm:text-left">
                { todos.description }
            </div>
        
        </div>
    </div>
  )
}

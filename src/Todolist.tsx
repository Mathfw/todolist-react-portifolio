import React from "react"
import { useState } from "react"
import { Plus, Trash, PencilSimple, Prohibit, CalendarPlus, Check, DotsThree } from "@phosphor-icons/react"
import { makeid, checkMobile } from "./lib/utils"

type dateTime = {
    ano?: number
    mes?: number
    dia?: number
    hora?: number
    min?: number
    sec?: number
}

type todoProps = {
    id: string
    index: number
    content: string
    done: boolean
    date?: dateTime | string
    delete?: (id: string, index: number) => void
}

type todo = {
    id: string
    content: string
    done: boolean
    date?: dateTime | string
}


export default function Todolist() {

    const [todos, setTodos] = useState<todo[]>([{
        id: makeid(6),
        content: "Example Todo",
        done: false
    }])
    const [showDate, setShowDate] = useState(false)
    const [currentDate, setCurrentDate] = useState("")

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center bg-slate-50">
            <div className="w-5/6 max-w-lg">
                <h1 className="text-center p-4 m-4 font-mono uppercase font-bold text-2xl">Todolist</h1>
                <div className="flex items-center mx-4">
                    <label className="relative md:flex-1">
                        <input type="text" id="add-input" 
                        className="w-full border-2 border-slate-950 p-2 outline-none rounded-md focus:border-sky-400 transition-all duration-300 ease-in-out peer"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault()
                                const add_button: HTMLButtonElement = document.querySelector("#add-button")!
                                add_button.click()
                            }
                        }}/>
                        <span className="absolute top-0 left-4 -translate-y-4 bg-slate-50 px-2 peer-focus:text-sky-400 transition-all duration-300 ease-in-out">add todo</span>
                    </label>
                    {
                        showDate ?
                        <input id="date-input"
                        className="mx-2 p-2 rounded-md bg-slate-300 hover:bg-slate-200 transition-all duration-300 ease-in-out"
                        type="datetime-local"
                        onDoubleClick={(e) => {
                            e.preventDefault()
                            setShowDate(false)
                        }}
                        onChange={() => {
                            const date_input: HTMLInputElement = document.querySelector("#date-input")!
                            setCurrentDate(date_input.value)
                        }}/> :
                        <button
                        className="mx-2 p-2 rounded-md bg-slate-300 hover:bg-slate-200 transition-all duration-300 ease-in-out"
                        onClick={(e) => {
                            e.preventDefault()
                            setShowDate(true)
                        }}
                        >
                            <CalendarPlus size={28} weight="bold"/>
                        </button>
                    }
                    <button id="add-button"
                    className="p-2 rounded-md bg-slate-300 hover:bg-slate-200 transition-all duration-300 ease-in-out"
                    onClick={(e) => {
                        e.preventDefault()
                        const add_input: HTMLInputElement = document.querySelector("#add-input")!
                        const text = add_input.value
                        const clone = [...todos]
                        const id = makeid(6)
                        if (currentDate !== "") {
                            clone.push({
                                id: id,
                                content: text,
                                done: false
                            })
                        }else {
                            clone.push({
                                id: id,
                                content: text,
                                done: false,
                                date: currentDate
                            })
                        }
                        
                        setTodos(clone)
                        add_input.value = ""
                    }}>
                        <Plus size={28} weight="bold" />
                    </button>
                </div>
                {
                    showDate ?
                    <p className="mx-4 my-4 text-amber-400 font-mono">
                        Double click to close date picker
                    </p> :
                    null
                }
                <ul className="mx-4 my-6">
                    {
                        todos.length > 0 ? 
                        todos.map((todo, index) => {
                            return(
                                <div key={index}>
                                    <Todo id={todo.id} index={index} content={todo.content} done={todo.done} 
                                    delete={(id, index) => {
                                        const clone = [...todos]
                                        clone.splice(index, 1)
                                        setTodos(clone)
                                    }}/>
                                </div>
                            )
                        }) :
                        <TodoPlaceholder />
                    }
                </ul>
            </div>
        </div>
    )
}

function Todo(props: todoProps) {

    const [inputDisabled, setInputDisabled] = useState(true)

    return(
        <li className="flex items-center p-2 rounded-md shadow-[0_0_8px_0_rgba(0,0,0,0.25)]">
            <label className="flex-1 ml-2 flex items-center">
                <input type="checkbox" className="p-4 appearance-none bg-slate-200 rounded-md checked:bg-sky-500 checked:hover:bg-sky-400 transition-all duration-300 ease-in-out peer"/>
                <Check size={24} weight="bold" className="absolute text-slate-50 ml-1 invisible peer-checked:visible"/>
                <input id={"span-"+props.id} type="text" value={props.content} disabled 
                className="ml-4 peer-checked:line-through"
                onBlur={(e) => {
                    e.preventDefault()
                    const content: HTMLInputElement = document.querySelector(`#span-${props.id}`)!
                    setInputDisabled(true)
                    content.disabled = true
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                        const content: HTMLInputElement = document.querySelector(`#span-${props.id}`)!
                        setInputDisabled(true)
                        content.disabled = true
                    }
                }}/>
            </label>
            {
                checkMobile() ?
                <div>
                    <button
                    onClick={(e) => {
                        e.preventDefault()
                        const dialog: HTMLDialogElement = document.querySelector(`#dialog-${props.id}`)!
                        if (dialog.open) {
                            dialog.close()
                        }else if (!dialog.open) {
                            dialog.show()
                        }
                    }}>
                        <DotsThree size={32} weight="bold" />
                    </button>
                    <dialog id={"dialog-"+props.id} 
                    className="w-40 flex flex-col">
                        <button
                        className="mx-4 p-2 rounded-md hover:bg-emerald-500 hover:text-slate-50 transition-all duration-300 ease-in-out"
                        onClick={(e) => {
                            e.preventDefault()
                            const content: HTMLInputElement = document.querySelector(`#span-${props.id}`)!
                            setInputDisabled(false)
                            content.disabled = false
                            content.focus()
                        }}>
                            {
                                inputDisabled ?
                                <div className="flex">
                                    <span className="flex-1">edit</span>
                                    <PencilSimple size={28} weight="bold" />
                                </div> :
                                <div className="flex">
                                    <span className="flex-1">stop edit</span>
                                    <Prohibit size={28} weight="bold" />
                                </div>
                            }
                        </button>
                        <button
                        className="flex mx-4 p-2 rounded-md hover:bg-rose-500 hover:text-slate-50 transition-all duration-300 ease-in-out"
                        onClick={(e) => {
                            e.preventDefault()
                            if (props.delete) {
                                props.delete(props.id, props.index)
                            }
                        }}>
                            <span className="flex-1">delete</span>
                            <Trash size={28} weight="bold" />
                        </button>
                    </dialog>
                </div> :
                <div>
                    <button
                    className="mx-4 p-2 rounded-md hover:bg-emerald-500 hover:text-slate-50 transition-all duration-300 ease-in-out"
                    onClick={(e) => {
                        e.preventDefault()
                        const content: HTMLInputElement = document.querySelector(`#span-${props.id}`)!
                        setInputDisabled(false)
                        content.disabled = false
                        content.focus()
                    }}>
                        {
                            inputDisabled ?
                            <PencilSimple size={32} weight="bold" /> :
                            <Prohibit size={32} weight="bold" />
                        }
                    </button>
                    <button
                    className="mr-2 p-2 rounded-md hover:bg-rose-500 hover:text-slate-50 transition-all duration-300 ease-in-out"
                    onClick={(e) => {
                        e.preventDefault()
                        if (props.delete) {
                            props.delete(props.id, props.index)
                        }
                    }}>
                        <Trash size={28} weight="bold" />
                    </button>
                </div>

            }
        </li>
    ) 
}

function TodoPlaceholder() {
    return(
        <div>
            This is a Placeholder
        </div>
    )
}
import { useState } from "react"

export default function useToggle(){
    const [isToggle,setIsToggle] = useState(false)

    const toggle = ()=>{
        setIsToggle(value => !value)
    }

    return { toggle, isToggle }
}
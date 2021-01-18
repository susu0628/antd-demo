import React, { useEffect, useRef } from 'react'
import { Button, Input } from 'antd'
const UseRefDemo1 = () => {
    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus()
    }, [])
    const getInputFocus = () => {
        inputRef.current.focus()
    }
    return (
        <div style={{margin: '30px'}}>
            <Input placeholder="获取焦点" ref={inputRef} /><br/>
            <Button style={{marginTop: '16px'}} onClick={getInputFocus}>input获取焦点</Button>
        </div>
    )
}
export default UseRefDemo1

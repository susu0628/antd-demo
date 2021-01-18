import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Button } from 'antd'
const useRefChildren = forwardRef((props, ref) => {
  const [count, setCount] = useState(0)
  useImperativeHandle(ref, () =>{
    return {
      parcount: count,
      parentCount: () => {
        setCount(count + 1)
      }
    }
  })
  return (
    <div>
      <Button onClick={() =>{setCount(count + 1)}}>count + 1</Button>
      <span>{count}</span>
    </div>
  )
})
export default useRefChildren

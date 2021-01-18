import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'antd'
const UseRefDemo3 = () => {
  const [count, setCount] = useState(0)
  const ref = useRef(0)
  useEffect(() => {
    ref.current = count
  }, [count])
  const AlertCount = () => {
    setTimeout(() => {
      alert(ref.current)
    }, 2000);
  }
  return (
    <div style={{marginLeft: '50px'}}>
      <Button onClick={() => {setCount(count + 1)}}>count + 1</Button>
      <p>{count}</p>
      <p>{ref.current}</p>
      <Button onClick={AlertCount}>Alert</Button>
    </div>
  )
}
export default UseRefDemo3

import { Button } from 'antd'
import React, { useRef, useState } from 'react'
import UseRefChildren from './useRefChildren'
const UseRefDemo2 = () => {
  const childrenRef = useRef(null)
  const [update, setUpdate] = useState(false)
  console.log('childrenRef', childrenRef)
  return (
    <div>
      <UseRefChildren ref={(ref) => childrenRef.current = ref} />
      <Button 
        onClick={() => {
          /**
           * 当父组件通过调用parentCount方法来使子组件的count发生改变
           * 在父组件并没用通过childrenRef来实时获取到子组件的值，
           * 为什么？
           * 因为子组件的更改state并不会触发父组件的重新render，而且更改useRef的值也不会触发重新render
           * 所以，需要调用setUpdate()方法，来触发更新
           */
          childrenRef.current  && childrenRef.current.parentCount()
          setUpdate(!update)
        }}
      >
        parent change Count
      </Button>
      <span>{(childrenRef.current || {}).parcount }</span>
    </div>
  )
}
export default UseRefDemo2

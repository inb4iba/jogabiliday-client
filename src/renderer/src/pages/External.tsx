import { Titlebar } from '@renderer/components/Titlebar'
import { useEffect, useState } from 'react'

export const External = (): JSX.Element => {
  const [title, setTitle] = useState('External Window')

  useEffect(() => {
    window.windowApi.getTitle().then((res) => setTitle(res))
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <Titlebar title={title} />
    </div>
  )
}

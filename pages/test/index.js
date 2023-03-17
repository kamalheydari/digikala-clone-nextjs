import { useState } from 'react'
import { Switch } from '@headlessui/react'
import useChangeRoute from 'hooks/useChangeRoute'

export default function Test() {
  const changeRoute = useChangeRoute({
    shallow: true,
  })

  function Example() {
    const [enabled, setEnabled] = useState(false)

    return (
      <div className='my-16 bbb flex items-center justify-between gap-x-3'>
        <span className=''>Use setting</span>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${enabled ? 'bg-teal-900' : 'bg-teal-50'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span
            aria-hidden='true'
            className={`${enabled ? '-translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    )
  }

  return (
    <div>
      <Example />
      <button className='button' onClick={() => changeRoute({ search: 'hey' })}>
        change search
      </button>
      <button className='button' onClick={() => changeRoute({ id: 252 })}>
        change id
      </button>
    </div>
  )
}

export async function getServerSideProps() {
  console.log('teeeeeeeeeeeeeeeeeeeeeeeeest')
  return { props: {} }
}

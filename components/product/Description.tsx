import { useDisclosure } from 'hooks'

import { Icons } from 'components'

import { truncate } from 'utils'

interface Props {
  description: string
}

const Description: React.FC<Props> = (props) => {
  //? Porps
  const { description } = props

  //? Assets
  const [isShowDesc, showDescHandlers] = useDisclosure()

  //? Render(s)
  return (
    <section>
      <div className='px-3 lg:max-w-3xl xl:max-w-5xl'>
        <h4 className='mb-3 lg:border-b-2 lg:border-red-500 w-min'>معرفی</h4>
        <p className='text-xs leading-6 tracking-wider text-gray-600 lg:text-sm lg:leading-8'>
          {isShowDesc ? description : truncate(description, 300)}
        </p>
        {description.length > 300 && (
          <button
            type='button'
            className='flex items-center py-2 text-sm text-sky-400'
            onClick={showDescHandlers.toggle}
          >
            {isShowDesc ? 'بستن' : 'مشاهده بیشتر'}
            <Icons.ArrowLeft className='icon text-sky-400' />
          </button>
        )}
      </div>
      <div className='section-divide-y ' />
    </section>
  )
}

export default Description

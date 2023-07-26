import { BackIconButton } from 'components'

interface Props {
  title: string
  children: React.ReactNode
}

const PageContainer: React.FC<Props> = (props) => {
  //? Props
  const { title, children } = props

  //? Render(s)
  return (
    <>
      <div className='flex items-center py-1'>
        <div className='lg:hidden'>
          <BackIconButton />
        </div>
        <h3 className='pb-1 text-gray-500 text-sm lg:border-red-500 lg:border-b-2 lg:mx-3 md:text-base'>
          {title}
        </h3>
      </div>
      <div className='section-divide-y' />

      {children}
    </>
  )
}

export default PageContainer

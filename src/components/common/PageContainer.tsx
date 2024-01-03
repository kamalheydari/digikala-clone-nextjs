import { BackIconButton } from 'components'

interface Props {
  title: string
  children: React.ReactNode
}

const PageContainer: React.FC<Props> = (props) => {
  // ? Props
  const { title, children } = props

  // ? Render(s)
  return (
    <>
      <div className="flex items-center py-1">
        <div className="lg:hidden">
          <BackIconButton />
        </div>
        <h3 className="pb-1 text-sm text-gray-500 md:text-base lg:mx-3 lg:border-b-2 lg:border-red-500">{title}</h3>
      </div>
      <div className="section-divide-y" />

      {children}
    </>
  )
}

export default PageContainer

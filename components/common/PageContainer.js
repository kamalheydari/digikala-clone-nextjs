import { BackIconBtn } from 'components'

const PageContainer = ({ title, children }) => {
  return (
    <>
      <div className='page-container'>
        <div className='lg:hidden'>
          <BackIconBtn />
        </div>
        <h3 className='page-container__title'>{title}</h3>
      </div>
      <div className='section-divide-y' />

      {children}
    </>
  )
}

export default PageContainer

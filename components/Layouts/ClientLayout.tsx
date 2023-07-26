import { Header, Footer } from 'components'

interface Props {
  children: React.ReactNode
}

const ClientLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default ClientLayout

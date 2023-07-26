import Link from 'next/link'
import { NextPageContext } from 'next'

interface Props {
  statusCode: number;
}

function Error({ statusCode }: Props) {
  return (
    <div className='mx-auto'>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
      <Link href='/'>home</Link>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error

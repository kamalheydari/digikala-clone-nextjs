import { Person } from 'components'
import { DataModels } from 'types'

interface Props {
  users: DataModels.IUser[]
}

const UsersTable: React.FC<Props> = (props) => {
  //? Props
  const { users } = props

  //? Render(s)
  return (
    <div className='mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10'>
      <table className='w-full whitespace-nowrap'>
        <thead className='h-9 bg-emerald-50'>
          <tr className='text-emerald-500'>
            <th></th>
            <th className='border-gray-100 border-x-2'>ID</th>
            <th>وضعیت</th>
            <th className='border-gray-100 border-x-2'>نام</th>
            <th>ایمیل</th>
            <th className='border-r-2 border-gray-100'></th>
          </tr>
        </thead>
        <tbody className='text-gray-600'>
          {users.length > 0 &&
            users.map((user) => (
              <tr
                className='text-xs text-center transition-colors border-b border-gray-100 md:text-sm hover:bg-gray-50'
                key={user._id}
              >
                <td className='px-2 py-4'>
                  <Person className='mx-auto w-7 h-7' />
                </td>
                <td className='px-2 py-4'>{user._id}</td>
                <td className='px-2 py-4 font-bold'>
                  <span
                    className={`py-1.5 px-2 rounded-lg font-bold inline-block
              ${
                user.role === 'admin'
                  ? 'text-blue-600 bg-blue-50'
                  : user.role === 'user'
                  ? 'text-amber-600 bg-amber-50'
                  : user.root
                  ? 'text-green-600 bg-green-50'
                  : ''
              }
              `}
                  >
                    {user.role}
                  </span>
                </td>
                <td className='px-2 py-4'>{user.name}</td>
                <td className='px-2 py-4'>{user.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable

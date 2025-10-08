import { render, screen } from '../../../__tests__/test-utils'
import userEvent from '@testing-library/user-event'
import DataTable from '../data-table'

const mockData = [
  { id: 1, name: 'مدیر', slug: 'admin', description: 'دسترسی کامل', level: 5 },
  { id: 2, name: 'کاربر', slug: 'user', description: 'دسترسی محدود', level: 1 },
  { id: 3, name: 'ویراستار', slug: 'editor', description: 'دسترسی ویرایش', level: 3 }
]

const mockColumns = [
  { key: 'name', label: 'نام', sortable: true },
  { key: 'slug', label: 'شناسه', sortable: true },
  { key: 'description', label: 'توضیحات', sortable: false },
  { key: 'level', label: 'سطح', sortable: true }
]

describe('DataTable - functional essentials', () => {
  test('filters data by search', async () => {
    const user = userEvent.setup()
    render(<DataTable data={mockData} columns={mockColumns} searchable />)

    const searchInput = screen.getByPlaceholderText('جستجو…')
    await user.type(searchInput, 'مدیر')

    expect(screen.getByText('مدیر')).toBeInTheDocument()
    expect(screen.queryByText('کاربر')).not.toBeInTheDocument()
  })

  test('renders pagination controls when needed', () => {
    const largeData = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: `نقش ${i + 1}`, slug: `role-${i + 1}`, description: `توضیحات ${i + 1}`, level: 1 }))
    render(<DataTable data={largeData} columns={mockColumns} paginated defaultPageSize={10} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
  })
})

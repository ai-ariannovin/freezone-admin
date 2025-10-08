import { render, screen } from '../../../../__tests__/test-utils'
import userEvent from '@testing-library/user-event'
import UpsertEntityModal from '../UpsertEntityModal'
import { mockCategories } from '../../../../__tests__/test-utils'

const mockOnSubmit = jest.fn()
const mockOnCancel = jest.fn()
const mockOnOpenChange = jest.fn()

const defaultProps = {
  open: true,
  onOpenChange: mockOnOpenChange,
  mode: 'add' as const,
  activeTab: 'roles' as const,
  formData: { name: '', slug: '', description: '', level: 1, permission_category_id: 1 },
  setFormData: jest.fn(),
  permissionCategories: mockCategories,
  onSubmit: mockOnSubmit,
  onCancel: mockOnCancel,
  handleInvalid: jest.fn(),
  handleInput: jest.fn()
}

describe('UpsertEntityModal - critical flows', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('cancel button triggers onCancel', async () => {
    const user = userEvent.setup()
    render(<UpsertEntityModal {...defaultProps} />)

    await user.click(screen.getByText('انصراف'))
    expect(mockOnCancel).toHaveBeenCalled()
  })

  test('prevent submit when required fields are empty', async () => {
    const user = userEvent.setup()
    render(<UpsertEntityModal {...defaultProps} />)

    await user.click(screen.getByText('افزودن'))
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  test('prevent submit when slug is invalid', async () => {
    const user = userEvent.setup()
    render(<UpsertEntityModal {...defaultProps} />)

    await user.type(screen.getByLabelText('نام نقش *'), 'نقش تست')
    await user.type(screen.getByLabelText('شناسه نقش *'), 'Invalid Slug!')
    await user.click(screen.getByText('افزودن'))

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})

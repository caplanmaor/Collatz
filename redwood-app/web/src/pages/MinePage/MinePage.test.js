import { render } from '@redwoodjs/testing/web'

import MinePage from './MinePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MinePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MinePage />)
    }).not.toThrow()
  })
})

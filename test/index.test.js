import {addTodo} from '../src/actions/index'

describe('Actions', () => {
  it('addToDo', () => {
    expect(addTodo('')).toEqual({ type: 'ADD_TODO', id: 0, text: '' })
    expect(addTodo('1')).toEqual({ type: 'ADD_TODO', id: 1, text: '1' })
  })
})

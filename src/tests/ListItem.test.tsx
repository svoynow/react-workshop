import { shallow } from 'enzyme';
import React from 'react';
import { todoActive } from '../interfaces';
import { ListItem } from '../ListItem'

const mockItem = () => ({
  id: '1',
  order: 1,
  status: todoActive,
  title: 'Hello', 
});
// tslint:disable no-console
it('displays the item title', () => {
  const handleDestroy = jest.fn();
  const handleEdit = jest.fn();
  const wrapper = shallow(
    <ListItem 
      item={mockItem()} 
      handleDestroy={handleDestroy} 
      handleEdit={handleEdit} />
  );
  expect(wrapper.find('label').text()).toEqual('Hello')
});

it('calls handleDestroy when you click the x', () => {
  const handleDestroy = jest.fn();
  const handleEdit = jest.fn();
  const wrapper = shallow(
    <ListItem 
      item={mockItem()} 
      handleDestroy={handleDestroy} 
      handleEdit={handleEdit} />
  );
  wrapper.find('button').simulate('click');
  expect(handleDestroy.mock.calls.length).toEqual(1); 
});

it('calls handleEdit when you leave the input field', () => {
  const handleDestroy = jest.fn();
  const handleEdit = jest.fn();
  const wrapper = shallow(
    <ListItem 
      item={mockItem()} 
      handleDestroy={handleDestroy} 
      handleEdit={handleEdit} />
  );
  wrapper.find('input.edit').simulate('blur');
  expect(handleEdit.mock.calls.length).toEqual(1); 
});

it('calls handleEdit when you press enter in the input field', () => {
  const handleDestroy = jest.fn();
  const handleEdit = jest.fn();
  const wrapper = shallow(
    <ListItem 
      item={mockItem()} 
      handleDestroy={handleDestroy} 
      handleEdit={handleEdit} />
  );
  wrapper.find('input.edit').simulate('keyDown', {which: 13});
  expect(handleEdit.mock.calls.length).toEqual(1); 
});

it('puts input from the text field into the state', () => {
  const handleDestroy = jest.fn();
  const handleEdit = jest.fn();
  const wrapper = shallow(
    <ListItem 
      item={mockItem()} 
      handleDestroy={handleDestroy} 
      handleEdit={handleEdit} />
  );
  wrapper.find('input.edit').simulate('change', { target: { value: 'Hello' } }); 
  expect(wrapper.state('value')).toEqual('Hello');
});

it('goes into edit mode when you doubleclick', () => {
  const handleDestroy = jest.fn();
  const handleEdit = jest.fn();
  const wrapper = shallow(
    <ListItem 
      item={mockItem()} 
      handleDestroy={handleDestroy} 
      handleEdit={handleEdit} />
  );
  wrapper.find('label').simulate('doubleClick'); 
  expect(wrapper.state('edit')).toBe(true);
});

it('goes into edit mode when you doubleclick', () => {
  const handleDestroy = jest.fn();
  const handleEdit = jest.fn();
  const wrapper = shallow(
    <ListItem 
      item={mockItem()} 
      handleDestroy={handleDestroy} 
      handleEdit={handleEdit} />
  );
  wrapper.find('label').simulate('doubleClick'); 
  wrapper.find('input.edit').simulate('keyDown', {which: 27});
  expect(wrapper.state('edit')).toBe(false);
});

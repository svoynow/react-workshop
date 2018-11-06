// src/setupTests.ts
import * as Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// tslint:disable no-console

console.log('setup jest');
Enzyme.configure({
  adapter: new Adapter(),
})
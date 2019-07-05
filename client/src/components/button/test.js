import React from 'react';
import { shallow } from 'enzyme';
import Button from './index';
import { checkProps } from '../../tests/testUtils';

describe('BUTTON component', () => {
  it('renders the shit', () => {
    const wrapper = shallow(
      <Button />
    );
    const renderedComponent = wrapper.find('.app-button');

    expect(renderedComponent).toHaveLength(1);
    // checkProps
  });
});

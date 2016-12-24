import React from 'react';
import { shallow } from 'enzyme';
import Snow from '../src/Snow';

describe('Snow', () => {
  it('Snow renders', () => {
    const snow = shallow(
      <Snow />
    );
    expect(snow.find('.react-snow-effect-canvas').length).toEqual(1);
  });
});

import * as Enzyme from 'enzyme';
import * as React from 'react';
import TablePagination from './TablePagination';

const { mount } = Enzyme;

describe('<TablePagination>', () => {
    test('Have a total default props equal 0', () => {
        const wrapper = mount(<TablePagination />);

        expect(wrapper.props().total).toBe(0);
    });
});

import { Fragment } from 'react';
import { Select } from 'antd';
import { SORT_OPTIONS } from '../../shared/constants';

const MovieSortSelect = ({ sort, onSortSelection }) => {
    return <Fragment>
        <b>Sort By: </b>
        <Select
            listItemHeight={30}
            listHeight={270}
            defaultValue={sort}
            style={{ width: 200 }}
            options={SORT_OPTIONS}
            onSelect={onSortSelection}
        >
        </Select>
    </Fragment>
}

export default MovieSortSelect;

import { Fragment } from 'react';
import { Tag } from 'antd';
const { CheckableTag } = Tag;

const MovieGenreTagSelect = ({ selectedTags, onChange, allGenreList }) => {
    return <Fragment>
        {allGenreList.map(tag => (
            <CheckableTag
                className="genre-tag"
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={checked => onChange(tag, checked)}
            >
                {tag}
            </CheckableTag>
        ))}
    </Fragment>
}

export default MovieGenreTagSelect;

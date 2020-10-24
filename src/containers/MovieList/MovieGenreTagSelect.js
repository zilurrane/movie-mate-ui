import { Fragment } from 'react';
import { Tag } from 'antd';
const { CheckableTag } = Tag;

const MovieGenreTagSelect = ({ selectedTags, onChange }) => {
    return <Fragment>
        <b className="genre-title">Genre: </b>
        {['Action', 'Comedy'].map(tag => (
            <CheckableTag
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

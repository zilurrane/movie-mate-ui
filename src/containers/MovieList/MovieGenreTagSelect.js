import { Fragment, useState, useEffect } from 'react';
import { Tag } from 'antd';
import { getGenreList } from '../../shared/service';
const { CheckableTag } = Tag;

const MovieGenreTagSelect = ({ selectedTags, onChange }) => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        getGenreList()
            .then(data => {
                setTags(data.map(({ name }) => name));
            });
    }, []);

    return <Fragment>
        {tags.map(tag => (
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

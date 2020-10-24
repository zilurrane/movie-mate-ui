import { Input } from 'antd';
const { Search } = Input;

const MovieSearchInput = ({ onSearch, onChange }) => {
    return <Search
        placeholder="Search by Movie Name, Director Name"
        enterButton="Search"
        size="large"
        onBlur={onSearch}
        onSearch={onSearch}
        onChange={onChange}
        allowClear
    />
}

export default MovieSearchInput;

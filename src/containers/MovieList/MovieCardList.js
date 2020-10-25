import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { List, Card, Button } from 'antd';
import { convertStringArrayToCsv } from '../../shared/utility';

const MovieCardList = ({ isAdminRoute, data, isLoadingMovies, onMovieDelete, onMovieEdit }) => {
    return <List
        loading={isLoadingMovies}
        grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3
        }}
        dataSource={data}
        renderItem={item => (
            <List.Item>
                <Card
                    title={item.name}
                    className="movie-card-body"
                    actions={isAdminRoute ? [
                        <Button type="text" onClick={() => onMovieEdit(item)}><EditOutlined key="edit" /></Button>,
                        <Button type="text" onClick={() => onMovieDelete(item)}><DeleteOutlined key="delete" /></Button>,
                    ] : []}
                >
                    <div className="movie-meta">
                        <b>Director: </b>
                        {item.director}
                    </div>
                    <div className="movie-meta">
                        <b>IMDB Rating: </b>
                        {item.imdbScore}
                    </div>
                    <div className="movie-meta">
                        <b>Popularity: </b>
                        {item.popularity99}
                    </div>
                    <div className="movie-meta">
                        <b>Genre: </b>
                        {convertStringArrayToCsv(item.genre)}
                    </div>
                </Card>
            </List.Item>
        )}
    />
}

export default MovieCardList;

import { List, Card } from 'antd';
import { convertStringArrayToCsv } from '../../shared/utility';

const MovieCardList = ({ data, isLoadingMovies }) => {
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
                <Card title={item.name} className="movie-card-body">
                    <div className="movie-meta">
                        <b>Director: </b>
                        {item.director}
                    </div>
                    <div className="movie-meta">
                        <b>IMDB Rating: </b>
                        {item.imdb_score}
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

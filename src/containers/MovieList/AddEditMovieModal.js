import { Input, Form, Modal, Select, InputNumber } from 'antd';

const { Option } = Select;

const AddEditMovieModal = ({ isEditMovieView, visible, handleOk, handleCancel, allGenreList }) => {
    const [form] = Form.useForm();
    return (<Modal
        visible={visible}
        title={isEditMovieView ? "Update Movie" : "Add Movie"}
        okText="Submit"
        cancelText="Cancel"
        onCancel={handleCancel}
        onOk={() => {
            form
                .validateFields()
                .then(values => {
                    console.log(values);
                    handleOk(values, form.resetFields);
                })
                .catch(info => {
                    console.log('Validate Failed:', info);
                });
        }}
    >
        <Form
            form={form}
            layout="vertical"
            name="add_edit_movie_modal"
        >
            <Form.Item
                name="name"
                label="Movie Name"
                rules={[{ required: true, message: 'Please input the movie name!' }]}
            >
                <Input disabled={isEditMovieView} />
            </Form.Item>
            <Form.Item
                name="director"
                label="Director Name"
                rules={[{ required: true, message: 'Please input the director name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="genre"
                label="Genre"
                rules={[{ required: true, message: 'Select or add genre!' }]}>
                <Select mode="tags">
                    {
                        allGenreList.map(genre => <Option key={genre} value={genre}>{genre}</Option>)
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name="popularity99"
                label="Popularity"
                rules={[{ required: true, message: 'Please input the popularity!' }]}
            >
                <InputNumber className="width-100" min={0} max={99} step={1} precision={0} />
            </Form.Item>
            <Form.Item
                name="imdb_score"
                label="IMDB Score"
                rules={[{ required: true, message: 'Please input the IMDB score!' }]}
            >
                <InputNumber className="width-100" min={0} max={10} step={0.1} />
            </Form.Item>
        </Form>
    </Modal>
    );
}

export default AddEditMovieModal;

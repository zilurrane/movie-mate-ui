import Modal from "antd/lib/modal/Modal";

const AddEditMovieModal = ({ visible, handleOk, handleCancel }) => {
    return <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
    >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
    </Modal>
}

export default AddEditMovieModal;

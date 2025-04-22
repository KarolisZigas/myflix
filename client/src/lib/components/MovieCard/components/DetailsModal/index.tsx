import { useState } from "react";
import { Modal, Form, Input, Rate } from "antd";
import { AddCommentsMutation, AddCommentsMutationVariables, SavedMovie } from "../../../../../generated/graphql";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../../../graphql/mutations/AddComments";
import { displayErrorMessage, displaySuccessNotification } from "../../../../utils";

interface Props {
    open: boolean,
    onClose: () => void,
    movie: SavedMovie
}

export const DetailsModal = ({ open, onClose, movie }: Props) => {
    console.log({ open, onClose, movie });

    const [form] = Form.useForm();
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [addComment] = useMutation<AddCommentsMutation, AddCommentsMutationVariables>(ADD_COMMENT, {
        onCompleted: (data) => {
            if (data.addComments) {
                displaySuccessNotification('Successfully updated your thoughts on the movie!');
            }
        },
        onError: (error) => {
            displayErrorMessage('There was an error.')
        }
    })

    const handleOk = async () => {
        try {
            setConfirmLoading(true);
            
            const values = await form.validateFields();

            await addComment({ 
                variables: {
                    saveMovieId: movie.id,
                    details: {
                        note: values.note,
                        rating: values.rating
                    }
                }
            })

            onClose();
        } catch (error) {
            console.error('Validation failed: ', error);
        }
    };

    return (
        <Modal
            title={`My thoughts about the movie '${movie.movie.title}'`}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={onClose}
            getContainer={false}
            mask={true}
            maskClosable={false} 
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{ rating: movie.rating, note: movie.notes ?? '' }}
            >
                <Form.Item name="rating" label="Your Rating">
                    <Rate allowHalf />
                </Form.Item>
                <Form.Item
                    name="note"
                    label="Your Note"
                    rules={[{ message: 'Please add your note' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    );
}
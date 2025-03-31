import { message, notification } from "antd";

export const displaySuccessNotification = (message: string, description?: string) => {
    return notification["success"]({
        message,
        description,
        placement: "topLeft",
    })
}

export const displayErrorMessage = (error: string) => {
    return message.error(error)
}
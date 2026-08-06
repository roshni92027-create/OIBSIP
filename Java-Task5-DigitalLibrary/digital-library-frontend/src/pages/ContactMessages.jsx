import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
    getMessages,
    deleteMessage,
} from "../services/ContactService";
import {
    ToastContainer,
    toast,
} from "react-toastify";

function ContactMessages() {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {

        try {

            const response = await getMessages();

            setMessages(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Unable to load messages.");

        }

    };

    const handleDelete = async (id) => {

        // if (!window.confirm("Delete this message?")) {
        //     return;
        // }

        try {

            await deleteMessage(id);

            toast.success("Message Deleted Successfully!");

            loadMessages();

        } catch (error) {

            console.log(error);

            toast.error("Delete Failed.");

        }

    };

    return (
        <>
            <Navbar />

            <ToastContainer
                position="top-right"
                autoClose={3000}
            />

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-header bg-dark text-white">

                        <h3 className="mb-0">
                            📩 Contact Messages
                        </h3>

                    </div>

                    <div className="card-body">

                        <table className="table table-bordered table-striped table-hover">

                            <thead className="table-dark">

                                <tr>

                                    <th>ID</th>

                                    <th>Name</th>

                                    <th>Email</th>

                                    <th>Message</th>

                                    <th>Date</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {messages.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center"
                                        >
                                            No Messages Found
                                        </td>

                                    </tr>

                                ) : (

                                    messages.map((message) => (

                                        <tr key={message.id}>

                                            <td>{message.id}</td>

                                            <td>{message.name}</td>

                                            <td>{message.email}</td>

                                            <td>{message.message}</td>

                                            <td>

                                                {message.createdAt
                                                    ? new Date(
                                                          message.createdAt
                                                      ).toLocaleString()
                                                    : "-"}

                                            </td>

                                            <td>

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() =>
                                                        handleDelete(message.id)
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </>
    );
}

export default ContactMessages;
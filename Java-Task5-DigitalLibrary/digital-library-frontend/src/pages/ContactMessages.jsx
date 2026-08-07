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
import { FaCommentAlt, FaTrash } from "react-icons/fa";

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

            <div className="container mt-4 mb-5">

                <div className="card glass-card shadow-lg" style={{ borderRadius: "26px" }}>

                    <div className="card-header card-header-gradient d-flex align-items-center gap-2 py-3">
                        <FaCommentAlt className="fs-4 text-white" />
                        <h3 className="mb-0 fs-4 fw-bold">
                            User Contact Messages
                        </h3>
                    </div>

                    <div className="card-body p-4">

                        <div className="table-responsive">
                            <table className="table align-middle">

                                <thead>

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
                                                className="text-center py-4 text-muted"
                                            >
                                                No Messages Found
                                            </td>

                                        </tr>

                                    ) : (

                                        messages.map((message) => (

                                            <tr key={message.id}>

                                                <td className="fw-bold">{message.id}</td>

                                                <td className="fw-semibold">{message.name}</td>

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
                                                        <FaTrash /> Delete
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

            </div>

        </>
    );
}

export default ContactMessages;
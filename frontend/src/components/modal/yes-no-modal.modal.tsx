import React from 'react';
import Modal from 'react-modal';
import ReactDOM from "react-dom/client";

export function confirm(message: string, title?: string): Promise<boolean> {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = ReactDOM.createRoot(container);

    return new Promise((resolve) => {
        const handleClose = (result: boolean) => {
            root.unmount();
            container.remove();
            resolve(result);
        };

        root.render(
            <Modal
                isOpen
                onRequestClose={() => handleClose(false)}
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>{title || 'Are you sure?'}</h2>
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={() => handleClose(true)}>Yes</button>
                    <button onClick={() => handleClose(false)}>No</button>
                </div>
            </Modal>
        );
    });
}
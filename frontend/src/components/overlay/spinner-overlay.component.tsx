import React from 'react';
import './spinner-overlay.component.css';

export function SpinnerOverlay() {
    return (
        <div className="loading-overlay">
            <div className="spinner-circle" />
        </div>
    );
}
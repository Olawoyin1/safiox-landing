import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error }) {
    return (
        <div style={{ padding: '20px', backgroundColor: '#fdd', color: '#900' }}>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
                {error.toString()}
            </details>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
        </ErrorBoundary>
    </React.StrictMode>,
);

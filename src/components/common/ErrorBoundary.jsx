import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">Qualcosa è andato storto.</h1>
                    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 max-w-2xl w-full overflow-auto">
                        <p className="font-mono text-sm text-red-400 mb-4">{this.state.error && this.state.error.toString()}</p>
                        <pre className="font-mono text-xs text-slate-500 whitespace-pre-wrap">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
                    >
                        Ricarica Applicazione
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

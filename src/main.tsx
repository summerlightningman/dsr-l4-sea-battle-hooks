import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app'

// @ts-ignore
window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = () => {
};

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
)

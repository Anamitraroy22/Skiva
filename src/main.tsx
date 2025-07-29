import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// This line finds the HTML element with the ID 'root' and tells React to render your App component inside it.
createRoot(document.getElementById("root")!).render(<App />);
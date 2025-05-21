import { Button, createTheme, MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css'
import { Interview } from './views/interview';
import { SwrExample } from './views/swr-example';
import { theme } from './theme';

function App() {
  return (
    <Router>
        <MantineProvider theme={theme}>
            {/* <Button>Text</Button>
            <nav>
                <ul>
                    <li><Link to="/">Interview</Link></li>
                    <li><Link to="/swr-example">Swr example</Link></li>
                </ul>
            </nav> */}
            <Routes>
                <Route path="/" element={<Interview />} />
                <Route path="/swr-example" element={<SwrExample />} />
                <Route path="/interview" element={<Interview />} />
            </Routes>
        </MantineProvider>
    </Router>
  )
}

export default App

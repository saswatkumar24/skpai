import { ThemeProvider } from "@/components/theme-provider";
import { ToukoumWebsite } from '@/components/ToukoumWebsite';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
          <ThemeProvider 
        attribute="class" 
        defaultTheme="light" 
        enableSystem
        disableTransitionOnChange
        storageKey="toukoum-theme"
      >
      <Router>
        <ToukoumWebsite />
      </Router>
    </ThemeProvider>
  );
}

export default App;

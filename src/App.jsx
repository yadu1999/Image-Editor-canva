
    import React from 'react';
    import EditorPage from '@/pages/EditorPage';
    import { Toaster } from '@/components/ui/toaster';
    import { AppProvider } from '@/context/AppContext';

    function App() {
      return (
        <AppProvider>
          <div className="flex flex-col h-screen bg-background">
            <EditorPage />
            <Toaster />
          </div>
        </AppProvider>
      );
    }

    export default App;
  
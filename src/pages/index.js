import React, { useState, useEffect } from "react";

/**
 * Fallback Layout Component
 */
const LocalLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
    <header className="bg-white border-b p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div className="font-bold text-xl tracking-tight text-blue-600">Personal Dashboard</div>
        <nav className="space-x-4 text-sm font-medium">
          <span className="text-gray-400 cursor-default">Dashboard</span>
          <span className="text-gray-400 cursor-default">Help</span>
        </nav>
      </div>
    </header>
    <main className="max-w-5xl mx-auto">
      {children}
    </main>
    <footer className="mt-12 py-8 border-t text-center text-gray-400 text-sm">
      &copy; {new Date().getFullYear()} Entrance Hall Controller
    </footer>
  </div>
);

/**
 * Gatsby Page Component
 */
const IndexPage = () => {
  const [appState, setAppState] = useState({
    user: {
      isAuthenticated: false,
      name: 'Guest',
      id: null
    },
    currentView: 'home',
    version: '1.2.1'
  });

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('app_user');
      if (savedUser) {
        setAppState(prev => ({ ...prev, user: JSON.parse(savedUser) }));
      }
    } catch (e) {
      console.warn("Local storage access failed:", e);
    }
  }, []);

  const navigateTo = (viewName) => {
    setAppState(prev => ({ ...prev, currentView: viewName }));
  };

  return (
    <LocalLayout>
      <div className="entrance-hall-container p-6 md:p-10">
        {/* Auth Status Bar */}
        <div className="mb-8 p-4 bg-white border border-gray-200 rounded-xl shadow-sm flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span id="auth-status" className="font-semibold text-gray-700">
              User: {appState.user.name}
            </span>
          </div>
          <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-mono rounded-full">
            Build v{appState.version}
          </span>
        </div>

        {/* Dynamic View Switcher */}
        <main id="main-content">
          {appState.currentView === 'home' && (
            <div className="welcome-section text-center py-12">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Entrance Hall</h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
                Central command for your Gatsby project. Manage your posts, system settings, and profile from one place.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <button 
                  onClick={() => navigateTo('posts')}
                  className="group p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Manage Posts</h3>
                  <p className="text-gray-500">Create, edit, and organize your content library.</p>
                </button>
                
                <button 
                  onClick={() => navigateTo('settings')}
                  className="group p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-800 group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="15 12a3 3 0 11-6 0 3 3 0 016 0" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Settings</h3>
                  <p className="text-gray-500">Update system configurations and preferences.</p>
                </button>
              </div>
            </div>
          )}

          {appState.currentView === 'posts' && (
            <div className="posts-section">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => navigateTo('home')}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                  <h2 className="text-3xl font-bold">Posts Module</h2>
                </div>
              </div>
              <div className="p-20 bg-white border border-gray-200 rounded-2xl text-center shadow-sm">
                 <p className="text-gray-500">Posts content area.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </LocalLayout>
  );
};

/**
 * Gatsby Head API
 * This injects Tailwind CSS via CDN so styles work even if your local
 * project doesn't have Tailwind configured yet.
 */
export const Head = () => (
  <>
    <title>Entrance Hall | Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style type="text/css">{`
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      .animate-in { animation: fadeIn 0.5s ease-out; }
    `}</style>
  </>
);

export default IndexPage;
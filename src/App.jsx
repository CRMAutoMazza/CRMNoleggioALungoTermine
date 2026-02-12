import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Leads from './pages/Leads';
import LeadDetail from './pages/LeadDetail';
import Settings from './pages/Settings';
import { ToastProvider } from './context/ToastContext';
import { CRMProvider } from './context/CRMContext';

import { NotificationProvider } from './context/NotificationContext';

import Inbox from './pages/Inbox';
import Documents from './pages/Documents';
import Reminders from './pages/Reminders';
import Automations from './pages/Automations';
import { RemindersProvider } from './context/RemindersContext';
import { AutomationProvider } from './context/AutomationContext';
import { AgendaProvider } from './context/AgendaContext';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Agenda from './pages/Agenda';
import Offers from './pages/Offers';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import PrivateRoute from './components/common/PrivateRoute';
import WhatsApp from './pages/WhatsApp';

function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <NotificationProvider>
          <RemindersProvider>
            <AgendaProvider>
              <TodoProvider>
                <AutomationProvider>
                  <ThemeProvider>
                    <AuthProvider> {/* New Auth Provider */}
                      <CRMProvider>
                        <Router>
                          <Routes>
                            {/* Public Route */}
                            <Route path="/login" element={<Login />} />

                            {/* Protected Routes */}
                            <Route path="/*" element={
                              <PrivateRoute>
                                <Layout>
                                  <Routes>
                                    <Route path="/" element={<Dashboard />} />
                                    <Route path="/leads" element={<Leads />} />
                                    <Route path="/leads/:id" element={<LeadDetail />} />
                                    <Route path="/inbox" element={<Inbox />} />
                                    <Route path="/whatsapp" element={<WhatsApp />} />
                                    <Route path="/reminders" element={<Reminders />} />
                                    <Route path="/documents" element={<Documents />} />
                                    <Route path="/automations" element={<Automations />} />
                                    <Route path="/agenda" element={<Agenda />} />
                                    <Route path="/offers" element={<Offers />} />
                                    <Route path="/settings" element={<Settings />} />
                                  </Routes>
                                </Layout>
                              </PrivateRoute>
                            } />
                          </Routes>
                        </Router>
                      </CRMProvider>
                    </AuthProvider>
                  </ThemeProvider>
                </AutomationProvider>
              </TodoProvider>
            </AgendaProvider>
          </RemindersProvider>
        </NotificationProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import Goals from "./pages/Goals";
import Analysis from "./pages/Analysis";
import NotFound from "./pages/NotFound";
import { ToastProvider } from "./hooks/use-toast";
import "./App.css";
import "./pages/Dashboard.css";

const App = () => (
  <ToastProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/transactions" element={
          <Layout>
            <Transactions />
          </Layout>
        } />
        <Route path="/budget" element={
          <Layout>
            <Budget />
          </Layout>
        } />
        <Route path="/goals" element={
          <Layout>
            <Goals />
          </Layout>
        } />
        <Route path="/analysis" element={
          <Layout>
            <Analysis />
          </Layout>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ToastProvider>
);

export default App;

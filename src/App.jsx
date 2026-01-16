import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Home from "./layout/home/Home";
import Header from "./components/header/Header";
import VerticalHeader from "./components/verticalHeader/VerticalHeader";
import Dashboard from "@/layout/dashboard/Dashboard";
import SearchScreen from "./layout/searchScreen/searchScreen";
import Profile from "./layout/profile/Profile";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider, RequireAuth, RequireAdmin } from "./auth/auth";
import Login from "./layout/login/login";



const queryClient = new QueryClient();

function App() {
  
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          {/* PUBLIC */}
          <Route path="/login" element={<Login />} />

          {/* PROTECTED: misma estructura que tu compañero, solo envuelta */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <Header />
              </RequireAuth>
            }
          >
            <Route index element={<Home />} />
            <Route path="search" element={<SearchScreen />} />
            <Route path="profile" element={<Profile />} />

            {/* SOLO ADMIN */}
            <Route element={<RequireAdmin />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Route>


          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

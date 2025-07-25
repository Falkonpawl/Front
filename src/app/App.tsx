import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@pages/HomePage/HomePage";
import LoginPage from "@pages/LoginPage/LoginPage";
import UserFormPage from "@pages/UserFormPage/UserFormPage";
import { ProtectedRoute } from "@shared/lib/routing/ProtectedRoute";
import { Layout } from "@app/ui/Layout";
import { AuthProvider } from "./providers/AuthProvider";

const App = () => {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Публичная страница логина */}
        <Route path="/login" element={<LoginPage />} />

        {/* Защищённые маршруты с Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="user/create" element={<UserFormPage mode="create" />} />
          <Route path="user/:id/edit" element={<UserFormPage mode="edit" />} />
        </Route>

        {/* Редирект неизвестных путей */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import HomePage from "@pages/HomePage/HomePage"
import LoginPage from "@pages/LoginPage/LoginPage"
import UserFormPage from "@pages/UserFormPage/UserFormPage"

import { ProtectedRoute } from "@shared/lib/routing/ProtectedRoute"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Публичная страница логина */}
        <Route path="/login" element={<LoginPage />} />

        {/* Защищённые маршруты */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/create"
          element={
            <ProtectedRoute>
              <UserFormPage mode="create" />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/:id/edit"
          element={
            <ProtectedRoute>
              <UserFormPage mode="edit" />
            </ProtectedRoute>
          }
        />

        {/* Редирект неизвестных путей */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

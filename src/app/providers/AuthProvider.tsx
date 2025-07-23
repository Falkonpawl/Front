import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react"
import { getMe, logout } from "@shared/api/authApi"
import { useNavigate } from "react-router-dom"
import { User } from "@entities/user/model/types" // Обязательно: правильный импорт типа User

interface AuthContextType {
  user: User | null
  isLoading: boolean
  logoutUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logoutUser: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setLoading] = useState(true)
  const navigate = useNavigate()

useEffect(() => {
  getMe()
    .then((user) => setUser(user))
    .catch(() => {
      setUser(null);
      navigate('/login');
    })
    .finally(() => setLoading(false));
}, []);

  const logoutUser = async () => {
    try {
      await logout()
    } finally {
      setUser(null)
      navigate("/login")
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logoutUser }}>
      {children}
    </AuthContext.Provider>
  )
}

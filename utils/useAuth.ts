import { useRouter } from 'next/dist/client/router'
import useRequest from './useRequest'

const useAuth = () => {
  const router = useRouter()
  const API = useRequest()
  const checkLoginStatus = async () => {
    try {
      await API.checkLogin()
    } catch (err) {
      if (err.message === 'Unauthorized') {
        router.push('/')
      }
    }
  }

  return { checkLoginStatus }
}

export default useAuth

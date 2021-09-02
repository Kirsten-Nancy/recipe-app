export const isAuthenticated = () => {
  let access_token = localStorage.getItem('access_token')
  if (access_token) {
    return true
  }
  return false
}

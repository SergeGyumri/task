class Token {
  static setToken = (token) => {
    sessionStorage.setItem('token', token)
  }
  static getToken = () => {
    return sessionStorage.getItem('token') || '';
  }
  static delete = () => {
    sessionStorage.removeItem('token');
  }
}

export default Token;
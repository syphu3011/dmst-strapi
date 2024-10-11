import axios from 'axios'
async function verify(token) {
  const secret_key = process.env.RC_SECRET_KEY
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
  const rs = await axios.post(url)
  return rs.data
}
export default verify

import axios from 'axios'

export default async function Auth() {

    try {

        const response = await axios.get('/users/auth')
    
        console.log('auth: res', response)
    
        return response.data.success
    } catch (err) {
        console.log('auth client', err)
        return true
    }
}
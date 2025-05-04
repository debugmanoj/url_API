import axios from 'axios';


let createLink=async(url)=>{
  const data = {
    url: url,
    'max-clicks': '200'
};
  {
    try {
        const response = await axios.post('https://spoo.me/', data, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
            },
        });
        return response.data
    } catch (error) {
        // console.error(error);
    }
}

}

export default {createLink}

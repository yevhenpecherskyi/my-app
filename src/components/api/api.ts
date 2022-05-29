const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/users';

export const getToken = () => {
  return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
    .then(response => response.json())
}

export const getUsers = (page: number): Promise<Users> => {
  return fetch(`${BASE_URL}?page=${page}&count=6`)
    .then(response => response.json());
}

export const createUser = (formData, token: string, callback) => {
  return fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
    method: 'POST',
    headers: {
      'Token': token,
    },
    body: formData,
  }).then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.success) {
        if (callback) {
          callback();
        }
        return data.json();
      } else {
        throw new Error('Server error');
      }
    }).catch(error => new Error(error));
};

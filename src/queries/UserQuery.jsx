const url = "http://localhost:4000/users";

class UserQuery {
  static all = () => {
    return fetch(`${url}`)
    .then(response => response.json())
    .then(jsonData => jsonData.users)
    .catch(err => console.log(err))
  };

  static verify = (userData) => {
    return fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
  };

  static getid = (userData) => {
    return fetch(`${url}/getid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
  };

  static show = (id) => {
    return fetch(`${url}/${id}`)
    .then(response => response.json())
    .then(jsonData => jsonData.user)
    .catch(err => console.log(err))
  };

  static create = (userData) => {
    return fetch (`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
  };

  static updatearray = (id, userData) => {
    return fetch(`${url}/updatearray/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
  };


  static update = (id, userData) => {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    })
    .then(response => response.json())
  };

};

export default UserQuery;
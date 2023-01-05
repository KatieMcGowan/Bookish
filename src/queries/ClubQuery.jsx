const url = "http://localhost:4000/clubs";

class ClubQuery {
  static all = () => {
    return fetch(`${url}`)
    .then(response => response.json())
    .then(jsonData => jsonData.clubs)
    .catch(err => console.log(err))
  };

  static show = (id) => {
    return fetch(`${url}/${id}`)
    .then(response => response.json())
    .then(jsonData => jsonData.club)
    .catch(err => console.log(err))
  };

  static create = (clubData) => {
    return fetch (`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(clubData)
    })
    .then(response => response.json())
    .then(jsonData => jsonData.club)
  };

  static update = (id, clubData) => {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(clubData)
    })
    .then(response => response.json())
  };

  static updatearray = (id, clubData) => {
    return fetch(`${url}/updatearray/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(clubData)
    })
    .then(response => response.json())
  };

  static deletefromarray = (id, clubData) => {
    return fetch(`${url}/deletefromarray/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(clubData)
    })
    .then(response => response.json())
  };

  static delete = (id) => {
    return fetch(`${url}/${id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
  };
};

export default ClubQuery;
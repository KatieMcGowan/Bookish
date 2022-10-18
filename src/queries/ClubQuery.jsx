const url = "http://localhost:4000/clubs"

class ClubQuery {
  static all = () => {
    return fetch(`${url}`)
    .then(response => response.json())
    .then(jsonData => jsonData.clubs)
    .catch(err => console.log(err))
  };
  
  static adminshow = (id) => {
    console.log(id)
    return fetch(`${url}/adminshow/${id}`)
    .then(response => response.json())
    .then(jsonData => jsonData.clubs)
    .catch(err => console.log(err))
  };

  static membershow = (id) => {
    return fetch(`${url}/membershow/${id}`)
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

  static delete = (id) => {
    return fetch(`${url}/${id}`, {
      method: "DELETE"
    })
    .then(response => response.json())
  };

};

export default ClubQuery;
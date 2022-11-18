const url = "http://localhost:4000/books"

class BookQuery {
  static all = () => {
    return fetch(`${url}`)
    .then(response => response.json())
    .then(jsonData => jsonData.books)
    .catch(err => console.log(err))
  };

  static show = (id) => {
    return fetch(`${url}/${id}`)
    .then(response => response.json())
    .then(jsonData => jsonData.book)
    .catch(err => console.log(err))
  };

  static searchtitle = (bookData) => {
    return fetch(`${url}/searchtitle/?title=${bookData}`)
    .then(response => response.json())
    .then(jsonData => jsonData.book)
    .catch(err => console.log(err))
  };

  static searchauthor = (bookData) => {
    return fetch(`${url}/searchauthor/?author=${bookData}`)
    .then(response => response.json())
    .then(jsonData => jsonData.book)
    .catch(err => console.log(err))
  };

  static create = (bookData) => {
    return fetch (`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookData)
    })
    .then(response => response.json())
  };

  static update = (id, bookData) => {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bookData)
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

export default BookQuery;
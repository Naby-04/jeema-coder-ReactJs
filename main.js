const { useState, useEffect } = React;

function App() {
  // Charger les utilisateurs depuis le localStorage
  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("users")) || [];
    } catch (e) {
      return [];
    }
  });

  const [user, setUser] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
  });
  const [boutton, setBoutton] = useState("Ajouter");
  const [currentIndex, setCurrentIndex] = useState(null);

  // Sauvegarde automatique dans localStorage quand users change
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Gestion du changement des inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Ajouter un utilisateur
  const handleSubmit = (event) => {
    event.preventDefault();
    if (user.prenom && user.nom && user.email && user.telephone) {
      setUsers([...users, user]);
      resetForm();
    }
  };

  // Modifier un utilisateur existant
  const handleEdit = (event) => {
    event.preventDefault();
    const updatedUsers = [...users];
    updatedUsers[currentIndex] = user;
    setUsers(updatedUsers);
    resetForm();
  };

  // Appeler un utilisateur pour modification
  const handleCallEdit = (index) => {
    setUser(users[index]);
    setCurrentIndex(index);
    setBoutton("Enregistrer");
  };

  // Supprimer un utilisateur
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    resetForm();
  };

  // Réinitialisation du formulaire
  const resetForm = () => {
    setUser({ prenom: "", nom: "", email: "", telephone: "" });
    setBoutton("Ajouter");
    setCurrentIndex(null);
  };

  return (
    <div className="container py-5 px-3 w-100">
      <h1 className="mb-5 text-center">GESTION UTILISATEURS</h1>
      <form
        className="row p-0"
        onSubmit={currentIndex === null ? handleSubmit : handleEdit}
      >
        <div className="form-floating mb-3 col-12 col-md-6">
          <input
            type="text"
            className="form-control"
            name="prenom"
            placeholder="Prenom"
            value={user.prenom}
            onChange={handleChange}
            required
          />
          <label className="ms-3 w-50">Prénoms</label>
        </div>
        <div className="form-floating mb-3 col-12 col-md-6">
          <input
            type="text"
            className="form-control"
            name="nom"
            placeholder="Nom"
            value={user.nom}
            onChange={handleChange}
            required
          />
          <label className="ms-3 w-50">Nom</label>
        </div>
        <div className="form-floating mb-3 col-12 col-md-6">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="name@example.com"
            value={user.email}
            onChange={handleChange}
            required
          />
          <label className="ms-3 w-50">Email</label>
        </div>
        <div className="form-floating mb-3 col-12 col-md-6">
          <input
            type="number"
            className="form-control"
            name="telephone"
            placeholder="#"
            value={user.telephone}
            onChange={handleChange}
            required
          />
          <label className="ms-3 w-50">Téléphone</label>
        </div>
        <div>
          <button type="submit" id="addbtn" className="w-100">
            {boutton}
          </button>
        </div>
      </form>
      <hr className="my-5" />
      <h2>UTILISATEURS</h2>
      <div className="user-part">
        <table className="affichage_tableau mt-3">
          <thead>
            <tr>
              <th>Prenom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Telephone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="table-body">
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.prenom}</td>
                <td>{user.nom}</td>
                <td>{user.email}</td>
                <td>{user.telephone}</td>
                <td>
                  <button
                    className="btn btn-warning me-md-2 mb-sm-2 mb-md-0"
                    onClick={() => handleCallEdit(index)}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(index)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Affichage du composant dans un élément HTML avec l'id "root"
ReactDOM.render(<App />, document.getElementById("root"));

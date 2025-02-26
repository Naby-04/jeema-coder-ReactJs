const { useState } = React;

class App extends React.Component {
  constructor(props) {
    super(props);
    let storedUsers;
    try {
      storedUsers = JSON.parse(localStorage.getItem("users"));
    } catch (e) {
      storedUsers = []; // En cas d'erreur, on met un tableau vide
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCallEdit = this.handleCallEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      user: { prenom: "", nom: "", email: "", telephone: "" }, // Pour stocker les données de chaque utilisateur
      users: storedUsers || [], // pour stocker la liste des utilisaeurs dans le local storage
      boutton: "Ajouter",
      currentIndex: null,
      submitType: this.handleSubmit,
    };
  }

  handleChange(event) {
    const { name, value } = event.target; // Récupérer le champ et sa valeur

    this.setState((prevState) => ({
      user: {
        ...prevState.user, // Garde les autres valeurs intactes
        [name]: value, // Met à jour uniquement le champ modifié
      },
    }));
  }
  handleSubmit(event) {
    event.preventDefault();

    if (
      this.state.user.prenom !== "" &&
      this.state.user.nom !== "" &&
      this.state.user.email !== "" &&
      this.state.user.telephone !== ""
    ) {
      this.setState(
        (prevState) => ({
          users: [...prevState.users, prevState.user],
          user: { prenom: "", nom: "", email: "", telephone: "" }, // Réinitialiser l'input
        }),
        () => {
          // Mettre à jour le localStorage APRÈS la mise à jour du state
          localStorage.setItem("users", JSON.stringify(this.state.users));
        }
      );
    }
  }

  handleDelete = (index) => {
    // pour supprimer l'element nous allons creer une nouvelles liste des utilisateurs sans y integrer l'element à supprimer avec la methode filtrer
    const tableauFiltre = this.state.users.filter(
      (user, userIndex) => userIndex !== index
    );
    // et maintenant nous allos mettre a jour le local storage
    // rappel : pour mettre a jour un state on utilise setState()
    this.setState(
      {
        users: tableauFiltre,
        user: { prenom: "", nom: "", email: "", telephone: "" },
        submitType: this.handleSubmit,
        boutton: "Ajouter",
      },
      () => {
        localStorage.setItem("users", JSON.stringify(tableauFiltre));
      }
    );
    console.log("Boutton de suppression cliqué !");
  };
  handleCallEdit = (index) => {
    this.setState({ boutton: "Enregistrer" });
    // passons à l'appel de notre element dans le input
    const userElement = this.state.users[index];
    this.setState({ user: userElement });
    this.setState({ currentIndex: index });
    this.setState({ submitType: this.handleEdit });

    //-------------
    console.log(userElement);
    console.log(index);

    console.log("Boutton modification cliqué !");
  };
  handleEdit = (event) => {
    event.preventDefault(); // Empêche le rechargement de la page
    const updatetableau = [...this.state.users];
    console.log(
      "l'element à l'index " + this.state.currentIndex + " a été selectionné"
    );

    // Remplacer l'élément à l'index spécifié
    updatetableau[this.state.currentIndex] = this.state.user;

    this.setState({
      users: updatetableau,
      user: { prenom: "", nom: "", email: "", telephone: "" },
      currentIndex: null,
      submitType: this.handleSubmit,
      boutton: "Ajouter",
    });
    // Mettre à jour l'état avec le nouveau tableau
    localStorage.setItem("users", JSON.stringify(updatetableau));
    // ----------------

    console.table(this.state.users);
  };

  render() {
    return (
      <>
        <div className="container py-5 px-3 w-100">
          <h1 className="mb-5 text-center">GESTION UTILISATEURS</h1>
          <form className="row p-0">
            <div className="form-floating mb-3 col-12 col-md-6">
              <input
                type="text"
                className="form-control"
                id="user-FirstName"
                placeholder="Prenom"
                name="prenom"
                value={this.state.user.prenom}
                onChange={this.handleChange}
                required
              />
              <label htmlFor="user-FirstName" className="ms-3 w-50">
                Prénoms
              </label>
            </div>
            <div className="form-floating mb-3 col-12 col-md-6">
              <input
                type="text"
                className="form-control"
                id="user-Name"
                placeholder="Nom"
                name="nom"
                required
                value={this.state.user.nom}
                onChange={this.handleChange}
              />
              <label htmlFor="user-Name" className="ms-3 w-50">
                Nom
              </label>
            </div>
            <div className="form-floating mb-3 col-12 col-md-6">
              <input
                type="email"
                className="form-control"
                id="user-Email"
                placeholder="name@example.com"
                name="email"
                required
                value={this.state.user.email}
                onChange={this.handleChange}
              />
              <label htmlFor="user-Email" className="ms-3 w-50">
                Email
              </label>
            </div>
            <div className="form-floating mb-3 col-12 col-md-6">
              <input
                type="number"
                className="form-control"
                id="num-telephone"
                placeholder="#"
                name="telephone"
                required
                value={this.state.user.telephone}
                onChange={this.handleChange}
              />
              <label htmlFor="num-telephone" className="ms-3 w-50">
                Téléphone
              </label>
            </div>
            <div>
              <button
                type="submit"
                id="addbtn"
                className="w-100"
                onClick={this.state.submitType}
              >
                {this.state.boutton}
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
                {this.state.users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.prenom}</td>
                    <td>{user.nom}</td>
                    <td>{user.email}</td>
                    <td>{user.telephone}</td>
                    <td>
                      <button
                        className="btn btn-warning me-md-2 mb-sm-2 mb-md-0"
                        onClick={() => this.handleCallEdit(index)}
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.handleDelete(index)}
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
      </>
    );
  }
}

// Affichage du composant dans un élément HTML avec l'id "root"
ReactDOM.render(<App />, document.getElementById("root"));

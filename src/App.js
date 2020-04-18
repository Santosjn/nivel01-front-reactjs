import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./App.css";
// import backgroundIMage from "./assets/main-background.jpg";

import Header from "./components/Header";

/* 
Importantes conceitos do ReactJs:
- Componentes
- Propriedades
- Estado & Imutabilidade
*/

function App() {
  const [projects, setProjects] = useState([]);
  /**
   * useState retorna um array com duas posicoes.
   *
   * 1 - Variavel com seu valor inicial
   * 2 - Funcao para atualizarmos este valor
   *
   */

  useEffect(() => {
    api.get("/projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    // setProjects([...projects, `Novo projeto ${Date.now()}`]);

    const response = await api.post("projects", {
      title: `Novo projeto ${Date.now()}`,
      owner: "some owner",
    });

    const project = response.data;
    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Home" />

      {/* <img width={2400} src={backgroundIMage} alt="A motorcycle image" /> */}

      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>
        Adicionar Projeto
      </button>
    </>
  );
}

export default App;

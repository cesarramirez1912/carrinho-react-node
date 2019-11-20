//SELECT * FROM TB
export async function mostrarTodos(rota) {
  var resposta = await fetch(`http://localhost:8081/${rota}`);
  return await resposta.json();
}

//DELETE FROM TB
export async function removerPorId(id, rota) {
  var respostaExcluido = await fetch(`http://localhost:8081/${rota}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({id})
  });
  return await respostaExcluido;
}

//INSERT IN TO
export async function inserirNovo(objeto, rota) {
  var respostaInserido = await fetch(`http://localhost:8081/${rota}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(objeto)
  });
  return await respostaInserido;
}

//UPDATE SET WHERE ID
export async function editarObjeto(objeto,rota){
  var respostaEditar = await fetch(`http://localhost:8081/${rota}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objeto)
    });
    return await respostaEditar;
}

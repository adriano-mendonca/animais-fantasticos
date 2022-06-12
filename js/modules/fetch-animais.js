import AnimaNumeros from './anima-numeros.js';

export default function fetchAnimais(url, target) {
  const numerosGrid = document.querySelector(target);
  //Cria a div contendo as informações com o total de animais
  function createAnimal(animal) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  //Preenche cada animal no DOM
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros('[data-numero]','.numeros', 'ativo');
    animaNumeros.init();
  }

  async function criarAnimais() {
    try {
      //Fetch e espera resposta e tranforma em json
      const animaisResponse = await fetch(url);
      const animaisJSON = await animaisResponse.json();
      //Após a transformação em json, ativa as funções para preencher e animar
      animaisJSON.forEach(animal => preencherAnimais(animal));
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }

  return criarAnimais();
}

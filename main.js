// Select the html elements
const sprint3SelectorsContainer = document.querySelector('.sprint-3__selectors');
const sprint3Submit = document.querySelector('.sprint-3__submit');
const sprint3Result = document.querySelector('.sprint-3__result h2');


// Function which generate a select menu
const createSelectMenu = ({className, name, id, optionsArray}) => {
  const selectMenu = document.createElement('select');
  selectMenu.setAttribute('class', className);
  selectMenu.setAttribute('name', name);
  selectMenu.setAttribute('id', id);
  optionsArray.forEach(d => {
    selectMenu.innerHTML += `<option value=${d["Nombre"].replaceAll(' ', '_')}>${d["Nombre"]}</option>`
  })
  return selectMenu
}

const sprint2Init = async () => {
  let value1 = '';
  let value2 = '';

  const raw = await fetch("http://127.0.0.1:5000/nodes");
  const data = await raw.json();
  
  const select1 = createSelectMenu({
    className: "nodes-selector",
    name: "select-1",
    id: "select-1",
    optionsArray: await data
  });
  const select2 = createSelectMenu({
    className: "nodes-selector",
    name: "select-2",
    id: "select-2",
    optionsArray: await data
  })
  sprint3SelectorsContainer.appendChild(select1);
  sprint3SelectorsContainer.appendChild(select2);
  sprint3Submit.addEventListener('click', async() => {
    const cleanValue1 = select1.value.replaceAll('_', ' ');
    const cleanValue2 = select2.value.replaceAll('_', ' ');
    const raw = await fetch(`http://127.0.0.1:5000/sprint-2?nodeA=${cleanValue1}&nodeB=${cleanValue2}`);
    const data = await raw.json();
    sprint3Result.innerText = `${data.similarity.toFixed(2)}%`
  })
  
}


sprint2Init();
  
// fetch("http://127.0.0.1:5000/home")
//   .then(raw => {
//     return raw.json()
//   })
//   .then(data => {
//     console.log(data)
//     data.forEach(d => {
//       neighborsListElem.innerHTML += `<li>${d.name} ---> ${d.similarity}</li>`
//     })
//   })
  
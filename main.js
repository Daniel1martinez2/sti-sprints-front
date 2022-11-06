// Select the html elements
const sprint2SelectorsContainer = document.querySelector('.sprint-2__selectors');
const sprint2Submit = document.querySelector('.sprint-2__submit');
const sprint2Result = document.querySelector('.sprint-2__result h2');
const sprint3SelectorContainer = document.querySelector('.sprint-3__handlers');
const sprint3Submit = document.querySelector('.sprint-3 button');
const sprint3Input = document.querySelector('.sprint-3 input');
const sprint3List = document.querySelector('.sprint-3 ol');

// Global data variables
let dataNodes = []

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

// Get all the nodes from the API's Dummy database -> CSV
const initData = async () => {
  const raw = await fetch("http://127.0.0.1:5000/nodes");
  dataNodes = await raw.json();
}

const sprint2Init = async () => {
  const select1 = createSelectMenu({
    className: "nodes-selector",
    name: "select-1",
    id: "select-1",
    optionsArray: dataNodes
  });
  const select2 = createSelectMenu({
    className: "nodes-selector",
    name: "select-2",
    id: "select-2",
    optionsArray: dataNodes
  })
  sprint2SelectorsContainer.appendChild(select1);
  sprint2SelectorsContainer.appendChild(select2);
  sprint2Submit.addEventListener('click', async() => {
    const cleanValue1 = select1.value.replaceAll('_', ' ');
    const cleanValue2 = select2.value.replaceAll('_', ' ');
    const raw = await fetch(`http://127.0.0.1:5000/sprint-2?nodeA=${cleanValue1}&nodeB=${cleanValue2}`);
    const data = await raw.json();
    sprint2Result.innerText = `${data.similarity.toFixed(2)}%`
  })
  
}

const sprint3Init = async () => {
  const select = createSelectMenu({
    className: "nodes-selector",
    name: "select-1",
    id: "select-1",
    optionsArray: dataNodes
  });
  sprint3SelectorContainer.appendChild(select);
  sprint3Submit.addEventListener('click', async () => {
    sprint3List.innerHTML = '';
    const cleanValue = select.value.replaceAll('_', ' ');
    const raw = await fetch(`http://127.0.0.1:5000/sprint-3?node=${cleanValue}&size=${sprint3Input.value}`);
    const data = await raw.json();
    console.log(data)
    data.forEach(d => {
      sprint3List.innerHTML += `<li>${d.name} ---> <b>${d.similarity.toFixed(3)}</b></li>`
    })
  })
  
}


initData()
  .then(_ => {
    sprint2Init();
    sprint3Init();
  })
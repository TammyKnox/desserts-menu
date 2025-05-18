import { useState } from 'react'
import './App.css'

const desserts_menu = [

  {
    priority: 1,
    cost: 10,
    type: 'Ice Cream',
    flavor: 'Neopolitan',
    baked: false
  },
  {
    priority: 2,
    cost: 25,
    type: 'Frozen Mochi',
    flavor: 'Matcha',
    baked: false
  },
  {
    priority: 3,
    cost: 15,
    type: 'Cheesecake',
    flavor: 'Oreo',
    baked: true
  },
  {
    priority: 4,
    cost: 25,
    type: 'Macarons',
    flavor: 'Strawberry',
    baked: false
  }

];

function App() {
  const [desserts, setMenu] = useState(desserts_menu)

  const flipBakedById = function(desserts_menu, dessertPriority) {
    //return a copy of the dessert menu, with the baked attribute of that with dessertPriority flippped

    const new_menu = desserts_menu.map(item => item.priority !== dessertPriority ? item : { ...item, baked: ! item.baked });
    return new_menu;
  }

  const handleDelete = function(evt, dessertPriority) {
    evt.preventDefault(); //prevents the browser from following the link

    console.log('Need to delete item #' + dessertPriority)
    setMenu(current_menu => current_menu.filter(item => item.priority !== dessertPriority))

  }

  const dessertStatus = function (evt, dessertPriority){
    console.log(`Chef updated the menu with ${dessertPriority}`)

    setMenu(current_menu => flipBakedById(current_menu, dessertPriority));
  }
  
  return (
    <>
    <div className='intro'>
      <h1>Simple Bakery</h1>
      <p>Imagine you're the head chef at an up and coming bakery and cafe. You need to confirm with the assitant chef what's been <em>baked, i.e. done</em>.</p>
    </div>

      <div className="container">
        <span><i class="fa-solid fa-ice-cream"></i></span>
        <h3>Today's Menu</h3>
        <ul>
        {
          desserts.map(dessert => <li key={`id${dessert.priority}`}>
            <Dessert dessertStatus={dessertStatus}
            handleDelete={handleDelete} dessert={dessert}></Dessert></li>)
        }
      </ul>
      </div>
      
      <MenuItems desserts={desserts}></MenuItems>


    </>
  )
}

function MenuItems({desserts}){
  
  let total = 0;
    for (let i = 0; i < desserts.length; i++) {
      total += desserts[i].cost;
  }


  return(
    <>
      <div className="menu-summary">
        <p>Summary: There are currently {desserts.length} desserts still on today's menu ${total} in total.</p>
      </div>
    </>
  )
}

function Dessert(props){
  const {dessert, dessertStatus, handleDelete} = props;


  return(
    <>
    <div className="inputs"><input type='checkbox' defaultChecked={dessert.baked}onChange={evt => dessertStatus(evt, dessert.priority)}></input> <label className={ dessert.baked ? 'baked' : 'pending'}>${dessert.cost} {dessert.flavor} {dessert.type}</label>
    <a className="remove" href='void.html' onClick={(evt => handleDelete(evt, dessert.priority))}>Delete?</a>
    </div>
    

    </>
  )
}

export default App

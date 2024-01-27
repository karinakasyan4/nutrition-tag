
import { useEffect, useState } from 'react';
import { Nutrition } from './Nutrition';
import { LoaderPage } from './LoaderPage';
import { useMediaQuery } from 'react-responsive';
import './App.css';


function App() {

  const Media = () => {
    const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
    const isBigScreen = useMediaQuery({ minWidth: 1824 })
    const isTabletOrMobile = useMediaQuery({ maxWidth: 932 })
    const isPortrait = useMediaQuery({ orientation: 'portrait' })
    const isRetina = useMediaQuery({ minResolution: '2dppx' })
  }


const [stateLoader, setStateLoader] = useState(false);
const [myNutrition, setMyNutrition] = useState();
const [mySearch, setMySearch] = useState();
const [wordSubmit, setWordSubmit] = useState('');


const MY_ID = 'd43e5584';
const MY_KEY = '0c87a179ab30eb46ca8a27427bdc0c4d';
const MY_URL ='https://api.edamam.com/api/nutrition-details';

const fetchData = async (ingr) => {
  setStateLoader(true);

  const response = await fetch(`${MY_URL}?app_id=${MY_ID}&app_key=${MY_KEY}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingr: ingr})
  })

  if(response.ok) {
    setStateLoader(false);
    const data = await response.json();
    console.log(data);
    setMyNutrition(data);
  }
  else {
    setStateLoader(false);
    alert("Error, please enter another ingredients.");
  }
}

const myRecipeSearch = e =>{
  setMySearch(e.target.value);
}

const finalSearch = e => {
  e.preventDefault();
  setWordSubmit(mySearch);
}

useEffect(()=>{
  if (wordSubmit !=='') {
    let ingr = wordSubmit.split(/[,,;,\n,\r]/);
  fetchData(ingr);
  }
}, [wordSubmit])





  return (
    <div className='cont'>
      {stateLoader && <LoaderPage/>}

      <div className='container'>
        <h1>Nutrition Analysis</h1>
      </div>
      <form onSubmit={finalSearch}
        className='container'> 
        <input className='search'
          placeholder='Search...' 
          onChange={myRecipeSearch}/>
        <button className='btn' type='submit'>Search</button>
      </form>
      <div>
        {/* {
          myNutrition && <p>{myNutrition.calories} kcal</p>
        } */}
        {
        myNutrition && Object.values(myNutrition.totalNutrients).map(
          ({label, quantity, unit }) =>
          <Nutrition
          label={label}
          quantity={quantity}
          unit={unit}/>
        )}
      </div>
    </div>
  );
}


export default App;
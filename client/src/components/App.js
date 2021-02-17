import "../App.css";
import RecipeList from './recipes/RecipeList'
import IngredientList from './ingredients/IngredientList'

function App() {
  return (
        <div className="App">
            <RecipeList/>
            <IngredientList/>
        </div>
  )
}

export default App;

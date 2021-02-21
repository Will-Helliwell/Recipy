<>
{filteredPages.map((recipe) => {
  return (
    <>
      <img src={recipe.image}></img>
      <h2>NAME</h2>
      <p> {recipe.name}</p>
      <h2>INGREDIENTS</h2>
      {recipe.ingredients.map((ing) => {
        return (
          <>
            <li>{ing}</li>
          </>
        );
      })}
      <h2>INSTRUCTIONS</h2>
      {recipe.instructions.map((steps) => {
        return (
           <ul>
            <li>{steps}</li>
          </ul>
        );
      })}
      <h2>Time</h2>
      <p>Cook: {recipe.time.cook}</p>
      <p>Prep: {recipe.time.prep}</p>
    </>

  );
})}
</>


{/* <>
{sendPage.map((recipe) => {
return (
  <>
  <p> {recipe.name}</p>
  </>
  );
})}
</> */}


  <>
        {filteredRecipes.map((recipe) => {
          return (
            <>
              <img src={recipe.image}></img>
              <h2>NAME</h2>
              <p> {recipe.name}</p>
              <h2>INGREDIENTS</h2>
              {recipe.ingredients.map((ing) => {
                return (
                  <>
                    <li>{ing}</li>
                  </>
                );
              })}
              <h2>INSTRUCTIONS</h2>
              {recipe.instructions.map((steps) => {
                return (
                  <ul>
                    <li>{steps}</li>
                  </ul>
                );
              })}
              <h2>Time</h2>
              <p>Cook: {recipe.time.cook}</p>
              <p>Prep: {recipe.time.prep}</p>
            </>
          );
        })}
      </>
      <>
      {pages.map((recipe) => {
      return (
        <>
        <p> {recipe.name}</p>
        </>
        );
      })}
</>

     
<>
{filteredPages.map((result) => {
  return (
    <>
      <img src={result.image}></img>
      <h2>NAME</h2>
      <p> {result.name}</p>
      <h2>INGREDIENTS</h2>
      {result.ingredients.map((ing) => {
        return (
          <>
            <li>{ing}</li>
          </>
        );
      })}
      <h2>INSTRUCTIONS</h2>
      {result.instructions.map((steps) => {
        return (
          <ul>
            <li>{steps}</li>
          </ul>
        );
      })}
      <h2>Time</h2>
      <p>Cook: {result.time.cook}</p>
      <p>Prep: {result.time.prep}</p>
    </>
  );
})}
</>

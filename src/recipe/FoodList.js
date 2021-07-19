import Food from "./Food"

const FoodList = ({ data }) => {
  return (
    <div className="main-container">
      {/* {JSON.stringify(data)} */}
      {data.map((recipe, index) => {
        return <Food key={index} recipe={recipe} />
      })}
    </div>
  )
}

export default FoodList

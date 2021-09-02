import { useState, useEffect } from 'react'
import axiosInstance from '../../api'
import Food from './Food'

const FoodList = () => {
  const [data, setData] = useState([])

  const fetchRecipes = () => {
    axiosInstance.get('recipes/').then((response) => {
      console.log('response', response)
      console.log(response.data)
      setData(response.data)
    })
  }

  useEffect(() => {
    fetchRecipes()
  }, [])
  return (
    <div className='main-container'>
      {data.map((recipe, index) => {
        return <Food key={index} recipe={recipe} />
      })}
    </div>
  )
}

export default FoodList

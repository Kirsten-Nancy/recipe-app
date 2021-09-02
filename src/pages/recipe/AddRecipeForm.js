import React from 'react'
import { useState } from 'react'
import { withRouter } from 'react-router-dom'
import AddInstructionsForm from './components/AddInstructionsForm'
import AddIngredientsForm from './components/AddIngredientsForm'
import toast from 'react-hot-toast'
import axiosInstance from './../../api'

const AddRecipeForm = ({ data, history }) => {
  let initial =
    data === undefined
      ? {
          title: '',
          description: '',
          img: '',
          // prepTime: "",
          // difficulty: "",
          image: '',
          serving_size: 0,
          ingredients: [''],
          instructions: [''],
        }
      : data

  const [recipe, setRecipe] = useState(initial)
  const [preview, setPreview] = useState()

  const handleSubmit = (event) => {
    event.preventDefault()

    // Get the current user to add as a foreign key in db
    axiosInstance.get('user/current/').then((response) => {
      // console.log(response.data)

      if (data === undefined) {
        const formData = new FormData()
        formData.append('author', response.data.id)
        formData.append('title', recipe.title)
        formData.append('description', recipe.description)
        formData.append('image', recipe.image, 'image.png')
        formData.append('serving_size', recipe.serving_size)
        for (let i = 0; i < recipe.ingredients.length; i++) {
          formData.append(`ingredients[${i}]name`, recipe.ingredients[i])
        }
        for (let j = 0; j < recipe.instructions.length; j++) {
          formData.append(`instructions[${j}]name`, recipe.instructions[j])
        }

        axiosInstance.post('recipes/', formData).then((response) => {
          console.log('add recipe', response.data)
        })

        setRecipe(initial)
        history.push('/')
        // TODO , toast and redirect only on success

        toast.success('Recipe successfully added.')
      } else {
        // Edit recipe
        // fetch(`http://127.0.0.1:8000/api/recipes/${data.id}`, {
        //   method: "PUT",
        //   headers: { "Content-Type": "multipart/form-data" },
        //   body: formData,
        // })
        // setRecipe(initial)
        // console.log(recipe)
        // history.push("/")
        // toast.success("Recipe successfully edited.")
      }
    })
  }
  const handleUpload = (event) => {
    setPreview(URL.createObjectURL(event.target.files[0]))
    setRecipe({
      ...recipe,
      image: event.target.files[0],
    })
  }
  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Enter recipe name'
          value={recipe.title}
          onChange={(event) =>
            setRecipe({ ...recipe, title: event.target.value })
          }
        />
        <input
          type='text'
          placeholder='Enter recipe description'
          value={recipe.description}
          onChange={(event) =>
            setRecipe({ ...recipe, description: event.target.value })
          }
        />
        {/* <input
          type="text"
          placeholder="Cook time"
          value={recipe.prepTime}
          onChange={(event) =>
            setRecipe({ ...recipe, prepTime: event.target.value })
          }
        />
        <select
          value={recipe.difficulty}
          onChange={(event) =>
            setRecipe({ ...recipe, difficulty: event.target.value })
          }
        > */}
        {/* <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select> */}
        <input
          type='text'
          placeholder='Serving size'
          value={recipe.serving_size}
          onChange={(event) =>
            setRecipe({ ...recipe, serving_size: event.target.value })
          }
        />
        <AddIngredientsForm recipe={recipe} setRecipe={setRecipe} />
        <AddInstructionsForm recipe={recipe} setRecipe={setRecipe} />
        <label htmlFor='file'>Choose a recipe cover:</label>
        <input
          type='file'
          name='file'
          accept='.jpg, .jpeg, .png'
          onChange={handleUpload}
        />
        <img src={preview} alt='img' />
        <input
          className='create-btn'
          type='submit'
          value={data === undefined ? 'Create Recipe' : 'Edit Recipe'}
        />{' '}
      </form>
    </div>
  )
}
export default withRouter(AddRecipeForm)

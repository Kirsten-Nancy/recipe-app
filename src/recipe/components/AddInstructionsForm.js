import React from "react"
import { AiFillDelete } from "react-icons/ai"
import { IconContext } from "react-icons"

const AddInstructionsForm = ({ recipe, setRecipe }) => {
  // const [instructions, setInstructions] = useState([""])

  const handleChange = (event, index) => {
    // map function doesn't change the original array, returns a new one
    // having made necessary changes in this case modifying the instruction at that particular index, thats currently being changed,
    // the others dont change
    let instructionList = recipe.instructions.map((instruction, idx) => {
      return idx === index ? event.target.value : instruction
    })
    setRecipe({ ...recipe, instructions: instructionList })
  }

  const handleAdd = () => {
    // Adding a new element to the array without mutating the original
    let instructionList = [...recipe.instructions, ""]
    setRecipe({ ...recipe, instructions: instructionList })
    // let instructionList = [...instructions]
    // instructionList.push("")
    // setInstructions(instructionList)
  }

  const handleDelete = (index) => {
    if (recipe.instructions.length > 1) {
      let instructionList = recipe.instructions.filter((instruction, idx) => {
        return idx !== index
      })
      setRecipe({ ...recipe, instructions: instructionList })
    } else {
      alert("You need to have at least one instruction")
    }

    // let instructionList = [...instructions]
    // if (instructionList.length > 1) {
    //   instructionList.splice(index, 1)
    //   setInstructions(instructionList)
    // } else {
    //   alert("Can't delete me")
    // }
  }

  return (
    <div>
      {recipe.instructions.map((instruction, index) => {
        return (
          <div key={index} className="instruction-field">
            <textarea
              rows="3"
              type="textarea"
              placeholder="Enter instruction"
              value={instruction.name}
              onChange={(event) => handleChange(event, index)}
            />
            <IconContext.Provider value={{ className: "delete-icon" }}>
              <AiFillDelete onClick={() => handleDelete(index)} />
            </IconContext.Provider>
          </div>
        )
      })}
      <input
        className="add-btn"
        type="button"
        onClick={handleAdd}
        value="Add instruction"
      />
    </div>
  )
}

export default AddInstructionsForm

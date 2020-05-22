import React, { useState } from "react";
import axios from "axios";
import axiosWithAuth from "../axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  //State for Stretch Goal
  const [newColor, setNewColor] = useState({
    color: '',
    code: {
      hex: ''
    }
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    let activeColor = colors.filter(color => color.id === colorToEdit.id);

    axiosWithAuth().put(`/api/colors/${activeColor[0].id}`, colorToEdit)
                   .then( res => {
                     console.log('Successful PUT request', res)
                    updateColors([...colors, res.data])
                    setEditing(false)
                   })
                   .catch(err => {
                     console.log('Error with PUT request', err)
                   })
  };

  const deleteColor = color => {
    // make a delete request to delete this color

    axiosWithAuth().delete(`/api/colors/${color.id}`)
                   .then( res => {
                     updateColors(colors.filter( e => e.id !== color.id))
                   })
                   .catch(err => {
                     console.log('Error with DELET Request', err)
                   })
  };

  const addColor = e => {
    e.preventDefault();

    axiosWithAuth().post('/api/colors', newColor)
                   .then( res => {
                     axiosWithAuth().get('/api/colors')
                                    .then( res => {
                                      updateColors(res.data)
                                      setNewColor('')
                                    })
                                    .catch( err => {
                                      console.log('Error with Get Request NESTED IN POST addColor', err)
                                    })
                   })
  }

  const handleChange = e => {
    setNewColor({...newColor, [e.target.name]: e.target.value})
  }

  const handleHexChange = e => {
    setNewColor({...newColor, code: {hex: e.target.value}})
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {/* <div className="spacer" /> */}
      {/* stretch - build another form here to add a color */}
      <form className='addForm' onSubmit={addColor}>
          <h3>Add New Color</h3>
          <h5>Color:</h5>
          <input type='text' name='color' onChange={handleChange} />
          <h5>Hex:</h5>
          <input type='text' name='hex' onChange={handleHexChange} />
          <button>Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;

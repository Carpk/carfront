import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Car } from '../types'

function AddCar() {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car> ({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setCar({...car, [event.target.name]: event.target.value});
  }

  return (
    <>
      <button onClick={handleClickOpen}>New Car</button>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Car</DialogTitle>
          <DialogContent>
            <input placeholder="Brand" name="brand"
              value={car.brand} onChange={handleChange}/><br/>
            <input placeholder="Model" name="model"
              value={car.model} onChange={handleChange}/><br/>
            <input placeholder="Color" name="color"
              value={car.color} onChange={handleChange}/><br/>
            <input placeholder="Year" name="year"
              value={car.modelYear} onChange={handleChange}/><br/>
            <input placeholder="Reg.no" name="registrationNumber"
              value={car.registrationNumber} onChange={handleChange}/><br/>
            <input placeholder="Price" name="price"
              value={car.price} onChange={handleChange}/><br/>
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleClose}>Save</button>
          </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCar;
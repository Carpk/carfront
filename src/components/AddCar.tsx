import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CarDialogContent from './CarDialogContent'
import { addCar } from '../api/carapi'
import { Car } from '../types'

function AddCar() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [car, setCar] = useState<Car> ({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0
  })

  const { mutate } = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
    },
    onError: (err) => {
      console.error(err);
    }
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

  const handleSave = () => {
    mutate(car);
    setCar({brand: '', model: '', color: '', registrationNumber: '', modelYear: 0, price: 0});
    handleClose();
  }

  return (
    <>
      <button onClick={handleClickOpen}>New Car</button>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Car</DialogTitle>
          <CarDialogContent car={car} handleChange={handleChange}/>
          <DialogActions>
            <button onClick={handleClose}>Cancel</button>
            <button onClick={handleSave}>Save</button>
          </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCar;
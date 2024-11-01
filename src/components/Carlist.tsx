import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid'
import Snackbar from '@mui/material/Snackbar'
import { getCars, deleteCar } from '../api/carapi'


function Carlist() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars
  });

  const columns: GridColDef[] = [
    {field:'brand', headerName: 'Brand', width: 200},
    {field:'model', headerName: 'Model', width: 200},
    {field:'color', headerName: 'Color', width: 200},
    {field:'registrationNumber', headerName: 'Reg.no', width: 150},
    {field:'modelYear', headerName: 'Model Year', width: 150},
    {field:'price', headerName: 'Price', width: 150},
    {field: 'delete', headerName: '', width: 90, sortable: false, 
      filterable: false, disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <button onClick={() => mutate(params.row._links.car.href)}>
          Delete
        </button>
      )
    }
  ]

  const { mutate } = useMutation(deleteCar, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['cars']});
    },
    onError: (err) => {
      console.log(err);
    }
  })
  
  if (isLoading) {
    return <span>Loading... </span>
  }
  else 
  if (error) {
    return <span>Error when fetching cars...</span>
  }
  else if (isSuccess) {
    return (
      <>
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={row => row._links.self.href}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="car deleted"
        />
      </>
    );
  }
}

export default Carlist;
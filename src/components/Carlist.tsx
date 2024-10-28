import { useQuery } from '@tanstack/react-query'
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { getCars } from '../api/carapi'


function Carlist() {
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
    {field: 'delete', headerName: '', width: 90, sortable: false, filterable: false, disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <button onClick={() => alert(params.row._links.carhref)}>
          Delete
        </button>
      )
    }
  ]
  
  if (isLoading) {
    return <span>Loading...{isLoading}</span>
  }
  else 
  if (error) {
    return <span>Error when fetching cars...</span>
  }
  else if (isSuccess) {
    return (
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={row => row._links.self.href}
      />
    );
  }
}

export default Carlist;
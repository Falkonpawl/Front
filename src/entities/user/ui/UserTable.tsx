import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { Button, Stack } from "@mui/material"
import { useUsers, useDeleteUser } from "../model/hooks"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"

export const UserTable = () => {
  const { data = [], isLoading } = useUsers()
  const queryClient = useQueryClient()
  const { mutateAsync } = useDeleteUser()
  const navigate = useNavigate()

  const handleDelete = async (id: string) => {
    await mutateAsync(id)
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "fullName", headerName: "Полное имя", flex: 2 },
    {
      field: "actions",
      headerName: "Действия",
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate(`/user/${params.row.id}/edit`)}
          >
            Редактировать
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Удалить
          </Button>
        </Stack>
      ),
      flex: 3,
    },
  ]

  return (
    <DataGrid
      rows={data}
      columns={columns}
      loading={isLoading}
      style={{ height: 400 }}
      pageSizeOptions={[5, 10]}
    />
  )
}

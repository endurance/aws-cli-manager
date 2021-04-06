import { Box, IconButton, Tooltip, Typography } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";

class Props {
  tooltip: string = "";
  onClick? = () => {};
}

export const AddNewButton = (props: Props) => {
  return (
    <Box display={'flex'} onClick={props.onClick}>
      <Tooltip title={props.tooltip}>
        <IconButton color="primary" aria-label="add-button">
          <AddCircle fontSize={"large"} />
        </IconButton>
      </Tooltip>
      <Box display={'flex'} alignItems={'center'}>
        <Typography>Create New Credential</Typography>
      </Box>
    </Box>
  )
}

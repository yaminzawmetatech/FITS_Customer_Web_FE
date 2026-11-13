import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------

export default function AppWidgetSummary({
  title,
  total,
  icon,
  color = "primary",
  sx,
  ...other
}) {
  const { categoryName, categoryId } = useParams();
  let navigate = useNavigate();

  const handleClick = () => {
    let path = `/CreditManagement/Application/${categoryName}/${categoryId}?status=${title}&page=1`;
    navigate(path);
  };

  return (
    <Card
      onClick={typeof categoryName === "string" ? handleClick : null}
      component={Stack}
      spacing={3}
      direction="row"
      sx={{
        py: 5,
        borderRadius: 2,
        ...sx,
      }}
      {...other}
    >
      {icon && <Box sx={{ width: 60, height: 54, px: 4, py: 2 }}>{icon}</Box>}

      <Stack spacing={5}>
        <Typography sx={{ py: 2, fontSize: 14 }}>{title}</Typography>
      </Stack>
    </Card>
  );
}

AppWidgetSummary.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  title: PropTypes.string,
};

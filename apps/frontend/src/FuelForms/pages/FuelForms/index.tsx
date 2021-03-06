import dateTimeFormat from "@/utils/dateTimeFormat";
import useFuelForms from "@/FuelForms/hooks/useFuelForms";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { colors } from "@/constants";
import {
  Card,
  CardActions,
  CardContent,
  Pagination,
  Typography,
} from "@mui/material";
import { ChangeEvent } from "react";

export default function FuelForms() {
  const { fuelForms, page, changePage, totalPages } = useFuelForms({
    reverse: true,
  });

  const handleChange = (e: ChangeEvent<unknown>, value: number) => {
    changePage(value);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100%",
      }}
    >
      <Box
        sx={{
          maxHeight: "85%",
        }}
        overflow={"auto"}
      >
        {fuelForms?.map((fuelForm) => {
          return (
            <Card key={fuelForm.id}>
              <CardContent>
                <Typography
                  fontSize={25}
                  fontWeight="bold"
                  variant="h2"
                  component="div"
                >
                  Reporte Nº{fuelForm.id}
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    component="div"
                  >
                    {dateTimeFormat(fuelForm.createdAt)}
                  </Typography>
                </Typography>

                <Typography variant="body1" component="div">
                  <Typography component="p">
                    Recorrió : <span>{fuelForm.kmTraveled} km</span>
                  </Typography>
                  <Typography component="p">
                    Total : S/<span>{fuelForm.fullPayment}</span>
                  </Typography>
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained">
                  <Link
                    css={{ color: colors.white }}
                    to={"/fuel-forms/" + fuelForm.id}
                  >
                    Ver más
                  </Link>
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Box>
      <Stack spacing={2}>
        <Pagination
          count={totalPages}
          color="primary"
          page={page}
          showFirstButton
          showLastButton
          siblingCount={0}
          onChange={handleChange}
        />
      </Stack>
    </Container>
  );
}

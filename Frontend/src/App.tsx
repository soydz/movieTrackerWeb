import { Box, Container, Flex, Grid } from "@radix-ui/themes";
import { Nav } from "./components/Nav";
import { Search } from "./components/Search";
import { NavAutenticacion } from "./components/NavAutenticacion";
import { Footer } from "./components/Footer";
import { ViewMovies } from "./components/ViewMovies";

function App() {
  return (
    <>
      <Box position="fixed" style={{ zIndex: "1000" }}>
        <Nav />
      </Box>

      <Grid >
        <Box mt="2">
          <NavAutenticacion />
        </Box>
        <Flex align="center" justify="center" style={{ marginLeft: "220px" }}>
          <Box>
            <Flex align="center">
              <Box>
                <Search />
                <Container>
                  <ViewMovies />
                </Container>
                <Footer />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Grid>
    </>
  );
}

export default App;
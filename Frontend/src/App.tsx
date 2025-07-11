import { Box, Flex, Theme } from "@radix-ui/themes";
import { Nav } from "./components/Nav";
import { NavAutenticacion } from "./components/NavAutenticacion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { AccederPage } from "./pages/AccederPage";
import { RegistrarsePage } from "./pages/RegistrarsePage";
import { PeliculasVistasPage } from "./pages/PeliculasVistasPage";
import { MiPerfilPage } from "./pages/MiPerfilPage";
import { BuscarPeliculasPage } from "./pages/BuscarPeliculasPage";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";
import getMoviesUser from "./services/getMoviesUser";
import type { User } from "./interfaces/user";

import "@radix-ui/themes/styles.css";
import type { SeeMovie } from "./interfaces/movie";
import { Alert } from "./components/Alert";

function App() {
  const [user, setUser] = useState<User | null>(null);

  const [seeMovies, setSeeMovies] = useState<Array<SeeMovie>>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [stateAlert, setStateAlert] = useState({
    status: false,
    title: "",
    description: ""
  })

  const fechtMoviesUser = async (storageUser: string) => {
    const storageUserObj = JSON.parse(storageUser)

    if (storageUserObj.username && seeMovies.length < 1) {
      try {
        const response = await getMoviesUser(storageUserObj.username, storageUserObj.jwt);
        const { status } = await response;

        if (status == 403 || status == 400) return null

        const data = await response.json();

        setSeeMovies(data.userMovieDTOList)

      } catch (error: unknown) {
        if (error instanceof Error) {
          setStateAlert({
            status: true,
            title: "Error de servidor",
            description: `${error.message} Inténtelo más tarde`
          })
        }

      }
    }
  }

  useEffect(() => {
    const storageUser = window.localStorage.getItem("userData")

    if (storageUser) {
      const dataUser = JSON.parse(storageUser)
      setUser({
        id: dataUser.id,
        username: dataUser.username,
      })

      fechtMoviesUser(storageUser)
    }

  }, [])

  return (
    <Theme
      appearance={isDarkMode ? "dark" : "light"}
      accentColor="iris">
      <BrowserRouter>
        <Flex>
          <Box position="fixed" width="220px" style={{ zIndex: "1000" }}>
            <Nav user={user} />
          </Box>
          <Box flexGrow="1" ml="220px">
            <Box pt="2" width="100%">
              <NavAutenticacion
                user={user}
                setUser={setUser}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode} />
            </Box>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/auth/acceder" element={
                <AccederPage setUser={setUser} />
              }></Route>
              <Route path="/auth/registro" element={
                <RegistrarsePage setUser={setUser} />
              }></Route>
              <Route path="/buscar" element={<BuscarPeliculasPage user={user} seeMovies={seeMovies} setSeeMovies={setSeeMovies} />}></Route>
              {
                user &&
                <>
                  <Route path="/user/:id" element={<MiPerfilPage user={user} seeMovies={seeMovies} />}></Route>
                  <Route path="/user/:id/vistas" element={<PeliculasVistasPage user={user} seeMovies={seeMovies} setSeeMovies={setSeeMovies} />}></Route>
                </>
              }
            </Routes>

            {
              <Alert status={stateAlert.status} title={stateAlert.title} description={stateAlert.description} setStateAlert={setStateAlert} />
            }

            <Footer />
          </Box>
        </Flex>
      </BrowserRouter>
    </Theme>
  );
}

export default App;

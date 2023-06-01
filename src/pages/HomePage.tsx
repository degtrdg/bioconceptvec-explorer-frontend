import React from "react";
import EquationCreator from "../components/EquationCreator";
import { Grid, GridItem } from "@chakra-ui/react";
import { ControlPanel } from "../components/ControlPanel";
import { ConceptSearchBar } from "../components/ConceptSearchBar";

const HomePage: React.FC = () => {
  return (
    <Grid
      templateAreas={`"controlpanel controlpanel controlpanel"
                  "searchbar main results"
                  "searchbar footer footer"`}
      gridTemplateRows={'2fr 8fr 0.5fr'}
      gridTemplateColumns={'1fr 5fr 2fr'}
      h='100vh'
      pt="10vh"
      gap='1'
      color='blackAlpha.700'
      fontWeight='bold'
    >
      <GridItem p={3} bg='orange.300' area={'controlpanel'}>
        <ControlPanel />
      </GridItem>
      <GridItem p={3} bg='pink.300' area={'searchbar'}>
        <ConceptSearchBar />
      </GridItem>
      <GridItem p={3} bg='green.300' area={'main'}>
        Equation
        <EquationCreator />
      </GridItem>
      <GridItem p={3} bg='gray.300' area={'results'}>
        Results
      </GridItem>
      <GridItem p={3} bg='blue.300' area={'footer'}>
        Footer
      </GridItem>
    </Grid>
  );
};

export default HomePage;

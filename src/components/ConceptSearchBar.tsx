import { Flex, FormControl, FormHelperText, FormLabel, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { Item } from "@choc-ui/chakra-autocomplete";

import concepts from "../concepts";

export const ConceptSearchBar = () => {
    const addConceptToEq = (params: { item: Item, selectMethod: "mouse" | "keyboard" | null, isNewInput?: boolean }) => {
        console.log(params.item.value)
    }

    const [searchbarBlurred, setSearchbarBlurred] = React.useState(false);

    const textColor = useColorModeValue("inherit", "whiteAlpha.900");

    return (
        <Flex justify="center" w="full">
            <FormControl w="60">
                <FormLabel>Search Concepts</FormLabel>
                <AutoComplete defaultIsOpen openOnFocus onSelectOption={addConceptToEq} suggestWhenEmpty closeOnBlur={false} onBlur={() => { setSearchbarBlurred(true) }} onFocus={() => { setSearchbarBlurred(false) }} disableFilter={searchbarBlurred} maxSuggestions={100} restoreOnBlurIfEmpty={false}>
                    <AutoCompleteInput variant="filled" />
                    <AutoCompleteList color={textColor} bgColor={useColorModeValue("white", "gray.800")} fontWeight={"normal"}>
                        {concepts.map((concept, cid) => (
                            <AutoCompleteItem
                                key={`option-${cid}`}
                                value={concept}
                                textTransform="capitalize"
                            >
                                {concept}
                            </AutoCompleteItem>
                        ))}
                    </AutoCompleteList>
                </AutoComplete>
            </FormControl>
        </Flex >
    );
}
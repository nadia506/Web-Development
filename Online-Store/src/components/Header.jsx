import { Link } from "react-router-dom";
import { Box, Text, Badge } from "@chakra-ui/react";
import PropTypes from "prop-types";

function Header(props) {
  const { numItems } = props;
  return (
    <Box my={2} p={4} borderWidth="2px" borderRadius="lg" overflow="hidden">
      <Link to="/hw4-estore-nadia506">Product List</Link> |{" "}
      <Link to="/hw4-estore-nadia506/cart">Cart 🛒</Link>
      {numItems > 0 ? (
        <Text as="sup">
          <Badge colorScheme="red">{numItems}</Badge>
        </Text>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default Header;

Header.propTypes = {
  numItems: PropTypes.number.isRequired,
};

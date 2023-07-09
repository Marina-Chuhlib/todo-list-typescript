import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Home } from "@mui/icons-material";

const Icon = styled(Home)`
  margin-right: 4px;

  color: #5b6e5d;
`;

const Link = styled(NavLink)`
  font-size: 18px;
  display: flex;
  align-items: center;

  &:hover {
    color: #667b68;
    ${Icon} {
      color: #667b68;
    }
  }

  &.active {
    color: #222f2f;
    font-weight: bold;
    justify-content: space-between;

    ${Icon} {
      color: #313932;
    }

    &:hover {
      color: #667b68;
      ${Icon} {
        color: #667b68;
      }
    }
  }
`;

export { Link, Icon };

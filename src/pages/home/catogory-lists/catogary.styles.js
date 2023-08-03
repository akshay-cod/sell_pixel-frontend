import styled from "styled-components";
import { colors } from "../../../configs/theme/color";
import { padding } from "../../../configs/theme/padding";

export const CatogaryWrapper = styled.div`
display:flex;
justify-content:space-between;
background:${colors.primary};
padding:${padding.tertiary};
flex-direction:row;
@media only screen and (max-width: 768px) {
    flex-direction:column;
}
`
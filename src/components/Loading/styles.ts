import styled from "styled-components/native";

export const Container = styled.View`
   background-color: ${props => props.theme.COLORS.GRAY_600};

   flex: 1;
   justify-content: center;
   align-items: center;
`;

export const LoadIndicator = styled.ActivityIndicator.attrs((props) => ({
   color: props.theme.COLORS.GREEN_700,
}))``;
import styled from "styled-components/native";
import { UsersThree } from 'phosphor-react-native';

export const Container = styled.View`
   background-color: ${props => props.theme.COLORS.GRAY_600};
   flex: 1;

   padding: 34px 24px;
`;

export const Content = styled.View`
   flex: 1;
   justify-content: center;
`;

export const Icon = styled(UsersThree).attrs((props) => ({
   size: 56,
   color: props.theme.COLORS.GREEN_700
}))`
   align-self: center;
`;
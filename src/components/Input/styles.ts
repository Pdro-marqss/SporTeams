import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const Container = styled(TextInput)`
   background-color: ${props => props.theme.COLORS.GRAY_700};
   flex: 1;

   min-height: 56px;
   max-height: 56px;

   color: ${props => props.theme.COLORS.WHITE};
   font-size: ${props => props.theme.FONT_SIZE.MD}px;
   font-family: ${props => props.theme.FONT_FAMILY.REGULAR};

   border-radius: 6px;
   padding: 16px;
`;
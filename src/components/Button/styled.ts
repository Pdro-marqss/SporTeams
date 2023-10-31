import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY';;

type ButtonProps = {
   type: ButtonTypeStyleProps;
}

export const Container = styled(TouchableOpacity) <ButtonProps>`
   flex: 1;
   min-height: 56px;
   max-height: 56px;

   background-color: ${props => props.type === 'PRIMARY' ? props.theme.COLORS.GREEN_700 : props.theme.COLORS.RED_DARK};

   border-radius: 6px;

   justify-content: center;
   align-items: center;
`;

//Esse helper css é uma forma de tornar mais curto a sintaxe das props
export const Title = styled.Text`
   ${props => css`
      font-size: ${props.theme.FONT_SIZE.MD}px;
      font-family:${props.theme.FONT_FAMILY.BOLD};
      color: ${props.theme.COLORS.WHITE};
   `};
`;
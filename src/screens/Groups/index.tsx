import { Header } from '@components/Header';
import { Highlight } from '@components/highlight';

import { Container } from './styles'; //Da pra usar Alias aqui da seguinte forma: import * as S from './styles'. E puxar os components do S -> <S.Container></S.Container>

export function Groups() {
   return (
      <Container>
         <Header />
         <Highlight
            title='Turmas'
            subtitle='Jogue com a sua turma'
         />
      </Container>
   );
}
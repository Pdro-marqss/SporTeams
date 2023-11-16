import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';

import { Container, Content, Icon } from './styles';
import { Highlight } from '@components/highlight';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function NewGroup() {
   const [newGroupInputValue, setNewGroupInputValue] = useState('');
   const navigation = useNavigation();

   function handleNew() {
      navigation.navigate('players', { group: newGroupInputValue });
   }

   return (
      <Container>
         <Header showBackButton />

         <Content>
            <Icon />
            <Highlight
               title='Nova Turma'
               subtitle='Crie a turma para adicionar as pessoas'
            />

            <Input
               placeholder='Nome da turma'
               onChangeText={text => setNewGroupInputValue(text)}
            />

            <Button
               title='Criar'
               style={{ marginTop: 20 }}
               onPress={handleNew}
            />
         </Content>
      </Container>
   );
}
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import { Header } from '@components/Header';

import { Container, Content, Icon } from './styles';
import { Highlight } from '@components/highlight';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { groupCreate } from '@storage/group/groupCreate';
import { AppError } from '@utils/AppError';

export function NewGroup() {
   const [newGroupInputValue, setNewGroupInputValue] = useState('');
   const navigation = useNavigation();

   async function handleNew() {
      try {
         if (newGroupInputValue.trim().length === 0) {
            return Alert.alert('Novo grupo', 'Informe o nome da turma.');
         }

         await groupCreate(newGroupInputValue);
         navigation.navigate('players', { group: newGroupInputValue });

      } catch (error) {
         if (error instanceof AppError) {
            Alert.alert('Novo grupo', error.message);
         } else {
            Alert.alert('Novo Grupo', 'Não foi possivel criar um novo grupo.');
            console.log(error);
         }
      }
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
//react
import { useState, useEffect, useRef } from "react";
import { FlatList, Alert, TextInput, Keyboard } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';

//components
import { Header } from "@components/Header";
import { Highlight } from "@components/highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

//errors
import { AppError } from "@utils/AppError";

//storage
import { playerAddByGroup } from "@storage/players/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/players/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/players/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/players/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

//styles
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";


type RouteParams = {
   group: string;
}

export function Players() {
   const [team, setTeam] = useState('Time A');
   const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
   const [newPlayerName, setNewPlayerName] = useState('');

   const navigation = useNavigation();
   const route = useRoute();
   const { group } = route.params as RouteParams;

   const newPlayerNameInputRef = useRef<TextInput>(null);

   async function handleAddPlayer() {
      if (newPlayerName.trim().length === 0) {
         return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adicionar.');
      }

      const newPlayer = {
         name: newPlayerName,
         team: team,
      }

      try {
         await playerAddByGroup(newPlayer, group);

         newPlayerNameInputRef.current?.blur();
         Keyboard.dismiss(); //fecha o teclado

         setNewPlayerName('');
         fetchPlayersByTeam();

      } catch (error) {
         if (error instanceof AppError) {
            Alert.alert('Nova pessoa', error.message);
         } else {
            console.log(error);
            Alert.alert('Nova pessoa', 'Não foi possivel adicionar.')
         }
      }
   }

   async function fetchPlayersByTeam() {
      try {

         const playersByTeam = await playersGetByGroupAndTeam(group, team);

         setPlayers(playersByTeam);

      } catch (error) {

         console.log(error);

         Alert.alert('Pessoas', 'Não foi possivel carregar as pessoas do time selecionado');

      }
   }

   async function handlePlayerRemove(playerName: string) {
      try {

         await playerRemoveByGroup(playerName, group);
         fetchPlayersByTeam();

      } catch (error) {
         console.log(error);
         Alert.alert('Remover pessoa', 'Não foi possivel remover essa pessoa.');
      }
   }

   async function groupRemove() {
      try {
         await groupRemoveByName(group);
         navigation.navigate('groups');

      } catch (error) {
         console.log(error);
         Alert.alert('Remover', 'Não foi possivel remover o grupo');
      }
   }

   async function handleGroupRemove() {
      Alert.alert(
         'Remover',
         'Deseja mesmo remover o grupo ?',
         [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: () => groupRemove() }
         ]
      );
   }

   useEffect(() => {
      fetchPlayersByTeam();
   }, [team])

   return (
      <Container>
         <Header showBackButton />

         <Highlight
            title={group}
            subtitle="adicione a galera e separe os times"
         />
         <Form>
            <Input
               placeholder="Nome da pessoa"
               autoCorrect={false}
               onChangeText={setNewPlayerName}
               value={newPlayerName}
               inputRef={newPlayerNameInputRef}
               onSubmitEditing={handleAddPlayer}
               returnKeyType="done"
            />
            <ButtonIcon
               icon="add"
               onPress={handleAddPlayer}
            />
         </Form>

         <HeaderList>
            <FlatList
               data={['Time A', 'Time B']}
               keyExtractor={item => item}
               renderItem={({ item }) => (
                  <Filter
                     title={item}
                     isActive={item === team}
                     onPress={() => setTeam(item)}
                  />
               )}
               horizontal={true}
            />
            <NumberOfPlayers>
               {players.length}
            </NumberOfPlayers>
         </HeaderList>

         <FlatList
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item }) => (
               <PlayerCard
                  name={item.name}
                  onRemove={() => handlePlayerRemove(item.name)}
               />
            )}
            ListEmptyComponent={() => (
               <ListEmpty
                  message="Ainda não há jogadores nesse time"
               />
            )}
            contentContainerStyle={[
               { paddingBottom: 100 },
               players.length === 0 && { flex: 1 }
            ]}
         />

         <Button
            title="Remover turma"
            type="SECONDARY"
            onPress={handleGroupRemove}
         />


      </Container>
   );
}
import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, ImageBackground } from "react-native";
import Card from "./Card";
import { styles as globalStyles } from '../theme/estilos';
import { auth } from '../../firebase/config'; // ← Agregar importación
import { saveUserScore } from '../../services/scoreService'; // ← Agregar importación

const backgroundImage = require('../imagenes/fondonuves.jpg');

const cards = [
  "🐷",
  "🪝",
  "⚛️",
  "🔑",
  "🥕",
  "🥑",
];

export default function App() {
  const [board, setBoard] = React.useState(() => shuffle([...cards, ...cards]));
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [matchedCards, setMatchedCards] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [gameFinished, setGameFinished] = React.useState(false); // ← Agregar estado faltante

  React.useEffect(() => {
    if (selectedCards.length < 2) return;

    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
    } else {
      const timeoutId = setTimeout(() => setSelectedCards([]), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards]);

  const handleTapCard = (index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
    setSelectedCards([...selectedCards, index]);
    setScore(score + 1);
  };

  const didPlayerWin = () => matchedCards.length === board.length;

  // Guardar puntuación cuando termine el juego
  React.useEffect(() => {
    if (didPlayerWin() && !gameFinished) {
      setGameFinished(true);
      const user = auth.currentUser;
      if (user) {
        saveUserScore(user.uid, user.email || 'Usuario', score);
      }
    }
  }, [matchedCards, gameFinished, score]);

  return (
    <ImageBackground source={backgroundImage} style={globalStyles.background} resizeMode="cover">
      <View style={globalStyles.overlay}>
        <Text style={[globalStyles.title, styles.memoryTitle]}>
          {didPlayerWin() ? "Congratulations 🎉" : "Memory"}
        </Text>
        <Text style={[globalStyles.title, styles.scoreTitle]}>Score: {score}</Text>
        <View style={[globalStyles.board, styles.board]}>
          {board.map((card, index) => {
            const isTurnedOver =
              selectedCards.includes(index) || matchedCards.includes(index);
            return (
              <Card
                key={index}
                isTurnedOver={isTurnedOver}
                onPress={() => handleTapCard(index)}
              >
                {card}
              </Card>
            );
          })}
        </View>
        <StatusBar style="light" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  memoryTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "snow",
    marginVertical: 15,
  },
  scoreTitle: {
    fontSize: 24,
    color: "#FFD700",
    marginBottom: 10,
  },
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
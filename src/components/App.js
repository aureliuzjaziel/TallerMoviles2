import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import Card from "./Card";
import { styles as globalStyles } from '../theme/estilos';
import { supabase } from '../../supabase/config'; 
import { saveUserScore } from '../../services/scoreService'; 

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
  const [gameFinished, setGameFinished] = React.useState(false);
  const [userName, setUserName] = React.useState('Usuario');

  // Get user info when component mounts
  React.useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.email?.split('@')[0] || 'Usuario');
      }
    };
    
    fetchUser();
  }, []);

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

  // guardar score
  React.useEffect(() => {
    if (didPlayerWin() && !gameFinished) {
      setGameFinished(true);
      const saveScore = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await saveUserScore(user.id, userName, score);
        }
      };
      saveScore();
    }
  }, [matchedCards, gameFinished, score, userName]);

  const resetGame = () => {
    setBoard(shuffle([...cards, ...cards]));
    setMatchedCards([]);
    setSelectedCards([]);
    setScore(0);
    setGameFinished(false);
  };

  return (
    <ImageBackground source={backgroundImage} style={globalStyles.background} resizeMode="cover">
      <View style={globalStyles.overlay}>
        <Text style={[globalStyles.title, styles.memoryTitle]}>
          {didPlayerWin() ? "Congratulations 🎉" : "Memory"}
        </Text>
        <Text style={[globalStyles.title, styles.scoreTitle]}>Score: {score}</Text>
        {didPlayerWin() && (
          <Text style={[globalStyles.title, styles.finalScore]}>
            Final Score: {score}
          </Text>
        )}
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
        {didPlayerWin() && (
          <TouchableOpacity 
            style={[globalStyles.button, styles.resetButton]}
            onPress={resetGame}
          >
            <Text style={globalStyles.buttonText}>Play Again</Text>
          </TouchableOpacity>
        )}
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
  finalScore: {
    fontSize: 28,
    color: "#4CAF50",
    marginBottom: 20,
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: "#2196F3",
  },
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
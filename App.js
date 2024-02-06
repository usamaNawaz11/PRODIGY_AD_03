import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setMilliseconds((prevMilliseconds) => {
          let newMilliseconds = prevMilliseconds + 1;
          if (newMilliseconds === 100) {
            setSeconds((prevSeconds) => {
              let newSeconds = prevSeconds + 1;
              if (newSeconds === 60) {
                setMinutes((prevMinutes) => prevMinutes + 1);
                newSeconds = 0;
              }
              return newSeconds;
            });
            newMilliseconds = 0;
          }
          return newMilliseconds;
        });
      }, 10);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning((prevState) => !prevState);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`}</Text>
      <View style={styles.butt_cont} >
      <TouchableOpacity style={styles.button} onPress={handleStartPause}>
        <Text style={styles.buttonText}>{isRunning ? 'Pause' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#dc3545' }]} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  timerText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  butt_cont:{
    width:200,
    height:75,
    borderRadius:100,
    flexDirection:"row",
    justifyContent:"space-between",
    margin:20
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;

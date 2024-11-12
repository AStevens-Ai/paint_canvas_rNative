import React from 'react';
import { SafeAreaView, StyleSheet, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Main from './components/Main';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GestureHandlerRootView style={styles.gesture}>
      <SafeAreaView style={[styles.safeArea, backgroundStyle]}>
        <Main isDarkMode={isDarkMode} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
  safeArea: {
    flex: 1, // Ensure SafeAreaView takes full height
  },
});

export default App;

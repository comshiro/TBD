import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome to AccessNav
        </Text>
        <Text style={styles.subtitle}>
          Your personalized accessibility navigation app
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff',
    marginBottom: 60, // Add space for tab bar
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#4285F4'
  },
  subtitle: {
    textAlign: 'center', 
    paddingHorizontal: 30, 
    fontSize: 16, 
    color: '#555'
  }
});

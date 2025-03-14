import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Personalize your accessibility preferences here</Text>
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
    marginBottom: 10,
    color: '#4285F4',
  },
  subtitle: {
    textAlign: 'center', 
    paddingHorizontal: 30,
    fontSize: 16,
    color: '#555',
  }
});

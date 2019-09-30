import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import Colors from '../../Constants/Colors';

const SnakeHeader = ({foodScore}) => {
  return (
    <View
      style={{
        width: '100%',
        height: '15%',
        marginBottom: 15,
        paddingHorizontal: 15,
      }}>
      <Text style={styles.title}>Snake</Text>
      <View style={styles.scoreContainer}>
        <Image
          source={require('./apple.png')}
          style={{height: 50, width: 50}}
        />
        <Text style={styles.foodScore}>{foodScore}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 42,
    color: Colors.primary_color,
    fontWeight: '800',
    fontFamily: 'Chalkboard SE',
    width: '100%',
    textAlign: 'center',
  },
  scoreContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: Colors.secondary_color + '50',
  },
  foodScore: {
    fontSize: 45,
    fontWeight: '700',
    color: 'black',
    marginLeft: 10,
  },
});

export default SnakeHeader;

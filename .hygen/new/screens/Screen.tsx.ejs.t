---
to: src/models/<%= model %>/screens/<%= screen_name %>/<%= screen_name %>.tsx
---

import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const <%= screen_name %>: FC = () => {
    return (
        <View style={styles.container}>
            <Text>
                <%= screen_name %>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

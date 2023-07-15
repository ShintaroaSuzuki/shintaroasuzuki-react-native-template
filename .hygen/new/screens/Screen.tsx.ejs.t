---
to: src/features/<%= feature %>/screens/<%= screen_name %>/<%= screen_name %>.tsx
---
import { FC } from 'react';
import { Text } from 'react-native';
import { Container } from './styles';

export const <%= screen_name %>: FC = () => {
    return (
        <Container>
            <Text>
                <%= screen_name %>
            </Text>
        </Container>
    );
};

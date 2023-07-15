---
to: <%= dir_name %>/<%= category %>/<%= component_name %>/<%= component_name %>.tsx
---
<% if (category === 'bases') { -%>
import { ComponentProps, FC } from "react";
<% } else { -%>
import { FC } from "react"
import { <%= component_name %>Props } from "./<%= component_name %>.types";
<% } -%>
import * as S from './styles';


export const <%= component_name %>: FC<> = () => {
    return (
        <S.Container>
        </S.Container>
    );
};

---
to: "<%= category !== 'bases' ? `${dir_name}/${category}/${component_name}/${component_name}.types.ts` : null %>"
---
export type <%= component_name %>Props = {
    /**
     * Description of the prop
     */
};

import {globalThisPolyfill} from '@mill-too/shared';
import {Engine, createDesigner} from '@mill-too/core';
import { 
    reactive,
    ToRefs,
    toRefs,
} from 'vue';

export const useDesigner = () => {
    const cacheDesigine: ToRefs<Engine> = globalThisPolyfill['__DESIGNABLE_ENGINE__'];
    if (cacheDesigine) return cacheDesigine;
    const designer = reactive(createDesigner({}))
    const designerRef = toRefs(designer)
    globalThisPolyfill['__DESIGNABLE_ENGINE__'] = designerRef;
    return designerRef;
}



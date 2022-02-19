import { colSize } from 'ant-design-vue/lib/grid/Col';
import {Engine} from './models';
import {IEngineProps} from './types';
import {DEFAULT_DRIVERS, DEFAULT_EFFECTS} from './presets';

export const createDesigner = (props: IEngineProps<Engine>) => {
    const drivers = props.drivers || [];
    const effects = props.effects || [];
    const shortcuts = props.shortcuts || [];


    return new Engine({
        ...props,
        effects: [...effects, ...DEFAULT_EFFECTS],
        drivers: [...drivers, ...DEFAULT_DRIVERS],
        shortcuts: [...shortcuts]
    })
};
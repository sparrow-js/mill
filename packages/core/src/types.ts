import {Shortcut} from './models';

export type  IEngineProps<T = Event>  = IEventProp<T> & {
    shortcuts?: Shortcut[]
}
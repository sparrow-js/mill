import {globalThisPolyfill} from './globalThisPolyfill'
import {Subscribable, ISubscriber} from './subscribable';
import { isArr, isWindow } from './types';


const ATTACHED_SYMBOL = Symbol('ATTACHED_SYMBOL')

export type EventOptions =
  | boolean
  | (AddEventListenerOptions &
      EventListenerOptions & {
        mode?: 'onlyOne' | 'onlyParent' | 'onlyChild'
      })

export type EventDriverContainer = Window | HTMLElement | HTMLDocument

export interface IEventEffect<T> {
  (engine: T):void
}

export interface CustomEventClass {
  new (...args: any[]): any
}

export interface ICustomEvent<EventData = any, EventContext = any> {
    type: string
    data?: EventData
    context?: EventContext
}

export type EventContainer = Window | HTMLElement | HTMLDocument;

export interface IEventDriver {
    container: EventDriverContainer
    contentWindow: Window
    attach(container: EventDriverContainer): void
    detach(container: EventDriverContainer): void
    dispatch<T extends ICustomEvent<any> = any>(event: T): void | boolean
    subscribe<T extends ICustomEvent<any> = any>(subscriber: ISubscriber<T>): void
    addEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
        options?: boolean | EventOptions
    ): void
    addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | EventOptions
      ): void
    addEventListener(type: any, listener: any, options: any): void
    removeEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
        options?: boolean | EventOptions
    ): void
    removeEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | EventOptions
    ): void
    removeEventListener(type: any, listener: any, options?: any): void
    batchAddEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
        options?: boolean | EventOptions
      ): void
      batchAddEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | EventOptions
      ): void
      batchAddEventListener(type: any, listener: any, options?: any): void
      batchRemoveEventListener<K extends keyof HTMLElementEventMap>(
        type: K,
        listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
        options?: boolean | EventOptions
      ): void
      batchRemoveEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | EventOptions
      ): void
      batchRemoveEventListener(type: any, listener: any, options: any): void
}


export interface IEventDriverClass<T> {
    new (engine: T, context?: any): IEventDriver
}


export interface IEventProps<T = Event> {
    drivers?: IEventDriverClass<T>[]
    effects?: IEventEffect<T>[]
}


export class EventDriver<Engine extends Event = Event, Context = any> implements IEventDriver {
  engine: Engine

  container: EventDriverContainer = document

  contentWindow: Window = globalThisPolyfill

  context: Context

  constructor (engine: Engine, context?: Context) {
    this.engine = engine;
    this.context = context;
  }

  dispatch<T extends ICustomEvent<any> = any>(event: T) {
    return this.engine.dispatch(event, this.context);
  }
}


export class Event extends Subscribable<ICustomEvent<any>> {
  private drivers: IEventDriverClass<any>[] = [];
  private containers: EventContainer[] = [];

  constructor (props?: IEventProps) {
    super()
    if (isArr(props?.effects)) {
      props.effects.forEach((plugin) => {
        plugin(this)
      })
    }
    if (isArr(props?.drivers)) {
      this.drivers = props.drivers;
    }
  }

  subscribeTo<T extends CustomEventClass> (
    type: T,
    subscriber: ISubscriber<InstanceType<T>>
  ) {
    return this.subscribe((event) => {
      if (type && event instanceof type) {
        return subscriber(event)
      }
    })
  }


  subscribeWith<T extends ICustomEvent = ICustomEvent>(
    type: string | string[],
    subscriber: ISubscriber<T>
  ){
    return this.subscribe((event) => {
      if (isArr(type)) {
        if (type.includes(event?.type)) {
          return subscriber(event)
        }
      } else {
        if (type && event?.type === type) {
          return subscriber(event)
        }
      }
    })

  }

  attachEvents(
    container: EventContainer,
    contentWindow: Window = globalThisPolyfill,
    context?: any
  ) {
    if (!container) return;
    if (isWindow(container)) {
      return this.attachEvents(container.document, container, context)
    }

    if (container) return;

  }

}
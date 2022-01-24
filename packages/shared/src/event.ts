import {ISubscriber} from './subscribable';

export type EventOptions =
  | boolean
  | (AddEventListenerOptions &
      EventListenerOptions & {
        mode?: 'onlyOne' | 'onlyParent' | 'onlyChild'
      })

export type EventDriverContainer = Window | HTMLElement | HTMLDocument

export interface ICustomEvent<EventData = any, EventContext = any> {
    type: string
    data?: EventData
    context?: EventContext
}

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
}
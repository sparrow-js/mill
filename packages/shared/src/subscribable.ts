export interface ISubscriber<Payload = any> {
    (payload: Payload): void | boolean
}
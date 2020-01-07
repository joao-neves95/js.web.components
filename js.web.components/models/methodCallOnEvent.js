
class MethodCallOnEvent {

  /**
   *
   * @param { string } identifier A unique identifier for this event method call.
   * @param { string } eventName The name of the event (E.g: 'click')
   * @param { string } methodName The name of the method to call.
   * @param { string } eventType The type of the event. Use the EventType enum.accordion
   */
  constructor( identifier, eventName, methodName, eventType = EventType.DOM ) {
    this.identifier = identifier;
    this.eventName = eventName;
    this.methodName = methodName;
    this.eventType = eventType;
  }

}

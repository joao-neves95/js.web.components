
const DATA_SET_PREFIX = 'data-';

class DATA_SET_TAGS {
  static ComponentId() { return 'componentid' }
  static ComponentId_Prefixed() { return DATA_SET_PREFIX + DATA_SET_TAGS.ComponentId() }
  static Component() { return 'component' }
  static Component_Prefixed() { return DATA_SET_PREFIX + DATA_SET_TAGS.Component() }
  static BindingTo() { return 'binding' }
  static BindingTo_Prefixed() { return DATA_SET_PREFIX + DATA_SET_TAGS.BindingTo() }
  static EventMethodCall() { return 'eventmethodcall' }
  static EventMethodCall_Prefixed() { return DATA_SET_PREFIX + DATA_SET_TAGS.EventMethodCall() }
  static EventMethodToCall() { return 'eventmethodname' }
  static EventMethodToCall_Prefixed() { return DATA_SET_PREFIX + DATA_SET_TAGS.EventMethodToCall() }
}

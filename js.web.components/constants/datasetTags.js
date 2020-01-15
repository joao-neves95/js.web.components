
const DATA_SET_PREFIX = 'data-';

const DATA_SET_TAGS = Object.freeze({
  ComponentId: 'componentid',
  ComponentId_Prefixed: DATA_SET_PREFIX + DATA_SET_TAGS.ComponentId,
  Component: 'component',
  Component_Prefixed: DATA_SET_PREFIX + DATA_SET_TAGS.Component,
  BindingTo: 'binding',
  BindingTo_Prefixed: DATA_SET_PREFIX + DATA_SET_TAGS.BindingTo,
  EventMethodCall: 'eventmethodcall',
  EventMethodCall_Prefixed: DATA_SET_PREFIX + DATA_SET_TAGS.EventMethodCall,
  EventMethodToCall: 'eventmethodname',
  EventMethodToCall_Prefixed: DATA_SET_PREFIX + DATA_SET_TAGS.EventMethodToCall
});

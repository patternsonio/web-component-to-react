export default function toReact(asCustomElement, withPortal) {
  return (
    WebComponent,
    { Portal, toEventHandlerName, toAttributeName } = {},
  ) => {
    return asCustomElement(withPortal(WebComponent, { Portal }), {
      toEventHandlerName,
      toAttributeName,
    });
  };
}

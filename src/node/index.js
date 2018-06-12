import asCustomElement from './asCustomElement';
import withPortal from './withPortal';
import toReact from '../common/toReact';

export default toReact(asCustomElement, withPortal);
export { asCustomElement, withPortal };

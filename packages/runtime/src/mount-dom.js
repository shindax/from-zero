import { DOM_TYPES } from "./h";
import { setAtributes } from './attributes'
import { addEventListeners } from './events'

export function mountDOM( vdom, parentEl )
{
    switch( vdom.type ){
        case DOM_TYPES.TEXT: {
            createTextNode( vdom, parentEl )
            break
        }
        case DOM_TYPES.ELEMENT: {
            createElementNode( vdom, parentEl )
            break
        }
        case DOM_TYPES.FRAGMENT: {
            createFragmentNodes( vdom, parentEl )
            break
        }

        default: {
            throw new Error(`Can't mount DOM of type: ${vdom.type}`)
        }
    }
}// export function mountDOM( vdom, parentEl )

function createTextNode( vdom, parentEl )
{
    const { value } = vdom
    const textNode = document.createTextNode(value)
    vdom.el = textNode
    parentEl.append(textNode)
}// function createTextNode( vdom, parentEl )

function createFragmentNodes( vdom, parentEl )
{
    const { children } = vdom
    vdom.el = pareentEl
    children.foreach( ( child ) => mountDOM( child, parentEl ) )
}// function createFragmentNodes( vdom, parentEl )

function createElementNode( vdom, parentEl )
{
 const { tag, props, children } = vdom;
 const element = document.createElement(tag);
 addProps( element, props, vdom );
 vdom.el = element;
 children.forEach((child) => mountDOM( child, element ))
 parentEl.append(element)
}// function createElementNode( vdom, parentEl )

function addProps( el, props, vdom )
{
    const { on: events, ...attrs } = props;
    vdom.listeners = addEventListeners( events, el )
    setAttributes( el, attrs )
}// function addProps( el, props, vdom )
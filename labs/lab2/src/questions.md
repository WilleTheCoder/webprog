
Reflection question 1: ComposeSalad is a class extending react.Component. Is there a differ-ence between class based components and function components, for example function App(){...}that the react template builder created for you?

A functional component doesn’t have its own state. If you need a state in your component you will either need to create a class component or you lift the state up to the parent component and pass it down the functional component via props.

Reflection question 2: The render function must be a proper function of this.props and this.state. What happens if the output of the render function is depending on other data?

By default, when your component’s state or props change, your component will re-render. If your render() method depends on some other data, you can tell React that the component needs re-rendering by calling forceUpdate(). can pass external data as props

Reflection question 3: In the code above, extras are computed every time a component is rendered. The inventory changes very infrequent so this is inefficient. Can you cache foundations so it is only computed when props.inventory changes?
useMemo can be used to cache results between renders

Reflection question 4: What triggers react to call the render function and update the DOM?
states been updated or components initial render

Reflection question 5: When the user change the html form state (DOM), does this change
the state of your component?
yes the state of the component changes when the user changes the form state

Reflection question 6: For a class based component, what is the value of this in the event handling call-back functions?
the instance of the component

Reflection question 7: How is the prototype chain affected when copying an object with
copy = {...sourceObject}?
its changed spread only take the enumerable
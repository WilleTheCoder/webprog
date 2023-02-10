
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



**Reflection question 1: Is there a difference between class components and function components concerning features (use cases where only one of them can be used)?**

- BEFORE: If your components need more functionality, like keeping state, REF use classes instead. 
NOW: - Not really since the introduction of React Hooks.

- Functional components are typically more concise, easier to read, and less prone to bugs compared to class components.

**Reflection question 2: The render function must be a pure function of props and the component state.  What happens if the output of the render function is depending on other data that changes over time?**

- It may cause the page to render the page even though the state or props havent changed. 
- To avoid this, one should handle all other data using react.effects. With effects you can decide 
- how often the side-effects are executed i.e running an effect only on the initial render etc.
  
If the output of the render function depends on data that changes over time, it may cause the component to re-render unnecessarily, even if its state or props haven't changed. This can potentially lead to performance issues.

To avoid this, it's recommended to handle any external data that the render function depends on using React Hooks, such as the useState or useEffect hooks. With effects you can control how often the side-effects are executed and when they are triggered, such as only running an effect once on the initial render or only when certain dependencies change.

By using effects, you can ensure that the render function remains pure and only re-renders when necessary improving performance and making your code more maintainable.

**Reflection question 3: In the code above, the foundations array is computed every time the component is rendered. The inventory changes very infrequent so this is inefficient. Can you cache foundations so it is only computed when props.inventory changes?**
Yes, by using the useMemo function; 

    let foundations = useMemo(() => { //ref3
        return Object.keys(props.inventory).filter(name => props.inventory[name].foundation)
      }, [props.inventory]);

**Reflection question 4: What triggers react to call the render function and update the DOM?**
The render function is triggered whenever the component's state or props change. 

When the state or props change, React compares the virtual DOM with the previous version of the virtual DOM and calculates the minimum number of changes required to update the actual DOM. Then, it updates only those specific parts of the DOM that have changed.

**Reflection question 5: When the user change the html form state (DOM), does this change the state of your component?**

No, the form state in the DOM changes but not the components state. To updated the components state 
you need an eventhandler like onChange that will trigger a rerender of the component and thereby the DOM.

so the state changes of the DOM when a user change the html form, but this will not do anything cuz it will not trigger an rerender. So a eventhandler need to update the state of the component that will trigger a rerender of the DOM

**Reflection question 6: For a class based component, what is the value of this in the event handling call-back functions?**

"this" will access the component instance and can then reach the components private functions like state, props, etc

**Reflection question 7: How is the prototype chain affected when copying an object with copy = {...sourceObject}?**
This will make a shallow copy of the sourceobject, and will still reference the same props as the original obj. Therefore
when changing the value of the original object the copy will also be changed.

const copy = { ...sourceObject };

const sourceObject = {
  name: 'bob',
};

sourceObject.name = 'bobby';

copy name will be "bobby" also

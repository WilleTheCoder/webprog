**Reflection question**

**Reflection question 1: How do you replace the application icon, favicon.ico?**

    by adding this line of code to the index.html file:
    <link rel="icon" type="image/x-icon" href="%PUBLIC_URL%/appicon.ico">


**Reflection Question 2: If you use nav-pills instead of nav-tabs the selected page is no longer highlighted in the menu, why? Hint: <NavLink> and the active css class.**

    There was no difference in using nav-pills instead of nav-tabs, both links get highlighted when clicked?
    If you wanna set the active css class explicitly you have to create a NavLink component from React Router and change the active className prop.

**Reflection Question 3: What is the difference between <Link to="/view-ingredient/:name" and <Link to="view-ingredient/:name". Try it, look in the browser url field.**

    to="/view-ingredient/:name" is treated like an absolute path, and will be added to the root path like so:
    localhost:3000/view-ingredient/:name

    to="view-ingredient/:name" is treated like a relative path, and will be added based on the current url like so:
    localhost:3000/current-path/view-ingredient/:name

**Notes**

- The BrowserRouter component is added to the top of the component tree, and the App component is rendered as its child. This will ensure that all the other React Router components such as Link and Route are correctly contained within the router.

- The useNavigate hook can only be used within a React function component or a custom React Hook.
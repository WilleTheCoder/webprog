**Reflection question**

**Reflection question 1: How do you replace the application icon, favicon.ico?**

    by adding this line of code to the index.html file:
    <link rel="icon" type="image/x-icon" href="%PUBLIC_URL%/appicon.ico">


**Reflection Question 2: If you use nav-pills instead of nav-tabs the selected page is no longer highlighted in the menu, why? Hint: <NavLink> and the active css class.**

    There was no difference in using nav-pills instead of nav-tabs, both links get highlighted when clicked?
    If you wanna set the active css class explicitly you have to create a NavLink component from React Router and change the active className prop.

**Notes**

The BrowserRouter component is added to the top of the component tree, and the App component is rendered as its child. This will ensure that all the other React Router components such as Link and Route are correctly contained within the router.


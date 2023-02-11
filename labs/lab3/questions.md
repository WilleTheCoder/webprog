**Reflection question**

**Reflection question 1: How do you replace the application icon, favicon.ico?**

    by adding this line of code to the index.html file:
    <link rel="icon" type="image/x-icon" href="%PUBLIC_URL%/appicon.ico">



**Notes**

The BrowserRouter component is added to the top of the component tree, and the App component is rendered as its child. This will ensure that all the other React Router components such as Link and Route are correctly contained within the router.


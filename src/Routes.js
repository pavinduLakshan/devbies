import React from "react"
import {BrowserRouter,Route} from "react-router-dom"
import Home from "views/Home"

const Routes = () => {
    return (
        <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route path="/categories/:category" component={Home}/>
        </BrowserRouter>
    )
}

export default Routes
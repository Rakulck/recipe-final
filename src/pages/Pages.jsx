import Home from "./Home"
import {Route,Routes, useLocation} from'react-router-dom'
import Cuisines from "./Cuisines";
import Searched from "./Searched";
import Recipe from "./Recipe";
import{AnimatePresence} from "framer-motion"
import All_Cuisines from "./All_Cuisines";
import Popular from "./Popular";
import Veggie from "./Veggie";
function Pages() {
const location=useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
    <Routes Location={location} key={location.pathname} > 
      <Route path='/' element={<Home />}/>
      <Route path='/cuisine/:type' element={<Cuisines />}/>
      <Route path='/all_cuisines' element={<All_Cuisines />}/>
      <Route path='/searched/:search' element={<Searched />} />
      <Route path='/recipe/:name' element={<Recipe/>}/>
      <Route path='/popular' element={<Popular/>}/>
      <Route path='/veggie' element={<Veggie/>}/>
    </Routes>
    </AnimatePresence>
  )
}

export default Pages
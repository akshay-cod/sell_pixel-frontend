import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom' 
import { allRoutes } from './routes';
import { routeTypes } from './configs/routes/routeConfigs';
import PrivateRoute from './HOC/PrivateRouter';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkUserLoggedIn } from './store/feature/auth';
import Layout from './HOC/Layout';
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css';
import Toastholder from './components/common/toast/Toastholder';
function App() {
  const dispatch = useDispatch();

  const [visible, setLoginVisible] = useState(false)
  useEffect(()=>{
    dispatch(checkUserLoggedIn())
  },[])
  return (
   <Router>
    <Layout visible={visible} setVisible={setLoginVisible}>
    <Routes>
    {
      allRoutes.map((route,index) => {
        return(
        <Fragment key={index}>
          
         {
          route.type === routeTypes.SEMI ? (
            <Route element ={ <route.component setLoginVisible={setLoginVisible}/> } exact path={route.path} key={index}/>
          ) 
          :  route.type === routeTypes.PUBLIC ?
          (
            <Route Component={route.component} exact path={route.path} key={index}/>
          )
          : route.type === routeTypes.PRIVATE ?
          (
            <Route element={ <PrivateRoute component={route.component} />} exact path={route.path} key={index}/>
           
          )
          : ""
         }
        
        </Fragment>)
      })
    }
    </Routes>
    </Layout>  
    <Toastholder/>
   </Router>
  );
}

export default App;

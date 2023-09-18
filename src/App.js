import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom' 
import { allRoutes } from './routes';
import { routeTypes } from './configs/routes/routeConfigs';
import PrivateRoute from './HOC/PrivateRouter';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserLoggedIn, user } from './store/feature/auth';
import Layout from './HOC/Layout';
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css';
import Toastholder from './components/common/toast/Toastholder';
import ScrollToTop from './HOC/ScrollToTop';
import { addNotification } from './notification-worker/notification';



function App() {
  const dispatch = useDispatch();
  const userFromRedux = useSelector(user)

  const [visible, setLoginVisible] = useState(false);
  const [nameModal, setNameModal] = useState(false);
  useEffect(()=>{
   // document.body.style.zoom = '95%';
    dispatch(checkUserLoggedIn())
  },[])

  useEffect(()=>{
    if(userFromRedux.auth == true){
      addNotification()
    }
  },[userFromRedux.auth])



  return (
   <Router>
     <ScrollToTop/>
    <Layout visible={visible} setVisible={setLoginVisible} nameModal={nameModal} setNameModal={setNameModal}>
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
            <Route element={route.component} exact path={route.path} key={index}/>
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

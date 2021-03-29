import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
} from 'react-router-dom';

// pages router component
import Pages, { pages } from './Pages';
// dashboard layout component (고정영역)
import DashBoard from '../layouts/DashBoard';

// exercise components
import Home from '../pages/Home';
import WordRelay from '../pages/WordRelay';

function App() {
  return  (
    <Router>
      <h2>게임 목록</h2>
      <hr />
      <DashBoard pages={pages} />
      <hr />
      <Switch>
        {/* case1: exact path 이용 */}
        <Route exact path="/">
          <Home />
        </Route>
        {/* case2: 직접 페이지 내에서 하위 컴포넌트 생성 */}
        <Route path="/WordRelay">
          <WordRelay />
        </Route>
        {/* case3: url param 이용하여 하위 컴포넌트 생성 */}
        <Route path="/:name" component={Pages}></Route>
      </Switch>
    </Router>
  );
}

export default App;
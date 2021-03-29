import React from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  Link 
} from 'react-router-dom';
import WordRelay from '../pages/WordRelay';
import GameItems, { games } from './GameItems';

const DashBoard = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      {
        games && games.map(item => (
          <li key={item.title}>
            <Link to={item.url}>{item.title}</Link>
          </li>
        ))
      }
    </ul>
  );
};

const Home = () => {
  return (
    <>
      <div>[HOME]</div>
      <div><span>react-router 예제 입니다.</span></div>
    </>
  );
}

function GameList() {
  return  (
    <Router>
      <h2>게임 목록</h2>
      <hr />
      <DashBoard />
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
        <Route path="/:name" component={GameItems}></Route>
      </Switch>
    </Router>
  );
}

export default GameList;
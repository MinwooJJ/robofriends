import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErroeBoundry from "../components/ErrorBoundry";
import "./App.css";
class App extends Component {
  constructor() {
    super();
    // state를 update 할 시 setState를 사용하여 update를 해야 함
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json()) // body에 있는 정보들만 json으로 바꿔주는 것
      .then((users) => this.setState({ robots: users }));
  }

  // 자식 component에 넘겨 줄 event 함수
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    // 자식 component에 attribute로 event 함수를 넘겨줘서 event 등록
    return !robots.length ? (
      <h1 className="f2 tc">Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f2">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErroeBoundry>
            <CardList robots={filteredRobots} />
          </ErroeBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;

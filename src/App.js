import React, { Component } from 'react'
import './App.css'
// import Chinese from 'chinese-s2t'
import {
  Button,
  FormControl,
  Glyphicon,
  Form,
  Col,
  Row,
  Nav,
  NavItem,
  Image
} from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroller'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import MangaInfo from './manga-info' // ./必须写，不然找不到，可能去node_moudle里
import ReadPage from './read-page'
import ReactDOM from 'react-dom'
import Radium from 'radium'
import $ from 'jquery'
import jQuery from 'jquery'

export const STYLES = {
  border: {
    // border: '3px solid aqua'
  },
  searchBar: {
    margin: '1rem',
    // border: '3px solid aqua'
    // padding: '10px'
  },
  input: {
    fontSize: 16,
    height: '3rem'
    // color:'red'
  },
  categoryBar: {
    margin: 'auto',
    height: '5rem',
    // border: '3px solid cyan'
    // top: 20
  },
  navItem: {
    // fontSize: 26,
    // padding: '1rem 2rem',
    fontSize: '1.4rem',
    fontWeight: 500,
    // color: '#ffe484',
    color: 'blue',
    borderColor: '#ffe484'
  },
  mangaItem: {
    border: '3px solid blue',
    borderImage: 'url(../public/border1.jpg)',
    top: '3rem'
  },

  info: { top: 50, border: '3px solid blue' },
  mangaView: {
    position: 'relative',
    top: 0,
    fontColor: 'blue',
    // border: '3px solid darkblue',
    height: 300
  }
}

export const SERVER_SETTING = {
  url: 'http://localhost:5000',
  // image: 'http://localhost:5000/static/image'
  image: ''
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchKey: '',
      redirect: false
    }
  }

  handleInput(e) {
    // this.props.handleInput(e.target.value)
    // 自己重绘自己
    this.setState({ searchKey: e.target.value })
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log('enter')
      this.setState({ redirect: true })
    }
  }

  render() {
    if (this.state.redirect) {
      console.log('redirect')
      return <Redirect push to={'/search/' + this.state.searchKey} />
    }
    return (
      <Router>
        <Form style={STYLES.searchBar}>
          <Row>
            <Col md={3} mdOffset={5}>
              <FormControl
                type="text"
                placeholder="search here"
                value={this.state.searchKey}
                style={STYLES.input}
                onChange={this.handleInput.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              />
            </Col>
            <Col>
              <Link to={'/search/' + this.state.searchKey} target="_self">
                <Button
                  bsStyle="primary"
                  /*bsSize="lg"*/ onClick={this.props.handleSearch}
                  style={{ height: '3rem', width: '8rem', float: 'left' }}>
                  <Glyphicon glyph="search" />
                  <span> 来一发</span>
                </Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Router>
    )
  }
}

class CategoryBar extends React.Component {
  constructor(props) {
    super(props)
    self.categorys = [
      '格斗',
      '魔法',
      '侦探',
      '竞技',
      '恐怖',
      '战国',
      '魔幻',
      '冒险',
      '校园',
      '搞笑',
      '少女',
      '少男',
      '科幻',
      '港产',
      '其他',
      '全部'
    ]
  }

  render() {
    // let view = null
    // if(!this.props.searchKey){
    //   view = <Route path="/category/:id" component={MangaView} />
    // }else{
    //   view = <Route path="/search/:key" component={MangaView} />
    // }
    // 尼玛，那个LinkContainer的to如果是'/fuck'，是按钮样式的。。什么鬼，这还会影响啊
    // console.log("categoryBar render")
    return (
      <Router>
        <div style={STYLES.categoryBar}>
          <Col md={8} mdOffset={2} style={{backgroundColor: 'lightblue'}}>
            <Nav bsStyle="pills" onSelect={this.handleCatChange} justified>
              {self.categorys.map((v, k) => (
                <LinkContainer key={'cat' + k} to={'/category/' + k}>
                  <NavItem eventKey={'cat' + k} style={STYLES.navItem}>
                    {v}
                  </NavItem>
                </LinkContainer>
              ))}
            </Nav>
          </Col>
          <Route exact path="/" component={MangaView} />
          <Route path="/category/:id" component={MangaView} />
          <Route
            path="/search/:key"
            component={MangaView}
            searchKey={this.searchKey}
          />
        </div>
      </Router>
    )
  }

  /*render() {
    return (
      <Router>
        <div style={STYLES.categoryBar}>
          <Col md={4} mdOffset={4}>
            <Nav bsStyle="pills" onSelect={this.handleCatChange}>
              <LinkContainer to="/category/1">
                <NavItem eventKey={1} style={STYLES.navItem}>category1</NavItem>
              </LinkContainer>
              <LinkContainer to="/category/2">
                <NavItem eventKey={2} style={STYLES.navItem}>category2</NavItem>
              </LinkContainer>
              <LinkContainer to="/category/3">
                <NavItem eventKey={3} style={STYLES.navItem}>category3</NavItem>
              </LinkContainer>
              <LinkContainer to="/category/4">
                <NavItem eventKey={4} style={STYLES.navItem}>category4</NavItem>
              </LinkContainer>
              <LinkContainer to="/category/5">
                <NavItem eventKey={5} style={STYLES.navItem}>category5</NavItem>
              </LinkContainer>
            </Nav>
          </Col>

          <Route path="/category/:id" component={MangaView} />
        </div>
      </Router>
    )
  }*/
}

// 本来推荐如果comp里面没有动态的东西的话，应该用箭头格式而不是用类...像router例子里面一样，再说吧
// 应该还是更新MangaView，只不过sql变了
class SearchView extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const key = this.props.match.params.key
  }
}

class MangaItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    // target='_self'必须要。。为啥？
    return (
      <Router>
        <Col md={2} style={{ textAlign: 'center' }}>
          <Link to={`/info/${this.props.data.mid}`} target="_self">
            <div style={{ height: '19rem' }}>
              <Image
                src={this.props.data.cover_image}
                width={'150rem'}
                height={'190rem'}
                style={{ borderRadius: '10px' }}
                // thumbnail
                // responsive
              />
              <div>
                <p>
                  <span style={STYLES.navItem}>{this.props.data.name}</span>
                </p>
              </div>
            </div>
          </Link>
        </Col>
      </Router>
    )
  }
}

class MangaView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasMoreItems: true,
      items: [],
      category: 1,
      cat_page: 0
    }
    console.log(this.props.route)
  }

  componentWillReceiveProps(nextProps) {
    // 这个方法应该也不要了...路由对了直接在didmount加载才是正确的做法
    this.setState({ hasMoreItems: true, items: [], cat_page: 0 })
    // const key = this.props.match.params.key
  }

  loadItems(page) {
    console.log(this.props)
    // console.log("load page " + page)
    const key = this.props.match.params.key
    // const cat = this.props.match.params.id
    if (this.props.match.params.id || key) {
      if (!this.props.match.params.key) {
        const url = `${SERVER_SETTING.url}/category/${this.props.match.params.id}/${this.state.cat_page++}`
        fetch(url).then(resp => resp.json()).then(json => {
          // console.log("fetch data len " + json.data.length)
          // todo 有可能延迟回来进入了其他tab，这里需要通过返回category和当前category(nav切换)来判断
          for (let i = 0; i < json.data.length; i++) {
            this.loadItemsDetail(page, json.data[i])
          }
          this.setState({ items: this.state.items })
          // console.log("over " + json.over)
          if (json.over) {
            this.setState({ hasMoreItems: false })
          }
        })
        // test
        // this.setState({ hasMoreItems: false })
      } else {
        // console.log('key: ' + key)
        // search就先全部给了，不分页了
        const url = `${SERVER_SETTING.url}/search/${key}`
        fetch(url).then(resp => resp.json()).then(json => {
          console.log(json)
          this.setState({ items: [] })
          for (let i = 0; i < json.length; i++) {
            this.loadItemsDetail(page, json[i])
          }
          // 一次性返回全部的结果了
          this.setState({ items: this.state.items, hasMoreItems: false })
        })
      }
    } else {
      // 根路径,用棋魂还是全部呢...
      const url = `${SERVER_SETTING.url}/category/15/${this.state.cat_page++}`
      fetch(url).then(resp => resp.json()).then(json => {
        // console.log("fetch data len " + json.data.length)
        // todo 有可能延迟回来进入了其他tab，这里需要通过返回category和当前category(nav切换)来判断
        for (let i = 0; i < json.data.length; i++) {
          this.loadItemsDetail(page, json.data[i])
        }
        this.setState({ items: this.state.items })
        // console.log("over " + json.over)
        if (json.over === 1 || json.over === '1') {
          this.setState({ hasMoreItems: false })
        }
      })
    }
  }

  loadItemsDetail(page, detail) {
    let res = this.state.items
    // console.log('load ' + detail.mid)
    res.push(<MangaItem key={detail.mid} data={detail} />)
  }

  render() {
    // console.log('MangaView render ' + (tis.props.route ? this.props.route.searchKey : "null"))
    return (
      <Col md={8} mdOffset={2} style={STYLES.mangaItem}>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadItems.bind(this)}
          hasMore={this.state.hasMoreItems}
          loader={<div className="loader">Loading ...</div>}
          threshold={250}
          style={{ margin: '10px auto' }}
          initialLoad={true}>
          {this.state.items}
        </InfiniteScroll>
      </Col>
    )
  }
}

export class Footer extends React.Component {
  render() {
    return (
      <Col
        md={12}
        mdOffset={0}
        style={{
          padding: '2rem',
          border: '3px solid red',
          textAlign: 'center'
        }}>
        <span> ShindouHikaru Copyright </span>
      </Col>
    )
  }
}

class Home extends React.Component {
  componentDidMount() {}

  constructor(props) {
    super(props)
    this.state = {
      searchKey: ''
    }
  }

  handleSearch() {
    // console.log('search: ' + this.state.searchKey)
    this.setState({ searchKey: this.state.searchKey })
  }

  handleInput(searchKey) {
    this.setState({ searchKey: searchKey })
  }

  render() {
    return (
      <div>
        <Col>
          <SearchBar
            handleSearch={this.handleSearch.bind(this)}
            handleInput={this.handleInput.bind(this)}
            searchKey={this.state.searchKey}
          />
        </Col>
        <CategoryBar />
      </div>
    )
  }
}

export default class SoulManga extends React.Component {
  // render(){
  //   return <RandomImage />
  // }

  render() {
    // 这就是说这里的出了category之外，其他都是通过target="_self"，来触发的，因为这些Route没有和Link写在一起
    return (
      <Router>
        <div>
          <LogoText />
          <SearchTips />
          <Route exact path="/" component={Home} />
          <Route path="/category/*" component={Home} />
          <Route path="/search/:key" component={Home} />
          <Route path="/fuck" component={Home} />
          <Route path="/info/:id" component={MangaInfo} />
          <Route path="/read/:id/chapter/:chapter" component={ReadPage} />
        </div>
      </Router>
    )
  }
}

class LogoText1 extends React.Component {
  render() {
    return (
      <div
        style={{
          position: 'relative',
          width: '37%',
          height: '8rem',
          float: 'left',
          textAlign: 'right',
          display: 'flex',
          alignItems: 'center',
          left: '20rem'
        }}>
        <svg className="logoText1" viewBox="0 0 100 20">
          <defs>
            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#326384" />
              <stop offset="95%" stopColor="#123752" />
            </linearGradient>
            <pattern
              id="wave"
              x="0"
              y="0"
              width="120"
              height="20"
              patternUnits="userSpaceOnUse">
              <path
                id="wavePath"
                d="M-40 9 Q-30 7 -20 9 T0 9 T20 9 T40 9 T60 9 T80 9 T100 9 T120 9 V20 H-40z"
                mask="url(#mask)"
                fill="url(#gradient)">
                <animateTransform
                  attributeName="transform"
                  begin="0s"
                  dur="1.5s"
                  type="translate"
                  from="0,0"
                  to="40,0"
                  repeatCount="indefinite"
                />
              </path>
            </pattern>
          </defs>
          <text
            textAnchor="middle"
            x="50"
            y="15"
            fontSize="17"
            fill="url(#wave)"
            fillOpacity="0.6">
            Soul Comic
          </text>
          <text
            textAnchor="middle"
            x="50"
            y="15"
            fontSize="17"
            fill="url(#gradient)"
            fillOpacity="0.1">
            Soul Comic
          </text>
        </svg>
      </div>
    )
  }
}

class LogoText2 extends React.Component {
  componentDidMount() {
    ;(function($) {
      var s,
        spanizeLetters = {
          settings: {
            letters: $('.js-spanize')
          },
          init: function() {
            s = this.settings
            this.bindEvents()
          },
          bindEvents: function() {
            s.letters.html(function(i, el) {
              //spanizeLetters.joinChars();
              var spanizer = $.trim(el).split('')
              return '<span>' + spanizer.join('</span><span>') + '</span>'
            })
          }
        }
      spanizeLetters.init()
    })(jQuery)
  }

  render() {
    return (
      // <main>
      (
        <div className="mast">
          <div className="mast__header">
            <h1 className="mast__title js-spanize">我们的童年  一直都在</h1>
            <hr className="sep" />
            <p className="mast__text js-spanize">僕たちの笑顔、ずっとここにいる </p>

          </div>
        </div>
      )
      // </main>
    )
  }
}

class LogoText extends React.Component {
  render() {
    return (
      <div
        style={{
          margin: '1.5rem auto',
          border: '2px solid red',
          // backgroundColor: '#42f4b9',
          height: '8rem'
        }}>
        <LogoText1 />
        <LogoText2 />
      </div>
    )
  }
}

class SearchTips extends React.Component {
  componentDidMount() {
    var words = ['hey I like SASS', 'I used to like LESS', 'I also heart Jade'],
      // words = ['我需要来一发了','这里合适吗。。。','这个，容我三思一下', '！@#￥@#！￥@#$@', '那就来一发吧', '那么问题来了', '你也需要来一发吗？'],
      part,
      i = 0,
      offset = 0,
      len = words.length,
      forwards = true,
      skip_count = 0,
      skip_delay = 5,
      is_over = false,
      speed = 100

    var wordflick = function() {
      setInterval(function() {
        if (is_over) {
          return
        }
        if (forwards) {
          if (offset >= words[i].length) {
            ++skip_count
            if (skip_count == skip_delay) {
              forwards = false
              skip_count = 0
            }
          }
        } else {
          // if(i === len){
          //   is_over = true
          //   return
          // }
          if (offset == 0) {
            forwards = true
            i++
            offset = 0
            if (i >= len) {
              i = 0
            }
          }
        }
        part = words[i].substr(0, offset)
        if (skip_count == 0) {
          if (forwards) {
            offset++
          } else {
            offset--
          }
        }
        $('.search-tips').text(part)
      }, speed)
    }
    $(document).ready(function() {
      wordflick()
    })
  }
  render() {
    return <div className="search-tips" />
  }
}

class RandomImage extends React.Component {
  constructor(props) {
    super(props)
    // left/top 就是html里面元素的x/y
    this.state = {
      left: 0,
      top: 0
    }
  }

  componentDidMount() {
    setInterval(this.moveImage.bind(this), 3000)
  }

  moveImage() {
    const newLeft = Math.random() * 1080
    const newRight = Math.random() * 720
    this.setState({ left: newLeft, right: newRight })
  }

  render() {
    const l = this.state.left + 'px'
    const t = this.state.right + 'px'
    return (
      <Image
        src="./luffy.jpeg"
        style={{ /*width:'100px',*/ position: 'absolute', left: l, top: t }}
      />
    )
  }
}

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default SoulManga;
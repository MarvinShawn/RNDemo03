'use strict'
import React,{Component} from 'react'
import {
  View,
  Text,
  Button,
  ListView,
  Image,
  RefreshControl,
  NavigationBar,
  WebView,
  Navigator,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
} from 'react-native'

import MSNavBar from './CustomView/MSNavBar.js';
import '../page/GlobalVar/GlobalConstVar.js';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';

// 导航栏的Mapper
var NavigationBarRouteMapper = {
  // 左键
  LeftButton(route, navigator, index, navState) {

    if (index > 0) {
      return(
        <View style = {{flex:1,alignItems:'center',justifyContent:'center',marginLeft:10}}>
          <TouchableOpacity
            onPress = {()=>{if (index > 0) {
              navigator.pop()
            }}}>
            <Icon name = "ios-arrow-back" size = {25}/>
          </TouchableOpacity>
        </View>
      )
    }
  },
  // 右键
  RightButton(route, navigator, index, navState) {
    // ...
  },
  // 标题
  Title(route, navigator, index, navState) {
    return (
      <View style = {{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:'black',fontSize:17}}>
          {route.name}
        </Text>
      </View>
    );
  }
};

export default class NetWorkPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <Navigator
        initialRoute = {{name:'BanTang',index:0}}
        renderScene = {(route,navigator) => {
            switch (route.name) {
              case 'BanTang':
                return <NetView navigator = {navigator}/>
                break;
              case 'DetailPage':
                return <DetailPage navigator = {navigator} contentID = {route.passProps.contentID}/>
                break;
              default:
            }
        }}
         navigationBar = {
           <Navigator.NavigationBar
              style = {styles.navigationBar}
              routeMapper = {NavigationBarRouteMapper}
           />
         }
      />
    );
  }
}

class NetView extends Component {

  constructor(props) {

    super(props);
    var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1 !== r2});
    this.arr = [{'title':'程皮皮我们走','likes':'125'}],
    this.bannerArr = [],
    this.page = 0,
    this.state = {
        dataSource:ds.cloneWithRows(this.arr),
        isRefreshing:false,
        isLoadMore:0   //0 没有在加载    1 正在加载    2没有更多  3 加载失败
    }
  }

  componentDidMount(){    //  4.0组件加载完毕调用
    this._refreshData(refreshType.refreshTypePullDown);
  }

//leftItem点击事件
  leftBarbuttonAction = ()=>{
    console.log('来这儿了');
    this.setState({
    });
    this.refs.NavBar.setState({
      color:'#ab2626'
    });
  };
  //header 点击事件
  _headerAction = (source) => {
    const {navigator} = this.props
    var contentID = source['id']
    navigator.push({
      name:'DetailPage',
      passProps:{
        contentID:contentID
      }

    })
  };

//cell的点击事件
  _cellAction = (index) => {
    const {navigator} = this.props;
    var contentID = this.arr[index]['id']
    navigator.push({
        name:'DetailPage',
        passProps:{  //传递的参数
          contentID:contentID
        }
    })

  };

  //cell布局
  _renderRow = (rowData,sectionID,rowID) => {
    return(
      <TouchableHighlight onPress = {() => this._cellAction(rowID)}>
      <View style = {styles.cellStyle}>
        <Image style = {styles.imageSize} source={{uri:this.arr[rowID]['pic']}}/>
        <Text style = {styles.TextStyle1}>{this.arr[rowID]['title']}</Text>
        <Text style = {styles.TextStyle2}>💗{this.arr[rowID]['likes']}</Text>
      </View>
      </TouchableHighlight>
    );
  };

 _renderImage = (source)=>{
   return(
   <TouchableHighlight onPress = {() => this._headerAction(source)}>
       <Image style = {styles.bannerImageSize} source = {{uri:source['photo']}}/>
   </TouchableHighlight>);

 }

//header
  _renderHeader = ()=>{
    return(
      <Swiper style = {styles.swiperStyle} height={200} autoplay = {true}>
        {
          this.bannerArr.map(item => this._renderImage(item))
        }
      </Swiper>
    );
  };

//footer
  _renderFooter = () => {
      var textStr = '戳我加载更多'
      switch (this.state.isLoadMore) {
        case 0:
        textStr = '戳我加载更多'
          break;
        case 1:
        textStr =  '正在卖力加载中...'
          break;
        case 2:
        textStr =  '没有更多数据'
          break;
        case 3:
        textStr = '加载失败!'
          break;
        default:
        textStr = '戳我加载更多'
      }
      return (
        <TouchableOpacity onPress = {()=>this._refreshData(refreshType.refreshTypePullup)}>
          <View style ={{height:30,alignItems:'center',justifyContent:'center',backgroundColor:'#e24d25'}}>
            <Text style = {{color:'#EEEEEE',fontSize:14}}>
              {textStr}
            </Text>
          </View>
        </TouchableOpacity>
      );

  };

//刷新数据操作(下拉或者上拉)
  _refreshData = (refreshTypeArg:refreshType)=>{

      if (refreshTypeArg === refreshType.refreshTypePullDown) {
        this.setState({
            isRefreshing:true,
        });
      }else {
        this.setState({
            isLoadMore:1, //正在加载
        });
      }
      var page = (refreshTypeArg === refreshType.refreshTypePullDown) ? 0:(this.page + 1)
      console.log('page======'+page);
      var URLString = 'http://open3.bantangapp.com/recommend/index?app_id=com.jzyd.BanTang&app_installtime=1462985294&app_versions=5.7&channel_name=appStore&client_id=bt_app_ios&client_secret=9c1e6634ce1c5098e056628cd66a17a5&last_get_time=1463238932&os_versions=9.3.1&screensize=750&track_device_info=iPhone8&track_deviceid=476C2ABB-9058-4621-930B-158CBB91354B&v=12&page='+page+'&pagesize=10'
      fetch(URLString,{method:'GET'})
      .then((response) => response.json())
      .then((responseData)=>{

        if (refreshTypeArg === refreshType.refreshTypePullDown) { //下拉刷新
          this.arr = responseData['data']['topic']
          this.bannerArr = responseData['data']['banner']
          this.setState({
            isRefreshing:false,
            dataSource:this.state.dataSource.cloneWithRows(this.arr)
          });
        }else { //加载更多
         this.arr = this.arr.concat(responseData['data']['topic'])
         if (this.arr.length == (this.page+1) * 10) {
           this.setState({
             isLoadMore:2,
           });
         }
          this.setState({
            dataSource:this.state.dataSource.cloneWithRows(this.arr),
            isLoadMore:0,
          });
          this.page = this.page + 1
        }
    }).catch((error)=>{

      alert(error);

      this.setState({
        isLoadMore:3,
      });

      setTimeout(()=>{
        this.setState({
          isLoadMore:0,
        });
      }, 2000);

    })
  };

//滚动的代理方法
  _onScroll = ()=>{
    // console.log(this.refs.listView);
  };


  render(){
    return(
      <View style = {styles.container}>
        <ListView
          ref = "listView"
          refreshControl={<RefreshControl
              refreshing = {this.state.isRefreshing}
              onRefresh = {()=>this._refreshData(refreshType.refreshTypePullDown)}
              tintColor = "#FF0000"
              title = "加载中"
          />}
          scrollsToTop = {true}
          // onEndReached = {this._onEndReached()}
          // onEndReachedThreshold={20} //调用onEndReached之前的临界值
          automaticallyAdjustContentInsets={false} //自动偏移20像素的原因
          style= { styles.listView }
          dataSource={this.state.dataSource}
          renderRow = {this._renderRow}
          renderHeader = {this._renderHeader}
          renderFooter = {this._renderFooter}
          onScroll = {()=>this._onScroll()}
        />
      </View>
    );
  }
}



class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render(){
    const {contentID} = this.props;//解构
    return(
      <View style = {styles.detailPageStyle}>
        <WebView
          automaticallyAdjustContentInsets={false}
          source = {{uri:"http://m.ibantang.com/topic/"+contentID}}
        />
      </View>
    );
  }
}




const refreshType = {
    refreshTypePullDown:1, //下拉
    refreshTypePullup:2,  //上拉
};

const styles = StyleSheet.create({
  navigationBar:{
    backgroundColor:'#FEDCBA',
    height:64
  },
  container:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'white',
  },
  listView:{
    marginTop:64,
    backgroundColor:'white',
    marginBottom:49
  },
  cellStyle:{
    flex:1,
    flexDirection:'column',
    backgroundColor:'white'
  },
  imageSize:{
    width:global.constants.windowWidth,
    height:global.constants.windowWidth*0.8,
  },
  TextStyle1:{
    fontSize:17,
    marginTop:10,
    textAlign:'center'
  },
  TextStyle2:{
    fontSize:17,
    marginTop:5,
    marginBottom:5,
    textAlign:'center'
  },
  swiperStyle:{
    flexDirection:'row',
  },
  bannerViewStyle:{
    flex:1,
    backgroundColor:'red'
  },
  bannerImageSize:{
    resizeMode:'contain',
    width:global.constants.windowWidth,
    height:200
  },
  detailPageStyle:{
    marginTop:64,
    marginBottom:49,
    flex:1,
    backgroundColor:'#ABCDEF'
  }
});

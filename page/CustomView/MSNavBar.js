'use strict'
import React,{Component} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text
} from 'react-native'

import '../GlobalVar/GlobalConstVar.js';
import Icon from 'react-native-vector-icons/Ionicons';


export default class MSNavBar extends Component {

  constructor(props) {
      console.log('构造器调用'); //1.0 属性初始化 最先调用
    super(props);
    this.state = {
      color:undefined,

    }
  }


  //生命周期方法
  componentWillMount(){ // 2.0 组件将要被加载时调用

    console.log('组件将被加载');
  }

  componentDidMount(){    //  4.0组件加载完毕调用
    console.log('组件已经加载好了');
  }


//存在期生命周期

  componentWillReceiveProps(){

      console.log('修改了props');

  }

  shouldComponentUpdate(){

    console.log('控制是否渲染组件');
    return true;
  }

  componentWillUpdate(){

    console.log('组件将要更新');
  }


  componentDidUpdate(){

    console.log('组件更新完毕');
  }



//销毁期函数
  componentWillUnmount(){

    console.log('组件即将销毁');

  }


  render(){
    console.log('渲染方法调用'); //3.0 渲染方法调用
    const {title,leftTitle,leftImage,leftAction,rightTitle,rightImage,rightAction,barTinColor} = this.props;
    return(
        //在冲突值的情况下，从最右边元素的值将会优先，并且 falsy 值如 false，undefined 和 null 将被忽略。一个常见的模式是基于某些条件有条件地添加一个样式
      <View style = {[styles.container,barTinColor && {backgroundColor:barTinColor},this.state.color && {backgroundColor:this.state.color}]}>
          {//左侧按钮或者文字
                (()=>{
                  if (leftTitle) {
                    return <TouchableOpacity onPress = {()=>leftAction()}>
                      <View style = {styles.textView}>
                        <Text style = {styles.textColor}>{leftTitle}</Text>
                      </View>
                    </TouchableOpacity>
                  }else if (leftImage) {
                      return <TouchableOpacity onPress = {()=>leftAction()}>
                        <View style = {styles.textView}>
                            <Icon name = {leftImage} size = {25}/>
                        </View>
                      </TouchableOpacity>
                  }
                })()
          }
          {
              //闭包表达式立即执行
            (()=>{
              if (title) {
                return <View style = {styles.titleView}>
                  <Text>{title}</Text>
                </View>
              }

            })()


          }
          {

            (()=>{
              if (rightTitle) {

              }else if (rightImage) {

              }

            })()

          }
      </View>

    );
  }

}

const styles = StyleSheet.create({

  container:{
    marginTop:20,
    height:44,
    width:global.constants.windowWidth,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'blue'
  },
  titleView:{
    alignSelf:'center',
    marginRight:global.constants.windowWidth*0.5-30,
  },
  textView:{
    flex:1,
    alignSelf:'flex-start',
    justifyContent:'center',
    marginLeft:10,
  },
  textColor:{
    color:'black',
  }

});

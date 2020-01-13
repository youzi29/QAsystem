<template>
  <div>
    <van-nav-bar title="地址" left-arrow @click-left="onClickLeft" />
    <!-- 地图 -->
    <div id="container"></div>

    <!-- 搜索框 -->
    <div class="search">
      <div class="search_in">
        <van-cell-group>
          <van-field v-model="addressdata" id="input" center clearable placeholder>
            <van-button slot="button" size="small" type="primary" @click="okAddress">确认地址</van-button>
          </van-field>
        </van-cell-group>
      </div>
    </div>

    <!-- 等待弹窗 -->
    <van-overlay :show="lodingShow">
      <div class="wrapper">
        <div class="block">
          <van-loading size="50px" color="#ffffff">定位中...</van-loading>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lodingShow: true,
      addressdata: "",
      aDtata: {} //地址数据
    };
  },
  methods: {
    okAddress() {
      var self = this;
	  let show = false;
	  this.$emit('mapfun',1)
      console.log(self.aDtata);
    },
    onClickLeft() {
        /* this.$router.go(-1); */
	/* 	let show = false */
		let check = true
		this.$emit('mapfun' , 2)
    }
  },
  mounted() {
    var self = this;
    //初始化地图
    var mapdata = [116.397428, 39.90923];
    var map = new AMap.Map("container", {
      resizeEnable: true, //是否监控地图容器尺寸变化
      center: mapdata,
      zoom: 11 //初始地图级别
    });
    AMap.plugin("AMap.Geolocation", function() {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：5s
        buttonPosition: "RB", //定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
      });
      map.addControl(geolocation);
      geolocation.getCurrentPosition(function(status, result) {
        if (status == "complete") {
          onComplete(result);
          console.log(result);
          self.lodingShow = false;
          //构建地址数据
          self.aDtata.location = result.position.lng + "," + result.position.lat;
          self.aDtata.district = result.addressComponent.province+result.addressComponent.city+result.addressComponent.district;
          self.aDtata.address = result.addressComponent.township+result.addressComponent.street+result.addressComponent.streetNumber+result.addressComponent.streetNumber;
          //写入vuex -》state
          self.$store.state.aDtata = self.aDtata;
          
          //写入输入框
          self.addressdata = result.formattedAddress;
        } else {
          onError(result);
        }
      });
    });
    function onComplete(data) {
      var str = [];

      mapdata.push(data.position);
      str.push("定位结果：" + data.position);
      str.push("定位类别：" + data.location_type);
      if (data.accuracy) {
        str.push("精度：" + data.accuracy + " 米");
      } //如为IP精确定位结果则没有精度信息
      str.push("是否经过偏移：" + (data.isConverted ? "是" : "否"));
    }
    //解析定位错误信息
    function onError(data) {
      this.$toast("定位失败!" + "失败原因排查信息:" + data.message);
    }
    var autoOptions = {
      input: "input"
    };
    var auto = new AMap.Autocomplete(autoOptions);
    var placeSearch = new AMap.PlaceSearch({
      map: map,
      children: 1
    }); //构造地点查询类
    AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
    function select(e) {
      
      //构建地址数据
      self.aDtata.location = e.poi.location.lng + "," + e.poi.location.lat;
      self.aDtata.district = e.poi.district;
      self.aDtata.address = e.poi.address;
      //写入vuex -》state
      self.$store.state.aDtata = self.aDtata;

      placeSearch.setCity(e.poi.adcode);
      placeSearch.search(e.poi.name); //关键字查询查询
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100vh;
}
.search {
  width: 100%;
  position: fixed;
  top: 1rem;
}
.search_in {
  width: 85%;
  margin: 0 auto;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  color: #fff;
}
</style>
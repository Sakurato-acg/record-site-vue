<script setup>
import AnimeCard from '../../components/card/AnimeCard.vue'
import { getYear } from '../../utils/utils'
import { ref, onMounted, watch } from 'vue'

//年代更多
const tail = ref()
const getMoreYear = ref(true)
const getMore = () => {
  // tail.value -= 10
  getMoreYear.value = !getMoreYear.value
}
const yearList = ref([])
// 布局
const layout = ref({
  radio: false
})
/* watch(
  () => layout.value.radio,
  (newValue, oldValue) => {
    if (newValue) {
      form.value.pageSize = 12
    } else {
      form.value.pageSize = 12
    }
  }
) */
// 表单
const form = ref({
  year: -1,
  currentPage: 1,
  pageSize: 12,
  total: 0
})
const handleCurrentChange = () => {}

//test
const getChange = (val) => {
  let i = 0
  while (i < yearList.value.length && yearList.value[i] > val) {
    i++
  }
  yearList.value.splice(i, 0, val)
}

onMounted(() => {
  let now = new Date().getFullYear()
  yearList.value = getYear(now, now - 15)
  tail.value = now - 15
  /* if (layout.value.radio) {
    form.value.pageSize = 12
  } else {
    form.value.pageSize = 12
  } */
})
</script>
<template>
  <div id="animeView" style="margin-top: 78.25px">
    <!--添加筛选-->
    <el-row>
      <el-col class="col nav-box box-border">
        <div class="nav-header">番剧索引</div>
        <!--类型-->
        <div class="navList" style="margin-top: 10px">
          <h4>类型：</h4>
          <nav>
            <a class="btn">
              <span>全部</span>
            </a>
            <a class="btn">
              <span>番剧</span>
            </a>
            <a class="btn">
              <span>剧场版</span>
            </a>
            <a class="btn">
              <span>番外</span>
            </a>
          </nav>
        </div>
        <!--季度-->
        <div class="navList">
          <h4>季度：</h4>
          <nav>
            <a class="btn">
              <span>全部</span>
            </a>
            <a class="btn">
              <span>一月番</span>
            </a>
            <a class="btn">
              <span>四月番</span>
            </a>
            <a class="btn">
              <span>七月番</span>
            </a>
            <a class="btn">
              <span>十月番</span>
            </a>
          </nav>
        </div>
        <!--状态-->
        <div class="navList">
          <h4>状态：</h4>
          <nav>
            <a class="btn">
              <span>全部</span>
            </a>
            <a class="btn">
              <span>看完</span>
            </a>
            <a class="btn">
              <span>待看</span>
            </a>
            <a class="btn">
              <span>在看</span>
            </a>
          </nav>
        </div>
        <!--年代-->
        <div class="navList">
          <h4>年代：</h4>
          <nav>
            <a class="btn">
              <span>全部</span>
            </a>
            <a class="btn" v-for="(item, index) in yearList" :key="index">
              <span>{{ item }}</span>
            </a>
            <a class="btn more" @click="getMore()">
              <span>更多</span>
            </a>
            <el-select
              :value="form.year"
              placeholder="选择年度"
              :class="{ getMoreYear: getMoreYear }"
              @change="getChange"
            >
              <el-option
                :label="item"
                :value="item"
                v-for="(item, index) in getYear(tail - 1, tail - 21)"
                :key="index"
              >
              </el-option>
              <el-option label="更早" value="1"></el-option>
            </el-select>
          </nav>
        </div>
        <!--年代-->
        <div class="navList">
          <h4>年代：</h4>
          <nav>
            <a class="btn">
              <span>全部</span>
            </a>
            <a class="btn" v-for="(item, index) in yearList" :key="index">
              <span>{{ item }}</span>
            </a>
            <a class="btn more" @click="getMore()">
              <span>更多</span>
            </a>
            <el-select
              :value="form.year"
              placeholder="选择年度"
              :class="{ getMoreYear: getMoreYear }"
              @change="getChange"
            >
              <el-option
                :label="item"
                :value="item"
                v-for="(item, index) in getYear(tail - 1, tail - 21)"
                :key="index"
              >
              </el-option>
              <el-option label="更早" value="1"></el-option>
            </el-select>
          </nav>
        </div>
      </el-col>
    </el-row>
    <!--视图切换-->
    <el-row style="margin-top: 10px; margin-bottom: 10px" class="col">
      <el-col class="change-view-col">
        <el-text>视图切换：</el-text>
        <el-radio-group
          v-model="layout.radio"
          text-color="#41ba83"
          fill="#ffffff"
          class="box-border change-view"
        >
          <el-radio-button :label="false">大</el-radio-button>
          <el-radio-button :label="true">小</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <!--animeList-->
    <el-row class="col">
      <el-col class="anime-list" :class="{ 'anime-list-sm': layout.radio }">
        <div v-for="(item, index) in form.pageSize" :key="index">
          <AnimeCard :layout="layout.radio" />
        </div>
      </el-col>
      <el-col>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="form.currentPage"
          :page-size="form.pageSize"
          layout="prev, pager, next"
          :total="form.total"
          style="float: right; margin-bottom: 20px"
        />
      </el-col>
    </el-row>
  </div>
</template>
<style>
#animeView .change-view .el-radio-button__inner {
  border: none;
  background: #f8f8f8;
}
#animeView .change-view .el-radio-button__inner:hover {
  color: #41ba83;
}
</style>
<style lang="less" scoped>
.change-view-col{
  display: flex;
  justify-content: flex-end;
}
.change-view{
  float: right;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 2px;
  overflow: hidden;

  >label{
    position: relative;
    display: inline-block;
    outline: none;
  }
}

.anime-list{
  width: 100%;
  display: grid;
  grid-template-columns:repeat(auto-fill,minmax(25%,1fr));
  // gap: 20px;
  >div{
    padding: 10px;
  }
}
.col {
  flex:0 0 80%;
  max-width: 80%;
  margin-left: 10%;
}

@media screen and (max-width:1920px) {
  .col {
    flex:0 0 85%;
    max-width: 80%;
    margin-left: 7.5%;
  }
  .anime-list-sm{
    grid-template-columns:repeat(auto-fill,minmax(16.6%,1fr));
  }
  .anime-card-ms {
    height: 260px;
  }
}
@media screen and (max-width:1120px) {
  .col {
    flex:0 0 90%;
    max-width: 90%;
    margin-left: 5%;
  }
  .anime-list-sm{
    grid-template-columns:repeat(auto-fill,minmax(25%,1fr));
  }
  .anime-card-ms {
    height: 200px;
  }
}

@media screen and (max-width:545px) {
  .anime-list-sm{
    grid-template-columns:repeat(auto-fill,minmax(33.3%,1fr));
  }
  .anime-card-ms {
    height: 160px;
  }
}
/* .anime-list-sm{
  gap: 0;
  // grid-template-columns:repeat(auto-fill,minmax(33.3%,1fr));
  >div{
    padding:10px;
  }

} */

#animeView {
  // height: 100vh;
 min-height: 100vh;
 .nav-header{
    padding: 10px;
    border-bottom: 1px solid #e3eaef;
    font-weight:600;
  }
  .navList {
    // background-color: aliceblue;
    // padding-left: 64px;
    // padding-right: 64px;
    display: flex;
    align-items: baseline;
    padding: 0px 10px 0;

    > h4 {
      min-width: 50px
      // margin-right: 10px;
    }
    > nav {
      display: flex;
      justify-content: left;
      align-items: center;
      height: fit-content;
      flex-wrap: wrap;
      gap: 5px;
      > a {
        // padding: 8px 16px;
        border-radius: 6px;
        transition: all 0.5s;
        cursor: pointer;
      }
      > a:hover {
        // background-color: #727cf5;
        // color: #ffffff;
        // background-color: #e9e8ea;
      }
      > a[class='background'] {
        background-color: #e9e8ea;
        // color: #fff;
        // background-color: #727cf5;
        border-color: #727cf5;
        // box-shadow: 0 2px 6px 0 rgb(0 0 0  / 50);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
      }
      .more{
        text-decoration-line: underline;
      }
    }
  }
  .nav-box{
    padding: 10px;
    background-color: #ffffff;

  }
}
.getMoreYear{
  display: none;
}
</style>
